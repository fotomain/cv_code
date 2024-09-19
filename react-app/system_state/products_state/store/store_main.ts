import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
// npm i --save redux-logger
// npm i yup
import logger from 'redux-logger';
import { root_reducer } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import root_saga from '../sagas/root_saga';
import {CART_ADD_1UNIT_ACTION} from "../actions";
import {JSON_stringify} from "../../../system_code/code_global/GlobalFunctions";
import React from "react";
import {GlobalsContext} from "../../context_globals/globals_context";

const sagaMiddleware = createSagaMiddleware();

const listenerMiddleware = createListenerMiddleware()

// const { global_props,global_dispatch } = React.useContext(GlobalsContext);


listenerMiddleware.startListening({
    //=== https://redux-toolkit.js.org/api/createListenerMiddleware
    actionCreator: CART_ADD_1UNIT_ACTION,
    effect: async (action, listenerApi) => {
        // console.log('=== cart action',action)
        // console.log('=== cart listenerApi',listenerApi.getState())

        // localStorage.setItem('app888_cart',JSON_stringify(listenerApi.getState()))
        let state_value:any = listenerApi.getState()
        console.log('=== cart state_value',state_value)

        localStorage.setItem('app888_cart',JSON_stringify(state_value.cart_state))

    }})

// @ts-ignore
const store_main = configureStore({
  reducer: root_reducer,
  middleware: (getDefaultMiddleware:any) =>
    getDefaultMiddleware({
      serializableCheck:false //pass fundtions into saga for cancel axios
    //000 }).prepend(sagaMiddleware).concat(logger),
    }).prepend(sagaMiddleware).prepend(listenerMiddleware.middleware).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',

});

sagaMiddleware.run(root_saga);

export default store_main
