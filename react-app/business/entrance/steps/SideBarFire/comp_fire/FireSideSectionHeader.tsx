
import React from "react";
import {GlobalsContext} from "../../../../../system_code/context_globals/globals_context";

import {Box} from "@mui/material";

const FireSideSectionHeader = (props:any) => {

    const { global_props } = React.useContext(GlobalsContext);

    return (
            (!global_props.navigation.drawer_left_show_wide) ? <></> :
            <Box sx={{
                boxSizeing: 'content-box',
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: 400,
                // --nav-section-header-color
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: 'roboto-regular',
                paddingTop: '18px', //not 18
                paddingRight: '24px',
                paddingBottom: '20px', //not 20
                paddingLeft: '24px',
                // color:'red',
            }}>
                {/*Project shortcuts*/}
                {props?.title}
            </Box>

    );
}

export default FireSideSectionHeader
