import React, {useState} from "react";
import {Button, IconButton, Slider, Stack} from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FullScreenToggler from "./FullScreenToggler";
import {VolumeDownRounded, VolumeOff, VolumeUp, VolumeUpRounded} from "@mui/icons-material";
const progressSlider = (props:any) => {

    return (

        <Slider id={'progressSlider'}
            // size="medium" // TODO
                size="small" // TODO

                sx={{
                    padding:'0px',
                    color: '#fff', // TODO
                    // padding:'0px',
                    // heigth:'30px',
                }}

                max={props.state.duration}

                step={props.state.step_seek_seconds}
                value={props.state.played_seconds}
                onChange={(e, n) => {

                    console.log('=== volumeSlider ',n)

                    props.set_state((prev_state: any) => {
                        return {
                            ...prev_state,
                            slider_played_seconds:n
                        }
                    })

                    props.player_ref.current.seekTo(n);


                }}
            // aria-label="Volume"
        />

    );
};

const SliderProgress = (props:any) => {

    return(

        <Stack direction="row" alignItems="between"
            sx={{
                maxWidth:'100%',
                // width:props.state.playerXY.width,
                ml:'12px',mr:'12px',
            }}
        >
            {progressSlider(props)}
        </Stack>

    )
}

export default SliderProgress
