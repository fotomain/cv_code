

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/styles";
import {color_main} from "../../../ui/pages/home_page/AppHomeFinal";

const SpinnerFast = (props:any) => {

    //=== DOC https://nikitahl.github.io/svg-circle-progress-generator/
    //=== DOC CONVERT SVG https://www.svgviewer.dev/svg-to-react-jsx

    const [state, set_state] = useState({
        nSeconds:0
    });

    useEffect(() => {

        setInterval(()=>{
            set_state((prev_state: any) => {return {...prev_state,
                nSeconds:prev_state.nSeconds + 1,
            }})

        },50)

        return () => {

        };
    }, []);


  const theme=useTheme()

  return(<>

      <svg
          width={80}
          height={80}
          view-box="-10 -10 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
              transform: "rotate(-90deg)",
          }}
          {...props}
      >
          <circle
              r={25}
              cx={40}
              cy={40}
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth={10}

              strokeDasharray="188.4px"
              strokeDashoffset={0}
          />
          <circle
              r={25}
              cx={40}
              cy={40}
              fill="transparent"
              stroke={(theme)?theme.palette.primary.main:color_main}
              strokeWidth={10}

              strokeLinecap="round"

              strokeDasharray="188.4px"
              strokeDashoffset={(50-state.nSeconds*30)+"px"}

          />
      </svg>

      {(props?.no_bottom_space)?null:
        <div css={css` height: 10vh; width: 100%; `}></div>
      }

        {/*<div css={css` background-color:red; height: 10vh; width: 100%; ${css_column_center} `}></div>*/}

  </>)
}
export default SpinnerFast
