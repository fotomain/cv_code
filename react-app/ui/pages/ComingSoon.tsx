

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React from "react";
import {GlobalsContext} from "../../system_code/context_globals/globals_context";
import {css_column_center} from "./home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";
import H16 from "../../business/entrance/steps/H16";

const ComingSoon = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    return(

        <div css={css`${css_column_center}`} id={'div_ComingSoon'}>

            <H16>Coming Soon!</H16>

        </div>
    )
};

export default ComingSoon

