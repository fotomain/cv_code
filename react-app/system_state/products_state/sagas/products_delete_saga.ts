import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import {IDeleteProductResponse, WooDeleteParams} from '../models/product_model';
import { PRODUCTS_DELETE_DO } from '../api';
import {
  PRODUCTS_DELETE_RUN_ACTION ,
  PRODUCTS_READ_RUN_ACTION,
  PRODUCTS_DELETE_STARTED_ACTION,
  PRODUCTS_DELETE_FINISHED_ACTION,
  // setSelectedProductsAction,
} from '../actions';

export function* products_delete_watcher(action: { payload: WooDeleteParams }): SagaIterator {
  try {

    yield put(PRODUCTS_DELETE_STARTED_ACTION(true));
    yield put(PRODUCTS_DELETE_FINISHED_ACTION({isSuccessful:false} as IDeleteProductResponse ));

      const response: IDeleteProductResponse = yield call(
        PRODUCTS_DELETE_DO,
        action.payload,
      );

    yield put(PRODUCTS_READ_RUN_ACTION({})); //TODO NOW GET IN FROM action.payload.read_json_data

    // yield put(setSelectedProductsAction([]));

    response.response_data.payload = action.payload

    yield put(PRODUCTS_DELETE_STARTED_ACTION(false));
    yield put(PRODUCTS_DELETE_FINISHED_ACTION(response));

  } catch (error) {
    yield put(
      PRODUCTS_DELETE_FINISHED_ACTION({
        response_data: {action_payload: action.payload} , // as string,
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(PRODUCTS_DELETE_STARTED_ACTION(false));
  }
}

export function* products_delete_worker(): SagaIterator {
  yield takeLatest(PRODUCTS_DELETE_RUN_ACTION , products_delete_watcher);
}
