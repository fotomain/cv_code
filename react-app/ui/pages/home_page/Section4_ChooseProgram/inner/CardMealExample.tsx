

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import {css_column_center, css_column_top_center} from "../TargetFilterLevel4_Days";
import ImageObjectURL from "./ImageObjectURL";
import AppearIt from "../../inner/AppearIt";
import * as React from "react";
import {get_media_number} from "../TargetFilterLevel3";

const CardMealExample = (props:any) => {

    const row_mode=(window.innerWidth>640)
    // const column_mode=(window.innerWidth<=640)

    const fontSizeExampleName  =['3.5vw','3.2vw','2.vw','1.2vw','1.2vw'][get_media_number()]

    return(
        // <AppearIt once  mode='fade-left' duration={1} >
            <div id={'card_meal_example'}
              css={css`${css_column_top_center};
                padding-top:10px;
                height: max-content;
              `}
            >


                {(!props.item_data.main_image_url)?<div>Loading image...</div>:
                // <div>
                    <ImageObjectURL {...props.item_data} {...props}
                        style_image={{width:(row_mode)?'calc(20vw)':'calc(45vw)',height:'auto'}}
                        image_title={()=>{
                            return <div id='div_example_name' css={css` 
                                max-width:80% ; 
                                min-height:100px; 
                                text-align:center; 
                                font-size: 16px; 
                                font-family:Inter; 
                                ${css_column_center} 
                            `}>
                                {props.item_data.name}
                            </div>

                        }}
                    />
                // </div>
                }



                {/*<div style={{*/}
                    {/*  fontSize:fontSizeExampleName,*/}
                    {/*  maxWidth:'100px',*/}
                    {/*}}>*/}
                    {/*  {props.item_data.name}*/}
                    {/*</div>*/}

          </div>
        // </AppearIt>
  )
}

export default CardMealExample
