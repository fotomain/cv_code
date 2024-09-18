

/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';


import React from "react";
import {GlobalsContext} from "../../system_code/context_globals/globals_context";

import {css_row_center} from "./home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";
import {largest_width} from "../../AppInitTheme";
import Section14_FooterHome from "./home_page/Section14_FooterHome";

const LayoutCustom = (props:any) => {


    const { global_props,global_dispatch } = React.useContext(GlobalsContext);

    const iw_=global_props.current_device.work_screen_width
    console.log('=== iw_ 555 ',iw_)

    return(

    //=== style={{overflowY:'scroll'}}
    <div id={'div_layout_custom'}
         // className={ iw_ +" flex-1 flex flex-col justify-top items-start overflow-visible"}
         className={ iw_ +" flex-1 flex flex-col justify-top items-center overflow-visible"}
    >
        {/*<GlobalShowContentCall/>*/}
        {props.children}
    </div>
    )
};

export default LayoutCustom;

