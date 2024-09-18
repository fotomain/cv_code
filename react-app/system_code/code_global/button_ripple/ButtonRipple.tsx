

import {Button, IconButton} from "@mui/material";

//=== DOC https://www.geeksforgeeks.org/how-to-create-a-ripple-effect-on-click-the-button/

import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import React from "react";
import {FastRewind} from "@mui/icons-material";


const ButtonRipple = React.forwardRef((props:any, ref) => {

        const rippleRef = React.useRef<any>(null);
        const buttonRef = React.useRef<HTMLButtonElement>(null);
        const triggerRipple1 = () => {

            console.log('=== triggerRipple1 ')

            const container = buttonRef.current;
            if(undefined !== container){
                const rect = container?.getBoundingClientRect();

                if(undefined!==rect) {
                    rippleRef.current?.start(
                        {
                            clientX: rect.left + rect.width / 2,
                            clientY: rect.top + rect.height / 2,
                        },
                        {center: false}, // when center is true, the ripple doesn't travel to the border of the container
                    );

                    setTimeout(() => rippleRef.current?.stop({}), 320);
                }        }
        };


        return (

            <>

                <button style={{display:'none'}}
                        ref={ref}
                        {...props}
                        onClick={triggerRipple1}
                >
                    start ripple
                </button>

                <Button
                    variant="text"
                    color="primary"
                    ref={buttonRef}
                    sx={props.sx_button}
                    // sx={{ display: 'relative' }}
                >
                    {props.icon}
                    <TouchRipple ref={rippleRef} center />
                </Button>
                {/*<Button*/}

                {/*    variant="contained"*/}
                {/*    color="primary"*/}
                {/*    ref={buttonRef}*/}
                {/*    sx={{ display: 'relative' }}*/}
                {/*>*/}
                {/*    My little ripple*/}
                {/*    <TouchRipple ref={rippleRef} center />*/}
                {/*</Button>*/}

            </>

)});


export default ButtonRipple


