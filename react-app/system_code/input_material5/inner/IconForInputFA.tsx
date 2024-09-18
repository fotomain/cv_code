
import React, {useEffect, useState} from "react";

// npm install --save @fortawesome/react-fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {_input_inner_content_max_height} from "./InputManager";
import {useTheme} from "@mui/styles";

// .material-icons {
//     font-family: 'Material Icons';
//     font-weight: normal;
//     font-style: normal;
//     font-size: 12px;
//     line-height: 1;
//     letter-spacing: normal;
//     text-transform: none;
//     display: inline-block;
//     white-space: nowrap;
//     word-wrap: normal;
//     direction: ltr;
//     -moz-font-feature-settings: 'liga';
//     -moz-osx-font-smoothing: grayscale;
// }

const IconForInputFA = (p:any) => {

    // console.log('=== p.input_state.color_main_background ',p.input_state.color_main_background)
    // console.log('=== p.input_state.color_main_background p.style_wrapper ',p.style_wrapper)

    const theme = useTheme()
    useEffect(() => {
        return () => {

        };
    }, [theme?.palette?.mode,p.input_state.color_main_background]);

    let style_upper={}
    if(p.input_state.is_outlined){

    }else{
        style_upper = p.input_state.style1_filled_normal
        if(p.input_state.is_hovered) style_upper=p.input_state.style2_filled_hover
        if(p.input_state.is_focused) style_upper=p.input_state.style3_filled_focused
    }

    return(

        <div id='wrap_FontAwesomeIcon' style={{
            ...style_upper,
            // backgroundColor:'red',
            // ...(p.input_state.is_outlined)?null:(!p.input_state.is_focused)?(p.input_state.is_hovered)?p.input_state.style2_filled_hover:p.input_state.style1_filled_normal:p.input_state.style3_filled_focused,

            display:'flex',
            justifyContent:'center', alignItems:'center',

            width:'24px',

            height:(p.input_state.is_outlined)?(_input_inner_content_max_height-4)+'px':_input_inner_content_max_height+'px',

            marginTop:(p.input_state.is_outlined)?'-1px':'0px',

            paddingLeft:(p.input_state.is_focused)?'0px':'1px',
            paddingRight:(p.input_state.is_focused)?'0px':'1px',
            paddingBottom:(p.input_state.is_focused)?'0px':'1px',
            cursor:'pointer',
            ...p.style_wrapper,
            // backgroundColor:p.input_state.color_main_background,
        }}
             onClick={(e)=>{p.onClick?.(e)}}
        >
            <FontAwesomeIcon
                color={(p.input_state.is_focused) ? p.color_main_focused || p.input_state.color_main_focused : (p.color_main || p.input_state.color_main)}
                // color={'red'}
                icon={p.children}

                //  TODO F(MUI SIZE)
                // size={'sm'}

                id={(p.is_error_icon)?p.is_error_icon:'div_icon_fa'}
                style={{
                    fontSize:'0.7em',
                    // color:(p.input_state.is_focused)?p.input_state.color_main_focused:p.input_state.color_main,
                    backgroundColor:p.input_state.color_main_background,
                    ...(p.input_state.is_outlined)?null:(!p.input_state.is_focused)?(p.input_state.is_hovered)?p.input_state.style2_filled_hover:p.input_state.style1_filled_normal:p.input_state.style3_filled_focused,
                    cursor: 'pointer',
                    ...p.style,
                }}

            />
            {/*<div>color_main_backgroun {p.input_state.color_main_background}</div>*/}
        </div>
    )
};

export default IconForInputFA


