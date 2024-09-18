
import crud_operation from "./crud_operation";

const crud_posts_create = (params:any)=>{

    console.log("=== crud_posts_create ",Date.now())

    crud_operation({
        ...params,
        // redux_data:params.redux_data, redux_dispatch:params.redux_dispatch,
        // operation_data:params.operation_data,
        ...{
            entity: "content_posts", crud_type:'create',
            state_data_name: 'work_list_content_posts_data',
            state_ready_name: 'work_list_content_posts_data_ready',
        },
    })

}

export {crud_posts_create}
