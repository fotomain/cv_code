import {
  IDeleteProductResponse,
  IProductResponse,
  TProduct,
  ProductListItem,
} from '../models';
import { TStoreState } from '../reducers';
import {TJSONValue} from "../models/global_types";
import {PRODUCTS_SET_SELECTED_ACTION} from "../actions";
import {TTableLine} from "../../../business/products/products_crud_table/inner/table_types";

//=== PS_STEP5
export const SEL_PRODUCTS_SET_SELECTED = (state: TStoreState): TTableLine[] =>
    (undefined===state.product_state.products_selected)
        ?[]
        :state.product_state.products_selected;


export const SEL_PRODUCTS_FIRST_ACCESS = (state: TStoreState): boolean =>
  state.product_state.products_first_access;

export const SEL_PRODUCTS_READ_STARTED = (state: TStoreState): boolean =>
  state.product_state.products_read_started;
export const SEL_PRODUCTS_READ_FINISHED = (state: TStoreState): TJSONValue =>
  state.product_state.products_read_finished;

export const SEL_PRODUCTS_READ = (state: TStoreState): ProductListItem[] =>
    state.product_state.products_read_response?.products || [];


export const SEL_YESNO_DIALOG_CLOSED = (state: TStoreState): boolean =>
    (undefined===state.product_state.yesno_dialog_closed)?false:state.product_state.yesno_dialog_closed;



export const SEL_PRODUCTS_CREATE_STARTED = (state: TStoreState): boolean =>
    state.product_state.products_create_started;

export const SEL_PRODUCTS_CREATE_FINISHED = (state: TStoreState): boolean =>
    (undefined===state.product_state?.products_create_response?.isSuccessful)
        ?false
        :state.product_state?.products_create_response?.isSuccessful;


export const SEL_PRODUCTS_UPDATE_STARTED = (state: TStoreState): boolean => {
  console.log('=== state.product_state.products_update_started ',state.product_state.products_update_started)
  return state.product_state.products_update_started;
}

export const SEL_PRODUCTS_UPDATE_FINISHED = (state: TStoreState): boolean => {
  console.log('=== state.product_state.products_update_finished ',state.product_state.products_update_finished)
  return state.product_state.products_update_finished.isSuccessful;
}

export const SEL_PRODUCTS_DELETE_STARTED = (state: TStoreState): boolean =>
    state.product_state.products_delete_started;

export const SEL_PRODUCTS_DELETE_FINISHED = (state: TStoreState): boolean =>
    (undefined===state.product_state.products_delelete_response?.isSuccessful)
    ?false
    :state.product_state.products_delelete_response?.isSuccessful;

export const SEL_PRODUCTS_DELETE_RESPONSE = (state: TStoreState): IDeleteProductResponse =>
    (undefined===state.product_state.products_delelete_response)
        ?({isSuccessful:false} as IDeleteProductResponse)
        :state.product_state.products_delelete_response;




// ===========================
// =========================== OLD
// ===========================
export const getSelectedProducts = (state: TStoreState): ProductListItem[] =>
  state.product_state.selectedProducts;

export const getEditProduct = (state: TStoreState): TProduct | undefined =>
  state.product_state.selectedProducts.length > 0
    ? state.product_state.selectedProducts[0]
    : undefined;


export const getProductSaveResponse = (
  state: TStoreState,
): IProductResponse | undefined => state.product_state.products_create_response;

export const getDeleteModalOpen = (state: TStoreState): boolean =>
  state.product_state.deleteModalOpen;

export const getDeleteProductResponse = (
  state: TStoreState,
): IDeleteProductResponse | undefined => state.product_state.products_delelete_response;
