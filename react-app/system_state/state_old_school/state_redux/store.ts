
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';

import sagas_all_set     from './sagas_all';
import reducers_all_set     from './reducers_all';



//=== need for window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ +.....
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const f_store = (initialState:any) => {

  // const sagaMiddleWare = createSagaMiddleware();
  //
  // const configStore = createStore(reducers_all_set(),applyMiddleware(sagaMiddleWare));
  // sagas_all_set.map(sagaMiddleWare.run);
  // return configStore;

  // ==================
  // ==================
  // ==================
  // ==================
  // ==================


  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));

  const store = createStore(
    reducers_all_set(), //!!! use as function
    initialState,
    enhancers
  );

  sagas_all_set.map(sagaMiddleware.run);
  return store;


}

export default f_store
