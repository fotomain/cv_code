
// === DOC TIMESTAMP SQLITE strftime('%s', 'now')

import {update_shif_up_sql_text} from "./update_shif_up_sql_text";
import {update_shif_down_sql_text} from "./update_shif_down_sql_text";
import {update_shif_top_sql_text} from "./update_shif_top_sql_text";
import {update_shif_bottom_sql_text} from "./update_shif_bottom_sql_text";
import {create_before_sql_text} from "./create_before_sql_text";
import {create_after_sql_text} from "./create_after_sql_text";
import {create_last_sql_text} from "./create_last_sql_text";
import {create_first_sql_text} from "./create_first_sql_text";
import {update_change_order_in_list_sql_text} from "./update_change_order_in_list_sql_text";


export interface ArrayRequestsType {
    [index1:string]:(string | ((params:any)=>string))
}

export const array_crud_sql_texts_basic : ArrayRequestsType = {}

array_crud_sql_texts_basic['content_posts + read_table_info']=`
        pragma table_info('content_posts')`

array_crud_sql_texts_basic['content_posts + create']=`
            
                    INSERT INTO content_posts (
                        content_post_owner_guid,
                        content_post_title,
                        content_post_guid,
                        order_in_list
                    )
                    VALUES (
                        'content_post_owner_guid_data',
                       'content_post_title_data',
                       'content_post_guid_data',
                   (
    
                       select
    
                           CASE
                               WHEN res_final = 0 OR res_final IS NULL THEN 10000
                               ELSE res_final
                               END
                       FROM
                       (
                           SELECT

                               CASE
                                   WHEN (v1 IS NULL) AND (V2 IS NULL) THEN 10000
                                   WHEN (v1 = V2) THEN V2/2.0
                                   ELSE  (v2+v1)/2.0
                                   END as res_final

                           FROM
                               ( SELECT
                                     (SELECT min(order_in_list) FROM content_posts WHERE content_post_owner_guid = 'content_post_owner_guid_data') as v1,
                                     (SELECT max(order_in_list) FROM content_posts WHERE content_post_owner_guid = 'content_post_owner_guid_data') as v2)
                       )

               )

           );

`
array_crud_sql_texts_basic['content_posts + read']=`
            SELECT * FROM content_posts
                WHERE content_post_owner_guid = 'content_post_owner_guid_data'
                ORDER BY order_in_list ASC 
        `

//new main data -> STEP 5
array_crud_sql_texts_basic['current_device + read']=`
            SELECT * FROM current_device
                
                 
        `


function array_crud_sql_texts_basic_combine(params:any):string {

        // console.log("=== step_ array_crud_sql_texts_basic_combine",params)
        // console.log("=== step_ array_crud_sql_texts_basic_combine operation_data",params.action.params_to_exec.operation_data)

        const operation_data = params.action.params_to_exec.operation_data

        if(operation_data){

                let init_str = `
                UPDATE content_posts
                SET here
            
                WHERE
                    content_post_guid = 'content_post_guid_data' AND
                    content_post_owner_guid = 'content_post_owner_guid_data'
    
            `
                        let replace_str=''
                        Object.entries(operation_data).map((el:any,ii:any)=>{
                                // console.log("=== step_ keys ",el,ii)
                                replace_str=replace_str + el[0]+" = '"+el[1]+"' " + ','
                        })

                                replace_str=replace_str.substring(0,replace_str.length-1)


                        const res = init_str.replace("SET here","SET " + replace_str)
                        // console.log("=== step_ res ",res)

                                return res

        }
        else
        return `
                UPDATE content_posts
                SET
                    content_post_description = 'content_post_description_data',
                    content_post_title = 'content_post_title_data',
                    content_post_content = 'content_post_content_data'
            
                WHERE
                    content_post_guid = 'content_post_guid_data' AND
                    content_post_owner_guid = 'content_post_owner_guid_data'

        `
}

array_crud_sql_texts_basic['content_posts + update']=array_crud_sql_texts_basic_combine;


array_crud_sql_texts_basic['content_posts + update_json']=`
                UPDATE content_posts
                SET
                        content_post_json = 'content_post_json_data'
            
                WHERE
                    content_post_guid = 'content_post_guid_data' AND
                    content_post_owner_guid = 'content_post_owner_guid_data'
        `

array_crud_sql_texts_basic['content_posts + delete']=`
            DELETE FROM content_posts
                WHERE 
                    content_post_guid = 'content_post_guid_data' AND 
                    content_post_owner_guid = 'content_post_owner_guid_data'
        `

array_crud_sql_texts_basic['content_posts + delete_all']=`
            DELETE FROM content_posts
                WHERE content_post_owner_guid = 'content_post_owner_guid_data'
        `

//========= CREATE
array_crud_sql_texts_basic['content_posts + create_first']=create_first_sql_text()

array_crud_sql_texts_basic['content_posts + create_last']=create_last_sql_text()

array_crud_sql_texts_basic['content_posts + create_before']=create_before_sql_text()

array_crud_sql_texts_basic['content_posts + create_after']=create_after_sql_text()


//========= UPDATE

//NEW CRUD SQL STEP 1
array_crud_sql_texts_basic['content_posts + update_change_order_in_list']=update_change_order_in_list_sql_text()

array_crud_sql_texts_basic['content_posts + update_shif_top']=update_shif_top_sql_text()

array_crud_sql_texts_basic['content_posts + update_shif_up']=update_shif_up_sql_text()

array_crud_sql_texts_basic['content_posts + update_shif_down']=update_shif_down_sql_text()

array_crud_sql_texts_basic['content_posts + update_shif_bottom']=update_shif_bottom_sql_text()
