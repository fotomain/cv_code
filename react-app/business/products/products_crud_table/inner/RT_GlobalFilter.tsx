
import React, {useState} from "react";

import {useTheme} from "@mui/material/styles";

import InputSearchStandard from "../../../../system_code/input_material5/InputSearchStandard";

const RT_GlobalFilter = (props:any) => {

    const theme = useTheme();
    const [state, set_state] = useState({
        state_refresh: Date.now()
    })

    return(<>

        <InputSearchStandard
            id={props.id}
            theme={theme}
            style={{
                outline: 'none',
                width:'100%',
                font: 'roboto-regular',
                fontSize: '16px',
            }}

            ref_input_search={props.ref_input_global_filter}
            input_changed={props.globalFilter}
            input_value={props.globalFilter}
            onChange={(e:any)=>{
                console.log("=== onChange globalFilter ", e.target?.value)
                props.setGlobalFilter(e.target?.value)
            }}

            onBlur={(e:any)=>{
                set_state((prev_state:any)=>{return  {...prev_state,
                    state_refresh: Date.now()
                }})
            }}

            onSearch={(e:any)=>{

                console.log("=== onSearch globalFilter ", e.target?.value)
                props.setGlobalFilter(e.target?.value)

            }}

            onClear={(e:any)=>{

                console.log("=== onClear globalFilter ", e.target?.value)
                props.setGlobalFilter('')

            }}
            // TODO on_input_blur

            />

    </>)

}

export default RT_GlobalFilter
