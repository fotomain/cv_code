

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React from "react";
import {css_column_center} from "./ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";
import TitleMain from "./ui/pages/home_page/inner/TitleMain";
import H16 from "./business/entrance/steps/H16";

const AppPage404 = (props:any) => {


    return(

        <div css={css`${css_column_center}`} id={'div_ComingSoon'}>

            <TitleMain title={'Page not found...'} />
            <H16>Status code 404</H16>

        </div>
    )
};

export default AppPage404

