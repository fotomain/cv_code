
import {ListItemText, Stack} from "@mui/material";
import React from "react";

import {GlobalsContext} from "../../../../../system_code/context_globals/globals_context";

const FireLogoTitle = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    return (
        <Stack
               id={'logo_title'}
               direction={'row'}
               justifyContent={'center'}
               alignItems={'center'}
               flexWrap={'nowrap'}
               sx={{
                   //TODO GLOBAL = TOPBAR HEIGTH
                   height:'70px',
               }}
        >
            {/*<ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>*/}

            {(props.logo_image_value)?props.logo_image_value():<></>}

            {(props.logo_image_path)?<img
                style={{
                    marginTop: '-4px',
                    marginLeft: (!global_props.navigation.drawer_left_show_wide) ? '0px' : '20px',
                }}
                width={'20px'}
                height={'20px'}
                src={require('' + props.logo_image_path)} alt="fire best logo"
            />:<></>}

            {!global_props.navigation.drawer_left_show_wide?'':
                <ListItemText
                    sx={{ ml: '6px' }}
                    primary={props.title}
                    primaryTypographyProps={{
                        // which font used in firebase logo
                        color:'white',
                        fontFamily:'google-public-sans-light',
                        fontSize: 21,
                        fontWeight: 300,
                        letterSpacing: -1,
                    }}
                />
            }
        </Stack>
    );
}

export default FireLogoTitle
