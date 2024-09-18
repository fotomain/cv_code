

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'



import {useEffect} from "react";
import {color_main} from "../AppHomeFinal";
import {css_row_center, css_row_start} from "./TargetFilterLevel4_Days";


const DaysNavigation = (props:any) => {


    useEffect(() => {

        console.log('=== props.state.days_mode ',props.state.days_mode)


        return () => {

        };
    }, [props.state.meal_days_list]);


  return(
  <div

      css={css`
                width:100%;
                gap:5px;
                ${css_row_start};
                flex-wrap: nowrap;
            `}

  >

      {props.state.meal_days_list.map((el:any,kk:number)=>{
          return <div key={kk} css={css`
            ${css_row_center};
            flex-grow:1;
        `}>

              <div
                  css={css`
                  ${css_row_center};
                    flex-grow:1;
                   position: relative;
                   padding-left: 10px;
                   padding-right: 10px;
                   padding-top: 10px;
                   padding-bottom: 10px;
                  
                  
                  color: ${(el.day_number===props.state.day_number)?color_main:'black'} ;
                  
                  border-bottom: ${(el.day_number===props.state.day_number)?'3px solid ':'3px solid '} ;
                  border-color: ${(el.day_number===props.state.day_number)?color_main:'lightgray'} ;
                  
                   
                  cursor: pointer;
                    
              `}
                  onClick={()=>{
                      // console.log('=== el.day_number ',el.day_number)
                      props.onChangeLevel5?.({day_number:el.day_number})
                  }}
              >
                  {el.title}
              </div>

          </div>
      })}
    </div>

  )
}

export default DaysNavigation
