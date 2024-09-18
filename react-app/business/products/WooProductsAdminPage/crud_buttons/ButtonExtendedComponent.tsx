
import React, {useEffect, useState} from 'react';



import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import DialogContentText from '@mui/material/DialogContentText';

import DialogTitle from '@mui/material/DialogTitle';
import {Alert, Snackbar} from "@mui/material";
import {tw_row_right} from "../../../../system_code/tw/tw_tools";
import Fade from "@mui/material/Fade";

// ButtonExtendedComponent / Button YesNo
function ButtonExtendedComponent(props:any) {

    const [state, set_state] = useState(
        {
            open: false,
            close_from:'',
        }
    );

    const [do_mount_alert, set_do_mount_alert] = useState(false);
    const [do_mount_snackbar, set_do_mount_snackbar] = useState(false);


    const handleOpen = (p:any) => {

        if(p?.no_confirm_dialog){

            console.log('=== t0 no_confirm_dialog')
            handleClose(p)

        }else{
            set_state((prev_state:any)=>{return  {...prev_state, open:true}});
        }


    };

    const handleClose = (p:any) => {

        console.log('=== t0 handleClose ',p)

        if('close_from_ok'===p?.close_from){

            if(props.use_mount_snackbar) {
                set_do_mount_snackbar(true)
                if(props.use_timeout) {
                    setTimeout(function () {
                            set_do_mount_snackbar(false)
                        },
                        (props.use_timeout)?props.use_timeout+100:2000);

                }
            }


            if(props.use_mount_alert) {
                set_do_mount_alert(true)
                if (props.use_timeout) {
                    setTimeout(function () {
                            set_do_mount_alert(false)
                            // props.do_after?.()
                        },
                        (props.use_timeout) ? props.use_timeout: 2000);

                }
            }


        }
        if('left'===p?.close_from){
            props?.confirm_dialog_left.on_press_left()
        }


        set_state({
             close_from:p?.close_from
            ,open: false
        });

    };


    const handleKeyDown = (event:any) => {

        // Check if CTRL + S is pressed (event.ctrlKey) and the 's' key (event.key)

        if (event.ctrlKey && event.key === 's') {

            // Trigger the action you want here, e.g., close the dialog

            handleClose({close_from:'key_s'});

        }

    };


    // Attach the event listener to the document when the dialog is open

    React.useEffect(() => {

        if (state.open) {

            document.addEventListener('keydown', handleKeyDown);

        } else {

            document.removeEventListener('keydown', handleKeyDown);

        }

    }, [state.open]);

    const [data_xy, set_data_xy] = useState({
        x:0,y:0,left:0,top:0,bottom:0,width:0,height:0,
        title_message_alert_text_width:0
    });

    function getTextWidth(text:any, font=null) {
        const canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        if(context) {
            context.font = font || getComputedStyle(document.body).font;

            const w_ = context?.measureText(text).width
            console.log('=== props.btn_ref.current tdata context?.measureText(text).width',w_)

            return w_;
        }
        else {
            console.log('=== props.btn_ref.current tdata ERROR',context)
        }
    }

    useEffect(() => {

        let tdata = {...JSON.parse(JSON.stringify(props.btn_ref.current?.getBoundingClientRect()))}
        console.log('=== props.btn_ref.current tdata1 ',tdata)
        tdata.x = data_xy?.left + (data_xy?.width/2) + window.scrollX
        let dy = -55

        if('under'===props.show_where) {
            dy = 55
        }
        tdata.y = data_xy?.top + dy + window.scrollY

        console.log('=== props.btn_ref.current tdata2 ',tdata)
        console.log('=== props.btn_ref.current ',props.btn_ref.current?.getBoundingClientRect())

        tdata.title_message_alert_text_width = getTextWidth(props.title_message_alert)
        tdata.x = (tdata.x - ((tdata.title_message_alert_text_width + (30*2))/2)  ) //(20*2) - Alert borders

        console.log('=== props.btn_ref.current tdata3 ',tdata)

        set_data_xy({...tdata});

        return () => {

        };
    }, [props.btn_ref.current]);



    return (

        <div>

            {(!set_do_mount_snackbar)?<></>:<>
                <Snackbar
                    variant="standard"
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
                        <Alert
                            severity="success"

                            {...props.props_alert}
                            //===DOC needed for local
                            sx={{
                                position: 'absolute',
                                left:(data_xy.x),
                                top:(data_xy.y),
                                zIndex: 99999,
                            }}
                        >
                            {props.title_message_alert}
                        </Alert>
            }{/*alert*/}


            <div className={tw_row_right}>
                {/*=== children === 0*/}
                {props.children.map((child:any, index:number) => {
                        return (index!==0)?<div key={index}></div>:<div key={index}>{child({onClickDialog:handleOpen})}</div>
                    })//map
                }
            </div>

            {/*yesno Dialog*/}
            <Dialog
                open={state.open}

                onClose={()=> {
                    handleClose({close_from: 'dialog'})
                }}
            >

                <DialogTitle>Dialog Title</DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        Press CTRL + S to trigger the action.

                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <div className={tw_row_right}>
                        {/*=== all childrens>0*/}
                        {props.children.map((child:any, index:number) => {
                            return (index===0)?<div key={index}></div>:<div key={index}>{
                                child({onClickDialog:handleClose})
                            }</div>
                        })//map
                        }
                    </div>


                    {/*<Button onClick={()=> {*/}
                    {/*    handleClose({close_from: 'left'})*/}
                    {/*}} color="primary">*/}

                    {/*    {    (props?.confirm_dialog_left?.button_title_left)*/}
                    {/*        ?(props?.confirm_dialog_left?.button_title_left)*/}
                    {/*        :'Cancel'}*/}

                    {/*</Button>*/}

                    {/*<Button onClick={()=> {*/}
                    {/*    handleClose({close_from: 'right'})*/}
                    {/*}} color="primary">*/}

                    {/*    Save*/}
                    {/*    {    (props?.confirm_dialog_right?.button_title_right)*/}
                    {/*        ?(props?.confirm_dialog_right?.button_title_right)*/}
                    {/*        :'Save'}*/}


                    {/*</Button>*/}

                </DialogActions>

            </Dialog>

        </div>

    );

}


export default ButtonExtendedComponent
