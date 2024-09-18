

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, {ChangeEvent, useEffect, useRef, useState} from "react";

import {
    function_AT_CRUD_EXEC,
    function_AT_DISPLAY_ACTION,
    function_AT_SQLITE_DB_OPEN_START
} from "./system_state/state_old_school/state_redux/actions_functions";
import {connect} from "react-redux";

import {SQLiteHook, useSQLite} from "react-sqlite-hook";
import {AT_CRUD_EXEC, IS_LOADING} from "./system_state/state_old_school/state_redux/actions_types";


import {f_read_from_states, is_empty} from "./system_code/code_global/GlobalFunctions";
import {crud_exec_function} from "./system_state/state_old_school/state_saga/crud_exec_function";


import {GlobalsContext} from "./system_code/context_globals/globals_context";
import global_names from "./system_state/state_old_school/state_reducers/global_names";

import AppInitTheme from "./AppInitTheme";
import AppInitRouter from "./AppInitRouter";

import {css_column_center} from "./ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";
import SpinnerFast from "./business/products/products_catalog_grid/SpinnerFast";

interface JsonListenerInterface {
    jsonListeners: boolean,
    setJsonListeners: React.Dispatch<React.SetStateAction<boolean>>,
}
interface existingConnInterface {
    existConn: boolean,
    setExistConn: React.Dispatch<React.SetStateAction<boolean>>,
}

// Singleton SQLite Hook
export let sqlite_api: SQLiteHook;
export let sqlite_api_global: SQLiteHook;
// Existing Connections Store
export let existingConn: existingConnInterface;
// Is Json Listeners used
export let isJsonListeners: JsonListenerInterface;
// mysettigs -

