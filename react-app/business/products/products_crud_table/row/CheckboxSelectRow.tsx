
import React, {useEffect, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import {tw_col_center_basic} from "../../../../system_code/tw/tw_tools";

const CheckboxSelectRow = (props:any) => {

    const refLocal = React.useRef<HTMLInputElement>(null!)

    useEffect(() => {

        // console.log('=== refLocal.current.checked  ',refLocal.current?.checked)

        return () => {

        };
    }, [refLocal.current?.checked]);


    // console.log('=== props.flatRows ',props.flatRows)

    return(
        // flatRows
        <div className={tw_col_center_basic}>
            {/* c+ big tagles # of row  backgroundColor:'red' */}
            <div style={{width:'30px', textAlign:'right', }}>{props.row.index+1}</div>
            <Checkbox
                inputRef={refLocal}
                checked={props.row.getIsSelected()}
                disabled={!props.row.getCanSelect()}
                indeterminate={props.row.getIsSomeSelected()}
                onChange={props.row.getToggleSelectedHandler()}
                className={' cursor-pointer'}

            />

        </div>
    )

}

export default CheckboxSelectRow
