
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

import {Box} from "@mui/material";
import * as React from "react";

import {useTheme} from "@mui/styles";
import {tw_col_center, tw_row_center} from "../../../../system_code/tw/tw_tools";
import {get_media_number} from "../../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel3";

import {css_column_center, css_row_center} from "../../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";

const C_Name = (props:any) => {

    const debug_local=false

    const xX = props.data.name.substring(0,1)
    const xN = props.data.name.substring(1,2)
        let title_persons = ''
        let name_product = ''
            const isX = ('x'===xX) && (-1!==['2','3','4','5','6'].indexOf(xN))
            if(isX){
                name_product = props.data.name.substring(3,props.data.name.length)
                title_persons = xN+' portions'
            }
            else{
                title_persons = '1 portion'
                name_product = props.data.name
            }

    // const name_array = name_product.split(' ')
    let n = 0;
    const output = name_product.replace(/\s/g, (m, i, og) => {
        return (n++ % 2) ? '%' : m;
    });
    const name_array = output.split('%')

    const isDarkTheme = useTheme().palette.mode === 'dark';
    const card_title_color=(isDarkTheme)?'white':'black'

    const card_space_lr='0px'

    if (debug_local) console.log('=== name_product ',name_product,props.data)

    const is_native = props.drawer_state?.device_info?.is_native

    const fontSizeCatalogName  =['3.5vw','3.2vw','2.vw','0.9vw','0.8vw'][get_media_number()]

    // sss
    return(
        <>
            <div id='div_catalog_name' css={css` 
                max-width:80% ; 
                min-height:85px; 
                text-align:center; 
                  font-size: ${fontSizeCatalogName}; font-family:Inter; ${css_column_center} ` }>
                {props.data.name}
            </div>
        </>
    )

}

export default C_Name

{/*    <span style={{fontSize:(is_native)?'10px':'12px', fontFamily:'InterLight'}}>{title_persons}</span>*/}

{/*<Box id={'div_name_text'}*/}
{/*     style={{*/}
{/*         margin:'0px',padding:'0px',*/}
{/*         fontFamily: "Inter",*/}
{/*         color:card_title_color,*/}
{/*         // paddingRight:card_space_lr,*/}

{/*         maxWidth:'70%',*/}
{/*         minHeight:'85px',*/}

{/*         // textAlign:'center',*/}
{/*         display:'flex',*/}
{/*         flexDirection:'column', //row*/}
{/*         justifyContent:'center',*/}
{/*         alignItems:'center',*/}

{/*     }}*/}
{/*    >*/}
{/*        {name_array.map((el:any,i:number)=>{*/}
{/*            return <span key={i}*/}
{/*                        style={{fontSize:fontSizeCatalogName,}}*/}
{/*                    >*/}
{/*                        {el}&nbsp;*/}
{/*                    </span>*/}
{/*        })}*/}
{/*</Box>*/}
