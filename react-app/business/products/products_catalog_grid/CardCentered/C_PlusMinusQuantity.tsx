

/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import * as React from "react";
import {useEffect} from "react";
import {IconButton} from "@mui/material";
import {useTheme} from "@mui/styles";
import {get_media_number} from "../../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel3";
import {color_hex_to_rgba} from "../../../../system_code/code_global/GlobalFunctions";
import {css_row_center} from "../../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";
import {check_number_input} from "../../products_crud_table/inner/table_check_number_input";

// fontSizeInput===fontSizeName

const C_PlusMinusQuantity = (props:any) => {

    const init_state={
        ['input_quantity']:props.start_quantity
    }

    const timeoutId = React.useRef(0);
    const debounce_interval = 700;

    const [state, set_state] = React.useState({...init_state});
    const field_change = (e:any) =>{

        set_state({
            ...state,
            ...{
                ['input_quantity']: e.target.value,
            }
        })

            if (timeoutId.current) {
                window.clearTimeout(timeoutId.current);
            }
                //=== debounce
                timeoutId.current = window.setTimeout(() => {

                    console.log('=== window.setTimeout')
                    props.onChangeQuantity(e)

                }, debounce_interval);
    }

    useEffect(() => {

        set_state({...state,...{
                ['input_quantity']:props.start_quantity
            }})

        return () => {};
    }, [props.start_quantity]);


    const theme = useTheme()
    // console.log(' theme.palette.primary.main',theme.palette.primary.main)

    const fontSizeInput  =[3.5, 3.5, 2.0, 1.5, 1.1][get_media_number()]

    return(

        <div css={css` 
            border-bottom: 1px solid lightgreen;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            width:90%; 
            padding:5px; 
            //background-color: transparent; 
            background-color: ${color_hex_to_rgba({hex:theme.palette.primary.light, opacity:'0.3'})};           
            ${css_row_center}; 
          `}
        >

            <IconButton color="primary" title={'+1'}
                onClick={()=>{
                    props?.onPlus()
                }}
            >
                <AddCircleOutlineIcon/>
            </IconButton>

                      <input value={state.input_quantity} id={'input_add_to_cart'}
                             css={css` 
                               flex-grow:1;
                               font-size: ${fontSizeInput}vw; 
                               width:max-content; outline:none; text-align: center;
                               min-width: ${fontSizeInput}vw; //c+
                             `}

                             onChange={(e)=>{
                                 field_change(e)
                             }}
                             onKeyDown={(e) => {
                                 check_number_input(e)
                             }}

                      />

            <IconButton color="primary" title={'-1'}
                        onClick={()=>{
                            props?.onMinus()
                        }}
            >
                <RemoveCircleOutlineIcon />
            </IconButton>

        </div>

    )
}

export default C_PlusMinusQuantity
