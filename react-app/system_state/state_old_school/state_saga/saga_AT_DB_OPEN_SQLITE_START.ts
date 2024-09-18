import {put, fork, select, takeEvery, takeLatest, call} from 'redux-saga/effects';

import {retDatabase_type1} from '../state_reducers/types'

// import crypto from 'crypto';
import CryptoJS from 'crypto-js';

import {Buffer} from 'buffer';

import {
    AT_DB_OPEN_SQLITE_START,
} from '../state_redux/actions_types';
import global_names from "../state_reducers/global_names";
import uuid1_custom from "./uuid1_custom";
import uuid4_custom from "./uuid4_custom";
import {debug_sqlite} from "../../../App";

// var macaddress = require('macaddress');

const thisFile = "FILE_saga_AT_SQLITE_DB_OPEN_START"


const getDatabaseState = (state: any) => state.work_sqlile_database;

const to_do_function = async (action_to_exec: any) => {
    try {

        console.log('=== to_do_function ' + thisFile, action_to_exec.action.params_to_exec);
        console.log('=== action_to_exec.param_to_exec.sqlite_api_global ', action_to_exec.action.params_to_exec.sqlite_api_global);

        let retDatabase: retDatabase_type1 = {
            // ret_data_constants:{},
            ret_database: '', ret_sqlite_api_global:'', ret_code: 'ERROR'}

        // const monent = (Date.now()).toString();

        let handle_sqlite = action_to_exec.action.params_to_exec.sqlite_api_global;

        const ret_isDatabase = await handle_sqlite.isDatabase(global_names.db_work).then((res_isDatabase:any)=>{
            // alert("=== res_isDatabase "+JSON.stringify(res_isDatabase))
            return res_isDatabase.result
        })
        if (!ret_isDatabase) {
            if(debug_sqlite) alert("=== copyFromAssets ")
            await handle_sqlite.copyFromAssets()


                console.log('=== handle_sqlite.copyFromAssets then - ' + thisFile);
                let t_Database = await handle_sqlite.createConnection(global_names.db_work);
                await t_Database.open()
                // console.log("=== t_Database t_Database.open() ", t_Database);

                const new_device_guid = uuid4_custom()
                // console.log("=== t_Database device_guid 555 ", new_device_guid);


                    let query_insert = `
                                        INSERT INTO current_device (
                                            content_post_guid,
                                            content_post_content
                                        )
                                        VALUES (
                                                   'device_guid',
                                                   '`+new_device_guid+`'
                                               );
                                    `



                     // let cc = t_Database.cursor()
                     await t_Database.execute(query_insert).then( (res:any)=> {
                        console.log('=== t_Database query_insert OK ',res)
                        // alert('=== t_Database query_insert OK '+JSON.stringify(res))

                        });

                     await t_Database.close()

        }
            // alert("=== go after copyFromAssets")

                let t_Database = await handle_sqlite.createConnection(global_names.db_work);
                await t_Database.open()

                var res_device_guid =''

                    let query_select = `
                                        SELECT * FROM current_device WHERE content_post_guid='device_guid'
                                    `
                    await t_Database.query(query_select).then( (res:any)=> {
                        console.log('=== t_Database query_select1 OK ',res)
                        res_device_guid = res.values[0].content_post_content
                        console.log('=== t_Database query_select1 res.value[0].content_post_content',res_device_guid)

                        // alert('=== t_Database query_select OK '+JSON.stringify(res))
                    }).catch((error:any)=>{
                        // alert('=== t_Database error1888 '+JSON.stringify(error))
                        // console.log('=== t_Database error1888 ',error)

                    })



                    console.log('=== t_Database thisFile ' + thisFile, t_Database);
                    retDatabase.ret_database = t_Database;
                    retDatabase.ret_sqlite_api_global = handle_sqlite;
                    // retDatabase.ret_data_constants = {sqlinte_device_guid:res_device_guid}; // constant data with db handler
                    retDatabase.ret_code = "OK"
                    return retDatabase;

    }
    catch (e) {
        alert("=== ERROR to_do_function "+thisFile + e)
        console.error("=== ERROR to_do_function "+thisFile,e)
    }

}

export function* exec_function(action: any) {

    console.log("=== exec_function " + thisFile)

    try {

         const work_sqlile_database:object = yield select(getDatabaseState);

            console.log("=== work_sqlile_database " +thisFile)
            console.log(work_sqlile_database)

         console.log("=== yield select database ", work_sqlile_database)
         if (!work_sqlile_database) {
            const response: retDatabase_type1 = yield call(to_do_function, {action})
            console.log("=== response yield call " + thisFile)
            console.log(response)

            const actionToPut = action

            actionToPut.type = action.type.replace("_START", "_SUCCESS")
            actionToPut.ret_database = response.ret_database;
            actionToPut.ret_sqlite_api_global = response.ret_sqlite_api_global;
            // actionToPut.ret_data_constants = response.ret_data_constants;
            actionToPut.status = 'SUCCESS';

            yield put(
                actionToPut
            );

        } else {
            console.warn('=== work_sqlile_database already open, ignoring open request.');
        }

    } catch (e) {
        // yield put(setDatabaseError(error));
        console.error("=== ERROR exec_function "+thisFile,e)
    }

}


export function* watch_function(params: any) {

    console.log("=== watch_function " + thisFile)
    console.log(params)

    yield  (takeLatest(AT_DB_OPEN_SQLITE_START, exec_function));

}

export default function* () {

    console.log(" ")
    console.log(" ")
    console.log(" ")

    console.log("=== saga_function " + thisFile)
    // console.log( action )

    // SAGA CALL - RUN WATCHER
    // yield call(watch_function, {p_params: 'here params_of_watchF_CALL_SAGA3'})
    yield call(watch_function, {p_params: 'here params_of_watchF_CALL_SAGA3'})

}
