import React, {useState} from "react";
import {Button, IconButton, Stack} from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FullScreenToggler from "./FullScreenToggler";
import {VolumeOff, VolumeUp} from "@mui/icons-material";

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
const settingsPress = (props:any) => {
    return(
        <IconButton
            // style={{paddingBottom:'0.5px'}}
            onClick={()=>{

                props.set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        open_player_settings:true
                    }
                })


            }}

        >
                <SettingsOutlinedIcon  sx={{
                        padding:'1px',
                        fontSize:props.state.playerXY.iconSize,
                        color: 'white'
                    }}
                />


        </IconButton>
    )
}

const ButtonSettingsVideo = (props:any) => {

    return(

        <Stack
               id={'volumeOnOff-wrap'}
               // sx={{mr:'16px'}}
               direction="row" alignItems="center"
        >
            {settingsPress(props)}
        </Stack>

    )

}

export default ButtonSettingsVideo
