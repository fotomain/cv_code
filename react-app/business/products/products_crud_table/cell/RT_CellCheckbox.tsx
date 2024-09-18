
import React from "react";
import {Checkbox} from "@mui/material";

let CHANGE_TIMEOUT:any = null;

const RT_CellCheckbox = (p:any) => {

    const { row, column, table } = p

    return(<>
        <Checkbox

            size="small"
            checked={p.getValue()}
            onChange={(e, checked)=>{

                    table.options.meta.updateData(row, column.id, checked);
                    console.log('=== i2 PLAN')
                    if (CHANGE_TIMEOUT) {
                        // we already have a previous timeout, clear it.
                        clearTimeout(CHANGE_TIMEOUT);
                    }

                    CHANGE_TIMEOUT = setTimeout(()=>{

                        console.log('=== i2 FACT')
                        table.options.meta.updateDatabase(row, column.id, checked);

                    },500);

            }}

            inputProps={{ 'aria-label': 'controlled' }}
        />

    </>)

}

export default RT_CellCheckbox
