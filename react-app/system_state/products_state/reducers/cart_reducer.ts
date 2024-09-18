
import {
    current
} from '@reduxjs/toolkit';

import { createReducer } from '@reduxjs/toolkit';

import {CART_ADD_1UNIT_ACTION} from "../actions";
import {CART_REMOVE_1UNIT_ACTION,} from '../actions';
import {ICartState} from "../models/cart_model";
import {cart_products_from_localStorage} from "../../../system_code/context_globals/globals_context";
import {is_empty} from "../../../system_code/code_global/GlobalFunctions";

                                //CART_ACTION_STEP_3
export const cart_state_initial: ICartState = {
    title: 'Cart data',
    products:(undefined!==cart_products_from_localStorage())?cart_products_from_localStorage():[],
}

                                //CART_ACTION_STEP_9
export default createReducer(cart_state_initial, (builder) =>
  builder
  .addCase(CART_ADD_1UNIT_ACTION, (state:any, { payload }:any ) => {

      if( Array.isArray(payload) ){
          return ({
              ...state,
              products: payload
          })
      }

      const state_now = current(state)
      let new_products: any[]=state_now.products.slice(0)
      console.log('=== cart crud start products ',new_products)

      // state_now.products.forEach((el:any)=>new_products.push(el))
      // console.log('=== state.products ',)
      let new_index =-1
      const modifyElement = new_products.find((el,ii)=> {
          new_index = (el.entity_guid === payload.entity_guid)?ii:new_index
          return el.entity_guid === payload.entity_guid
      })
      const notExist=(-1===new_index)
      const doCreate = (['set_value','plus_value'].indexOf(payload.action_mode)!==-1)
      console.log('=== cart crud payload.action_mode ',payload.action_mode)
      console.log('=== cart crud new_index , doCreate ',new_index,doCreate)

      if(notExist && doCreate){
          // CREATE
          console.log('=== cart crud CREATE ')
          new_products.push({
              entity_guid:      payload.entity_guid,
              cart_quantity:    payload.new_value,
          })
      }else{
          console.log('=== cart crud modifyElement ',modifyElement)

          let el_new={...modifyElement}
            const new_value_plus = parseInt(el_new.cart_quantity) + parseInt(payload.new_value)
                let action_mode=payload.action_mode
                    if(0>=new_value_plus) { action_mode='remove_value' }

          switch (action_mode) {
              // UPDATE + / -
              case 'plus_value': {
                  el_new.cart_quantity=new_value_plus
                  new_products[new_index]=el_new
                  break
              }
              // UPDATE
              case 'set_value': {
                  let el_new={...modifyElement}
                  el_new.cart_quantity=payload.new_value
                  new_products[new_index]=el_new
                  break
              }
              // DELETE
              case 'remove_value': {
                  new_products = new_products.filter((el) => {
                      return el.entity_guid !== payload.entity_guid
                  })
                  break
              }
          } //=== switch
      } //=== else -> Exist

      console.log('=== cart crud new_products ',new_products)

      return ({
          ...state,
          products: new_products
      })

  })
  //CART_ACTION_STEP_5
  .addCase(CART_REMOVE_1UNIT_ACTION, (state:any, { payload }:any ) => ({
    ...state,
      cart_data: payload.new_value,
  }))
  ,
);
