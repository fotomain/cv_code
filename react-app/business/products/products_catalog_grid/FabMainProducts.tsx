

import React, {useContext, useEffect, useState} from "react";
import {Badge, Button, Fab} from "@mui/material";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import {CatalogContext} from "./Catalog.1.Shop";

const FabMainProducts = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)
    console.log('=== xy_data FabMainProducts drawer_state',drawer_state.show_fab_filters)
    console.log('=== xy_data FabMainProducts drawer_state',drawer_state)

    useEffect(() => {
        console.log('=== t12 drawer_state.show_fab_filters ',drawer_state.show_fab_filters)
        return () => {

        };
    }, [drawer_state.show_fab_filters]);

    return(<>
        {(!drawer_state.show_fab_filters)?null:
        <Badge badgeContent={3} color="secondary" id={'badge'}

               sx={{
                   // postiton:'sticky',
                   // display:{ xs: "block", lg: "none" },
                   position:'fixed',
                   // top: '50px',
                   // left: '50px',
                   top: drawer_state.fab_main_top+'px',
                   left: drawer_state.fab_main_left+'px',
               }}
        >

            <Fab id={'div_fab'}
                 variant="extended"
                 color="primary"
                 aria-label="add"
                 title={(drawer_state.co1Visible)?'Close filters bar':'Open filters bar'}

                 onClick={()=>{
                     console.log('=== drawer_state.drawerMode',drawer_state.drawerMode)
                     if('drawer_mode_over'===drawer_state.drawerMode){
                         drawer_set_state((prev_state: any) => {return {...prev_state,
                             co1Visible: false,
                             drawerOverOpen: !prev_state.drawerOverOpen,
                         }})
                     }else{
                         if(drawer_state.co1Visible){
                             drawer_set_state((prev_state: any) => {return {...prev_state,
                                 co1Visible: false,
                                 drawerMinMaxVisible: false,
                             }})
                         }else{
                         drawer_set_state((prev_state: any) => {return {...prev_state,
                             co1Visible: true,
                             drawerMinMaxVisible: true,
                         }})}
                     }
                 }}

            >
                {(
                    ('drawer_mode_over'===drawer_state.drawerMode)?drawer_state.drawerOverOpen:
                        ('drawer_mode_minmax'===drawer_state.drawerMode)?drawer_state.drawerMinMaxVisible:
                            false
                )?<CloseFullscreenIcon/>:<FilterListOutlinedIcon/>}
            </Fab>
        </Badge>
        }

    </>)

}

export default FabMainProducts
