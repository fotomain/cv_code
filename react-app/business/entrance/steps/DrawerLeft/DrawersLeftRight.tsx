
import React, { useEffect, useState, useRef } from "react";
import {AppBar, Container, IconButton, Paper} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import {makeStyles} from "@mui/styles";

import {AccessAlarmOutlined} from "@mui/icons-material";
import {tw_row_center} from "../../../../system_code/tw/tw_tools";
import SideBarFire from "../SideBarFire/SideBarFire";

import { useHistory } from "react-router";

const loremIpsum =
    "1111111111111111 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const loremIpsum2 =
    "2222222222222222 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


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

const useStyles2 = makeStyles({
    table: {
        minWidth: 256
    },
    drawer: {
        position: "relative",
        marginLeft: "0px",
        width: 256,
        "& .MuiBackdrop-root": {
            display: "none"
        },
        "& .MuiDrawer-paper": {
            width: 256,
            position: "absolute",
            height: (props: { height: number }) => props.height,
            transition: "none !important"
        }
    }
});


const DrawersLeftRight = () => {

    const history = useHistory();


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    // const containerRef = useRef();
    const containerRef = React.useRef<HTMLInputElement>(null)
    const containerRef2 = React.useRef<HTMLInputElement>(null)
    const [height, setHeight] = useState(0);
    const [height2, setHeight2] = useState(0);

    const classes = useStyles({ height: height });
    const classes2 = useStyles2({ height: height2 });

    console.log('== classes2 ',classes2)

    useEffect(() => {
        if (open) {
             setHeight((null!==containerRef.current)?(containerRef.current.clientHeight):150+150 - 4);
        } else {
             setHeight(0);
        }
    }, [open]);

    useEffect(() => {
        if (open2) {
            setHeight2(window.innerHeight-150);
            // setHeight2((null!==containerRef2.current)?(containerRef2.current.clientHeight):150+150 - 4);
        } else {
            setHeight2(0);
        }
    }, [open2]);

    const handleFilterIconClick = () => {
        setOpen(!open);
    };
    const handleFilterIconClick2 = (e:any) => {
        setOpen2(!open2);
    };

    return (
        <>
            <div className={tw_row_center}>

                    <div ref={containerRef2} style={{ position: "relative" }}>

                        <AppBar position="static">
                            <Toolbar style={{ display: "flex" }}>
                                <IconButton
                                    style={{ marginRight: "auto" }}
                                    color="inherit"
                                    aria-label="filterButton"
                                    onClick={(e)=> {
                                        handleFilterIconClick2(e)
                                    }}
                                >
                                    <AccessAlarmOutlined />
                                </IconButton>

                                <div>MUI App</div>
                                <br/>
                                <br/>
                                <br/>
                                <div>Home</div>
                                <div>__________</div>
                                <div>Orders</div>
                                <div>__________</div>
                                <div>Orders</div>
                                <div>__________</div>
                                <div>Orders</div>
                                <div>__________</div>
                                <div>Orders</div>

                            </Toolbar>
                        </AppBar>

                        <Drawer
                            open={open2}
                            className={classes2.drawer}
                            variant="persistent"
                            anchor="left"
                        >
                            {/*<Container>{loremIpsum2}</Container>*/}

                            <SideBarFire

                                on_item_pressed={(params:any)=>{
                                    console.log("=== on_item_pressed SideBarFire",params)
                                    console.log("=== on_item_presse  route_path",params.data_to_use.route_path)
                                    if(params?.data_to_use?.route_path) {
                                        history.push(params.data_to_use.route_path, JSON.stringify(params.data_to_use))
                                    }
                                    else {
                                        window.alert("=== error 555888 -- " + (params.data_to_use.guid))
                                    }
                                }}
                            />

                        </Drawer>

                    </div>

                    <div ref={containerRef} style={{ position: "relative" }}>

                        <AppBar position="static">
                            <Toolbar style={{ display: "flex" }}>

                                <div></div>
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


                    </div>
            </div>



            <Paper>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
                <div>Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111Paper 111</div>
            </Paper>
            <div>height {height}</div>
            <div>height2 {height2}</div>

        </>
    );
}

export default  DrawersLeftRight
