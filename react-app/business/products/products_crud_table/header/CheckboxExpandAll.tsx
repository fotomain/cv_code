
import React, {useEffect, useState} from "react";
import Checkbox from "@mui/material/Checkbox";

const CheckboxExpandAll = (props:any) => {

    const refLocal = React.useRef<HTMLInputElement>(null!)

    useEffect(() => {

        // console.log('=== refLocal.current.checked  ',refLocal.current?.checked)

        return () => {

        };
    }, [refLocal.current?.checked]);


    return(
        (!props.table)?<></>:
            <Checkbox
                inputRef={refLocal}
                checked={props.table.options.meta?.getExpandedNodeAll()}
                indeterminate={props.table.options.meta?.getExpandedNodeSome()}
                onChange={(e)=>props.table.options.meta?.setExpandedNodeAll({table:props.table})}
                className={' cursor-pointer'}

            />

    )

}

export default CheckboxExpandAll
