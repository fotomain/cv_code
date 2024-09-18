
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import {Box} from "@mui/material";
import CloseButton from "./buttons/CloseButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RefreshFrom1StPageButton from "./buttons/RefreshFrom1StPageButton";
import SetDefaultsButton from "./buttons/SetDefaultsButton";
import ToggleWidthButton from "./buttons/ToggleWidthButton";
import {useContext} from "react";
import {CatalogContext} from "../Catalog.1.Shop";

const DrawerHeader = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    const { theme, }=props
    const isWide = drawer_state.co1Wide
    let show_icon = (drawer_state.co1Wide && drawer_state.show_close_drawer_button)
    const show_title = drawer_state.co1Wide


    return(
        (!isWide)?<ToggleWidthButton {...props} />
        :
        <Box id='div_drawer_header'  sx={{display:'flex', flexDirection:'row', alignItems:'center'}} >

            {(!show_icon)?null:
                <CloseButton {...props} />
            }

            {(!show_title)?null:
                <Box id={'div_drawer_header_title'} sx={{display:'flex', flexDirection:'row', alignItems:'center',
                    fontFamily: 'Inter',
                    // fontSize: '14px',
                    fontWeight: 600,
                    ...(drawer_state.drawerOverOpen)? {marginLeft: '12px'}:{},
                }} >
                    Filters
                </Box>
            }

            <Box sx={{marginLeft: (isWide)?'auto':'0px'}}>

                <RefreshFrom1StPageButton {...props}  />
                <SetDefaultsButton {...props}  />

                {/*{props.drawer_content_header}*/}
{/*
                <RefreshFrom1StPageButton {...props}  />
                <SetDefaultsButton {...props}  />
*/}
            </Box>

            {!(drawer_state.show_toggle_width_drawer_button)?null:
            <ToggleWidthButton {...props} />
            }

        </Box>
    )
}

export default DrawerHeader
