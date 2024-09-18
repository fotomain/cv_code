import {tw_row_center_basic} from "../../tw/tw_tools";
import {Hidden, Stack, Typography} from "@mui/material";
import React from "react";
import {toHHMMSS} from "../../code_global/GlobalFunctions";
import {makeStyles} from "@mui/styles";

const showSecondsElapsed = (props:any) => {

    return (

        <Typography fontSize={'12px'}  display="inline" variant="body2" color="white">
            {toHHMMSS(props.state.played_seconds.toString())}
        </Typography>

    )

}
const showSecondsTotal = (props:any) => {

    return (

        <Typography fontSize={'12px'}  display="inline" variant="body2" color="white">
            {toHHMMSS(props.state.duration.toString())}
        </Typography>

    );
};


const TextTimeVideo = (props:any) => {

    return(
    <Hidden  only="xs">
        {/*=== DOC https://v4.mui.com/components/hidden/*/}
    <Stack
        display={(props.state.playerXY.width<360)?"none":'flex'}
        direction="row" justifyContent="center" alignItems="center"
        sx={{minWidth:'110px',maxWidth:'250px'}}
    >

        {showSecondsElapsed(props)}

        <Typography  fontSize={'12px'}  display="inline" variant="body2" color="white">
            {' / '}
        </Typography>

        {showSecondsTotal(props)}

    </Stack>
    </Hidden>)
}

export default TextTimeVideo
