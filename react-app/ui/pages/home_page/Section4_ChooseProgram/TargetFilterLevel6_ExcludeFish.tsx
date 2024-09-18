
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


import {FormControlLabel, Switch} from "@mui/material";
import React from "react";


import { pink } from '@mui/material/colors';
import {alpha, useTheme} from '@mui/material/styles';
import {css_row_center} from "./TargetFilterLevel4_Days";
import {is_empty} from "../../../../system_code/code_global/GlobalFunctions";
import {free_space_if_no_largest_width, largest_width} from "../../../../AppInitTheme";
const TargetFilterLevel6_ExcludeFish = (props:any) => {

    console.log('=== TargetFilterLevel6_ExcludeFish ',props)

    // const landscape_mode= true //(window.innerWidth < largest_width)

    const theme = useTheme();

    // sss1
    return(<div css={css` ${css_row_center}; height:150px;
    ${' padding-left:'+free_space_if_no_largest_width+'px; padding-right:'+free_space_if_no_largest_width+'px; '} 
  `}>
      <FormControlLabel
          sx={{minWidth: '150px'}}
          control={
              <Switch checked={props.state.exclude_fish}
                      onChange={(e,checked)=>{
                          console.log('=== TargetFilterLevel6_ExcludeFish ',e.target.value)

                          props.set_state((prev_state: any) => {return {...prev_state,
                              exclude_fish: checked
                          }})
                      }}
                          sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: pink[600],
                                  '&:hover': {
                                      backgroundColor: alpha(pink[600],
                                          0 //theme.palette.action.hoverOpacity
                                      ),
                                  },
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: pink[600],
                              },
                          }}
              />
          }
          label="Exclude fish"
      />

      <div id='div_line_more'
           css={css` width:100%;  border-bottom:1px solid; border-bottom-color: ${theme.palette.primary.main} ` }>
      {/*<div id='div_line_more' style={{position:'relative', width:'100%', paddingTop:'0px', paddingBottom:'0px', color:theme.palette.primary.main,borderBottom:'1px solid'}}>*/}
          <p
              css={css` overflow-y:auto; height:60px; width:100%; text-align: left; margin-top:0; margin-bottom: 0; `}
          >
              Excluding fish from your diet can be considered unwise for several reasons:

              1. <b>Nutritional Benefits:</b> Fish is rich in essential nutrients, including high-quality protein, omega-3 fatty acids (EPA and DHA), vitamins (such as vitamin D and B vitamins), and minerals (like iodine and selenium). These nutrients are important for overall health, including heart and brain health.

              2. <b>Heart Health:</b> Omega-3 fatty acids found in fish can help reduce the risk of heart disease by lowering inflammation, reducing blood pressure, and improving cholesterol levels.

              3. <b>Brain Function:</b> Omega-3s are also important for brain health and cognitive function. They may help improve memory and mood and reduce the risk of neurodegenerative diseases.

              4. <b>Reduced Risk</b>of Chronic Diseases**: Regular consumption of fish is associated with a lower risk of certain chronic diseases, including stroke, type 2 diabetes, and some types of cancer.

              5. <b>Diverse Diet:</b> Including fish in your diet adds variety, which can help make meals more enjoyable and ensure you're getting a range of nutrients.

              If you're considering excluding fish for dietary reasons (e.g., allergies, ethical reasons, or dietary preferences), it's essential to find alternative sources of the nutrients fish provide. Plant-based sources of omega-3s, such as flaxseeds and walnuts, can be found, but they contain a different type of omega-3 (ALA) that doesn't have all the same benefits as those found in fish. Consulting with a healthcare provider or a nutritionist can help ensure you're meeting your nutritional needs.
              {/*`}*/}
          </p>
          <div css={css` color: ${theme.palette.primary.main}; cursor:pointer; `}
          >
              more...
          </div>
      </div>

  </div>)
}

export default TargetFilterLevel6_ExcludeFish
