

/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

import LogoImage from "../../../system_code/comp_navigation/LogoImage";
import H16 from "./H16";
import React from "react";

import {css_column_top_center} from "../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";

const LayoutBrand = (props:any) => {

    let landscape_mode=(window.innerWidth>812)

    return (

        <div className={'w-full h-full overflow-auto flex flex-col justify-top items-center '}>
            <div
                css={css`
                  padding-bottom: 75%; 
                  //background-color: red;
                  ${css_column_top_center}
                `}
            >
                {(landscape_mode)?<LogoImage/>:null}
                <H16>{props.main_message}</H16>
                {props.children}
            </div>
        </div>
    )
}
export default LayoutBrand
