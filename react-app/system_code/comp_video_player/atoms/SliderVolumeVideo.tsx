import React, {useState} from "react";
import {Button, IconButton, Slider, Stack} from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FullScreenToggler from "./FullScreenToggler";
import {VolumeDownRounded, VolumeOff, VolumeUp, VolumeUpRounded} from "@mui/icons-material";


const volumeSlider = (props:any) => {
    return (
        <Stack  direction="row" sx={{
            // width: '150px', // TODO
            width: '100%', // TODO
            px: 1}} alignItems="center">

            {/*<VolumeOff  sx={{fontSize: '1.5rem', color: 'white'}}/>*/}

            <VolumeDownRounded sx={{fontSize: '1.5rem', color: 'white'}}
                               onClick={()=>{
                                   // let new_volume =props.state.volume-0.1
                                   // if(new_volume<0) new_volume=0
                                   // props.set_state({...props.state, volume: new_volume}) //gl

                                   props.set_state((prev_state: any) => {
                                       return {
                                           ...prev_state,
                                           volume:(0<=(prev_state.volume-0.1))
                                               ?(prev_state.volume-0.1)
                                               :0
                                       }
                                   })

                               }}
            />

            <Slider id={'volumeSlider'}
                // size="medium" // TODO
                    size="small" // TODO
                    sx={{

                        color: '#fff', // TODO
                        ml:'2px',mr:'2px',
                    }}

                    max={1}
                    step={0.01}
                    value={props.state.volume}
                    onChange={(e, n) => {
                        console.log('=== volumeSlider ',n)

                        props.set_state((prev_state: any) => {
                            return {
                                ...prev_state,
                                volume:n
                            }
                        })


                    }}
                    aria-label="Volume"
            />
            <VolumeUpRounded sx={{fontSize: '1.5rem', color: 'white'}}
                             onClick={()=>{
                                 props.set_state((prev_state: any) => {
                                     return {
                                         ...prev_state,
                                         volume:(1<=(prev_state.volume+0.1))
                                             ?1
                                             :prev_state.volume+0.1
                                     }
                                 })

                             }}

            />
        </Stack>
    );
}

const SliderVolumeVideo = (props:any) => {

    return(

        <Stack
            display={(props.state.playerXY.width<250)?"none":'flex'}
            direction="row" alignItems="center" //spacing={6}
               sx={{width:"100%",
                   minWidth:(!props.state.full_scrreen_video)?'100px':'150px',
                   maxWidth:'260px'}}
        >
            {volumeSlider(props)}
        </Stack>

    )

}

export default SliderVolumeVideo
