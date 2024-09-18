import React, {useState} from "react";
import {Button, IconButton, Stack} from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";

const renderPlayButton = (p:any) => {
    return (
        p.state.is_playing ? (
            <IconButton onClick={() => {
                console.log('set_is_stopped')
                p?.set_is_stopped()
            }}>
                <PauseRounded sx={{
                    fontSize:p.state.playerXY.iconSize,
                    color: 'white',
                }} />
            </IconButton>
        ) : (

            <IconButton onClick={() => {
                console.log('set_is_playing')
                p?.set_is_playing()

            }}>
                <PlayArrowRounded sx={{
                    fontSize:p.state.playerXY.iconSize,
                    color: 'white'
                }} />
            </IconButton>
        )

    );
};

const ButtonPlayVideo = (props:any) => {

    return(
        <Stack direction="row" alignItems="center"
            sx={{mb:'3px'}}
        >
            {renderPlayButton(props)}
        </Stack>
    )

}

export default ButtonPlayVideo
