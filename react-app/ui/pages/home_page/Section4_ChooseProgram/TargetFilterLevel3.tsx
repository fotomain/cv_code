

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import {FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material";
import React from "react";
import {color_main} from "../AppHomeFinal";
import TargetFilterLevel4_Days, {css_column_top_center, css_row_start} from "./TargetFilterLevel4_Days";
import TargetFilterLevel6_ExcludeFish from "./TargetFilterLevel6_ExcludeFish";


const get_media_number = () => {

    const largest_width = 1280

    let media_number=0
    const cw = window.innerWidth
    switch (true) {
        case (cw<640) : {
            media_number=0
            break
        }
        case (640<=cw && cw<768) : {
            media_number=1
            break
        }
        case (768<=cw && cw<1024) : {
            media_number=2
            break
        }
        case (1024<=cw && cw<largest_width) : {
            media_number=3
            break
        }
        case (largest_width<=cw ) : {
            media_number=4
            break
        }
    }

    return media_number

}
const TargetFilterLevel3 = (props:any) => {

    const styles = (theme:any) => ({
        radio: {
            '&$checked': {
                color: '#4B8DF8'
            }
        },
        checked: {}
    })

    const landscape_mode= (window.innerWidth>812)

    // sss1
    return(
      <div
          css={css`
                width:100%;
                gap:10px;
                ${(landscape_mode)?css_row_start:css_column_top_center}; 
                flex-wrap: wrap;
            `}
      >

          <FormControl>
              <RadioGroup
                  // style={{ width: 'auto' }}
                  // row={true}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={props.state.days_mode}
                  onChange={(e)=>
                  {
                      // localStorage.setItem('filters_sort_1value',e.target.value)
                      props?.onChangeLevel3(e)
                  }}
              >
                  {/*date, id, include, title, slug, price, popularity*/}
                  <Grid
                      container direction='row'
                      justifyContent={'start'}
                      alignItems={'start'}
                      sx={{paddingLeft:'20px'}}
                  >

                      <FormControlLabel  value="days_full_week" control={<Radio  sx={{
                          '&, &.Mui-checked': {
                              color: color_main,
                          },
                      }} />}
                        label="All days" />

                      <FormControlLabel  value="days_working" control={<Radio   sx={{
                          '&, &.Mui-checked': {
                              color: color_main,
                          },
                      }}/>}
                        label="Working days" />


                  </Grid>
              </RadioGroup>
          </FormControl>

          <TargetFilterLevel4_Days {...props} />

      </div>
  )
}

export {get_media_number}
export default TargetFilterLevel3
