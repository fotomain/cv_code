import React, {useEffect, useRef} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import get_field_options from "../inner/table_get_field_options";

let CHANGE_TIMEOUT:any = null;

type Option = { //for Select
    label: string;
    value: string;
};

const RT_CellSelect = (p:any) => {

    const { getValue, row, column, table } = p

    // let field_options=get_field_options(p.column)
    // let style_props = {}
    // style_props = (field_options.width)?{...style_props, minWidth:field_options.width }:style_props

    let field_options=get_field_options(p.column)

    // variant="filled" outlined
    return(
        <>
        <FormControl  variant="filled" size="small" >
            <InputLabel id={'select_status'+row.original.entity_guid+row.index}>{field_options.label}</InputLabel>
            <Select
                id={'select_status'+row.original.entity_guid+row.index}
                ref = {ref => {
                    table.options.meta.updateRef(row, column.id, p.getValue(), ref);
                }}
                // sx={{paddingTop:'0px',paddingBottom:'0px',paddingLeft:'1px',}}
                // labelId="select status"
                value={p.getValue()}

                onChange={(e)=>{
                    table.options.meta.updateData(row, column.id, e.target.value);
                    table.options.meta.updateDatabase(row, column.id, e.target.value);
                }}
            >
                {column.columnDef.meta.options?.map((option: Option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}

            </Select>
        </FormControl>
     </>
    )

}

export default RT_CellSelect
