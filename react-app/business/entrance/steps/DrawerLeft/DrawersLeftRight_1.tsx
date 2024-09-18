
import React, { useEffect, useState, useRef } from "react";
import {AppBar, Container, IconButton, Paper} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import {makeStyles} from "@mui/styles";

import {AccessAlarmOutlined} from "@mui/icons-material";

const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    drawer: {
        position: "relative",
        marginLeft: "auto",
        width: 200,
        "& .MuiBackdrop-root": {
            display: "none"
        },
        "& .MuiDrawer-paper": {
            width: 200,
            position: "absolute",
            height: (props: { height: number }) => props.height,
            transition: "none !important"
        }
    }
});


const DrawersLeftRight = () => {
    const [open, setOpen] = useState(false);
    // const containerRef = useRef();
    const containerRef = React.useRef<HTMLInputElement>(null)
    const [height, setHeight] = useState(0);

    const classes = useStyles({ height: height });

    useEffect(() => {
        if (open) {
            setHeight((null!==containerRef.current)?(containerRef.current.clientHeight):150 - 64);
        } else {
            setHeight(0);
        }
    }, [open]);

    const handleFilterIconClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <div ref={containerRef} style={{ position: "relative" }}>
                <AppBar position="static">
                    <Toolbar style={{ display: "flex" }}>
                        <IconButton
                            style={{ marginLeft: "auto" }}
                            color="inherit"
                            aria-label="filterButton"
                            onClick={handleFilterIconClick}
                        >
                            <AccessAlarmOutlined />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={open}
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                >
                    <Container>{loremIpsum}</Container>
                </Drawer>
                <Paper>
                    <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                    <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                    <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                    <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                    <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                    <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                </Paper>
            </div>
            <br />
        </>
    );
}

export default  DrawersLeftRight
