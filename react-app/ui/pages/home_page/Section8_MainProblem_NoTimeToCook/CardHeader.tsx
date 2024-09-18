
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';
import Icon_MainProblem from "./Icon_MainProblem";
import {largest_width} from "../../../../AppInitTheme";

const headerStyle = css`
  display: flex;
  min-height: 33px;
  width: 100%;
  padding-right: 10px;
  align-items: flex-start;
  justify-content: space-between;
`;

const titleStyle = css`
  color: #000;
  font-size: ${(window.innerWidth>=largest_width)
          ?' 1.0vw '
          :(window.innerWidth>=700)?'2.0vw':'3.0vw'};
  font-weight: 700;
  font-family: Inter, sans-serif;
`;

const logoContainerStyle = css`
  display: flex;
  min-height: 24px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: flex-start;
`;

const logoStyle = css`
  aspect-ratio: 3.48;
  object-fit: contain;
  object-position: center;
  width: 80px;
`;

const CardHeader= () => {
    const landscape_mode=(window.innerWidth>window.innerHeight)
    return (
        <header css={css` ${headerStyle}
                gap: ${(landscape_mode)?' 40px 82px; ':' 2px 2px; ' } 
        `}>
            <h1 css={titleStyle}>...no time to cook</h1>
            <div css={logoContainerStyle}>
                {Icon_MainProblem({id: 1})}
                {/*<img css={logoStyle} src={require("./instagram_logo.svg")} alt="Company logo" />*/}
            </div>
        </header>
    );
};

export default CardHeader;
