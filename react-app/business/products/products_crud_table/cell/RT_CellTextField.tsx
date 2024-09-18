import React, {useEffect, useRef} from "react";
import {InputBaseComponentProps, TextField} from "@mui/material";
import get_field_options from "../inner/table_get_field_options";
import {check_number_input} from "../inner/table_check_number_input";

let CHANGE_TIMEOUT:any = null;

const RT_CellTextField = (p:any) => {

    // console.log('=== RT_CellTextField ',p)

    const { getValue, row, column, table } = p

    let field_options=get_field_options(p.column)
    let style_props = {}
    style_props = (field_options.width)?{...style_props, width:field_options.width, minWidth:field_options.width }:style_props
    style_props = {...style_props, ...p.sx}

    return(<>
        <TextField

            variant={(p.variant) ? p.variant : "standard"}
            label={field_options.label}
            type={table.options.meta?.data_type}
            id={p.column.id + '____'+p.row.index}
            disabled={field_options.read_only}

            ref = {ref => {
                table.options.meta.updateRef(row, column.id, p.getValue(), ref);
            }}

            sx={style_props}
            inputProps={{...field_options.inputProps as InputBaseComponentProps }} // the change is here

            value={p.getValue()}

            onChange={e => {

                table.options.meta.updateData(row, column.id, e.target.value);
                console.log('=== i2 PLAN')
                if (CHANGE_TIMEOUT) {
                    // we already have a previous timeout, clear it.
                    clearTimeout(CHANGE_TIMEOUT);
                }

                CHANGE_TIMEOUT = setTimeout(()=>{

                    console.log('=== i2 FACT')
                    table.options.meta.updateDatabase(row, column.id, e.target.value);

                },500);

            }} //onChange

            onFocus={e => {

                table.options.meta?.memoFocusedRow(row, column.id, e.target.value)

            }}

            onKeyDown={(e) => {
                // console.log('=== check_number_input ',typeof p.row.original[p.column.id])
                if(field_options.numbers_only) {
                    check_number_input(e)
                }

                const pressedArrowUp= (-1!==['ArrowUp'].indexOf(e.key))
                const pressedArrowDown= (-1!==['ArrowDown'].indexOf(e.key))
                if(pressedArrowUp || pressedArrowDown) {
                    let new_index=-1
                    if (pressedArrowUp) new_index = p.row.index-1
                    if (pressedArrowDown) new_index = p.row.index+1
                    if (new_index < 0) new_index = 0
                    if (new_index !== p.row.index) {
                        const el2 = window.document.getElementById(p.column.id + '____' + (new_index))
                        if (el2) el2.focus()
                    }
                }
            }}

        />{/*=== END TextField*/}
    </>)

}

export default RT_CellTextField
