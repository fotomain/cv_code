

import {createColumnHelper, SortingFn, sortingFns} from '@tanstack/react-table';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import React, {HTMLProps} from "react";
import {compareItems} from "@tanstack/match-sorter-utils";

import {tw_row_center} from "../../../system_code/tw/tw_tools";
import {Box, IconButton, Link, TableCell, Typography} from "@mui/material";

import {fuzzyFilter, numberFilter} from "./inner/table_filter_column";

import {ProductListItem} from "../../../system_state/products_state/models";

import CheckboxSelectRow from "./row/CheckboxSelectRow";
import CheckboxSelectAllRows from "./header/CheckboxSelectAllRows";
import CheckboxExpandAll from "./header/CheckboxExpandAll";
import RT_Cell from "./cell/RT_Cell";

export const no_filter_no_search = (p:any) => {
    return -1!==['titles','media','prices','optional',].indexOf(p)
}

export const set_header = (p:any) => {
    return(
        <Box
            sx={{
                height:(!p.height)?'50px':p.height,
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
            }}
        >
                <Typography fontWeight={'fontWeightBold'} >{p.title1}</Typography>
            {(!p.title2)?<></>:
                    <Typography fontWeight={'fontWeightBold'}>{p.title2}</Typography>
            }
        </Box>
    )
}

export const get_rows_selected = (p:any) => {
    // do_selected
    let work_array=p.table.getSelectedRowModel().rows
    console.log('=== work_array get_rows_selected 1', work_array)
    if((0!==work_array.length) && (undefined === work_array[0].original)) {
        work_array = [
            ...work_array.slice(1)
        ]
        console.log('=== work_array get_rows_selected 2', work_array)
        return work_array
    }
    return work_array
}

export function useSkipper() {
    const shouldSkipRef = React.useRef(true)
    const shouldSkip = shouldSkipRef.current

    // Wrap a function with this to skip a pagination reset temporarily
    const skip = React.useCallback(() => {
        shouldSkipRef.current = false
    }, [])

    React.useEffect(() => {
        shouldSkipRef.current = true
    })

    return [shouldSkip, skip] as const
}



const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    //sssort
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank!,
            rowB.columnFiltersMeta[columnId]?.itemRank!
        )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}


const columnHelper = createColumnHelper<ProductListItem>()

