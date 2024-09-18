
/** @jsxImportSource @emotion/react */

import { IonIcon } from '@ionic/react';
import React from 'react';
import { css } from '@emotion/react';
import {css_row_left} from "../Section4_ChooseProgram/TargetFilterLevel4_Days";


const stepContainerStyles = css`
  position:relative; ///arrows111
  display: flex;
  //min-width: 240px;
  flex-direction: column;
  justify-content: flex-start;
`;

const iconContainerStyles = css`
  display: flex;
  width: max-content;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
`;

const progressImageContainerStyles = css`
  //background-color: lightcyan;
  position: absolute; ///arrows111
  display: flex;
  width: 120%;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
`;


const titleContainerStyles = css`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 15px;
  color: #000;
  justify-content: flex-start;
  padding-left: 10px;
`;

const titleStyles = css`
  leading-trim: both;
  text-edge: cap;
  align-self: stretch;
  margin: auto 0;
`;

const progressImageStyles = css`
  aspect-ratio: 5.41;
  object-fit: contain;
  object-position: center;
  width: max-content;
  align-self: stretch;
  min-width: 240px;
  flex: 1;
  flex-basis: 0%;
  margin: auto 0;
  
`;

const iconStyles = css`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 48px;
  height: 48px;
  align-self: stretch;
  margin: auto 0;
`;

const ProcessStep = (props:any) => {


    const { data, icon, title, progressImage } = props

    const row_mode=(window.innerWidth>640)

    return (

        <div css={css` ${stepContainerStyles};
              ${(row_mode)?' width:max-content; ':' width:80%; padding-left:20px; '};
        `} >
            <div css={css` ${css_row_left} `} >
                <div id='div_icon' css={iconContainerStyles}>
                    {/*<img css={css` ${iconStyles} `} src={require('./i1.svg')} alt={`${title} icon`} />*/}
                    {icon}
                </div>
                <div id='div_title_process' css={css` ${titleContainerStyles};
                      font: 700 ${(row_mode)?'1.5vw':'1.5vh'}  Inter, sans-serif;
                `}>
                    <h2 css={titleStyles}>{title}</h2>
                </div>
            </div>
            {progressImage && row_mode && (
                <div id='div_arrow'
                     css={css` ${progressImageContainerStyles};
                        ${(!data.css_arrow)?null:data.css_arrow}};

                     `}
                >
                    {progressImage}
                    {/*<img css={css` ${progressImageStyles}  `}*/}
                    {/*     src={progressImage} alt={`${title} progress`} />*/}
                </div>
            )}
        </div>
    );
};

export {iconStyles}
export default ProcessStep
