import React, {ReactNode, useState} from "react";
import {Button, IconButton} from "@mui/material";
import AlertBasic from "./AlertBasic";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// do_mount_alert: 'shift_element',
// do_mount_alert: 'shift_element',

const ButtonWithAlertLocal = (props:any) => {

    const {this_state,set_this_state,title,...other} = props

    // const [state, set_state] = useState(
    //     {
    //         open: true,
    //     }
    // );

    return(<>

        {(this_state.do_mount_alert &&
            (
                (
                    ('over_element' === this_state.do_mount_alert)
                    // &&
                    // ('create_one_button' === state.alert_message_over_element_name)
                )
                ||
                ('shift_element' === this_state.do_mount_alert)

            )
        )?
            <AlertBasic {...this_state} />:<></>
        }{/*alert*/}

        <IconButton
            //alerts_step102

            //props.title
            title={'Clear'}
            {...other}

        >
            {/*=== icon or Button */}
            {props.children}
            {/*<ContentCopyIcon/>*/}
            {/*<Button*/}
            {/*    variant={'text'}*/}
            {/*    // onClick={() =>{}}*/}
            {/*>*/}
            {/*    Copy*/}
            {/*</Button>*/}
        </IconButton>

    </>)

}

export default ButtonWithAlertLocal
