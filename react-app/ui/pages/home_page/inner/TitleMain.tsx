

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React from "react";

import {SpacerHome} from "../AppHomeFinal";

const styleTitleMain = css`
  align-self: stretch;
  padding: 10px;
  color: #000;
`;
const TitleMain = (p:any) => {

    const lanscape_mode=(window.innerWidth>640)

    return (<>
        {(p.nospaces)?null:<SpacerHome/>}
        <header css={css` ${styleTitleMain};
              font: 800 ${(lanscape_mode)?'3vw':'5.5vw'} Inter;
              text-align: ${(lanscape_mode)?'left':'center'};
        `}
        >
            {p.title}
        </header>
        {(p.nospaces)?null:<SpacerHome/>}
    </>);
};

export default TitleMain
