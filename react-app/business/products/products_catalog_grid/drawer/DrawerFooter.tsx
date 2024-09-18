

import * as React from "react";
import {Box} from "@mui/material";
import CloseButton from "./buttons/CloseButton";
import {useContext} from "react";
import {CatalogContext} from "../Catalog.1.Shop";

const DrawerFooter = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    const show_icon = true
    const show_title = drawer_state.co1Wide

    if(!drawer_state.show_close_drawer_button) return null

    return(<Box id='div_close_drawer_button_footer'  sx={{display:'flex', flexDirection:'row', alignItems:'center'}} >

            {(!show_icon)?null:
                <CloseButton {...props} />
            }

            {(!show_title)?null:
                <Box id={'div_title_close'} sx={{display:'flex', flexDirection:'row', alignItems:'center',
                    fontFamily: 'Inter',
                    flexGrow:1,
                }}
                     onClick={()=>{
                         props?.handleDoClose?.()
                     }}
                >
                    Close
                </Box>
            }

        </Box>
    )
}

export default DrawerFooter
