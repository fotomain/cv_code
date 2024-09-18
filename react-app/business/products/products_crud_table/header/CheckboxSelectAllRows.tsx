
import React, {useEffect, useState} from "react";
import Checkbox from "@mui/material/Checkbox";

const CheckboxSelectAllRows = (props:any) => {

    const refLocal = React.useRef<HTMLInputElement>(null!)

    useEffect(() => {

        // console.log('=== refLocal.current.checked  ',refLocal.current?.checked)

        return () => {

        };
    }, [refLocal.current?.checked]);


    return(
        <Checkbox
            inputRef={refLocal}
            checked={props.table.getIsAllRowsSelected()}
            indeterminate={props.table.getIsSomeRowsSelected()}
            onChange={props.table.getToggleAllRowsSelectedHandler()}
            className={' cursor-pointer'}
        />
    )

}

export default CheckboxSelectAllRows
