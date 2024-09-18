

// taskkill /f /im node.exe
// npm cache clean --force

import React, {useEffect, useMemo, useRef, useState} from 'react'

import {useDispatch, useSelector} from "react-redux";

import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// === DOC MUI https://stackblitz.com/edit/tanstack-table-m7dgcd?file=src%2Fmain.tsx&preset=node
// === DOC EDIT https://stackblitz.com/edit/tanstack-table-m7dgcd?file=src%2Fmain.tsx&preset=node
// === DOC TS https://dev.to/esponges/create-a-reusable-react-table-component-with-typescript-56d4


import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    RowData,
    FilterFn,
    getSortedRowModel,
    getExpandedRowModel,
    Row,
    ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'

import {TTableLine} from './inner/table_types'

import {
    SEL_MEMO_DATA,
    SEL_PRODUCTS_CREATE_FINISHED,
    SEL_PRODUCTS_CREATE_STARTED,
    SEL_PRODUCTS_DELETE_FINISHED,
    SEL_PRODUCTS_DELETE_RESPONSE,
    SEL_PRODUCTS_DELETE_STARTED, SEL_PRODUCTS_FIRST_ACCESS,
    SEL_PRODUCTS_READ,
    SEL_PRODUCTS_READ_FINISHED,
    SEL_PRODUCTS_READ_STARTED, SEL_YESNO_WINDOW_DATA,

} from "../../../system_state/products_state/selectors";
import {
    MEMO_DATA_ACTION,
    PRODUCTS_CREATE_RUN_ACTION,
    PRODUCTS_DELETE_RUN_ACTION,
    PRODUCTS_READ_RUN_ACTION,
    PRODUCTS_SET_SELECTED_ACTION,
    PRODUCTS_UPDATE_RUN_ACTION, PROGRESS_DIALOG_OPEN_ACTION,
    YESNO_DIALOG_OPEN_ACTION,
} from "../../../system_state/products_state/actions";
import {TProduct, WooDeleteParams, WooUpdateParams2} from "../../../system_state/products_state/models";

import {compareItems, RankingInfo} from "@tanstack/match-sorter-utils";

import FilterForColumn, { fuzzyFilter } from "./inner/table_filter_column";

import {tw_col_center, tw_col_left, tw_row_center, tw_row_left} from "../../../system_code/tw/tw_tools";
import RT_ToolbarCRUD from "./inner/RT_ToolbarCRUD";
import {add_zeros, JSON_stringify, mui_width_in, muiWidth} from "../../../system_code/code_global/GlobalFunctions";
import {col_ctatic, get_rows_selected, useSkipper} from "./products_table_definitions";
import TableCRUDVisual from "./TableCRUDVisual";
import YesNoDeleteProducts from "./modal/YesNoDeleteProducts";
import YesNoWindowRoot from "./modal/YesNoWindowRoot";
import input_is_correct from "./inner/table_input_is_correct";
import RT_Alert from "./alerts/RT_Alert";
import WooProductsCRUDFromFile from "../WooProductsAdminPage/crud_pages/WooProductsCRUDFromFile";
import pdfTableOutput, {pdfFileName_demo, pdfTableData_demo, pdfTableHeaders_demo} from "./pdf/pdfTableOutput";
import {Button, Stack} from "@mui/material";
import DialogOk from "./modal/YesNoDialog";
import ProgressDialogDouble from "./modal/ProgressDialogDouble";
import ProductsTableRowSubNode from "./row/ProductsTableRowSubNode";

import {TJSONValue} from "../../../system_state/products_state/models/global_types";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import TitleMain from "../../../ui/pages/home_page/inner/TitleMain";

declare module '@tanstack/react-table' {

    interface TableMeta<TData extends RowData> {
        row_CanNotBeExpanded: (params?:any) => void
    }

    interface TableMeta<TData extends RowData> {
        row_IsExpanded: (params?:any) => void
    }

    interface TableMeta<TData extends RowData> {
        row_ToggleExpandedHandler: (params?:any) => void
    }




    interface TableMeta<TData extends RowData> {
        setExpandedNodeAll: (params?:any) => void
    }

