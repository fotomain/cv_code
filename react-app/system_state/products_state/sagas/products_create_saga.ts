import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { IProductResponse, TProduct } from '../models';

import { PRODUCTS_CREATE_DO } from '../api';
import {
    PRODUCTS_CREATE_RUN_ACTION,
    PRODUCTS_CREATE_STARTED_ACTION,
    PRODUCTS_CREATE_FINISHED_ACTION, PRODUCTS_READ_RUN_ACTION,
} from '../actions';

export function* products_create_watcher(action: { payload: TProduct }): SagaIterator {
  try {

      yield put(PRODUCTS_CREATE_STARTED_ACTION(true));
      yield put(PRODUCTS_CREATE_FINISHED_ACTION({isSuccessful:false} as IProductResponse));

        const response: IProductResponse = yield call(PRODUCTS_CREATE_DO, action.payload);

      yield put(PRODUCTS_READ_RUN_ACTION({}));

      yield put(PRODUCTS_CREATE_FINISHED_ACTION(response));
      yield put(PRODUCTS_CREATE_STARTED_ACTION(false));

  } catch (error) {
      //TODO FALSE yield put(PRODUCTS_CREATE_STARTED_ACTION(true));
    yield put(
      PRODUCTS_CREATE_FINISHED_ACTION({
        product: action.payload,
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(PRODUCTS_CREATE_STARTED_ACTION(false));
  }
}

export function* products_create_worker(): SagaIterator {
  yield takeLatest(PRODUCTS_CREATE_RUN_ACTION, products_create_watcher);
}
