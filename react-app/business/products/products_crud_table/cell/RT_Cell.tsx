


import React from "react";
import RT_CellTextField from "./RT_CellTextField";
import RT_CellSelect from "./RT_CellSelect";
import get_field_options from "../inner/table_get_field_options";
import {Box, IconButton} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {tw_row_center, tw_row_left} from "../../../../system_code/tw/tw_tools";
import RT_CellLink from "./RT_CellLink";
import RT_CellCheckbox from "./RT_CellCheckbox";


const RT_Cell = (props:any) => {

    const { row, column, table } = props

    let workComponents:{[index:string]:any}
    workComponents={
        'input':    RT_CellTextField,
        'select':   RT_CellSelect,
        'link':     RT_CellLink,
        'checkbox': RT_CellCheckbox,
    }
    const WorkComponent=workComponents[props.column.columnDef.meta?.input_type as string]

    let field_options=get_field_options(props.column)

    return(
        <div id={'one_cell_WorkComponent'}
             className={tw_row_center+" flex-nowrap gap-[4px] md:gap-[6px] "}
        >
            <Box id={'div_wrap_WorkComponent'} sx={{pr:'6px'}}>
                <WorkComponent {...props}/>
            </Box>

        {(field_options.do_copy_to_clipboard_button )
            ?
            <>

                <IconButton
                    title={'Clear'}
                    disabled={''===props.getValue().toString()}

                    style={{width: '10px', height: '10px', marginLeft: '4px', marginRight: '4px'}}

                    onClick={() => {

                        table.options.meta.copyCellToClipboard(row, column.id, props.getValue())
                    }}

                >
                    <ContentCopyIcon/>
                </IconButton>

            </>
            :''
        }
        {/*=== do_copy_to_clipboard_button*/}


        {field_options.do_clear_button
            ?

            <IconButton
                title={'Clear'}
                style={{width:'10px',height:'10px',marginRight:'4px'}}
                onClick={()=>{
                    table.options.meta.updateData(row, column.id, '')
                    table.options.meta.updateDatabase(row, column.id, '')
                }}

            >
                <ClearIcon />
            </IconButton>

            :
            <></>
        }


    </div>)

}

export default RT_Cell
