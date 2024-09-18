
import { StateFromReducersMapObject } from '@reduxjs/toolkit';

import product_state_reducer, { product_state_initial } from './product_reducer';
import app, { appInitialState } from './app_reducer';
//CART_ACTION_STEP_8
import cart_state_reducer, { cart_state_initial } from './cart_reducer';

export const root_reducer = {
  product_state:product_state_reducer,
  //CART_ACTION_STEP_10
  cart_state:cart_state_reducer,
  app,
};

export type TAppState = StateFromReducersMapObject<typeof root_reducer>;
export type TStoreState = TAppState;

export const root_reducer_initial_state: TStoreState = {
  app: appInitialState,
  product_state: product_state_initial,
  //CART_ACTION_STEP_7
  cart_state: cart_state_initial,
};
