
import {Box, Button, Dialog, DialogTitle} from "@mui/material";
import React, {useEffect, useState} from "react";
import ReactDOMClient from "react-dom/client";
import ButtonCustom from "./ButtonCustom";


const ConfirmDialog = (props) => {

    const [dialog_open, set_dialog_open] = useState(true);

    console.log('=== props.open ',props.open)

    const title = (props.title)?props.title:'Are yuo shure?'

    useEffect(() => {

        },
        [props?.dialog_open]
    )

    return(
        <Dialog
            fullWidth
            {...props.sx_dialog}//maxWidth="xs"
            {...props.main_props}
            open={dialog_open}
            onClose={props.allowClose ? props.onClose : null}
        ><>
            {<DialogTitle {...props.titleProps}>{title}</DialogTitle>}
            {/*{props.context && <DialogContext {...props.contextProps}>{props.context}</DialogContext>}*/}
            {props.buttons && <Box>{props.buttons}</Box>}
            {!props.buttons &&
                <Box sx={{
                    display: 'inline-flex', justifyContent:'flex-end',
                    paddingRight:'8px',
                    paddingBottom:'10px',
                }} >
                    <ButtonCustom
                        key="left_button"
                        variant="text"
                        onClick={()=> {

                            props?.on_press_left()
                            set_dialog_open(false)
                            props?.do_after_click()


                            // if(props.on_press_left) {
                            //     props.on_press_left()
                            // }else {
                            //     set_dialog_open(false)
                            // }
                        }}

                    >
                        Cancel
                    </ButtonCustom>
                    <Button
                        variant="contained"
                        key="right_button"
                        color="primary"
                        onClick={()=>{
                            console.log('=== call props.on_confirm() ')
                            props?.on_press_right()
                            set_dialog_open(false)
                            props?.do_after_click()

                            // if(props.on_press_right) {
                            //     props.on_press_right()
                            // }else {
                            //     set_dialog_open(false)
                            // }

                        }}
                    >
                        Ok
                    </Button>
                </Box>
            }

            </>
        </Dialog>
    )
};

export {ConfirmDialog}
