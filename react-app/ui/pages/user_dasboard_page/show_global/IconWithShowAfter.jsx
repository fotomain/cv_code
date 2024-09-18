

import {Alert, Box, Snackbar, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ConfirmDialog} from "./ConfirmDialog";

import Fade from '@mui/material/Fade';

import {styled} from "@mui/styles";


const StyledSnackbar = styled((props) => <Snackbar {...props} />)(
    ({ theme }) => ({
        "& .MuiSnackbar-root": {
            top: theme.spacing(15),
            // bottom: theme.spacing(50),
        },
    })
);

const IconWithShowAfter = (props) => {

    const {
        do_after,
        do_after_ok,
        do_before,
        main_element,
        use_mount_snackbar,
        use_mount_dialog,
        show_multiline,
        use_mount_alert,
        use_timeout,
        on_press_right,
        on_press_left,
        title_button,
        dialog_open,
        ...other} = props


    const [do_mount_alert, set_do_mount_alert] = useState(false);
    const [do_mount_dialog, set_do_mount_dialog] = useState(false);
    const [do_mount_snackbar, set_do_mount_snackbar] = useState(false);

    const MainElement = main_element

    useEffect(() => {

        },
        [props?.use_mount_dialog]
    )


    return(
    <>
         {/*<Box {...other} sx={{ display: "flex", justifyContent: "center", alignItems: "center"  }}>*/}
            {/*<div>{do_mount.toString()}</div>*/}
            {(!do_mount_dialog)?<></>:<>
                <ConfirmDialog {...props}
                               // on_press_left={()=>{
                               //     console.log('=== on_press_left ')
                               //     if(props.on_press_left) props.on_press_left()
                               //     set_do_mount_dialog(false)
                               // }}
                               // on_press_right={()=>{
                               //     console.log('=== on_press_right ')
                               //     if(props.on_press_right) props.on_press_right()
                               //     set_do_mount_dialog(false)
                               // }}
                />
            </>}

            {(!set_do_mount_snackbar)?<></>:<>
                <Snackbar
                    //===DOC https://codesandbox.io/p/sandbox/react-copy-to-clipboard-button-with-material-ui-c8sly3
                    message={props.title_message_snackbar}
                    // mariginBottom:'30%'
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    // sx={{ bottom: { xs: 290, sm: 0 } }}
                    autoHideDuration={props.use_timeout}
                    // autoHideDuration={2000}
                    // onClose={() => setOpen(false)}
                    // open={open}
                    open={do_mount_snackbar}
                    TransitionComponent={Fade}
                />

            </>}

            {(!do_mount_alert)?<></>:
                ('near'!==props.show_where)?
                <div id={props.node_id}
                     style={{
                         display:'flex', flexDirection:'row',
                         position:'fixed',
                         // position:'absolute',
                         top:'20%', //'100px'
                         left:'50%', //'100px'
                         justifyContent:'center',
                         zIndex:9999999,
                     }}
                >
                    {/*<Stack sx={{...{width: 'auto'}, ...props.sx_alert}}>*/}
                        <Alert
                            severity="success"

                            {...props.props_alert}
                        >
                            {props.title_message_alert}
                        </Alert>
                    {/*</Stack>*/}

                </div>
                // , display: "flex", justifyContent:'left'
                : <Box sx={(props.show_multiline)?{position:'relative'}:{}} id={props.node_id} >
                        <Alert
                            severity="success"

                            {...props.props_alert}
                            //===DOC needed for local
                            sx={{position: 'absolute'}}
                        >
                            {props.title_message_alert}
                        </Alert>
                    </Box>

            }

            <MainElement

                {...other}

                id={'IconDeleteVideos'}

                onClick={(e)=>{
                    console.log('=== onClick ')

                    if(props.do_before){
                        props.do_before(props)
                    }

                    if((!props.use_mount_alert) && props.do_after)
                    {
                        props.do_after(e).then((res)=>
                        {
                            if(props.title_message_after) {}


                            if (props.title_message_snackbar) {}

                        })

                    }
                    else{
                        if(props.title_message_after){}


                        if (props.title_message_snackbar){}

                    }


                    if(props.use_mount_alert) {
                        set_do_mount_alert(true)
                        if (props.use_timeout) {
                            setTimeout(function () {
                                    set_do_mount_alert(false)
                                    props.do_after()
                                },
                                (props.use_timeout) ? props.use_timeout: 2000);

                        }
                    }

                    if(props.use_mount_dialog)
                        set_do_mount_dialog(true)

                    if(props.use_mount_snackbar) {
                        set_do_mount_snackbar(true)
                        if(props.use_timeout) {
                            setTimeout(function () {
                                    set_do_mount_snackbar(false)
                                },
                                (props.use_timeout)?props.use_timeout+100:2000);

                        }
                    }

                }}

                sx={{
                    position:'relative',
                    '&:hover, &:focus':{color:"#6cd04c", cursor:'pointer' }
                }}

            >
                {(props.title_button)?props.title_button:''}
            </MainElement>

        {/*</Box>*/}
    </>
    )
}

export default IconWithShowAfter
