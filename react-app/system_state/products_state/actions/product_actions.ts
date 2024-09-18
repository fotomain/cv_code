import {
  IFetchProductResponse,
  IProductResponse,
  TProduct,
  ProductListItem,
  IDeleteProductResponse, WooDeleteParams, WooUpdateParams2, IUpdateProductResponse, WooUpdateParams1, WooReadParams,
} from '../models';
import { createAction } from '@reduxjs/toolkit';
import {TJSONValue} from "../models/global_types";
import {TTableLine} from "../../../business/products/products_crud_table/inner/table_types";

const PRODUCT_PREFIX = 'PRODUCT';

/* APP STATE */

/*====================== SELECTED PRODUCTS */
//=== PS_STEP1
export const PRODUCTS_SET_SELECTED_ACTION = createAction<TTableLine[]>(
    `${PRODUCT_PREFIX}API/PRODUCTS_SET_SELECTED_ACTION`,
);
/*====================== CREATE PRODUCT */
/*====================== CREATE PRODUCT */
/*====================== CREATE PRODUCT */

export const PRODUCTS_CREATE_STARTED_ACTION = createAction<boolean>(
  `${PRODUCT_PREFIX}API/PRODUCTS_CREATE_STARTED_ACTION`,
);

export const PRODUCTS_CREATE_RUN_ACTION = createAction<TProduct>(
  `${PRODUCT_PREFIX}/API/PRODUCTS_CREATE_RUN_ACTION`,
);

export const PRODUCTS_CREATE_FINISHED_ACTION = createAction<IProductResponse>(
  `${PRODUCT_PREFIX}/API/PRODUCTS_CREATE_FINISHED_ACTION`,
);


/*====================== READ PRODUCT */
/*====================== READ PRODUCT */
/*====================== READ PRODUCT */

export const PRODUCTS_FIRST_ACCESS_ACTION = createAction<boolean>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_FIRST_ACCESS_ACTION`,
);

export const PRODUCTS_READ_RUN_ACTION = createAction<WooReadParams | null>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_READ_RUN_ACTION`,
);

export const PRODUCTS_READ_STARTED_ACTION = createAction<boolean>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_READ_STARTED_ACTION`,
);


export const PRODUCTS_DATA_TO_STORE_ACTION = createAction<IFetchProductResponse>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_SET_DATA_ACTION`,
);

export const PRODUCTS_READ_FINISHED_ACTION = createAction<boolean>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_READ_FINISHED_ACTION`,
);

/*====================== UPDATE PRODUCT */
/*====================== UPDATE PRODUCT */
/*====================== UPDATE PRODUCT */

export const PRODUCTS_UPDATE_RUN_ACTION  = createAction<WooUpdateParams2 | WooUpdateParams1>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_UPDATE_RUN_ACTION`,
);

export const PRODUCTS_UPDATE_STARTED_ACTION  = createAction<boolean>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_UPDATE_STARTED_ACTION`,
);

export const PRODUCTS_UPDATE_FINISHED_ACTION = createAction<IUpdateProductResponse>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_UPDATE_FINISHED_ACTION`,
);

/*====================== DELETE PRODUCT */
/*====================== DELETE PRODUCT */
/*====================== DELETE PRODUCT */

export const PRODUCTS_DELETE_STARTED_ACTION = createAction<boolean>(
    `${PRODUCT_PREFIX}API/PRODUCTS_DELETE_STARTED_ACTION`,
);

export const PRODUCTS_DELETE_RUN_ACTION  = createAction<WooDeleteParams>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_DELETE_RUN_ACTION`,
);

export const PRODUCTS_DELETE_FINISHED_ACTION = createAction<IDeleteProductResponse>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_DELETE_FINISHED_ACTION`,
);

export const PRODUCTS_DELETE_FINISHED_CLEAR_ACTION = createAction<TJSONValue>(
    `${PRODUCT_PREFIX}/API/PRODUCTS_DELETE_FINISHED_CLEAR_ACTION`,
);

// ================= SUB SET
// ================= SUB SET
// ================= SUB SET


export const setSelectedProductsAction = createAction<ProductListItem[]>(
    `${PRODUCT_PREFIX}_SET_SELECTED_PRODUCTS`,
);

export const setDeleteModalOpenAction = createAction<boolean>(
    `${PRODUCT_PREFIX}_SET_DELETE_MODAL_OPEN`,
);


export const fetchProductAction = createAction<string>(
    `${PRODUCT_PREFIX}/API/FETCH_PRODUCT`,
);

export const fetchProductDoneAction = createAction<IProductResponse>(
    `${PRODUCT_PREFIX}/API/FETCH_PRODUCT_DONE`,
);
