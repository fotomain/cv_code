

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React from "react";

import {SpacerHome} from "../AppHomeFinal";

const styleTitleMain = css`
  align-self: stretch;
  padding: 10px;
  color: #000;
`;
const SubTitleMain = (p:any) => {

    const lanscape_mode=(window.innerWidth>640)

    return (<>
        {(p.nospaces)?null:<SpacerHome/>}
        <header css={css` ${styleTitleMain};
              //!!!
              font: 600 ${(lanscape_mode)?'2.2vw':'4.0vw'} Inter;
              text-align: ${(lanscape_mode)?'left':'center'};
        `}
        >
            {p.title}
        </header>
        {(p.nospaces)?null:<SpacerHome/>}
    </>);
};

export default SubTitleMain
