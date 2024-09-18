
/** @jsxImportSource @emotion/react */


import { css } from '@emotion/react'
// npm install --save @emotion/react

import React, {useEffect, useState} from "react";
import AppearIt from "./inner/AppearIt";

const Section2_Manifest = ({className = ""}) => {

    const css_hidden=css` opacity:0; transform: translate3d(0, 100px, 0); `
    const css_visible=css` opacity:1; transition-duration: 2s; transform: translate3d(0, 0px, 0); `

    const [state, set_state] = useState({
        do_visible: false,
    });

    useEffect(() => {

        setTimeout(()=>{
            set_state((prev_state: any) => {return {...prev_state,
                do_visible: true,
            }})

        },1000)

        return () => {

        };
    }, []);


    return (
        // <AppearIt once mode='fade-up' duration={1} >
        <div css={css`
                  
                  ${css_visible}
                  
                  //${(state.do_visible)?css_visible:css_hidden}
                  
                  width: 1280px;
                  background-color: #f0f5f0;
                  color: #000;

                  font-size: 30px;
                  font-family: 'Inter';

                  //padding: 40px 20px;

                  max-width: 100%;
                  display: flex; flex-direction: row;  align-items: flex-start; justify-content: center; box-sizing: border-box;
                  text-align: center;

                  //line-height: normal;
                  //letter-spacing: normal;
                `}

            onClick={()=>{
                const elAncor = document.getElementById('ancor_choose_target_program')
                if (elAncor) elAncor.scrollIntoView();
            }}

        >
            <div
                css={css`
                  height: max-content;
                  padding:40px;
                  width: 901px;
                  position: relative;
                  text-transform: uppercase;
                  display: inline-block;
                  max-width: 100%;
                  @media screen and (max-width: 767px) {
                    font-size: 24px;
                  }
                  @media screen and (max-width: 359px) {
                    font-size: 18px;
                  }
                `}
            >
                <b css={css``}>
          <span css={css``}>
            <span
                css={css`
                  text-decoration: underline;
                `}
            >{`nutrition `}</span>
          </span>
                </b>
                <b css={css``}>
                <span css={css``}>to be creative,</span>
                    <span
                        css={css`
                          color: #000;
                        `}
                    >{` `}</span>
                    <span
                        css={css`
                          color: #6cd04c;
                        `}
                    >
            successful
          </span>
                    <span
                        css={css`
                          color: #000;
                        `}
                    >{` `}</span>
                    <span
                        css={css`
                          color: #000;
                        `}
                    >{`and `}</span>
                </b>
                <span
                    css={css`
                      color: #000;
                    `}
                >
          <i
              css={css`
                font-weight: 700;
                font-family:'Inter';
              `}
          >
            intensive
          </i>
          <b
              css={css`
                font-family: 'Inter';
              `}
          >
            ...
          </b>
        </span>
            </div>
        </div>

    // </AppearIt>
    )
};

export default Section2_Manifest