export const col_ctatic = [
    columnHelper.group({
        id:'manage_rows',
        header: (props:any) => set_header({title1: '#', title2: 'of '+props.table.getFilteredRowModel().rows.length}),
        // footer: props => props.column.id,
        columns: [

                columnHelper.display({
                    id: 'select',
                    header: (plocal:any) => {
                        return (
                            // options_ select visible only
                            <div title={'Select all rows'}>
                                <CheckboxSelectAllRows
                                    {...plocal}
                                />
                            </div>
                        )
                    },
                    cell: (plocal:any) => {
                        const { row,table } = plocal
                        return (
                            <div className="px-1" title={'Select row'} >
                                <CheckboxSelectRow {...plocal}
                                                   afterChange={(e: any) => {
                                        table.options.meta?.memoFocusedRow(row, 'select', e)
                                    }}
                                />
                            </div>
                        )
                    },
                }),
                columnHelper.display({
                    id: 'row_expand_subnode_toggler',
                    header: (plocal:any) => {
                        const { table } = plocal
                        return (
                            <CheckboxExpandAll
                                {...plocal}
                            />
                        )
                    },
                    cell: (plocal:any) => {
                        const { row,table } = plocal
                        return (
                            <div className={tw_row_center}>
                                <IconButton
                                    title={'Clear'}
                                    style={{width:'10px',height:'10px'}}
                                    onClick={(e)=>{
                                        table.options.meta?.row_ToggleExpandedHandler({e, table, row})
                                    }}
                                >
                                    {table.options.meta?.row_IsExpanded(row)
                                        ?<KeyboardArrowUpIcon />
                                        :
                                        <KeyboardArrowRightIcon />
                                    }
                                </IconButton>

                            </div>
                        )
                    },

                }),
    ]}),

    columnHelper.group({
        id:'titles',
        header: (props:any) => set_header({title1: 'Titles'}),
        // footer: props => props.column.id,
        columns: [
            columnHelper.accessor('name', {
                header: (props:any) => set_header({title1: 'Name'}),
                // cell: (info) => <div>{info.getValue()}</div>,
                cell: (info) => RT_Cell(info),
                footer: (props) => props.column.id,
                sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
                meta: {
                    input_type: 'input',
                    data_type: 'text',
                },

            }),

            columnHelper.accessor('sku', {
                header: (props:any) => set_header({title1: 'SKU'}),
                cell: (info) => RT_Cell(info),
                footer: (props) => props.column.id,
                sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
                meta: {
                    input_type: 'input',
                    data_type: 'text',
                },

            }),

            columnHelper.accessor('entity_guid', {
                header: (props:any) => set_header({title1: 'GUID'}),
                cell: (info) => RT_Cell(info),
                footer: (props) => props.column.id,
                filterFn: (row, id, value) => {
                    return value.includes(row.getValue(id));
                },
                meta: {
                    input_type: 'input',
                    data_type: 'text',
                },

            }),

        ]}),//============== titles

    columnHelper.group({
        id: 'prices',
        header: (props: any) => set_header({title1: 'Prices'}),
        // footer: props => props.column.id,
        columns:[
            columnHelper.accessor('regular_price', {
                header: (props:any) => set_header({title1: 'Regular', title2: 'price'}),
                cell: (info) => RT_Cell(info),
                footer: (props) => props.column.id,
                sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)

                // filterFn: (row, id, value) => {
                //     return value.includes(row.getValue(id));
                // },

                filterFn: numberFilter,

                meta: {
                    input_type: 'input',
                    data_type: 'number',
                },

            }),

            columnHelper.accessor('sale_price', {
                header: (props:any) => set_header({title1: 'Sale', title2: 'price'}),
                cell: (info) => RT_Cell(info),
                footer: (props) => props.column.id,
                sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
                filterFn: numberFilter,
                meta: {
                    input_type: 'input',
                    data_type: 'number',
                },

            }),

            // columnHelper.accessor('on_sale', {
            //     header: (props:any) => set_header({title1: 'on', title2: 'sale'}),
            //     cell: (info) => RT_Cell(info),
            //     footer: (props) => props.column.id,
            //     sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
            //     filterFn: numberFilter,
            //     meta: {
            //         input_type: 'checkbox',
            //         data_type: 'boolean',
            //     },
            //
            // }),

            columnHelper.accessor('status', {
                enableSorting: false,
                cell: RT_Cell,
                header: () => set_header({title1: 'Status'}),
                footer: (props:any) => props.column.id,
                sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
                meta: {
                    input_type: 'select',
                    data_type: 'text',
                    options: [
                        { value: 'draft', label: 'Draft' },
                        { value: 'publish', label: 'Publish' },
                    ],
                },
            }),

        ]}),//============== prices

    //============ media
    //============ media
    //============ media
    columnHelper.group({
        id: 'media',
        header: (props: any) => set_header({title1: 'Media'}),
        // footer: props => props.column.id,
        columns:[
            columnHelper.accessor('main_image_url', {
                header: (props:any) => set_header({title1: 'Main Image'}),
                cell: (info) => RT_Cell(info),
                size: 200,
                footer: (props) => props.column.id,
                sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
                meta: {
                    input_type: 'link',
                    data_type: 'text',
                },

            }),
            columnHelper.accessor('main_video_url', {
                header: (props:any) => set_header({title1: 'Main Video'}),
                cell: (info) => RT_Cell(info),
                size: 200,
                footer: (props) => props.column.id,
                sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
                meta: {
                    input_type: 'link',
                    data_type: 'text',
                },

            }),

        ]
    })


]


// let columns: ColumnDef<ProductListItem>[] = [] //Pass User type as the generic TData type
// const columnHelper = createColumnHelper<ProductListItem>()
//
// // @ts-ignore
// columns = [
//   columnHelper.accessor('entity_guid', {
//     header: 'ID',
//     cell: TableCellBasic,
//     meta: {
//       type: 'text',
//     },
//   }),
//   columnHelper.accessor('name', {
//     header: 'Name',
//     cell: TableCellBasic,
//     meta: {
//       type: 'text',
//     },
//   }),
//   columnHelper.accessor('regular_price', {
//     header: 'Price',
//     cell: TableCellBasic,
//     meta: {
//       type: 'number',
//     },
//   }),
//   columnHelper.accessor('status', {
//     header: 'Status',
//     cell: TableCellBasic,
//     meta: {
//       type: 'select',
//       options: [
//         { value: 'draft', label: 'Draft' },
//         { value: 'published', label: 'Published' },
//       ],
//     },
//   }),
//   // columnHelper.display({
//   //   id: 'edit',
//   //   cell: EditCell,
//   // }),
// ]

// <Typography component={'div'} fontWeight={'fontWeightLight'}>fontWeightLight:200</Typography>
// <Typography component={'div'} fontWeight={'fontWeightRegular'}>fontWeightRegular:400</Typography>
// <Typography component={'div'} fontWeight={'fontWeightMedium'}>fontWeightMedium:500</Typography>
// <Typography component={'div'} fontWeight={'fontWeightBold'}>fontWeightBold:700</Typography>

// === DOC
// <input
//       type="checkbox"
//       ref={ref}
//       className={className + ' cursor-pointer'}
//       {...rest}
//   />
