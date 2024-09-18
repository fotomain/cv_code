

import {Box} from "@mui/material";
import React from "react";
import {GlobalsContext} from "../../../../system_code/context_globals/globals_context";
import {show_global_alert} from "./show_global_tools";


const IconWithGlobalAlert = (props) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const {
        on_press,
        on_click,
        icon,
        ...other} = props

    const Icon = icon

    return(

        <Box {...other} sx={{ display: "flex", justifyContent: "center", alignItems: "center"  }}>

            <Icon

                id={'IconDoClose'}

                onClick={(e)=>{
                    console.log('=== onClick ')

                    if(props.on_click) props.on_click().then((res)=>{

                    })

                    if(props.on_press) props.on_press().then((res)=>{

                        show_global_alert({show_title:props.show_title,global_props, global_dispatch})

                    })


                }}

                sx={{
                    position:'relative',
                    '&:hover, &:focus':{color:"#6cd04c", cursor:'pointer' }
                }}

            />

        </Box>
    )
}

export default IconWithGlobalAlert
