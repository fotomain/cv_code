
import { all } from 'redux-saga/effects';
import { products_create_worker } from './products_create_saga';
import { products_read_worker } from './products_read_saga';
import { products_update_worker } from "./products_update_saga";
import { products_delete_worker} from "./products_delete_saga";

export default function* root_saga() {
  yield all([
      products_create_worker(),
      products_read_worker(),
      products_update_worker(),
      products_delete_worker(),
      ]
  );
}
