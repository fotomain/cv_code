


// select v2+v1 from
// (select
// (select min(order_in_list) from content_posts) as v1,
//     (select max(order_in_list) from content_posts) as v2)

import {put, fork, select, takeEvery, takeLatest, call} from 'redux-saga/effects';


import {
    AT_CRUD_EXEC, IS_LOADING,
} from '../state_redux/actions_types';
import {key} from "ionicons/icons";
import {CapacitorSQLite, SQLiteConnection} from "@capacitor-community/sqlite";
import {array_crud_sql_texts_basic} from "../crud_sqlite/crud_sqlite_texts/crud_sql_texts";
import {crud_exec_function} from "./crud_exec_function";

const thisFile = "FILE_saga_AT_CRUD_EXEC"

// const getDatabaseState = (state: any) => state.work_sqlile_database;


export function* exec_function(action: any) {

    console.log("=== exec_function " + thisFile)

    try {

            const response:any[] = yield call(crud_exec_function, {action})
            console.log("=== response yield call thisFile", thisFile)
            console.log("=== response yield call action ",action)
            console.log("=== response yield call response", response)


            if (response) {
                const actionToPut = action

                actionToPut.type = action.type + "_SUCCESS"
                actionToPut.ret_data = response.values;
                actionToPut.status = 'SUCCESS';

                yield put(
                    actionToPut
                );

                // actionToPut.type = action.type
                // actionToPut.action.params_to_exec.crud_type = 'read'
                // actionToPut.status = 'STARTED';
                //
                // yield put(
                //     actionToPut
                // );

            }


    } catch (e) {
        // yield put(setDatabaseError(error));
        console.error("=== ERROR exec_function "+thisFile,e)
    }

}

export function* watch_function(params: any) {

    console.log("=== watch_function " + thisFile)
    console.log(params)

    // takeEvery -> for each call !!!
    yield  (takeEvery(AT_CRUD_EXEC, exec_function));

}

export default function* () {

    console.log(" ")
    console.log(" ")
    console.log(" ")

    console.log("=== saga_function " + thisFile)
    // console.log( action )

    // SAGA CALL - RUN WATCHER
    yield call(watch_function, {p_params: 'here params_of_watch'+thisFile})

}
