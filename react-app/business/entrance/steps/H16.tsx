
import React from "react";
import {useTheme} from "@mui/styles";
import {is_empty} from "../../../system_code/code_global/GlobalFunctions";

const H16 = (props:any) => {

    const {style,...props_rest} = props

    const theme = useTheme()
    let style_form=style
    if(!is_empty(theme)){
        style_form={
            backgroundColor:theme?.palette?.background?.default,
            color:theme?.palette?.text.primary,
            ...style_form, // spec style is !important
        }
    }

    return (
        <div className="font-f-menu-disktop text-[16px] py-[10px]"
             {...props_rest} style={style_form}
        >
            {props.children}
        </div>
    );
};

export default H16
