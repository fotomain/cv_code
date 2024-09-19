

import React from "react";

import {
    styled,
    AppBar,
    Toolbar,
    Typography,

    Stack,

    AppBarProps,
} from "@mui/material";


import SideBarFire from "../SideBarFire/SideBarFire";
import {useHistory} from "react-router-dom";
import {GlobalsContext} from "../../../../system_state/context_globals/globals_context";
import {drawer_left_width} from "../../../../system_state/context_globals/globals_types";
import DrawerLeft from "../DrawerLeft/DrawerLeft";

import NavBar from "../../../../system_code/comp_navigation/NavBar";


interface App_AppBarProps extends AppBarProps{
    open?:boolean
    drawer_left_width?:string
}
const App_AppBar = styled(AppBar)
    <App_AppBarProps>(({theme, open, drawer_left_width})=>({
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            //=== duration: theme.transitions.duration.leavingScreen,
            // !!! no delay between side bar and App_Bar movement
            duration: '0.01s',
        }),
        ...(open && {

            marginLeft: drawer_left_width,
            width: `calc(100% - ${drawer_left_width})`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                //=== duration: theme.transitions.duration.enteringScreen,
                // !!! no delay between side bar and App_Bar movement
                duration: '0.01s',
            }),
        }),

    }))

const App_ToolBar = styled(Toolbar)(({theme})=>({
    display:'flex',
    justifyContent:'space-between',
    minHeight:'60px',
    [theme.breakpoints.up("sm")]:{
        //equal size for all width
        minHeight:'60px',
    }
}))


const NavbarFireSide=()=>{

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const hamburger_left_Open = (e: React.BaseSyntheticEvent) => {
        console.log("=== hamburger_left_Open")

        if(global_props.navigation.visibility.drawer_left){

            const tdata = global_props.navigation
            tdata.do_open_drawer_left = !tdata.do_open_drawer_left
            console.log("=== SETTER_NAVIGATION start ",tdata)
            global_dispatch({
                type: 'SETTER_NAVIGATION',
                global_new_data:{navigation:tdata},
            })


        }

    }


    console.log("=== global_props.navigation",global_props.navigation)

    const history = useHistory();

    return(
    <Stack id={'stack_main'}
           direction='column'
           justifyContent={'start'}
           // alignItems={'left'}
    >
        <App_AppBar
            position={'sticky'}
            open={global_props.navigation.do_open_drawer_left}
            drawer_left_width={global_props.navigation.drawer_left_width}
        >
            {/*gl_*/}
            {/*<Fade timeout={1500} in={true} unmountOnExit>*/}

                <App_ToolBar>

                    {/*{(global_props.navigation.visibility.hamburger_left)?*/}
                    {/*    <Stack flexWrap={'nowrap'} direction={'row'} spacing={2} justifyContent={'start'} alignItems={'center'}>*/}
                    {/*        <Hamburger*/}
                    {/*            onPress={(a:any)=>hamburger_left_Open(a)}*/}
                    {/*        ></Hamburger>*/}
                    {/*    </Stack>*/}
                    {/*    :''*/}
                    {/*}*/}

                    {/*<Typography noWrap variant={'h6'}>*/}
                    {/*    Mui App*/}
                    {/*</Typography>*/}

                    <NavBar main_mode={'user_space'}/>

                </App_ToolBar>

            {/*</Fade>*/}

        </ App_AppBar>

        {(global_props.navigation.visibility.drawer_left
        )?
            <DrawerLeft
                do_fold={(e:any)=>{
                    console.log("=== do_fold")

                    const tdata = global_props.navigation
                    tdata.drawer_left_show_wide = false
                    tdata.drawer_left_width = drawer_left_width.fold
                    console.log("=== SETTER_NAVIGATION start ",tdata)
                    global_dispatch({
                        type: 'SETTER_NAVIGATION',
                        global_new_data:{navigation:tdata},
                    })

                }}
                do_wide={(e:any)=>{
                    console.log("=== do_wide")

                    const tdata = global_props.navigation
                    tdata.drawer_left_show_wide = true
                    tdata.drawer_left_width = drawer_left_width.wide
                    console.log("=== SETTER_NAVIGATION start ",tdata)
                    global_dispatch({
                        type: 'SETTER_NAVIGATION',
                        global_new_data:{navigation:tdata},
                    })

                }}

                do_close={(e:any)=>{

                    console.log("=== do_close root DrawerLeft")

                    const tdata = global_props.navigation
                    tdata.do_open_drawer_left = false
                    console.log("=== SETTER_NAVIGATION start ",tdata)
                    global_dispatch({
                        type: 'SETTER_NAVIGATION',
                        global_new_data:{navigation:tdata},
                    })

                }}

            >
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
            </DrawerLeft>
            :''
        }

    </Stack>
    // return(
    )

}

export default NavbarFireSide
