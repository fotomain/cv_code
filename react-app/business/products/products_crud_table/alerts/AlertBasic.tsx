import React, {useState} from "react";
import {Alert, Button} from "@mui/material";

const sx_center={
    position: 'fixed',
    left:'50%',
    top:'50%',
    zIndex: 99999,
}

export const alert_clear_data = (p:any) => {

    // console.log('=== p.set_state ',p.set_state)

    if(!p.set_state) return //element deleted before this run

    p.set_state((prev_state: any) => {
        return {
            ...prev_state,
            alert_message_title: '',
            alert_message_props: {},
            do_mount_alert: '',
            alert_message_timeout: 1000,
        }
    })
}

const AlertBasic = (p:any) =>{

    //=== DOC -> VARIANTS
    // do_mount_alert: 'center_display',
    // do_mount_alert: 'over_element',
    // do_mount_alert: 'shift_element',

        // console.log('=== t5 p.alert_message_over_element_name ',p.alert_message_over_element_name)
        // console.log('=== t5 p.allXY ',p.allXY)
        // console.log('=== t5 p.allXY[p.alert_message_over_element_name as string].x ',p.allXY[p.alert_message_over_element_name as string].x)

    let xx = 0
        if(undefined===p.allXY[p.alert_message_over_element_name as string]?.x)
            xx = p.allXY[p.alert_message_over_element_name as string]?.xend
        else
            xx = p.allXY[p.alert_message_over_element_name as string]?.x

    return(
        <>
            {(!p.allXY[p.alert_message_over_element_name as string])?<></>:
                <Alert
                    severity="success"

                    {...p.alert_message_props} // sevetity
                    //===DOC needed for local
                    sx={('center_display' === p.do_mount_alert)?sx_center
                        :('over_element'=== p.do_mount_alert)?{
                            position: 'fixed', zIndex: 99999,
                            // options_ start - end
                            // left:p.allXY[p.alert_message_over_element_name as string].xstart+0, //20
                            // top: p.allXY[p.alert_message_over_element_name as string].ystart+0  //30
                            left:p.allXY[p.alert_message_over_element_name as string].xend+0, //20
                            top: p.allXY[p.alert_message_over_element_name as string].yend+0  //30
                        }:{}}
                >
                    {p.alert_message_title}
                </Alert>
            }
        </>
    )
}


export default AlertBasic
