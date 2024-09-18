
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useContext} from "react";
import {CatalogContext} from "../../Catalog.1.Shop";

const ToggleWidthButton = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    const isWide = (drawer_state.co1Wide)

    return(
        <IconButton id={'div_toggle_width_drawer'}
                    ref={props.ref_toggle_drawer}
                    onClick={()=> {
                        if(isWide) {
                            drawer_set_state((prev_state: any) => {return {...prev_state,
                                co1Wide: false,
                            }})
                            localStorage.setItem('co1Wide','false')
                        }
                        else{
                            drawer_set_state((prev_state: any) => {return {...prev_state,
                                co1Wide: true,
                            }})
                            localStorage.setItem('co1Wide','true')
                        }
                    }}
            // sx={{marginLeft: (isWide)?'0px':'15px'}}
        >
            {(isWide)?<ChevronLeftIcon sx={{marginRight: '0px'}} />:<ChevronRightIcon sx={{marginRight: '0px'}}/>}
        </IconButton>

    )
}

export default ToggleWidthButton
