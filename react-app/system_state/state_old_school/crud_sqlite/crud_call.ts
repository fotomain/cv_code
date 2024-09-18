

import {AT_CRUD_EXEC} from "../state_redux/actions_types";


export const crud_call = (params:any) => {

    const tparams_to_exec = {

        entity: params.entity, //"content_posts",
        crud_type: params.crud_type, //'update_change_order_in_list',
        operation_data: params.operation_data,

        database_to_exec: params.redux_data.sqlite.work_sqlile_database,
        sqlite_api_global_to_exec: params.redux_data.sqlite.work_sqlite_api_global,
        state_data_name: "work_list_"+params.entity+"_data",
        state_ready_name: "work_list_"+params.entity+"_data_ready"
    }

    // console.log("=== crud_call tparams_to_exec",tparams_to_exec)

    params.redux_dispatch({
        type:AT_CRUD_EXEC,
        status: 'STARTED',
        params_to_exec:tparams_to_exec
    })

}
