
const crud_operation = (params:any)=>{

    console.log("=== store_main crud_operation ",params)

    //TODO -> crud_call
    params.function_AT_CRUD_EXEC({
        database_to_exec: params.work_sqlile_database,
        sqlite_api_global_to_exec: params.work_sqlite_api_global,
        entity: params.entity, // "content_posts",
        crud_type: params.crud_type, // 'create',
        operation_data:params.operation_data,
        //TODO - NEW VARs + return 1eL IN THEM
        state_data_name: params.state_data_name,
        state_ready_name: params.state_ready_name,
    })

}

export default crud_operation
