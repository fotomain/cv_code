import React, {useState} from "react";
import {Button, IconButton, Stack} from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FullScreenToggler from "./FullScreenToggler";


const ButtonFullScreen = (props:any) => {

    return(

        <Stack
               id={'ButtonFullScreen'}
               direction="row" alignItems="center" //spacing={6}
               // sx={{
               //     mr:"18px",
               // }}
        >
            <FullScreenToggler
                {...props}
                ref_element={'onMouse_ref_wrapper'} //TODO F( REF )
                doFull={()=>
                {
                    console.log('=== contentElement doFull ')
                    props.set_state({...props.state, full_scrreen_video: true})
                }
                }
                doSmall={()=>
                {
                    console.log('=== contentElement soSmall ')
                    props.set_state({...props.state,full_scrreen_video:false})
                }
                }
            />
        </Stack>

    )

}

export default ButtonFullScreen
