
import { combineReducers } from 'redux';

import sqite_crud_reducer from '../state_reducers/sqite_crud_reducer';
import display_reducer from "../state_reducers/display_reducer";

function f_reducers_all() {
    console.log("=== FILE reducers_all "+Date.now())

    const AllRedusersObject = {

        //=== example ['cat1']:   select_fetch_reducer,
        'sqlite':   sqite_crud_reducer,
        'display':   display_reducer,

    }

    console.log("=== f_reducers_all")
    console.log(AllRedusersObject)

    return combineReducers( AllRedusersObject );
}

export default f_reducers_all;
