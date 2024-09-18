
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import {IUpdateProductResponse, WooUpdateParams1, WooUpdateParams2} from '../models/product_model';
import { PRODUCTS_UPDATE_DO } from '../api';
import {
  PRODUCTS_UPDATE_RUN_ACTION ,
  PRODUCTS_READ_RUN_ACTION,
  PRODUCTS_UPDATE_STARTED_ACTION,
  PRODUCTS_UPDATE_FINISHED_ACTION,
  // setSelectedProductsAction,
} from '../actions';

export function* products_update_watcher(action: { payload: WooUpdateParams2 | WooUpdateParams1 }): SagaIterator {
  try {
    yield put(PRODUCTS_UPDATE_STARTED_ACTION(true));

      const response: IUpdateProductResponse = yield call(
        PRODUCTS_UPDATE_DO,
        action.payload,
      );

    yield put(PRODUCTS_READ_RUN_ACTION({})); //TODO NOW GET IN FROM action.payload.read_json_data

    // yield put(setSelectedProductsAction([]));

    yield put(PRODUCTS_UPDATE_FINISHED_ACTION({
      response_data:response,
      isSuccessful: true,
    }));
  } catch (error) {
    yield put(
      PRODUCTS_UPDATE_FINISHED_ACTION({
        response_data: {action_payload: action.payload} , // as string,
        error: error as Error,
        isSuccessful: false,
      }),
    );
  } finally {
    yield put(PRODUCTS_UPDATE_STARTED_ACTION(false));
  }
}

export function* products_update_worker(): SagaIterator {
  yield takeLatest(PRODUCTS_UPDATE_RUN_ACTION , products_update_watcher);
}
