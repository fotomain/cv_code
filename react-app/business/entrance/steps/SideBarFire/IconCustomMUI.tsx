
//rsi

import React from 'react';
import {makeStyles, useTheme} from "@mui/styles";
import {IconButton} from "@mui/material";

//=== DOC
//=== DOC https://github.com/google/material-design-icons
// GO https://fonts.google.com/icons
// SEARCH admin
// !!! copy name from android

const IconCustomMUI = (props:any) => {

    const theme = useTheme()
    const isDarkTheme = theme.palette.mode === 'dark';

    console.log('=== theme11',theme)

    const useClassesLight = makeStyles((theme:any) => ({
        iconContainer: {
            "&:hover $icon": {
                color: theme.palette.primary.main,
            }
        },
        icon: {
            color: '#2c2c2c',
        },
    }))

    const useClassesDark = makeStyles((theme:any) => ({
        iconContainer: {
            "&:hover $icon": {
                color: theme.palette.primary.light,
            }
        },
        icon: {
            color: theme.palette.primary.main,
        },
    }))

    const classesLight = useClassesLight()
    const classesDark = useClassesDark()

    const IconLocal = props.icon

    return(
        <>
            <IconButton
                sx={{padding:'0px'}}
                classes={{
                    root: (isDarkTheme)?classesDark.iconContainer:classesLight.iconContainer
                }}

                {...props}
            >

                    <IconLocal className={(isDarkTheme)?classesDark.icon:classesLight.icon} />

            </IconButton>
        </>
    )
};


export default IconCustomMUI
