

import React, {useEffect, useState} from 'react';
//=== DOC https://codesandbox.io/s/github/bvaughn/react-window/tree/master/website/sandboxes/memoized-list-items?file=/index.js:0-2546

import {connect, useDispatch, useSelector} from "react-redux";
import GridMemo from "./GridMemo.js";
import {crud_call} from "../../../system_state/state_old_school/crud_sqlite/crud_call";
import {
    function_AT_CRUD_EXEC,
    function_AT_DISPLAY_ACTION,
    function_AT_SQLITE_DB_OPEN_START
} from "../../../system_state/state_old_school/state_redux/actions_functions";
import {f_read_from_states} from "../../code_global/GlobalFunctions";
import {IS_LOADING} from "../../../system_state/state_old_school/state_redux/actions_types";
import {initialStateStoreType} from "../../../system_state/state_old_school/state_redux/initial_state";

const crud_posts_read = (params:any)=>{

    console.log("=== step_ CRUD action START crud_posts_read ",Date.now())

    params.props.function_AT_CRUD_EXEC({
        database_to_exec: params.props.work_sqlile_database,
        sqlite_api_global_to_exec: params.props.work_sqlite_api_global,
        entity: "content_posts",
        crud_type:'read',
        operation_data:params.operation_data,
        state_data_name: "work_list_content_posts_data",
        state_ready_name: "work_list_content_posts_data_ready"
    })

}

const generate_list_data = (data:any,number_of_columns:any) => {

    console.log('=== generate_list_data data',data)

    if((null === data) || (0 === data.length) ) return []

    const numItems=data.length
    if(0 === numItems) return null

    const res =
        data.map((el:any, ind:any, arr:any) => ({
            item_data: el,
            isActive: false,
            label: el.content_post_title,
            number_of_columns:number_of_columns,
        }));

    console.log('=== generate_list_data res ',res)

    return res
}

// If list items are expensive to render,
// Consider using PureComponent to avoid unnece`ssary re-renders.
// https://reactjs.org/docs/react-api.html#reactpurecomponent

