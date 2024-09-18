
import {Stack} from "@mui/material";
import React from "react";

// export const keyvalBasic:{[index:string]:any} = {}

// export const keyvalBasic:{[index:string]:any} = {}
interface XY_data {
    menu_x:number|undefined,
    menu_y:number|undefined,
    empty:boolean,
    // ref_button:typeof React.useRef<HTMLInputElement>,
    ref_button:any,
}

export  const StackColumn = (props:any) =>{
    return(
        //
        <Stack direction='column' alignContent={'center'} alignItems={'center'} {...props}>
            {props.children}
        </Stack>
    )
}

export  const StackRow = (props:any) =>{
    return(
        //
        <Stack direction='row' alignContent={'center'} alignItems={'center'} {...props} >
            {props.children}
        </Stack>
    )
}
