import React, {useState} from "react";
import {Button, CircularProgress, CircularProgressProps, Typography} from "@mui/material";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (<>
        <Box sx={{
            position: 'relative',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        }}>
            <CircularProgress size="3rem"  variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>

        </Box>

    </>);
}

const CircularProgressBasic = (props:any) => {

    return(<>
            <CircularProgressWithLabel value={props.progress} />
    </>)

}

export default CircularProgressBasic