const GridMemoPage =(props:any)=> {

    const i1: any[] = []
    const [state, setState] = useState({
        // items:i1,
        // w1
        number_of_columns:3,
        number_of_rows:0,
        list_data:props.list_data,
    });

    // 1st LOAD
    useEffect(() => {

        if(
            IS_LOADING !== props.work_sqlile_database
            &&
            undefined !== props.work_sqlile_database
        ) {


            if ((!props['work_list_content_posts_data'])) {
                console.log("=== do_crud_posts_read ")
                crud_posts_read(
                    // TODO POSTS +parameter POST_TYPE FOR  user products
                    {
                        props,
                        operation_data: {
                            content_post_owner_guid: '',
                        },
                    }
                )
            }
        }

    },[props.work_sqlile_database, props['work_list_content_posts_data']])

    useEffect(() => {

        console.log("=== array_res work_list_content_posts_data useEffect",props)
        console.log("=== array_res work_list_content_posts_data useEffect state.list_data",state.list_data)

        const tposts = props['work_list_content_posts_data']
        if (state.list_data !== tposts) {
            if (undefined!=tposts) {

                console.log("=== array_res work_list_content_posts_data props",props)
                console.log("=== array_res work_list_content_posts_data tposts",tposts)
                console.log("=== array_res work_list_content_posts_data state.list_data",state.list_data)

                const tnumber_of_columns = state.number_of_columns
                const generated_data = generate_list_data(tposts,tnumber_of_columns)

                const tnumber_of_rows = Math.round(generated_data.length / state.number_of_columns )

                let array_res:any[] = []
                let tindex
                for (let r = 0; r < tnumber_of_rows; r++) {
                    for (let c = 0; c < tnumber_of_columns; c++) {
                        tindex = r * tnumber_of_columns + c
                        console.log("=== array_res tindex",tindex)

                        if(tindex>=generated_data.length){
                            array_res[tindex]={item_is_empty:true}
                        }
                        else{
                            array_res[tindex]={
                                ...{
                                    item_is_empty:false,
                                    dnd_change_order:dnd_change_order,
                                    change_item_data:change_item_data, //!!!!!!!!
                                },
                                ...generated_data[tindex]}
                        }
                    }
                }


                console.log("=== array_res",array_res)
                console.log("=== array_res tnumber_of_rows",tnumber_of_rows)
                console.log("=== array_res tnumber_of_columns",tnumber_of_columns)
                console.log("=== work_list_content_posts_data generated_data",generated_data)
                setState({...state,
                    ...{
                        list_data:array_res,
                        number_of_rows:tnumber_of_rows
                    }
                })
            }
        }

        return () => {

        };
    }, [props]);


    const toggleItemActive = (index:any) =>
        setState(prevState => {
            const item = prevState.list_data[index];
            const new_list_data = prevState.list_data.concat();
            new_list_data[index] = {
                ...item,
                isActive: !item.isActive,
            };
            return {
                ...prevState,
                list_data:new_list_data
            };
        });

    // const global_props = useSelector(state => state as initialStateStoreType)
    // const global_dispatch = useDispatch()

    const redux_data = useSelector(state => state as initialStateStoreType)
    const redux_dispatch = useDispatch()

    const dnd_change_order = (
        params:any
    ) => {
        console.log("=== changeOrder",params)
        console.log("=== changeOrder state",state)
        //NEW CRUD SQL STEP 3 call
        crud_call({redux_data, redux_dispatch,
            entity: "content_posts",
            crud_type:'update_change_order_in_list',
            operation_data:
                {
                    content_post_guid1: params.active_guid,
                    content_post_guid2: params.over_guid,
                    content_post_owner_guid: '',
                },

        })

        setState({...state,...{list_data:params.new_items}})

    }

    const change_item_data = (props:any) => {

        console.log('=== change_item_data props ',props)

        const {index,  field_name,  field_new_value, field_destination}=props

        console.log("=== change_item_data",index,field_new_value)

        const item_changed = props.cell_data.list_data[index]
        console.log("=== item_changed",item_changed)

            //=== item_calc step3
            let el = JSON.parse(item_changed.item_data.content_post_json)

            if(null === el) el={}

            el.quantity=el?.quantity?el.quantity:'0'
            el.unitprice=el?.unitprice?el.unitprice:'0'
            el.amount=el?.amount?el.amount:'0'

                if('unitprice'===field_name){
                        el.amount       = (parseFloat(field_new_value) * parseFloat(el.quantity)).toFixed(2)
                }
                if('quantity'===field_name){
                        el.amount       = (parseFloat(el.unitprice) * parseFloat(field_new_value)).toFixed(2)
                }
                if('amount'===field_name){
                        el.unitprice    = (parseFloat(field_new_value) / parseFloat(el.quantity)).toFixed(2)
                }

            item_changed.item_data.content_post_json = JSON.stringify(el)

        const new_items = props.cell_data.list_data.concat()

        // item_changed['label']=field_new_value
        new_items[index]=item_changed
        setState({...state,...{items:new_items}})

        let toperation_data={}
                if('post'===field_destination) {
                    toperation_data = {

                        [field_name]: field_new_value,
                        content_post_owner_guid: '',
                        content_post_guid: item_changed.item_data.content_post_guid,

                    }
                }

                if('json'===field_destination) {

                    let tjson = JSON.parse(item_changed.item_data.content_post_json)

                    tjson = { ...tjson, [field_name] : field_new_value }

                    toperation_data = {

                        content_post_json: JSON.stringify(tjson),
                        content_post_owner_guid: '',
                        content_post_guid: item_changed.item_data.content_post_guid,

                    }
                }

                crud_call({redux_data, redux_dispatch,
                    entity: "content_posts",
                    crud_type:('json'===field_destination)?'update_json':'update',
                    operation_data:toperation_data,
                })




    };


    return (

        (0===state.number_of_rows)?<div></div>:
            <GridMemo

                // redux_data={redux_data}
                // redux_dispatch={redux_dispatch}
                changes_type={'swap'} // OR shift TODO prefix_ dnd_

                grid_number_of_columns={state.number_of_columns}
                grid_number_of_rows={state.number_of_rows}

                grid_list_data={state.list_data}

                toggleItemActive={toggleItemActive}
                // change_item_data0={change_item_data0}


            />

    );


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

export default connect(ReadFromState_mapStateToProps, WriteToState_mapDispatchToProps)(GridMemoPage);