    interface TableMeta<TData extends RowData> {
        getExpandedNodeSome: (params?:any) => void
    }

    interface TableMeta<TData extends RowData> {
        getExpandedNodeAll: (params?:any) => void
    }

    //ccc

    interface TableMeta<TData extends RowData> {
        getFocusedRow: (options?:any) => void
    }

    interface TableMeta<TData extends RowData> {
        memoFocusedRow: (rowIndex: number, columnId: string, value: unknown) => void
    }


    interface TableMeta<TData extends RowData> {
        copyCellToClipboard: (rowIndex: number, columnId: string, value: unknown) => void
    }

    interface TableMeta<TData extends RowData> {
        readRef: (rowIndex: number, columnId: string, value: unknown ) => void
    }
    interface TableMeta<TData extends RowData> {
        updateRef: (rowIndex: number, columnId: string, value: unknown, cell_ref:unknown) => void
    }


    interface TableMeta<TData extends RowData> {
        updateDatabase: (rowIndex: number, columnId: string, value: unknown ) => void
    }
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
    interface TableMeta<TData extends RowData> {
        addRow: (options?:any) => void
    }
    interface TableMeta<TData extends RowData> {
        copyRow: (options?:any) => void
    }
    interface TableMeta<TData extends RowData> {
        printToPdf: (options?:any) => void
    }
    interface TableMeta<TData extends RowData> {
        removeRow: (options?:any) => void
    }
    interface TableMeta<TData extends RowData> {
        refreshData: (options?:any) => void
    }
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}


