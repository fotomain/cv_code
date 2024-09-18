import React, {useState} from "react";
import {Alert, Button} from "@mui/material";

const sx_center={
    position: 'fixed',
    left:'50%',
    top:'50%',
    zIndex: 99999,
}

const RT_Alert = (p:any) =>{

    //=== DOC -> VARIANTS
    // message_over_table_position:'ref_end',

    let left_=1
    let top_=1

    let tdata = p.state.message_over_table_xy_data
    tdata.xstart = tdata.x + window.scrollX
    tdata.ystart = tdata.y + window.scrollY
    tdata.xend = tdata.x + tdata.width + window.scrollX
    tdata.yend = tdata.y + tdata.height + window.scrollY
    tdata.xcenter = tdata.xstart + tdata.width/2
    tdata.ycenter = tdata.ystart + tdata.height/2

    switch (true) {
        case (!p.state.message_over_table_position
        || ''===p.state.message_over_table_position
        || 'ref_end'===p.state.message_over_table_position):
        {
            left_   =tdata.xend;
            top_    =tdata.yend;
            break
        }

        case (p.state.message_over_table_position
                && 'ref_start'===p.state.message_over_table_position):
        {
            left_   =tdata.xstart;
            top_    =tdata.ystart;
            break
        }

        case (p.state.message_over_table_position
                && 'ref_center'===p.state.message_over_table_position):
        {
            left_   =tdata.xcenter;
            top_    =tdata.ycenter;
            break
        }


        default:{
            left_   =tdata.xend;
            top_    =tdata.yend;
        }

    } //switch


    return(
        <>
                <Alert
                    severity="success" //success warning info error

                    {...p.state.message_over_table_props} //success warning info error

                    sx={{
                            position: 'fixed', zIndex: 99999,
                            left:left_,
                            top: top_,
                        }}
                >
                    {p.state.message_over_table_title}
                </Alert>
        </>
    )
}


export default RT_Alert
