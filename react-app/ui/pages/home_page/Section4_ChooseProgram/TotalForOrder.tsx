


/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {ReactComponent as IconDelivery} from './inner/icon_delivery.svg'


import {
    css_column_center,
    css_column_left,
    css_row_center,
    css_row_left,
    css_row_spacebetween
} from "./TargetFilterLevel4_Days";
import {get_media_number} from "./TargetFilterLevel3";

import {card_main_background, color_border, color_main} from "../AppHomeFinal";
import AppearIt from '../inner/AppearIt';
import {is_empty} from "../../../../system_code/code_global/GlobalFunctions";

// npm install react-number-format
import { NumericFormat } from 'react-number-format';

let pounds = Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumSignificantDigits: 3,
});
const TotalForOrder = (props:any) => {

    const font_Order  =['32px','24px','24px','24px','24px'][get_media_number()]

    console.log('=== font_Order ',font_Order)

            let landscape_mode=(window.innerWidth>640)
            if(!is_empty(props.landscape_mode)) landscape_mode = props.landscape_mode
            const portrait_mode=!landscape_mode

            const css_internal_padding=css`
              padding-left:   20px;
              padding-right:  20px;
              padding-top:    30px;
              padding-bottom: 30px;
            ` //========================

  // sss1
  return(

  <div
      css={css`        
            ${(landscape_mode)?css_row_center:css_column_center};
            width: 100%;
            ${css_internal_padding};
            font-family:Inter;
            margin-top: 15px;
            max-width: 1280px;
            //background-color: ${card_main_background};
            //background-color: cyan;         
            border: solid;
            border-width: 1px;
            border-color: ${color_border};
            border-radius: 20px;
      `}
  >
      <div id='div_left_column'
          css={css`
                    flex-grow: 1;
                    width: ${(landscape_mode)?'50%':'100%'};
                    //background-color: lightskyblue;
                    ${css_column_left}          
                `}
      >


          {/*<div>{JSON.stringify(props.state)}</div>*/}

          <div
                  css={css`flex-grow: 1; ${css_row_left};
                      padding-top:15px;
                      padding-bottom:15px;
                      ${(landscape_mode)?css_row_left:css_column_left}
                    `}
              >
                <div css={css` margin-right: 6px; font-size: 14px; `} >Your meal Kit:</div>
                <div css={css` font-size: 16px; color: ${color_main} `}>
                    {props.specification}
                </div>
              </div>

              <div
                  css={css`flex-grow: 1; ${css_row_left};
                      //flex-grow: 1
                      width: 100%;
                      padding-top:15px;
                      padding-bottom:15px;
                      border-bottom: 2px dashed ${color_border};
                  `}
              >
                  <img src={require('./inner/icon_meal.svg')} alt=""/>
                  {props.meals_text}
              </div>

              <div
                  css={css`flex-grow: 1; ${css_row_left};
                    padding-top:15px;
                    padding-bottom:15px;
                  `}
              >
                  <img src={require('./inner/icon_delivery.svg')} alt=""/>
                  {props.delivery_text}
              </div>

      </div>

                      {(portrait_mode)?null:
                      <div id='div_divider_column'
                          css={css` 
                            margin-left: 20px;
                            margin-right: 20px;
                          `}
                      >
                          <div
                              css={css` display:block; width:1px; box-sizing:border-box; height: 150px; 
                              background-color: ${color_border};
                          `}
                          ></div>
                      </div>
                      }

          <div id='div_right_column'

              css={css`
                        ${(landscape_mode)?css_row_left:css_row_center};
                        flex-grow: 1;
                        width: ${(landscape_mode)?'50%':'100%'};
                        //background-color: lightgreen;
                        margin-top:auto;
              `}
          >
              <div id='div_total_content'
                  css={css`
                        flex-grow: 1;
                        //background-color: lightgreen;
                        ${(landscape_mode)?css_row_left:css_column_center}
                  `}
              >
                  <div
                      css={css`
                        flex-grow: 1;
                        width: ${(landscape_mode)?'max-content':'100%'};
                        //background-color: lightgreen;
                        ${css_row_left};
                        font-size:4vh;
                        margin-top: auto;
                  `}
                  >
                      <div id='div_total_texts'
                          css={css`
                            flex-grow: 1;
                            //background-color: lightpink;
                            ${(portrait_mode)?css_row_spacebetween:css_column_left};
                          `}
                      >
                          <div css={css` font-size:${(landscape_mode)?'2.5vw':'2vh'}; `} >Total:</div>
                          {(props.state.total_before_discount === props.state.total_invoice)?null:
                            <div css={css` min-width:100px; padding-left:12px; font-size:${(landscape_mode)?'2.0vw':'2vh'}; text-decoration: line-through ; color: gray `} >
                                {pounds.format(props.state.total_before_discount)}
                            </div>
                          }
                          <div css={css` font-size:${(landscape_mode)?'2.5vw':'3.5vh'}; font-weight: bold; width:170px; color: ${color_main}; ${(portrait_mode)?' text-align:right ':''} `} >
                               {pounds.format(props.state.total_invoice)}
                          </div>

                      </div>

                  </div>

                  <div id='div_total_button'
                      css={css`
                        flex-grow: 3;
                        width:${(portrait_mode)?'100%':'max-content'};
                        background-color: ${color_main};
                        ${css_row_center};
                        padding-top:15px;
                        padding-bottom:15px;
                        padding-left:15px;
                        padding-right:15px;
                        border-radius: 10px;
                        color:white;
                        font-family:Inter;
                        font-size:${font_Order};
                        font-weight:500;
                        margin-top: auto;
                      `}
                  >Order</div>
              </div>

          </div>

  </div>)

}

export {pounds}
export default TotalForOrder