const ProductsTableCRUD = (props:any) => {


    //=== global store_main of table fields refs
    const inputRefs_global:any = React.useRef<(HTMLInputElement | null)[]>([])
    useEffect(() => {
        // for (let i = 0; i < inputRefs_global.current; i++) {
        //
        // }
        // console.log('=== cell_ref inputRefs_global',inputRefs_global.current)
        return () => {};
    }, [inputRefs_global.current]);


    const dispatch = useDispatch();



    //==== first_access_step3 read
    const memo_data = {...(useSelector(SEL_MEMO_DATA) as unknown as Record<any, unknown>)}

    const products_data = useSelector(SEL_PRODUCTS_READ);

    const products_first_access = useSelector(SEL_PRODUCTS_FIRST_ACCESS);

    const products_read_started = useSelector(SEL_PRODUCTS_READ_STARTED);
    const products_read_finished = useSelector(SEL_PRODUCTS_READ_FINISHED);


    const products_create_started = useSelector(SEL_PRODUCTS_CREATE_STARTED);
    const products_create_finished = useSelector(SEL_PRODUCTS_CREATE_FINISHED);

    const products_delete_started = useSelector(SEL_PRODUCTS_DELETE_STARTED);
    const products_delete_finished = useSelector(SEL_PRODUCTS_DELETE_FINISHED);

    const products_delete_response = useSelector(SEL_PRODUCTS_DELETE_RESPONSE);

    const [data, setData] = React.useState<TTableLine[]>([])

    const TABLE_DATA:TTableLine[] = useMemo(() => [...data], [data])


    // const columns = React.useMemo(() =>  col_ctatic, [data] )
    const columns = col_ctatic

    // const ColumnsRunner=(a:any,b:any)=>React.useMemo<ColumnDef<TTableLine>[]>(a,b)
    // // const ColumnsRunner=(a:any,b:any)=>React.useMemo<ColumnDef<any>[]>(a,b)
    //
    // const columns = ColumnsRunner(
    //     () => col_ctatic,
    //     []
    // )
    // const columns = col_ctatic

    const initNewProductData=()=>{
        let n_entity_guid = "guid" + '-' + add_zeros(4, Math.round(Math.random() * 1000).toString())
            + '-' + Date.now().toString()

        const common_data ={
            name: 'Product ' + n_entity_guid,
            description: 'description ',
            regular_price:'99',
            sale_price:'',
            sku:'sku'+Date.now(),
            on_sale:false,
        }

        const product_json_data = {
            ...common_data,
            type: 'simple',
            "meta_data": [

                {
                    "key": "entity_guid",
                    "value": n_entity_guid
                },
                {
                    "key": "main_image_url",
                    "value": ''
                },
                {
                    "key": "main_video_url",
                    "value": ''
                },

            ],
        }

        let newRow:TTableLine  = {
            ...common_data,
            id: n_entity_guid,
            entity_guid: n_entity_guid,
            status: 'publish',
            main_image_url: '',
            main_video_url: '',
        };
        return [product_json_data,newRow]
    }

    const [state, set_state] = useState({
        state_refresh: Date.now(),
        do_mount_snackbar_about: Date.now(),

        message_over_table_mount: '',
        message_over_table_type:'',
        message_over_table_title:'',
        message_over_table_xy_data:{},
        message_over_table_position:'',
        message_over_table_props:{},

        pdf_output_break:false,
        pdf_output_total:0,
        pdf_output_finished:0,
        pdf_output_progress_open:false,
        pdf_output_rows:[],

        do_after_state_refresh: ()=>{}
    })

    const message_over_table_timeout = 1000;



    useEffect(() => {

        if(state.pdf_output_progress_open){

            // alert('pdfTableOutput')

            setTimeout(()=>{

                pdfTableOutput({
                    refresh_state:(p:any)=>{
                        set_state((prev_state:any)=>{return  {...prev_state,
                            pdf_output_finished:p.pdf_output_finished
                        }});
                    },
                    do_break:()=>{return state.pdf_output_break},
                    on_finish:()=>{
                        set_state((prev_state:any)=>{return  {...prev_state,
                            pdf_output_progress_open:false,
                            pdf_output_rows:[],
                            pdf_output_finished:0,
                            pdf_output_total:0,
                        }});
                    },
                    data: state.pdf_output_rows,headers: pdfTableHeaders_demo,filename: pdfFileName_demo
                })
            },2000)
        }


        return () => {

        };
    }, [state.pdf_output_progress_open]);


    useEffect(() => {

        if(''!==state.message_over_table_mount)
            setTimeout(()=>{
                    set_state((prev_state:any)=>{return  {...prev_state,
                        message_over_table_mount:'',
                        message_over_table_title:'',
                        message_over_table_ref:null,
                    }})

                },
                message_over_table_timeout)
        return () => {

        };
    }, [state.message_over_table_mount]);


    useEffect(() => {

        console.log('=== f1 inint  PRODUCTS_READ_RUN_ACTION')

        dispatch(PRODUCTS_READ_RUN_ACTION({
            read_json_data: {
                // ...with_final,
                read_all:true,
            }
        }));

        return () => {};
    }, [state.state_refresh]);



    useEffect(() => {

        console.log('=== products_data f1 ',products_data)
        let data1:TTableLine[] = []
        for (let i = 0; i < products_data.length; i++) {
            data1[i] = products_data[i]
            // data1[i].refGlobal = refGlobal
            // data1[i].refGlobal = refGlobal
            data1[i].subRows?.push(products_data[i])
            // gl user
            let current_row_expand_subnode = localStorage.getItem('row_expand_subnode'+data1[i].entity_guid)

            data1[i] = {...data1[i],row_expand_subnode: ('true' === current_row_expand_subnode) ? true : false}
        }

        console.log('=== data1 ',data1)

        setData(data1)

        table.toggleAllRowsSelected(false)

        if(state.do_after_state_refresh!==(()=>{}))
            state.do_after_state_refresh();

        return () => {
        };

    },[products_data])


    const [pagination, setPagination] = useState({
        pageIndex: 1, //initial page index
        pageSize: 5, //default page size
    });

        // useEffect(() => {
        //     // console.log('=== table.resetRowSelection()')
        //     // table.resetRowSelection()
        //     setGlobalFilter(prev=>globalFilter)
        //     return () => {
        //
        //     };
        // }, [data]);

    //========== SERVICES
    //========== SERVICES
    //========== SERVICES
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

    let controller_cancel = new AbortController();

    // const renderSubComponent = ({ row }: { row: Row<TTableLine> }) => {
    //     console.log('=== renderSubComponent')
    //     return (
    //         <pre style={{ fontSize: '10px' }}>
    //             <code>{JSON.stringify(row.original, null, 2)}</code>
    //         </pre>
    //     )
    // }

    let [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [globalFilter, setGlobalFilter] = useState('');

    // setTimeout(()=>{
    //     setGlobalFilter('17')
    // },3000)


    // ttt
    const table = useReactTable<TTableLine>({
        data,
        // data:TABLE_DATA,
        columns,

        // defaultColumn: {
        //     minSize: 0,
            // size: Number.MAX_SAFE_INTEGER,
            // maxSize: Number.MAX_SAFE_INTEGER,
        // },

        getCoreRowModel: getCoreRowModel(),

        //expand_step 1
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: (row:any) => true,

        //ssort
        getSortedRowModel: getSortedRowModel(),
        enableRowSelection: true, //enable row selection for all rows

        getFilteredRowModel: getFilteredRowModel(),
        filterFns: {
            fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
        },

        meta: {

            row_CanNotBeExpanded : (plocal:any) => {
                // console.log('=== row_CanNotBeExpanded  ')
                return true
            },
            row_IsExpanded : (row:any) => {
                // console.log('=== row_IsExpanded  ',row,row.index,row.row_expand_subnode)
                // if(row.id==='1') return true
                return row.original?.row_expand_subnode
                    // || row.index===1
                // return true
            },
            row_ToggleExpandedHandler: (params:any) => {

                // console.log('=== row_ToggleExpandedHandler ',params.e.target)
                // console.log('=== row_ToggleExpandedHandler ',params.row.index,data)
                const columnId='row_expand_subnode'
                // const new_value =params.e?.target?.checked
                const new_value =(!data[params.row.index].row_expand_subnode)
                skipAutoResetPageIndex()

                setData(old =>
                    old.map((row, index) => {
                        if (index === params.row.index) {
                            return {
                                ...old[params.row.index]!,
                                [columnId]: new_value,
                            }
                        }
                        return row
                    })
                )

                // gl user
                localStorage.setItem('row_expand_subnode'+params.row.original.entity_guid,new_value.toString())

            },

            setExpandedNodeAll: (params:any) => {
                // console.log('=== setExpandedNodeAll params.table ',params.table)
                // console.log('=== setExpandedNodeAll data ',data)

                if(data[0]) {
                    const columnId = 'row_expand_subnode'
                    let new_value = (!data[0]?.row_expand_subnode)

                    setData(old =>
                        old.map((row, index, allRows) => {
                            return {
                                ...old[index]!,
                                [columnId]: new_value,
                            }
                        })
                    )
                }


            },
            getExpandedNodeSome: (plocal:any) => {
                // console.log('=== getExpandedNodeSome ')
                let nItems=0
                if(data.length>1) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].row_expand_subnode) nItems++
                    }
                }
                // console.log('=== getExpandedNodeSome ',data.length,nItems)
                return ((nItems!==data.length) && (nItems!==0))
            }
            ,
            getExpandedNodeAll: (plocal:any) => {
                // console.log('=== getExpandedSubNodeAll ')
                let nItems=0
                if(data.length>1) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].row_expand_subnode) nItems++
                    }
                }
                // console.log('=== getExpandedSubNodeAll ',data.length,nItems)
                return (nItems===data.length)
            }
            ,

            refreshData: (plocal:any) => {
                // console.log('=== refreshData ')
            }
            ,

            removeRow: (plocal:any) => {

                // console.log('=== plocal.row_delete',plocal.row_delete)
                // console.log('=== plocal.row_delete entity_guid ',plocal.row_delete.original.entity_guid)

                if(undefined===plocal?.fromWhere) alert('ERROR 165120 undefined===plocal?.fromWhere')

                setData(prev=>{
                    // console.log('=== prev ',prev)
                    const new_data=prev.filter((el)=>el.entity_guid!==plocal.row_delete.original.entity_guid)
                    // console.log('=== new_data444 ',new_data)
                    return new_data
                })

                // https://github.com/TanStack/table/issues/4369
                // This is expected to happen, because the rowSelection
                // state does not get reset automatically when the data changes. This is especially useful when using manual pagination, filtering, etc. so that the rowSelection state can be persistent.
                // To solve your problem, you should call table.resetRowSelection()
                // at the same time as you delete your rows.
                // That will clear the rowSelection state.

                if(plocal.row_delete.original.entity_guid)
                    dispatch(PRODUCTS_DELETE_RUN_ACTION(
                        {
                            entity_guid:(plocal.row_delete.original.entity_guid as string),
                            delete_json_data:{
                                controller_cancel:controller_cancel,
                                fromWhere:plocal?.fromWhere,
                            }
                        } as WooDeleteParams
                    ))

            },

            printToPdf: async () => {
                const rows_core=table.getCoreRowModel().rows
                let rows_selected = table.getSelectedRowModel().rows
                // console.log('=== printToPdf111 rows_selected    ',rows_selected)
                // console.log('=== printToPdf111 rows_core        ',rows_core)
                let rews_to_print:any = []
                if(rows_selected.length>0) {
                    rews_to_print=rows_selected
                }else{
                    rews_to_print=rows_core
                }
                const rows_final=rews_to_print.map((el:any,ii:number)=> {
                    return {...el.original, row_number:ii+1}
                })

                set_state((prev_state:any)=>{return  {...prev_state,
                    pdf_output_progress_open:true,
                    pdf_output_rows:rows_final,
                    pdf_output_finished:0,
                    pdf_output_total:rows_final.length,
                }});


            },

            copyRow: () => {

                // console.log('=== r1 memo_data.memoFocusedRow ',memo_data.memoFocusedRow)

                const n_entity_guid=Date.now().toString()

                let new_row = JSON.parse(JSON_stringify(memo_data?.memoFocusedRow)).original
                // console.log('=== r1 new_row1 ',new_row)

                if(new_row) {
                    new_row = {

                        id: n_entity_guid,
                        entity_guid: n_entity_guid,
                        name: 'COPY ' + new_row.name,
                        regular_price: new_row.regular_price,
                        sku: '', //Date.now(), //new_row.sku,
                        main_image_url: new_row.main_image_url,
                        main_video_url: new_row.main_video_url,

                    }
                        // console.log('=== r1 new_row2 ',new_row)
                        const setFunc = (old: TTableLine[]) => [...old, new_row as TTableLine];
                        setData(setFunc);

                        const transformNewRowToProduct=(p:any)=>{
                            const sale_price_is_null = !((0===p.new_row?.sale_price) || ('0'===p.new_row?.sale_price) || (''===p.new_row.sale_price))
                            // console.log('=== r1 sale_price ',sale_price_is_null)
                            // console.log('=== r1 new_row3 ',p.new_row)
                            let ret_data={
                                name: p.new_row.name,
                                description: 'description ',
                                regular_price: p.new_row.regular_price,
                                sale_price: (sale_price_is_null)?'':p.new_row.sale_price?.toString(),
                                sku: p.new_row.sku,
                                on_sale:new_row.on_sale,

                                "meta_data": [
                                    {
                                        "key": "main_image_url",
                                        "value": p.new_row.main_image_url
                                    },
                                    {
                                        "key": "main_video_url",
                                        "value": p.new_row.main_video_url
                                    },
                                ],
                            }
                            return ret_data
                        }
                    const product_json_data = transformNewRowToProduct({new_row})
                        product_json_data.meta_data=[...product_json_data.meta_data,
                            {
                                "key": "entity_guid",
                                "value": Date.now().toString() //TODO UUID
                            },
                        ]

                    // console.log('=== r1 product_json_data',product_json_data)

                            dispatch(PRODUCTS_CREATE_RUN_ACTION(
                                {product_json_data} as TProduct
                            ))

                }
            },

            addRow: () => {

                const [product_json_data,newRow] = initNewProductData()

                const setFunc = (old: TTableLine[]) => [...old, newRow as TTableLine];
                setData(setFunc);

                dispatch(PRODUCTS_CREATE_RUN_ACTION(
                            {product_json_data} as TProduct
                        ))

            },//addRow

            getFocusedRow: () => {
                console.log('=== r1 getFocusedRow',memo_data)
                return memo_data
            },

            memoFocusedRow: (rowData:any, columnId:any, value:any) => {
                console.log('=== r1 memoFocusedRow rowData', value, rowData)
                dispatch(MEMO_DATA_ACTION({
                        'memoFocusedRow':rowData,
                    }
                ))
            },

            copyCellToClipboard: (rowData:any, columnId:any, value:any) => {

                navigator.clipboard.writeText(value);
                const xy_data0 = inputRefs_global.current[columnId + '____'+rowData.index].getBoundingClientRect()
                // console.log('=== cell_copy xy_data0 ',xy_data0)
                let xy_data = JSON.parse(JSON_stringify(xy_data0))
                // console.log('=== cell_copy xy_data ',xy_data)

                set_state((prev_state:any)=>{return  {...prev_state,
                    message_over_table_mount:'copy_data_finished',
                    message_over_table_type:'alert',
                    message_over_table_title:'Data copied',
                    message_over_table_xy_data:xy_data,
                    // message_over_table_position:'ref_end',
                    // message_over_table_position:'ref_start',
                    message_over_table_position:'ref_center',
                    message_over_table_props:{severity:'info'},
                }})

            },

            readRef: (rowData:any, columnId:any, value:any) => {
                const readRef_ = inputRefs_global.current[columnId + '____'+rowData.index]
                // console.log('=== cell_ref readRef ',readRef_)
                return readRef_
            },

            updateRef: (rowData:any, columnId:any, value:any, cell_ref:any) => {
                // console.log('=== cell_ref updateRef ',cell_ref)
                inputRefs_global.current[columnId + '____'+rowData.index] = cell_ref
                // console.log('=== cell_ref ',inputRefs_global.current)
            },

            updateDatabase: (rowData:any, columnId:any, value:any) => {

                if (!input_is_correct({dispatch, rowData, columnId, value})) return
                console.log('=== u1 updateDatabase ',rowData)

                const   data_field_name = columnId
                const   data_field_guid = rowData.original.entity_guid
                const   new_value = value

                //========== if user wont fast copy row
                let new_rowData={...rowData}
                new_rowData.original={...rowData.original, ...{[data_field_name]:new_value} }
                dispatch(MEMO_DATA_ACTION({
                        'memoFocusedRow':new_rowData,
                    }
                ))

                console.log('=== u1 new_rowData ',new_rowData)
                console.log('=== u1 data_field_guid ',data_field_guid)
                console.log('=== u1 data_field_name ',data_field_name)
                console.log('=== u1 new_value ',new_value)

                // https://thumbs.dreamstime.com/z/many-fresh-fruits-vegetables-arranged-rainbow-colors-white-background-collage-many-fresh-fruits-vegetables-arranged-279025639.jpg

                switch (true) {
                    case ('main_image_url'===data_field_name) || ('main_video_url'===data_field_name)
                    : {

                        const new_json = {
                            "meta_data":
                                [
                                    {
                                        "key": data_field_name,
                                        "value": new_value
                                    }
                                ]
                        }

                        dispatch(PRODUCTS_UPDATE_RUN_ACTION(
                            {
                                entity_guid:data_field_guid,
                                update_json_data:{
                                    ...new_json
                                }
                            } as WooUpdateParams2
                        ))

                        break;
                    }
                    default: {

                        let add_fields={}
                        const auto_set_on_sale=false
                        if( auto_set_on_sale ) {
                            if ('sale_price' === data_field_name) {
                                if ('' !== new_value.toString())
                                    add_fields = {on_sale: true}
                                else
                                    add_fields = {on_sale: false}
                            }
                        }
                        else{

                        }
                        // === update_params
                        // console.log('=== add_fields',add_fields)

                        dispatch(PRODUCTS_UPDATE_RUN_ACTION(
                            {
                                entity_guid:data_field_guid,
                                update_json_data:{
                                    [data_field_name]: new_value,
                                    ...add_fields
                                }
                            } as WooUpdateParams2
                        ))
                    }
                } //switch

            }, //=== updateDatabase

            updateData: (rowData:any, columnId:any, value:any) => {


                console.log('=== i1 updateData PLAN ')

                        if (!input_is_correct({dispatch, rowData, columnId, value})) return

                        // Skip page index reset until after next rerender
                        skipAutoResetPageIndex()
                        setData(old =>
                            old.map((row, index) => {
                                if (index === rowData.index) {
                                    return {
                                        ...old[rowData.index]!,
                                        [columnId]: value,
                                    }
                                }
                                return row
                            })
                        )


            }, //updateData
        },

        state: {
            pagination,
            columnFilters,
            globalFilter,
        },

        onColumnFiltersChange: setColumnFilters,
        // globalFilterFn: 'fuzzy',
        onGlobalFilterChange: setGlobalFilter,

        getPaginationRowModel:getPaginationRowModel(),
        onPaginationChange: setPagination,
        // manualPagination: true,
        // autoResetPageIndex:true,

    })
    // const [table_prev, set_table_prev] = useState(table);

    // const rows_selected = get_rows_selected({table})

    // useEffect(() => {
    //
    //     console.log('=== useEffect SELECTOR REFRESHED')
    //     console.log('=== SELECTOR products_create_started',products_create_started)
    //     console.log('=== SELECTOR products_create_finished',products_create_finished)
    //     console.log('=== SELECTOR products_delete_started',products_delete_started)
    //     console.log('=== SELECTOR products_delete_finished',products_delete_finished)
    //
    //     return () => {
    //
    //     };
    // }, [
    //     products_create_started,
    //     products_create_finished,
    //     products_delete_started,
    //     products_delete_finished,
    // ]);


    React.useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'table_entity_name') {
            if (table.getState().sorting[0]?.id !== 'table_entity_name') {
                // if filter on table_entity_name && on sorted => sort
                console.log('=== if filter on table_entity_name && on sorted => sort')
                table.setSorting([{ id: 'table_entity_name', desc: false }])
            }
        }
    }, [table.getState().columnFilters[0]?.id])


    const keyvalRefs1:{[index:string]:any} = {}
    let refGlobal = useRef(keyvalRefs1);


    useEffect(() => {
        return () => {

        };
    }, [state.pdf_output_finished]);



    //sss1
    return(
    <Stack
        flexDirection="column"
        justifyContent="start"
        // alignItems={ align_ }
        id={'div_ProductsTableCRUD'}
        width={{xs:'355px',sm:'655px',md:'760px',lg:'100%',xl:'100%',}}

    >
        {(!state.pdf_output_progress_open)?null:
        <ProgressDialogDouble

            state_upper={state}

            progress_linear={                {
                title: 'Started',
                percent: Math.round(state.pdf_output_finished / state.pdf_output_total * 100),
                finished: state.pdf_output_finished,
                total: state.pdf_output_total,
            }
            }

            progress_circlular={
                {
                    title: 'Finished',
                    percent: Math.round(state.pdf_output_finished / state.pdf_output_total * 100),
                    finished: state.pdf_output_finished,
                    total: state.pdf_output_total,
                }
            }

            open={state.pdf_output_progress_open}
            title={'PDF output progress'}

            disableEscapeKeyDown={true}
            onBackdropClick={()=>{
                // dispatch(PRODUCTS_DELETE_FINISHED_CLEAR_ACTION({new_value:false}))
            }}

            // onCancel={()=>{
            //     dispatch(PRODUCTS_DELETE_FINISHED_CLEAR_ACTION({new_value:false}))
            // }}

            onCloseByKey={()=>{
                set_state((prev_state:any)=>{return  {...prev_state,
                    pdf_output_progress_open:false,
                    pdf_output_rows:[],
                    pdf_output_finished:0,
                    pdf_output_total:0,
                }});
            }}


        >

            <Button
                variant={'text'}
                onClick={() =>{

                    set_state((prev_state:any)=>{return  {...prev_state,
                        pdf_output_progress_open:false,
                        pdf_output_rows:[],
                        pdf_output_finished:0,
                        pdf_output_total:0,
                        pdf_output_break:true,
                    }});

                }}
            >
                Cancel
            </Button>

        </ProgressDialogDouble>
        }


        {/*<div> state.do_mount_snackbar_about {state.do_mount_snackbar_about}</div>*/}
        {/*<div> products_data.length {products_data.length}</div>*/}
        {/*<div>products_create_finished {(products_create_finished)?'true':'false'}</div>*/}
        {/*<div>products_delete_finished {(products_delete_finished)?'true':'false'}</div>*/}


        {(
                (''!== state.message_over_table_mount)
            &&  ('alert' === state.message_over_table_type)
         )
        ?
            <RT_Alert
                severity="success"
                state={state}
            />

        :<></>
        }{/*alert*/}


        <YesNoWindowRoot dispatch={dispatch} window_name={'input_error'} work_component={'YesNoWindowOK'}/>

        <YesNoDeleteProducts
            dispatch={dispatch}
            // state dynamics
            // data dynamics
        />


        <RT_ToolbarCRUD
            table={table}

            globalFilter={globalFilter}
            setGlobalFilter={(e:any)=>setGlobalFilter(e)}

            state_upper={state}
            set_state_upper={set_state}

            create_started={products_create_started}
            create_finished={products_create_finished}

            //==== first_access_step4 pass
            first_access={products_first_access}
            read_started={products_read_started}
            read_finished={products_read_finished}

            delete_started={products_delete_started}
            delete_finished={products_delete_finished}
            delete_response={products_delete_response}

            onPrint={()=> {
                table.options.meta?.printToPdf()
            }}

            onCopy={()=> {

                // memo_data
                table.options.meta?.copyRow()

            }}

            onCreate={()=> {

                // let n_entity_guid = "guid" + '-' + add_zeros(4, Math.round(Math.random() * 1000).toString()) + '-' + Date.now()

                table.options.meta?.addRow()

            }}

            onRefresh={()=> {

                // table.options.meta?.refreshData({})
                //==== first_access_step2-2 set false
                // PRODUCTS_FIRST_ACCESS_ACTION(false)

                set_state((prev_state:any)=>{return  {...prev_state,
                    state_refresh: Date.now(),
                    do_after_state_refresh:()=>
                    {
                        console.log('=== d3')
                        set_state((prev_state:any)=>{return  {...prev_state,
                                do_mount_snackbar_about:'refresh_data_finished',
                                snackbar_message_title:'Refresh finished 111 ',
                        }})
                    }
                }})

            }}

            onDelete={()=> {

                let rows_selected = table.getSelectedRowModel().rows

                if(1<rows_selected.length){

                    let rows_selected = get_rows_selected({table})
                    console.log('=== rows_selected 000',rows_selected)
                    dispatch(PRODUCTS_SET_SELECTED_ACTION(rows_selected))
                    dispatch(YESNO_DIALOG_OPEN_ACTION({new_value:true}))
                    //see YesNoDeleteProducts
                    controller_cancel = new AbortController();

                    return
                }

                if(1===rows_selected.length){

                    console.log('=== rows_selected[0].index ',rows_selected[0].index)
                    table.options.meta?.removeRow({
                        rowIndex:rows_selected[0].index,
                        row_delete:rows_selected[0],
                        table:table,
                        fromWhere:"crud_toolbar"
                    })

                    // console.log("=== rows_selected[0].original.entity_guid",rows_selected[0].original.entity_guid)


                }else{

                    const row_focused = JSON.parse(JSON.stringify(table.options.meta?.getFocusedRow()))

                    if(undefined!==row_focused){

                        const memoFocusedRow1 = row_focused?.memoFocusedRow
                        console.log('=== memoFocusedRow1 ',memoFocusedRow1)
                        table.options.meta?.removeRow({
                            rowIndex:memoFocusedRow1.index,
                            row_delete:memoFocusedRow1,
                            table:table,
                            fromWhere:"crud_toolbar_one_row"
                        })

                    }else{
                    }
                }

            }}

        />

        <TableCRUDVisual
            table={table}
            setPagination={setPagination}
            TableRowSubNode={ProductsTableRowSubNode}
            // pagination={pagination}
        />

        {/*<div>{data.map((el)=><div key={el.entity_guid}>{el.name}  {el.entity_guid}  </div>)}</div>*/}

        <TitleMain title={'CRUD from file'}  nospaces/>
        <WooProductsCRUDFromFile set_state_upper={set_state} />

    </Stack>)
}
export default ProductsTableCRUD