const AppInitLocalDatabase: React.FC = (props:any) => {


    //mysettigs +

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const message = useRef("");
    const [isModal,setIsModal] = useState(false);

    const onProgressImport = async (progress: string) => {
        if(isJsonListeners.jsonListeners) {
            if(!isModal) setIsModal(true);
            message.current = message.current.concat(`${progress}\n`);
        }
    }
    const onProgressExport = async (progress: string) => {
        if(isJsonListeners.jsonListeners) {
            if(!isModal) setIsModal(true);
            message.current = message.current.concat(`${progress}\n`);
        }
    }

    sqlite_api_global = useSQLite({
        onProgressImport,
        onProgressExport
    })

    useEffect(() => {

        if(props.function_AT_SQLITE_DB_OPEN_START) {
            console.log("=== step_ db function_AT_SQLITE_DB_OPEN_START === YES")
            props.function_AT_SQLITE_DB_OPEN_START({

                sqlite_api_global: sqlite_api_global,
                database_name: global_names.db_work

            })
        }
        else{
            console.log("=== step_ db function_AT_SQLITE_DB_OPEN_START === NOT")
        }
        console.log("=== AppInitLocalDatabase work_sqlile_database START ")

    },[props.function_AT_SQLITE_DB_OPEN_START])



    useEffect(() => {

        console.log("=== step_ db useEffect props.work_sqlile_database ")
        console.log("=== step_ db props.work_list_content_posts_data ",props.work_list_content_posts_data)


        if(
            null !== props.work_sqlile_database
            &&
            IS_LOADING !== props.work_sqlile_database
        ) {

            console.log("=== store_main AppInitLocalDatabase work_sqlile_database FINISH OK! ",props.work_sqlile_database)



            if(!props.work_list_current_device_data_ready){

                props.function_AT_CRUD_EXEC({
                    database_to_exec: props.work_sqlile_database,
                    sqlite_api_global_to_exec: props.work_sqlite_api_global,
                    entity: "current_device",
                    crud_type:'read',
                    state_data_name: "work_list_current_device_data",
                    state_ready_name: "work_list_current_device_data_ready"
                })

            } else {
                console.log('=== work_list_current_device_ready OK',props.work_list_current_device_data_ready)

                // sqlite constants -> react Context
                const tdevice_guid = props.work_list_current_device_data.filter((el:any)=>{
                    return 'device_guid'===el.content_post_guid
                })
                if(tdevice_guid?.length!==0) {
                    console.log('=== work_list_current_device_ready OK', tdevice_guid)

                    const tdata = global_props
                    tdata.current_device.settings.device_guid = tdevice_guid[0].content_post_content
                    tdata.system.runtime='001-device_guid'
                    global_dispatch({
                        type: 'SETTER_GLOBALPROPS',
                        global_new_data:{global_props:tdata},
                    })
                }


            }

        }


        return () => {

        };
    },[props.work_sqlile_database,props])


    const crud_posts_create = (params:any)=>{
        console.log("=== store_main crud_posts_read ",Date.now())

        props.function_AT_CRUD_EXEC({
            database_to_exec: props.work_sqlile_database,
            sqlite_api_global_to_exec: props.work_sqlite_api_global,
            entity: "content_posts",
            crud_type:'create',
            operation_data:params.operation_data,
            //TODO - NEW VARs + return 1eL IN THEM
            state_data_name: "work_list_content_posts_data",
            state_ready_name: "work_list_content_posts_data_ready"
            // state_data_name: "new_post_created",
            // state_ready_name: "new_post_created_ready"
        })

    }

    const refresh_user_work_data = (params:any)=>{
        console.log("=== state1 refresh_user_work_data")
        crud_posts_read (params)
    }

    const crud_posts_update = (params:any)=> {

        console.log("=== step_ CRUD params", params)

        console.log("=== step_ CRUD action START crud_posts_update ", Date.now())
        console.log("=== step_ CRUD params.crud.update_and_display_mode", params.crud.update_and_display_mode)

        // if(crud.update_mode = update_modes.direct)
        //      focus of input will be stay in  - becouse NO re-render of window
        // if(crud.update_mode = update_modes.via_redux)
        //      focus of input will be lost - becouse re-render of  all window
        if ('minimalistic'==params.crud.update_and_display_mode){
            console.log('=== minimalistic')
            const tparams = {
                        action: {
                            type: AT_CRUD_EXEC,
                            params_to_exec:
                                {
                                    database_to_exec: props.work_sqlile_database,
                                    sqlite_api_global_to_exec: props.work_sqlite_api_global,
                                    entity: "content_posts",
                                    crud_type: 'update',
                                    operation_data: params.operation_data,
                                    state_data_name: "work_list_content_posts_data",
                                    state_ready_name: "work_list_content_posts_data_ready"
                                }
                        }
                    }

                const ret_crud_exec_function = crud_exec_function(tparams)
                console.log("=== ret_crud_exec_function ", ret_crud_exec_function)
            }

        if ('maximalistic'==params.crud.update_and_display_mode) {
            console.log('=== maximalistic',Date.now(),props.work_sqlile_database)
            props.function_AT_CRUD_EXEC({
                database_to_exec: props.work_sqlile_database,
                sqlite_api_global_to_exec: props.work_sqlite_api_global,
                entity: "content_posts",
                crud_type: 'update',
                operation_data: params.operation_data,
                state_data_name: "work_list_content_posts_data",
                state_ready_name: "work_list_content_posts_data_ready"
            })
        }

    }

    const crud_posts_delete = (params:any)=>{

        console.log("=== step_ CRUD action START crud_posts_delete ",Date.now())

        props.function_AT_CRUD_EXEC({
            database_to_exec: props.work_sqlile_database,
            sqlite_api_global_to_exec: props.work_sqlite_api_global,
            entity: "content_posts",
            crud_type:'delete',
            operation_data:params.operation_data,
            state_data_name: "work_list_content_posts_data",
            state_ready_name: "work_list_content_posts_data_ready"
        })

    }

    const crud_posts_delete_all = (params:any)=>{

        console.log("=== step_ CRUD action START crud_posts_delete_all ",Date.now())

        props.function_AT_CRUD_EXEC({
            database_to_exec: props.work_sqlile_database,
            sqlite_api_global_to_exec: props.work_sqlite_api_global,
            entity: "content_posts",
            crud_type:'delete_all',
            operation_data:params.operation_data,
            state_data_name: "work_list_content_posts_data",
            state_ready_name: "work_list_content_posts_data_ready"
        })

    }
    const crud_posts_read = (params:any)=>{

        console.log("=== step_ CRUD action START crud_posts_read ",Date.now())

        props.function_AT_CRUD_EXEC({
            database_to_exec: props.work_sqlile_database,
            sqlite_api_global_to_exec: props.work_sqlite_api_global,
            entity: "content_posts",
            crud_type:'read',
            operation_data:params.operation_data,
            state_data_name: "work_list_content_posts_data",
            state_ready_name: "work_list_content_posts_data_ready"
        })

    }


    console.log("=== props.work_list_content_posts_data  ",props.work_list_content_posts_data)

    const [input_value, set_input_value] = useState('');
    const [state, set_state] = useState({
        local_refresh_moment:0,
        test1_field:'text1',
        test2_field:'New App Titile'
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 👇 Store the input value to local state
        if(input_value!==e.target.value) {

            set_state(
                {
                    ...state,
                    [e.target.name]: e.target.value,
                }
            );

            const toperation_data = {

                content_post_description: 'Description +++' + Date.now(),

                    content_post_title: e.target.value,
                    // 'Post +++ '+Date.now(),
                    content_post_content: 'Content ' + Date.now(),

                    content_post_owner_guid: '',
                    content_post_guid: '111',

            }

            props.function_AT_CRUD_EXEC({
                database_to_exec: props.work_sqlile_database,
                sqlite_api_global_to_exec: props.work_sqlite_api_global,
                entity: "content_posts",
                crud_type: 'update',
                operation_data: toperation_data,
                state_data_name: "work_list_content_posts_data",
                state_ready_name: "work_list_content_posts_data_ready"
            })

        }
    }

    // sss1
    return(
        <>
            {(!props.work_sqlile_database || (is_empty(global_props.current_device.settings.device_guid,'global_props.current_device.settings.device_guid')))
                // <p>Data loading...</p>:
                ?
                <div css={css` padding-top: 45vh; width: 100%; ${css_column_center} `}>
                    <SpinnerFast no_bottom_space={'true'} />
                </div>
                :
                <AppInitTheme>
                    <AppInitRouter />
                </AppInitTheme>


            }

        </>
    )

}

const ReadFromState_mapStateToProps = (state:any) =>
{

    console.log("=== ReadFromState_mapStateToProps")
    console.log(state)

    console.log("=== Tab3Container")
    console.log(state)

    let ret1 = f_read_from_states({state:state})
    console.log("=== Tab3Container ret1 ",ret1)

    let ret2 = {...ret1,

        //new main data -> STEP 4
        work_list_current_device_data:   state.sqlite.work_list_current_device_data,
        work_list_current_device_data_ready:  state.sqlite.work_list_current_device_data_ready,

        work_list_content_posts_data:   state.sqlite.work_list_content_posts_data,
        work_list_content_posts_data_ready:  state.sqlite.work_list_content_posts_data_ready,

        work_sqlile_database:   state.sqlite.work_sqlile_database,
        work_sqlite_api_global: state.sqlite.work_sqlite_api_global,
    }
    console.log("=== Tab3Container ret2 ",ret2)
    return ret2
}

const WriteToState_mapDispatchToProps = {
    function_AT_SQLITE_DB_OPEN_START:function_AT_SQLITE_DB_OPEN_START,
    function_AT_DISPLAY_ACTION:function_AT_DISPLAY_ACTION,

    function_AT_CRUD_EXEC:function_AT_CRUD_EXEC,
}

export default connect(ReadFromState_mapStateToProps, WriteToState_mapDispatchToProps)(AppInitLocalDatabase)
