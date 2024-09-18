
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {FullscreenRounded} from "@mui/icons-material";

import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import {IconButton, Stack} from "@mui/material";
const FullScreenToggler = (props:any) => {
        const isEventListenerConnected = useRef(false);
        const [isFullScreen, setFullScreen] = useState(false);

        var document:any = window.document;

        const getFullScreenElement = (() => {
            if (document.fullscreenEnabled) {
                return document.fullscreenElement;
            } else if (document.webkitFullscreenEnabled) {
                return document.webkitFullscreenElement;
            } else if (document.mozFullScreenEnabled) {
                return document.mozFullScreenElement;
            } else if (document.msFullscreenEnabled) {
                return document.msFullscreenElement;
            } else {
                return;
            }
        });

        const hasEvent = ((contentElement:any, eventName:any) => {
            for (const key in contentElement) {
                if (eventName === key) {
                    return true;
                }
            }
            return false;
        });

        const getFullScreenChangeEvent = ((contentElement:any) => {
            if (document.fullscreenEnabled && hasEvent(contentElement, 'onfullscreenchange')) {
                return 'fullscreenchange';
            } else if (document.webkitFullscreenEnabled && hasEvent(contentElement, 'onwebkitfullscreenchange')) {
                return 'webkitfullscreenchange';
            } else if (document.mozFullScreenEnabled && hasEvent(contentElement, 'onmozfullscreenchange')) {
                return 'mozfullscreenchange';
            } else if (document.msFullscreenEnabled && hasEvent(contentElement, 'onmsfullscreenchange')) {
                return 'msfullscreenchange';
            } else {
                return;
            }
        });

        const getFullScreenCancelMethod = (() => {
            if (document.fullscreenEnabled && document.exitFullscreen) {
                return document.exitFullscreen;
            } else if (document.webkitFullscreenEnabled && document.webkitExitFullscreen) {
                return document.webkitExitFullscreen;
            } else if (document.mozFullScreenEnabled && document.mozCancelFullScreen) {
                return document.mozCancelFullScreen;
            } else if (document.msFullscreenEnabled && document.msExitFullscreen) {
                return document.msExitFullscreen;
            } else {
                return;
            }
        });

        const getFullScreenRequestMethod = ((contentElement:any) => {
            if (document.fullscreenEnabled && contentElement.requestFullscreen) {
                return contentElement.requestFullscreen;
            } else if (document.webkitFullscreenEnabled && contentElement.webkitRequestFullscreen) {
                return contentElement.webkitRequestFullscreen;
            } else if (document.mozFullScreenEnabled && contentElement.mozRequestFullScreen) {
                return contentElement.mozRequestFullScreen;
            } else if (document.msFullscreenEnabled && contentElement.msRequestFullscreen) {
                return contentElement.msRequestFullscreen;
            } else {
                return;
            }
        });

        const fullScreenChangeListener = ((setFullScreen:any) => {
            const isFullScreenActive = getFullScreenElement() != null;

            if(isFullScreenActive){
                props?.doFull()
            }else {
                props?.doSmall()
            }

            setFullScreen(isFullScreenActive);
        });

        useEffect(() => {
            if (!isEventListenerConnected.current) {
                let contentElement = document.getElementById(props.ref_element);
                console.log('=== contentElement ',contentElement)
                if (contentElement) {

                    let eventName = getFullScreenChangeEvent(contentElement);
                    if (eventName) {
                        contentElement.addEventListener(eventName, () => fullScreenChangeListener(setFullScreen));

                        contentElement.addEventListener('keydown', (event:any) => {

                            console.log('=== event',event.key)

                            if (event.key === 'Escape') {
                                console.log('=== event',event)
                                //if esc key was not pressed in combination with ctrl or alt or shift
                                const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
                                if (isNotCombinedKey) {
                                    console.log('Escape key was pressed with out any group keys')
                                    if(isFullScreen) {
                                        props?.doSmall()
                                    }
                                }
                            }
                        });

                    }

                    isEventListenerConnected.current = true;
                }
            }
        }, [isEventListenerConnected, setFullScreen]);


        const toggleFullScreen = useCallback(() => {

            if (isFullScreen) {
                const requestMethod = getFullScreenCancelMethod();
                if (requestMethod) {
                    requestMethod.call(document);
                }

            } else {
                const contentElement = document.getElementById(props.ref_element);
                const requestMethod = getFullScreenRequestMethod(contentElement);
                if (requestMethod) {
                    requestMethod.call(contentElement);
                }
            }
        }, [isFullScreen]);


        return (
            <Stack
                direction="row" alignItems="center" //spacing={6}
            >
            <IconButton onClick={() => {
                toggleFullScreen()
            }}>
                {(isFullScreen)
                    ?<CloseFullscreenIcon sx={{
                        fontSize:props.state.playerXY.iconSize,
                        color: 'white'
                    }}/>
                    :<FullscreenRounded sx={{
                        fontSize:props.state.playerXY.iconSize,
                        color: 'white'
                    }}/>
                }
            </IconButton>
            </Stack>
                // {/*<button onClick={()=> {*/}
                // {/*    toggleFullScreen()*/}
                // {/*}*/}
                // {/*}>Click me to { (isFullScreen) ? 'exit' : 'enter' } FullScreen</button>*/}
        );
    }


export default FullScreenToggler
