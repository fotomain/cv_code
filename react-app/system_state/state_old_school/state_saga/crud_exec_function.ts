
import {IS_LOADING} from "../state_redux/actions_types";
import {array_crud_sql_texts_basic} from "../crud_sqlite/crud_sqlite_texts/crud_sql_texts";

const thisFile = "FILE_crud_exec_function"

export const crud_exec_function = async (action_to_exec: any) => {
    try {

        console.log('=== step_ exec_function_crud ' + thisFile );
        console.log('=== step_ exec_function_crud action_to_exec ', action_to_exec );
        console.log('=== step_ exec_function_crud params_to_exec ', action_to_exec.action.params_to_exec );
        console.log('=== entity ', action_to_exec.action.params_to_exec.entity );

        // const t_entity = action_to_exec.action.params_to_exec.entity

        let database1  = action_to_exec.action.params_to_exec.database_to_exec

        if((IS_LOADING===database1) || (null===database1)){
            console.log("=== step_ database1 READY NOT  !!!",database1,action_to_exec)
            return
        }
        else{
            console.log("=== step_ database1 READY YES !!!",database1,action_to_exec)
        }

        //=== DOC PRAGMA temp_store = 2; /* 2 means use in-memory */
        let f_pre_sql = await database1.query( "PRAGMA case_sensitive_like = 1" )

        const td = action_to_exec.action.params_to_exec

        //     content_post_owner_guid,
        //     content_type_guid,
        //     content_post_binary,
        //     order_in_list,
        //     content_post_json,
        //     content_post_source {url:, file:,
        //     content_post_description,
        //     content_post_content

        // 'content_post_owner_guid',
        //     'content_type_guid',
        //     'content_post_json',
        //     'content_post_binary',
        //     'content_post_url_source',
        //     'content_post_description',
        //     'order_in_list',
        //     'content_post_content'

        let array_crud_sql_texts = array_crud_sql_texts_basic
        let tsql_request_handle = array_crud_sql_texts[td.entity+' + '+td.crud_type]
        let tsql_request=''

            if("function" === typeof tsql_request_handle)
                tsql_request = tsql_request_handle(action_to_exec)
            else
                tsql_request = tsql_request_handle

        let tsql_request_read_handle = array_crud_sql_texts[td.entity+' + read']
        let tsql_request_read = ''
            if("function" === typeof tsql_request_read_handle)
                tsql_request_read = tsql_request_read_handle(action_to_exec)
            else
                tsql_request_read = tsql_request_read_handle

        console.log("=== step_ val_ sql_request",tsql_request)
        console.log("=== step_ val_ sql_request operation_data ",td.operation_data)
        console.log("=== step_ val_ tsql_request_read ",tsql_request_read)

        if(!tsql_request){
            alert('=== ERROR !tsql_request - '+JSON.stringify(td) + tsql_request)
            return
        }

        if(td.operation_data) {
            Object.keys(td.operation_data).forEach(key_ => {
                const val_ = td.operation_data[key_]
                tsql_request = tsql_request.replaceAll(key_ + '_data', val_)
                // if(''==val_ || null==val_ ){
                //     tsql_request_read = tsql_request_read.replaceAll(key_+'_data','')
                // }else{
                tsql_request_read = tsql_request_read.replaceAll(key_ + '_data', val_)
                // }

                console.log("=== tsql_request val_ key_ ", key_)
                // console.log("=== tsql_request val_ key_ ", key_, val_,tsql_request)
            })
        }

            console.log("=== step_ sql_request0",tsql_request)

            const sql_command_type = (param_crud_type:string,param_sql:string) => {
                if(
                    'read' === param_crud_type.substring(0,4)
                ){
                    console.log("=== !!! QUERY   sql_command_type =database1.query'",sql_command_type)
                    return database1.query(param_sql)
                }
                else {
                    console.log("=== !!! EXECUTE sql_command_type =database1.execute'",sql_command_type)
                    return database1.execute(param_sql)
                }

            }

            const res_sql_command: any = await sql_command_type(td.crud_type,tsql_request)
                .then((tRES:any) => {

                    let ret_data ={do_read:false,result_data:{}}

                    if( td.crud_type && 'read' != td.crud_type.substring(0,4)){
                        console.log("=== saveToStore",td.crud_type)
                        action_to_exec.action.params_to_exec.sqlite_api_global_to_exec.saveToStore(database1.dbName)

                        ret_data={...ret_data, do_read:('read' === td.crud_type)}

                    }
                    // window.alert('=== val_ ret_saveToStore' + ret_saveToStore.toString() )
                    // window.alert('=== val_ Executed SQL tsql_request'+ JSON.stringify(tRES) )
                    console.log('=== val_ Executed SQL tsql_request ret_data' , (tRES) )

                    // !!!!!!!!!  TODO ARRAY RETURN

                    // if('read' == td.crud_type)
                    ret_data = {...ret_data,result_data:tRES}
                    return ret_data
                    // return {values:tRES}
                })
                .catch((e:any) => {
                    window.alert('=== val_ ERR1  tsql_request ' + JSON.stringify(e) + ' - ' + (tsql_request) )
                    console.error('=== val_ ERR1  e',e )
                    console.log('=== val_ ERR1  tsql_request' + JSON.stringify(e) )
                    return {ret_code:'ERR'}
                });

            // let tRES= await database1.query( tsql_request )
            //
            console.log("=== res_sql_command",res_sql_command)

            if(!res_sql_command.do_read) return res_sql_command.result_data
            else{
                const res_sql_command_read: any = await sql_command_type('read',tsql_request_read)
                    .then((tRES_read:any) => {
                        console.log('=== val_ Executed SQL tsql_request_read tRES_read ' , tRES_read )
                        return tRES_read
                    })
                    .catch((e:any) => {
                        window.alert('=== val_ ERR2  tsql_request ' + JSON.stringify(e) + ' - ' + (tsql_request) )
                        console.error('=== val_ ERR2  tsql_request' + JSON.stringify(e) )
                        return {ret_code:'ERR'}
                    });
                return  res_sql_command_read

            }



        // let tSQL = ""
        // switch (t_entity) {
        //     //new main data -> STEP 8
        //     case 'content_types':
        //         tSQL = "" +
        //             "SELECT * FROM content_types "
        //         break
        //     case 'content_posts':
        //         tSQL = "" +
        //             "SELECT * FROM content_posts "
        //         break
        // }
        //
        //
        // let tRES= await database1.query( tSQL )
        //
        // console.log("=== tRES.values",tRES.values)
        //
        // return tRES


    }
    catch (e) {
        alert("=== ERROR exec_function_crud "+thisFile + e)
        console.error("=== ERROR exec_function_crud "+thisFile,e)
    }

}
