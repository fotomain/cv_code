import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {FastForwardSharp, FastRewind, PlayArrowRounded} from "@mui/icons-material";
import {tw_row_center} from "../tw/tw_tools";
import PauseRounded from "@mui/icons-material/PauseRounded";

const VP_FastContolsVideo = (props:any) => {


    return(

            <>

                <FastRewind sx={{ fontSize: '36px', color: 'white' }}
                        onClick={()=>{

                            const tshift =  -1*((props.step_seek_seconds)?props.step_seek_seconds:10)
                            props.ref_player.current?.seekTo(props.state.played_seconds + tshift, 'seconds')

                        }}
                />

                {(props.state.is_playing)
                    ?
                    <PauseRounded sx={{ fontSize: '36px', color: 'white' }}
                              onClick={()=>{

                                  props.set_state((prev_state: any) => {
                                      return {
                                      ...prev_state,
                                      is_playing: false,
                                      // light:true
                                    }
                                  })
                              }}
                    />
                    :
                    <PlayArrowRounded sx={{ fontSize: '36px', color: 'white' }}
                              onClick={()=>{
                                  props.set_state({...props.state,is_playing:true,light:false}) }
                              }
                    />
                }

                <FastForwardSharp sx={{fontSize: '36px', color: 'white'}}
                          onClick={()=>{

                              const tshift =   ((props.step_seek_seconds)?props.step_seek_seconds:10)
                              props.ref_player.current?.seekTo(props.state.played_seconds + tshift, 'seconds')

                          }}
                />

                {/*<div style={{backgroundColor:'yellow',color:'brown',}}> VP_FastContolsVideo </div>*/}
                {/*<div style={{backgroundColor:'yellow',color:'brown',}}> VP_FastContolsVideo </div>*/}
                {/*<div style={{backgroundColor:'yellow',color:'brown',}}> VP_FastContolsVideo </div>*/}

            </>

    )
}

export default VP_FastContolsVideo
