

//rsi

import React from 'react';
import {makeStyles} from "@mui/styles";
import {IconButton} from "@mui/material";

//=== DOC
//=== DOC https://github.com/google/material-design-icons
// GO https://fonts.google.com/icons
// SEARCH admin
// !!! copy name from android

const IconCustomMUI = (props:any) => {

    const useClasses = makeStyles((theme:any) => ({
        iconContainer: {
            "&:hover $icon": {
                color: '#6cd04c',
            }
        },
        icon: {
            color: '#2c2c2c',
        },
    }))

    const classes = useClasses()

    const IconLocal = props.icon

    return(
        <>
            <IconButton
                sx={{padding:'0px'}}
                classes={{
                    root: classes.iconContainer
                }}
            >

                    <IconLocal className={classes.icon} {...props} />
            </IconButton>
        </>
    )
};


export default IconCustomMUI
