import { SagaIterator } from 'redux-saga';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import {IFetchProductResponse, WooReadParams} from '../models/product_model';
import { PRODUCTS_READ_DO } from '../api';
import {
    PRODUCTS_DATA_TO_STORE_ACTION,
    PRODUCTS_FIRST_ACCESS_ACTION,
    PRODUCTS_READ_FINISHED_ACTION,
    PRODUCTS_READ_RUN_ACTION,
    PRODUCTS_READ_STARTED_ACTION,
    // isLoadingAction,
} from '../actions';

export function* products_read_watcher(action: { payload: WooReadParams | null }): SagaIterator {
  try {

    yield put(PRODUCTS_READ_STARTED_ACTION(true));
    yield put(PRODUCTS_READ_FINISHED_ACTION(false));
    // yield delay(2000)

          const response: IFetchProductResponse = yield call(
              PRODUCTS_READ_DO,
              action.payload);

          yield put(PRODUCTS_DATA_TO_STORE_ACTION(response));

    yield put(PRODUCTS_READ_FINISHED_ACTION(true));
    yield put(PRODUCTS_READ_STARTED_ACTION(false));

  } catch (error) {
    yield put(
        PRODUCTS_DATA_TO_STORE_ACTION({
        products: [],
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    // yield put(PRODUCTS_READ_STARTED_ACTION(false));
// yield put(isLoadingAction(false));
  }
}

export function* products_read_worker(): SagaIterator {
  // works if XXX_read_run_action only
  yield takeLatest(PRODUCTS_READ_RUN_ACTION, products_read_watcher);
}
