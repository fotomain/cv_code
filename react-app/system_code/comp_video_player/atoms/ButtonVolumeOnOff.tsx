import React, {useState} from "react";
import {Button, IconButton, Stack} from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FullScreenToggler from "./FullScreenToggler";
import {VolumeOff, VolumeUp} from "@mui/icons-material";

const volumeOnOff = (props:any) => {
    return(
        <div
            style={{paddingBottom:'0.5px'}}
        >
            {(props.state.muted)
                ?
                <IconButton
                    onClick={()=>{

                        props.set_state((prev_state: any) => {
                            return {
                                ...prev_state,
                                muted:false
                            }
                        })


                    }}
                >
                    <VolumeOff  sx={{
                        fontSize:props.state.playerXY.iconSize,
                        color: 'white'}}
                    />
                </IconButton>
                :
                <IconButton
                    onClick={()=>{
                        props.set_state((prev_state: any) => {
                            return {
                                ...prev_state,
                                muted:true
                            }
                        })
                    }}
                >
                    <VolumeUp  sx={{
                        fontSize:props.state.playerXY.iconSize,
                        color: 'white'}}
                    />
                </IconButton>

            }
        </div>
    )
}

const ButtonVolumeOnOff = (props:any) => {

    return(

        <Stack
               id={'volumeOnOff-wrap'}
               // sx={{mr:'16px'}}
               direction="row" alignItems="center"
        >
            {volumeOnOff(props)}
        </Stack>

    )

}

export default ButtonVolumeOnOff
