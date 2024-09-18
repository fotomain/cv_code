

import React, {useEffect, useRef, useState} from "react";

import ReactPlayer from "react-player";
import {tw_col_center, tw_col_center_basic, tw_row_center} from "../tw/tw_tools";
import VP_Controls from "./VP_Controls";
import VP_FastContolsVideo from "./VP_FastContolsVideo";
import {Button, createTheme, Stack} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import SettingsDialogWindow from "../../business/products/products_crud_table/modal/YesNoDialog";
import {YESNO_DIALOG_OPEN_ACTION} from "../../system_state/products_state/actions";
import VP_Settings from "./VP_Settings";
import ButtonRipple from "../code_global/button_ripple/ButtonRipple";
import {FastForwardSharp, FastRewind} from "@mui/icons-material";
import {isMouseOverRef} from "../code_global/GlobalFunctions";


const VP_Player = (props:any) => {

    const {
        step_seek_seconds, is_playing, stop_playing_when_seek,
        light, auto_hide_controls, show_controls_on_mouse_move,
        muted,controls_mode_backgroundColor,
        ...other
    } = props


    const ref_rewind_left = React.useRef<HTMLButtonElement>(null);
    const ref_rewind_right = React.useRef<HTMLButtonElement>(null);
    const ref_double_click = React.useRef<HTMLDivElement>(null);

    const initState={

        auto_hide_controls:props.auto_hide_controls,

        show_controls:(props.auto_hide_controls===true)?false:true,
        show_rewind_left:   false,
        show_rewind_right:  false,
        is_playing:props.is_playing,
        light:(props.is_playing)?false:props.light,
        duration:0,
        volume:props.volume,
        muted:props.muted,
        played_seconds:0.0,
        last_start_seconds:0,
        last_pause_seconds:0,
        full_scrreen_video:false,
        was_playing_before_seek:false,
        playerXY:{
            xcenter:0,ycenter:0,
            xstart:0,ystart:0,
            width:0,
            height:0,
        },
        iconSize:'2rem',

        slider_played_seconds:0,

        open_player_settings:false,

    }

    const [state, set_state] = useState(initState);

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 360, // phone
                sm: 640, // tablets
                md: 768, // small laptop
                lg: 1024, // desktop
                xl: 1280, // large screens
            }
        },

        // palette: {
        //   primary: {main: '#6cd04c'},
        //   secondary: {main: '#ffffff'},
        // },

     });


    const ref_wrapper =  React.useRef<HTMLDivElement>(null);
    const ref_controls =  React.useRef<HTMLDivElement>(null);
    const ref_player = useRef<ReactPlayer>(null);

    useEffect(() => {

        let time_out1:any

        if(state.auto_hide_controls  && state.show_controls && state.is_playing)
        {
            time_out1 = setTimeout(() => {
                set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        show_controls: false
                    }
                })

            }, 3000)

        }

        return () => {
            if(time_out1) clearTimeout(time_out1)
        };
    }, [state.show_controls,state.is_playing]);

    const makeXYData_Player = () => {

        const current_ = ref_wrapper.current
        // const current_ = ref_wrapper.current
        console.log('=== ref_current',current_)
        console.log('=== ref_player',ref_player.current)

        if(null===current_) return

        let tdata = {...JSON.parse(JSON.stringify(current_?.getBoundingClientRect()))}
        tdata.xstart = tdata.x + window.scrollX
        tdata.ystart = tdata.y + window.scrollY
        tdata.xend = tdata.x + tdata.width + window.scrollX
        tdata.yend = tdata.y + tdata.height + window.scrollY
        tdata.xcenter = tdata.xstart + tdata.width/2
        tdata.ycenter = tdata.ystart + tdata.height/2

        switch (true) {
            case tdata.width<=100: {
                tdata.iconSize='0.65rem'
                break;
            }
            case (100<tdata.width) && (tdata.width<=150): {
                tdata.iconSize='1.2rem'
                break;
            }
            case (150<tdata.width) && (tdata.width<=250): {
                tdata.iconSize='1.5rem'
                break;
            }
            case (250<tdata.width) && (tdata.width<=360): {
                tdata.iconSize='1.3rem'
                break;
            }
            case (360<tdata.width) && (tdata.width<410): {
                tdata.iconSize='1.3rem'
                break;
            }
            default: {
                tdata.iconSize='2rem'
            }


        }
        //     if(tdata.width<=250){
        //         tdata.iconSize='1.5rem'
        //     }else {
        //         tdata.iconSize = '2rem'
        //     }
        // }

        // tdata.xcenter = (tdata.xend - tdata.xstart)/2
        // tdata.ycenter = (tdata.yend - tdata.ystart)/2

        console.log('=== tdata ref_wrapper',tdata)

        set_state((prev_state: any) => {
            return {
                ...prev_state,
                playerXY:tdata,
            }
        })

    }

    // window.onresize= function() {
    //     console.log("=== window.onresize")
    //     // alert(window.onload)
    //     makeXYData_Player()
    // }


    useEffect(() => {

        makeXYData_Player()

        // const vid=document.getElementById("ReactPlayer")
        // if(vid) vid.disablePictureInPicture = true

        return () => {

        };
    }, [
        window.innerHeight,
        ref_wrapper.current, //!!!!! works
        ref_wrapper.current?.getBoundingClientRect().height, //!!!!! works
        ref_wrapper.current?.getBoundingClientRect().width, //!!!!! works
        state.full_scrreen_video
    ]);

    const useDoubleClick = (p:any) => {

        const {
            ref,
            latency = 300,
            onSingleClick = () => null,
            onDoubleClick = () => null
        } = p

        useEffect(() => {
            const clickRef = ref.current;
            let clickCount = 0;
            const handleClick =  (e:any) => {
                clickCount += 1;

                setTimeout(() => {
                    if (clickCount === 1) onSingleClick(e);
                    else if (clickCount === 2) onDoubleClick(e);

                    clickCount = 0;
                }, latency);
            };

            // Add event listener for click events
            clickRef.addEventListener('click', handleClick);

            // Remove event listener
            return () => {
                clickRef.removeEventListener('click', handleClick);
            };
        });

    };

    useDoubleClick({
        onSingleClick: (e:any) => {

            //ta101
            console.log(e, '=========== single click');
            if(state.is_playing) set_state({...state, is_playing:false})
            else set_state({...state, is_playing:true})

        },
        onDoubleClick: (e:any) => {
            //ta102
            console.log('=========== double click',e);
            //===DOC https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
            // If x is between rect.left and rect.right and y between rect.bottom and rect.top,
            var tshift = 0

            const rect = ref_double_click.current?.getBoundingClientRect();
            if(undefined!==rect) {

                if ((rect.left + rect.width / 2) <= e.clientX) {
                    // goRight
                    tshift = (props.step_seek_seconds) ? props.step_seek_seconds : 10 //gl

                    set_state((prev_state: any) => {
                        return {
                            ...prev_state,
                            show_rewind_right:true
                        }
                    })

                         ref_rewind_right.current?.click()

                            setTimeout(()=>{
                                set_state((prev_state: any) => {
                                    return {
                                        ...prev_state,
                                        show_rewind_right:false
                                    }
                                })

                            },500)


                }
                else {
                    // goLeft
                    tshift = -1 * ((props.step_seek_seconds) ? props.step_seek_seconds : 10)

                    set_state((prev_state: any) => {
                        return {
                            ...prev_state,
                            show_rewind_left:true
                        }
                    })

                         ref_rewind_left.current?.click()

                            setTimeout(()=>{
                                set_state((prev_state: any) => {
                                    return {
                                        ...prev_state,
                                        show_rewind_left:false
                                    }
                                })

                            },500)
                }
                ref_player.current?.seekTo(state.played_seconds + tshift, 'seconds')
            }

        },
        ref: ref_double_click,
        latency: 250
    });


    // 000
    return(
        <div
            className={tw_col_center_basic}
            style={{position:'relative',
                height:state.playerXY.height,
            }} //good layput
        >

        {/*state.open_player_settings*/}

        {/*<ButtonRipple*/}
        {/*    ref={ref_rewind_left}*/}
        {/*    id={'rewind_left'}*/}
        {/*/>*/}

                <SettingsDialogWindow

                    open={state.open_player_settings}
                    width="30%"

                    title={'Player Settings'}
                    text={''}

                    innerComponent={()=>VP_Settings({...props,state,set_state})}

                />

    {(!props.url)
        ?
        <div
            style={{position:'absolute',
                top:'50%', left:'50%', }}
        >
            no url
        </div>
        :
        <Stack id={'onMouse_ref_wrapper'}
             // className={tw_col_center}
             ref={ref_wrapper}
            // className={tw_col_center+' '+' gap-[0px] '}
             style={{
                 position:'absolute',
             }}

             onMouseLeave={()=>{
                 // console.log('=== onMouseLeave ')
                 if(state.auto_hide_controls)
                     set_state({...state,show_controls:false})
             }}
             onMouseMove={()=>{
                 console.log('=== onMouseMove ')

                 if(props.show_controls_on_mouse_move )
                     set_state({...state,show_controls:true})
             }}

               onContextMenu={(e:any)=>{
                   if( isMouseOverRef(e,ref_controls) ){
                       return
                   }
                   e.preventDefault();
                   console.log('=== onContextMenu ')
                   // alert('=== onContextMenu ')
                   set_state((prev_state: any) => {
                       return {
                           ...prev_state,
                           open_player_settings:true
                       }
                   })
               }}

        >
            <div id={'div_onContextMenu'} // for play space only
                 // style={{width:'100%',height:'100%'}}
            >
                {/*========== ReactPlayer*/}
                {/*========== ReactPlayer*/}
                {/*========== ReactPlayer*/}
                {/*sss*/}
                {/*<div>state.playerXY.xcenter {state.duration}</div>*/}
                {/*<div>window.innerHeight {window.innerHeight}</div>*/}
                {/*<div>pl width {Math.round(state.playerXY.width)}</div>*/}
                {/*<div>ps height {Math.round(state.playerXY.height)}</div>*/}
                {/*<div>window.innerHeight {window.innerHeight}</div>*/}
                {/*<div>window.innerWidth {window.innerWidth}</div>*/}
                {/*<div>state.playerXY.xcenter {state.playerXY.xcenter}</div>*/}
                {/*<div>state.playerXY.ycenter {state.playerXY.ycenter}</div>*/}
                {/*<div>state.playerXY.xstart {JSON.stringify(state?.playerXY)}</div>*/}
                {/*<div>state.muted {(state.muted)?'true':'false'}</div>*/}
                {/*<div>state.volume {state.volume}</div>*/}


                <ReactPlayer
                    // disablePictureInPicture={true}
                    id={'ReactPlayer'}
                    ref={ref_player}


                    muted={state.muted}

                    // height={'100%'}
                    height={(!state.full_scrreen_video)?
                            (props.show_height)?props.show_height:'auto'
                        :'auto'
                    }
                    width={(!state.full_scrreen_video)
                        ?
                            (props.show_width)?((props.show_width<100)?100:props.show_width):'auto'
                        :window.screen.width
                    } //' auto not work with base64 '


                    // width={props.show_width}
                    // height={'auto'}

                    style={{
                        // position: 'absolute',
                        // backgroundColor:'red', // gl
                        padding:'0px',
                        marginBottom:'0px',
                        marginTop:'0px',
                        overflow: 'hidden',
                        top: '0',
                        left: '0',
                        // height:'100%',
                        // width:'100%',
                        // height:'100%',
                        // width:props.show_width,
                        objectFit: 'cover',
                        zIndex: -20,
                        opacity: 1,
                    }}

                    // objectFit={'contain'}

                    // top={0}
                    // left={0}
                    // height={'auto'}
                    // width={'auto'}
                    {...other}

                    playing={state.is_playing}
                    volume={state.volume}

                    onPlay={()=> {
                        // alert('=== onPlay reaction')
                        set_state((prev_state: any) => {
                            return {
                                ...prev_state,
                                last_start_seconds:state.duration
                            }
                        })
                    }
                    }

                    onPause={()=> {
                        // alert('=== onPause reaction')
                        set_state((prev_state: any) => {
                            return {
                                ...prev_state,
                                last_pause_seconds:state.duration
                            }
                        })
                    }}

                    onEnded={()=> {
                        if(props.light)
                            set_state((prev_state: any) => {
                                return {
                                    ...prev_state,
                                    light:props.light
                                }
                            })

                        ref_player.current?.showPreview()
                        // TODO + loop

                    }}

                    onClickPreview={()=> {
                        // console.log('=== onClickPreview ')
                        set_state((prev_state: any) => {
                            return {
                                ...prev_state,
                                light:false,
                                is_playing: true
                            }
                        })


                    } }

                    onDuration={(d: number)=> {
                        set_state((prev_state: any) => {
                            return {
                                ...prev_state,
                                duration: d,
                            }
                        })
                    }}

                    onProgress={(p)=>{
                        // console.log('onProgress',p)
                        set_state((prev_state: any) => {
                            return {
                                ...prev_state,
                                played_seconds: Math.round(p.playedSeconds),
                            }
                        })

                    }}

                    url={ props.url
                        // 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
                    }
                    light={ state.light
                        // 'https://images.unsplash.com/photo-1655601597743-7ddd6fdc2903?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80'
                    }

                /> {/*ReactPlayer*/}

            </div> {/*onContextMenu*/}

            <div
                ref={ref_double_click}
                style={{opacity:'0%',position:'absolute', top:'0', width:'100%',height:'100%', backgroundColor:'orange'}}
            >
            </div>

            <div
                id={'rewind_left_div'}
                style={{
                    position: 'absolute',
                    // left:   state.playerXY.xcenter,
                    // top:    state.playerXY.ycenter,
                    left:   '50%',
                    top:    '50%',
                    transform: 'translate(-150%, -50%)',
                    // backgroundColor:'green', // gl
                    opacity:'70%',
                    visibility:(state.is_playing && state.show_rewind_left)?'visible':'hidden',
                    width:'auto',
                    zIndex:20,
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
                <ButtonRipple
                    ref={ref_rewind_left}
                    sx_button={{color:'white', borderRadius:'50px'}}
                    icon={<FastRewind sx={{fontSize:36}}/>}
                    // id={'rewind_left'}
                />
            </div>

            <div
                id={'rewind_right_div'}
                style={{
                    position: 'absolute',
                    // left:   state.playerXY.xcenter,
                    // top:    state.playerXY.ycenter,
                    left:   '50%',
                    top:    '50%',
                    transform: 'translate(50%, -50%)',
                    // backgroundColor:'green', // gl
                    opacity:'70%',
                    visibility:(state.is_playing && state.show_rewind_right)?'visible':'hidden',
                    width:'auto',
                    zIndex:20,
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
                <ButtonRipple
                    ref={ref_rewind_right}
                    sx_button={{color:'white', borderRadius:'50px'}}
                    icon={<FastForwardSharp sx={{fontSize:36}}/>}
                    // id={'rewind_left'}
                />
            </div>

            <div
                id={'FastContolsVideo'}
                style={{
                    position: 'absolute',
                    // left:   state.playerXY.xcenter,
                    // top:    state.playerXY.ycenter,
                    left:   '50%',
                    top:    '50%',
                    transform: 'translate(-50%, -50%)',
                    // backgroundColor:'green', // gl
                    opacity:'70%',
                    visibility:(!state.is_playing)?'visible':'hidden',
                    width:'auto',
                    zIndex:20,
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
                {/*<div>CCC</div>*/}
                <VP_FastContolsVideo
                    ref_player={ref_player}
                    state={state}
                    set_state={set_state}
                />

            </div>

            <div
                style={{
                    marginTop:'0px',
                    position: ('bottom_over'===props.controls_mode_position)?'absolute':'relative',
                    bottom:'0',
                    backgroundColor:props.controls_mode_backgroundColor, //'green', // gl
                    opacity:('bottom_over'===props.controls_mode_position)?
                        (props.controls_mode_background_opacty)?props.controls_mode_background_opacty:'50%'
                        :'100%', //70
                    visibility:(state.show_controls)?'visible':'hidden',
                    width:'100%',
                    zIndex:20,
                }}
            >

                <VP_Controls
                    ref_controls={ref_controls}
                    {...props}
                    player_ref={ref_player}
                    wrapper_ref={ref_wrapper}

                    state={state}
                    set_state={set_state}

                    set_is_playing={()=>{ set_state({...state,is_playing:true,light:false}) }}

                    set_is_stopped={()=>{ set_state({...state,is_playing:false}) }}
                />
            </div>
        </Stack>
    } {/*==== yes-no url*/}

   </div>)

}

export default VP_Player

