import {Column, FilterFn, Table} from "@tanstack/react-table";
import {TextField} from "@mui/material";

import React from "react";
import {rankItem} from "@tanstack/match-sorter-utils";
import { check_number_input } from "./table_check_number_input";
import {TJSONValue} from "../../../../system_state/products_state/models/global_types";


export const numberFilter: FilterFn<any> = (
    row, columnId, value, addMeta) => {

    // console.log('=== numberFilter row',row.index)
    // console.log('=== numberFilter',columnId,value,row.getValue(columnId))
    let valRow = Number(row.getValue(columnId) as string)

        let valLeft=0
        if (value[0]) valLeft = Number(value[0].toString())
        else valLeft = -99999999999

        let valRight=0
        if (value[1]) valRight = Number(value[1].toString())
        else valRight = 99999999999

            if((!valRow) && (0===valLeft) && (0===valRight))
                return true
            else
            {
                const itemRankFinal = (valLeft <= valRow) && (valRow <= valRight)

                // console.log('=== numberFilter',valLeft,valRow,valRight,itemRankFinal)

                return itemRankFinal
            }
}


export const fuzzyFilter: FilterFn<any> = (
    row, columnId, value, addMeta) => {

    // console.log('=== fuzzyFilter', columnId, value, row.getValue(columnId))
    const itemRank = rankItem(row.getValue(columnId), value)

    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed

}
export default function FilterForColumn({
                    ...p
                }: {
                    column: Column<any, any>
                    table: Table<any>
                }) {

    const { column, table } = p

    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    // const initialValue = {value_data:firstValue,value_timestamp:0}
    // console.log('=== initialValue  column.id ',column.id,initialValue)

    // const [value, setValue] = React.useState(initialValue)

    const columnMeta = JSON.parse(JSON.stringify(column.columnDef.meta as TJSONValue))
    // console.log('=== columnMeta111',columnMeta)
    const typeOfFiltger = columnMeta?.data_type

    return typeOfFiltger === 'number' ? (
    // return typeof firstValue === 'number' ? (
        <div className="flex">
            {/*space-x-2*/}
            <TextField
                variant="standard"

                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ''}

                onKeyDown={(e) => {
                    check_number_input(e)
                }}

                onChange={e => {

                    column.setFilterValue((old: [number, number]) => [
                        e.target.value,
                        old?.[1],
                    ])

                }}//onChange
                placeholder={`Min`}
                className="w-24 border shadow rounded"
            />
            <TextField
                type="number"
                variant="standard"

                value={(columnFilterValue as [number, number])?.[1] ?? ''}

                onKeyDown={(e) => {
                    check_number_input(e)
                }}

                onChange={e =>
                    column.setFilterValue((old: [number, number]) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-24 border shadow rounded"
            />
        </div>
    ) : (
        <>
            <TextField
                variant="standard"

                type="text"
                value={(columnFilterValue ?? '') as string}

                onChange={e => {
                    column.setFilterValue(e.target.value)
                }}
                placeholder={`Search...`}
                className="w-[98%] border shadow rounded"
                //options_ full widht or padding
                // className="w-36 border shadow rounded"
            />
        </>
    )
}
