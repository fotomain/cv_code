
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import {meal_per_day_price_full, meal_per_day_price_working} from "./section_3_program_data";
import {color_main} from "../AppHomeFinal";
import {color_hex_to_rgba} from "../../../../system_code/code_global/GlobalFunctions";
import {useTheme} from "@mui/styles";

const css_column_spacebetween  = css` display: flex; flex-direction: column; align-items: center; justify-content: space-between; `
const css_column_center  = css` display: flex; flex-direction: column; align-items: center; justify-content: center; `

const css_column_top_center    = css` display: flex; flex-direction: column; align-items: center; justify-content: start; `
const css_column_left    = css` display: flex; flex-direction: column; align-items: start; justify-content: center; `
const css_column_right    = css` display: flex; flex-direction: column; align-items: end; justify-content: center; `
const css_row_center  = css` display: flex; flex-direction: row; align-items: center; justify-content: center; `
const css_row_spacebetween  = css` display: flex; flex-direction: row; align-items: center; justify-content: space-between;  `
const css_row_left    = css` display: flex; flex-direction: row; align-items: center; justify-content: start; `
const css_row_start   = css` display: flex; flex-direction: row; align-items: center; justify-content: start; `


const TargetFilterLevel4_Days = (props:any) => {


  let buttons_data=('days_working'===props.state.days_mode)?meal_per_day_price_working:meal_per_day_price_full

  // useEffect(() => {
  //   const buttons_data=('days_working'===props.days_mode)?meal_per_day_price_working:meal_per_day_price_full
  //   console.log('=== props.days_mode ',props,props.state.days_mode)
  //   return () => {
  //
  //   };
  // }, [props.state.days_mode]);

    const theme = useTheme()

  // sss1

  return(<div id={'div_TargetFilterLevel4'}
              css={css`
                //width:max-content;
                flex-grow:1;
                gap:5px;
                ${css_row_start};
                flex-wrap: wrap;
            `}
  >
    {buttons_data.map((el,kk)=>{

        const button_selected = el.days_count===props.state.days_count

      return <div key={kk} css={css`
          ${css_column_center};
          flex-grow:1;
        `}>
        <div
                 css={css`
                  ${css_row_center};
                  width:100%;
                   max-width: 250px;

                   position: relative;
                   padding-left: 10px;
                   padding-right: 10px;
                   padding-top: 10px;
                   padding-bottom: 10px;

                  border-radius: 5px;
                   
                  color: ${(button_selected)?color_main:'black'} ;
                   
                  background-color: ${(button_selected)?color_hex_to_rgba({hex:theme.palette.primary.light, opacity:'0.3'}):'transparent'} ;
                   
                  // border-width: ${(button_selected)?' 1px 1px 1px 1px ':' 1px 1px 1px 1px '} ;
                  // 
                  // border-top-color: ${(button_selected)?color_main:'transparent'} ;
                  // border-left-color: ${(button_selected)?color_main:'transparent'} ;
                  // border-right-color: ${(button_selected)?color_main:'transparent'} ;
                  // 
                  // border-bottom-color: ${(button_selected)?color_main:'darkgray'} ;
                   
                  margin-top: 20px;
                   
              `}
             onClick={()=>{
               props.onChangeLevel4?.({days_count:el.days_count})
             }}
          >
            {el.title}
            {/*<div>{el.title}</div>*/}
          </div>

              <div
                  css={css`
                    font-size: 12px;
                  `}
              >£{el.price_per_meal}/per meal</div>

          {((!el?.discount_percent) || (0===el.discount_percent))?null:
          <div   css={css`
            position: absolute;
            padding-bottom: 50px;
            padding-left: 30px;
          `}
                 onClick={()=>{
                   props.onChangeLevel4?.({days_count:el.days_count})
                 }}
          >
              <div css={css`
                //AA7CF3
                background-color: ${(el.days_count===props.state.days_count)?color_main:'#AA7CF3'} ;
                border-radius: 50px;
                padding-left: 5px;
                padding-right: 5px;
                color:white;
                font-size: 12px;
              `}
                   title={'discount for days'}
              >
                -{el.discount_percent}%
              </div>

          </div>
          }

      </div>
    })}
  </div>)
}

export {
    css_column_top_center,
    css_column_spacebetween,
    css_column_right,
    css_row_spacebetween,
    css_column_left,
    css_row_left, css_row_start,css_column_center,css_row_center}
export default TargetFilterLevel4_Days
