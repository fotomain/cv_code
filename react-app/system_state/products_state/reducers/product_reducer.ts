import { createReducer } from '@reduxjs/toolkit';
import {
    PRODUCTS_READ_FINISHED_ACTION,
    PRODUCTS_DELETE_STARTED_ACTION,
    PRODUCTS_READ_STARTED_ACTION,
    // isLoadingAction,
    PRODUCTS_CREATE_STARTED_ACTION,
    setDeleteModalOpenAction,
    PRODUCTS_DELETE_FINISHED_ACTION,
    PRODUCTS_CREATE_FINISHED_ACTION,
    setSelectedProductsAction,
    PRODUCTS_UPDATE_STARTED_ACTION,
    PRODUCTS_UPDATE_FINISHED_ACTION,
    PRODUCTS_DELETE_FINISHED_CLEAR_ACTION,

    PRODUCTS_FIRST_ACCESS_ACTION,
    PRODUCTS_DATA_TO_STORE_ACTION, PRODUCTS_SET_SELECTED_ACTION,
} from '../actions';
import { IProductState } from '../models/product_model';

import {TTableLine} from "../../../business/products/products_crud_table/inner/table_types";


export const product_state_initial: IProductState = {
  deleteModalOpen: false,
  //=== PS_STEP4
    products_selected: [],

  //==== first_access_step1 init = true
    products_first_access: false,
    products_read_started: false,
    products_read_finished: false,
    products_create_started: false,
    products_update_started: false,
    products_update_finished: false,
    products_delete_started: false,
    selectedProducts: [],
};

export enum boolean3 {
    init,
    true,
    false,
}
export default createReducer(product_state_initial, (builder) =>
  builder
   //=== PS_STEP2
   .addCase(PRODUCTS_SET_SELECTED_ACTION, (state: any, {payload}: any) =>
   {   console.log('=== rows_selected - products_selected ',payload)
       return ({
            ...state,
            products_selected: payload,
        })
   }
   )
       // ({
    // console.log('=== payload.products. ',payload.products)
    // return ({
    //     ...state,
    //     products_read_response: payload,
    //     //==== first_access_step2-1 set false
    //     products_first_access: (payload.products.length>0) as boolean ,
    // })})



   .addCase(PRODUCTS_FIRST_ACCESS_ACTION, (state: any, {payload}: any) => ({
      ...state,
        products_first_access: payload,
    }))
   .addCase(PRODUCTS_READ_STARTED_ACTION, (state: any, {payload}: any) => ({
      ...state,
        products_read_started: payload,
        // products_read_started: (payload===true)?boolean3.true,
        // products_read_finished: !payload,
      // isLoading: payload,
    }))
  .addCase(PRODUCTS_DATA_TO_STORE_ACTION, (state: any, {payload}: any) => {
      console.log('=== payload.products. ',payload.products)
      return ({
      ...state,
      products_read_response: payload,
      //==== first_access_step2-1 set false
      products_first_access: (payload?.products?.length>0) as boolean ,
  })})
  .addCase(PRODUCTS_READ_FINISHED_ACTION, (state: any, {payload}: any) => ({
      ...state,
      products_read_finished: payload,
  }))


    .addCase(PRODUCTS_CREATE_STARTED_ACTION, (state: any, {payload}: any) => ({
      ...state,
      products_create_started: payload,
      // products_create_finished: !payload,
    }))

    .addCase(PRODUCTS_UPDATE_STARTED_ACTION, (state: any, {payload}: any) => ({
      ...state,
        products_update_started: payload,
    }))
    .addCase(PRODUCTS_UPDATE_FINISHED_ACTION, (state: any, {payload}: any) => ({
      ...state,
        products_update_finished: payload,
    }))


    .addCase(PRODUCTS_DELETE_STARTED_ACTION, (state: any, {payload}: any) => ({
      ...state,
      products_delete_started: payload,
    }))
    .addCase(setDeleteModalOpenAction, (state: any, {payload}: any) => ({
      ...state,
      deleteModalOpen: payload,
    }))
    .addCase(setSelectedProductsAction, (state: any, {payload}: any) => ({
      actionTriggerRefetching: undefined,
      ...state,
      selectedProducts: payload,
    }))
    .addCase(PRODUCTS_CREATE_FINISHED_ACTION, (state: any, {payload}: any) => ({
      ...state,
      products_create_response: payload,
      products_create_started: false,
    }))
    .addCase(PRODUCTS_DELETE_FINISHED_ACTION, (state: any, {payload}: any) => ({
      ...state,
      products_delelete_response: payload,
    }))
    .addCase(PRODUCTS_DELETE_FINISHED_CLEAR_ACTION, (state: any, {payload}: any) => ({
      ...state,
      products_delelete_response: {},
    }))
    ,
);
