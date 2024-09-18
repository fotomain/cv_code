import {
    IS_LOADING,
    AT_CRUD_EXEC,
    AT_CRUD_EXEC_SUCCESS,
    AT_CRUD_READ_GLOBAL_SQLITE_START,
    AT_CRUD_READ_GLOBAL_SQLITE_SUCCESS,
    AT_DB_OPEN_SQLITE_START,
    AT_DB_OPEN_SQLITE_SUCCESS,

} from '../state_redux/actions_types';

import {initialState} from '../state_redux/initial_state';
import {interface_state} from "./global_var";

const thisFile = "FILE_sqite_reducer_crud"

export default (state = initialState, action:any) => {
    const debug1 = 0;
    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log("=== REDUCER "+ thisFile + Date.now())


    let initVal=0;
    let tState : interface_state = {}
    console.log( "=== state sqite_crud_reducer ", state)
    Object.entries( state ).reduce((ind:any, el)=>{

            if(-1==["1","2","3","4","5","6","7","8","9","0"].indexOf(el[0].toString().substring(0,1))){
                // console.log("=== ret1 " + cEl[0] )
                // console.log("=== crud el state  ", el)

                if(-1==[
                    "work_sqlile_database",
                    "work_sqlite_api_global",

                    //new main data -> STEP 7
                    "work_list_content_types_data",
                    "work_list_content_types_ready",
                    "work_list_content_posts_data",
                    "work_list_content_posts_data_ready",
                    "work_list_content_posts_info",
                    "work_list_content_posts_info_ready",

                    "work_List1_data",
                    "work_List1_ready",
                ].indexOf(el[0])){
                    //contunue
                }else {
                    tState[el[0]] = el[1]
                }
            }
        },
        initVal
    )

    console.log("=== tState ", tState)


    if(AT_DB_OPEN_SQLITE_START == action.type ) {

        // console.log("=== action START ",action)

        const ret = {
            ...tState,
            ['work_sqlile_database']: IS_LOADING,
            ['work_sqlite_api_global']: action.params_to_exec.sqlite_api_global,
        }

        return ret;
    }

    if(AT_DB_OPEN_SQLITE_SUCCESS == action.type ) {
        console.log("=== if AT_SQLITE_DB_OPEN_SUCCESS ", action)
        const ret = {
            ...tState,
            ['work_sqlile_database']: action.ret_database,

        }

        return ret;
    }

    if(AT_CRUD_READ_GLOBAL_SQLITE_START == action.type ) {
        const ret = {
            ...tState,
            ['work_List1_data']: IS_LOADING,
            ['work_List1_ready']: false,

        }

        return ret;
    }

    if(AT_CRUD_EXEC == action.type ) {

        console.log("=== AT_CRUD_EXEC reducer action", action)

        const ret = {
            ...tState,
            //new main data -> STEP 3
            [action.state_data_name]: IS_LOADING,
            [action.state_ready_name]: false,

        }

        return ret;
    }

    if(AT_CRUD_EXEC_SUCCESS == action.type ) {
        console.log("=== AT_CRUD_READ_SUCCESS action ", action)
        console.log("=== AT_CRUD_READ_SUCCESS action.params_to_exec.state_data_name ", action.params_to_exec.state_data_name)
        console.log("=== AT_CRUD_READ_SUCCESS action.params_to_exec.state_ready_name ", action.params_to_exec.state_ready_name)
        console.log("=== AT_CRUD_READ_SUCCESS action.ret_data.ret_data ", action.ret_data)
        // console.log("=== AT_CRUD_READ_SUCCESS action.ret_data.length ", action.ret_data?.length)

        // const is_readed = action.ret_data && action.ret_data.length>0
        const is_readed = !(action.ret_data?.ret_code=='ERR')

        const ret = {
            ...tState,
            //new main data -> STEP 3
            [action.params_to_exec.state_data_name]:    action.ret_data,
            [action.params_to_exec.state_ready_name]:   is_readed //Date.now(),
        }

        console.log("=== step_ CRUD action FINISH  ", action)


        return ret;
    }

    if(AT_CRUD_READ_GLOBAL_SQLITE_SUCCESS == action.type ) {

        // console.log("=== if AT_SQLITE_MAIN_DATA_READ_SUCCESS ", action)
        // alert("=== if AT_SQLITE_MAIN_DATA_READ_SUCCESS action.ret_data_to_state " + JSON.stringify(action.ret_data_to_state))
        const ret = {
            ...tState,
            ['work_List1_data']:    action.ret_data_to_state,
            ['work_List1_ready']:   true,

        }
        return ret;
    }

    return state;
}
