
import React, {useEffect} from "react";
import {Box, Divider, IconButton, ListItemText, Paper, Stack, Tooltip} from "@mui/material";

import {useHistory} from "react-router-dom";
import drawerImage from "./images/fire_bkg_image.png";

import './fonts_for_side_bar/fire_fonts.css'
import './fonts_for_side_bar/material_fonts.css'

// const SideBarFire=(props:any)=>{
//
//     return(
//         <div>SideBarFire000</div>
//     )
// }
//
// export default SideBarFire

import {GlobalsContext} from "../../../../system_code/context_globals/globals_context";

import FireSideItemSingle from "./comp_fire/FireSideItemSingle";
import FireSideSectionHeader from "./comp_fire/FireSideSectionHeader";
import FireDraggableList from "./comp_fire/FireDraggableList";
import FireGroups from "./comp_fire/FireGroups";
import FireLogoTitle from "./comp_fire/FireLogoTitle";
// import {sign_out_with_google} from "../comp_entrance/global_google_in_out";
import IconCustom from "./IconCustom";

import {
    ArrowRight,
    Close,
    Home,
    AppRegistrationOutlined,
    KeyboardArrowLeft, KeyboardArrowRight, LoginOutlined, LogoutOutlined, Settings,
} from "@mui/icons-material";
import LogoImage from "../../../../system_code/comp_navigation/LogoImage";
import LogoImageSideBarFire from "./LogoImageSideBarFire";

const SideBarFire=(props:any)=>{

    const history = useHistory();

    console.log("=== SideBarFire props",props)

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    // const [variant_pressed, set_variant_pressed] = useState("");
    //
    useEffect(() => {
        if(
            ''!==global_props.pages_navigation.can_go_to_route
        ){

            const t_route = global_props.pages_navigation.can_go_to_route

            const tdata = global_props.pages_navigation
            tdata.can_go_to_route = ""
            console.log("=== SETTER_PAGES_NAVIGATION start useEffect", tdata)
            global_dispatch({
                type: 'SETTER_PAGES_NAVIGATION',
                global_new_data: {pages_navigation: tdata},
            })


            if( global_props.navigation.drawer_left_auto_close ) {
                console.log("=== do_close TYPE 2 can_go_to_route SingleItem pages_navigation")
                props.do_close() // can_go_to_route SingleItem
            }

            history.push('/'+t_route) //pages_navigation

        }

        if(
            ''!==global_props.entrance.can_go_to_route
        ){

            const t_route = global_props.entrance.can_go_to_route

            const tdata = global_props.entrance
            tdata.can_go_to_route = ""
            console.log("=== SETTER_ENTRANCE start useEffect", tdata)
            global_dispatch({
                type: 'SETTER_ENTRANCE',
                global_new_data: {entrance: tdata},
            })

            if( global_props.navigation.drawer_left_auto_close ) {
                console.log("=== do_close TYPE 2 can_go_to_route SingleItem entrance")
                props.do_close() // can_go_to_route entrance
            }

            history.push('/'+t_route) //entrance

        }

        return () => {

        };
    }, [global_props]);


    return(

        <Paper
            elevation={0}
            id={'paper_side_bar'}
            sx={{
                width:global_props.navigation.drawer_left_width,
                height:'100%',
                backgroundColor:'#051e34',
                backgroundImage: `url(${drawerImage})`,
                backgroundPositionX:'0px',
                backgroundPositionY:'bottom',
                backgroundRepeat:'no-repeat',
                backgroundSize: '256px 556px',
            }}
        >

            <Stack
                id={'drawer_content'}

                sx={{
                    display:'flex',
                    flexDirection:'column',
                    alignContent:'start',
                    height:'100%',
                    cursor: 'pointer',
                }}
                // disablePadding
            >
                <FireLogoTitle title={'Level Food Club'}
                               // logo_image_path={'./images/fire_apple.png'}
                               logo_image_value={()=> {
                                   return <div className={'p-[1px]'}
                                        onClick={()=>{
                                            history.push('/home', 'params')
                                        }}
                                        ><LogoImageSideBarFire/>

                                   </div>
                               }}
                />

                {/*================================*/}
                {/*================================ CONTENT */}
                {/*================================*/}


                <FireSideItemSingle title={'Project overview'}

                                    id={'side_bar_section_home'}

                                    onPress={()=>{
                                        const _moment = Date.now()
                                        console.log("=== onPress FireSideItemSingle "+_moment)

                                        const tdata = global_props.pages_navigation
                                        tdata.mode_name = "ALLAPPLICATIONS"
                                        tdata.can_go_to_route = "home"
                                        console.log("=== SETTER_PAGES_NAVIGATION start ", tdata)
                                        global_dispatch({
                                            type: 'SETTER_PAGES_NAVIGATION',
                                            global_new_data: {pages_navigation: tdata},
                                        })

                                    }


                                    }
                                    icon_left={<Home
                                        // globals
                                        sx={{
                                            height:'20px',
                                            width:'20px',
                                            color: ('side_bar_section_home'=== global_props.navigation.navigation_pressed?.place_pressed?.place_guid)
                                                ?"rgb(102, 157, 246)"
                                                :'rgba(255, 255, 255, 0.8)',
                                            // :'red',
                                        }}
                                    />}

                                    is_pressed={'side_bar_section_home'=== global_props.navigation.place_pressed?.place_guid}

                                    do_after_click = { ()=>{
                                        console.log("=== 111 FireSideItemSingle")
                                    }}

                                    icon_right={
                                        <Tooltip title="go to Settings"
                                            // sx={{
                                            //     width:'20px',
                                            //     height:'20px',
                                            // }}
                                                 onClick = {()=>{
                                                     console.log("=== Tooltip1 ")
                                                 }}
                                        >

                                            <IconButton
                                                size="large"
                                                sx={{

                                                    '& svg': {
                                                        color: 'rgba(255,255,255,0.8)',
                                                        transition: '0.2s',
                                                        //=== step1_effect to rotate+left
                                                        transform: 'translateX(0) rotate(0)',
                                                    },
                                                    '&:hover, &:focus': {
                                                        bgcolor: 'unset',
                                                        '& svg:first-of-type': {
                                                            //=== step2_effect to rotate+left
                                                            transform: 'translateX(-4px) rotate(-20deg)',
                                                        },
                                                        '& svg:last-of-type': {
                                                            //=== step2_effect to move right
                                                            right: 0,
                                                            opacity: 1,
                                                        },
                                                    },
                                                    '&:after': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        height: '80%',
                                                        display: 'block',
                                                        left: 0,
                                                        width: '1px',
                                                        bgcolor: 'divider',
                                                    },
                                                }}
                                            >

                                                <Settings
                                                    sx={{
                                                        width:'20px',
                                                        height:'20px',
                                                    }}
                                                />
                                                {/*=== step1_effect to move right*/}
                                                <ArrowRight sx={{position: 'absolute', right: 4, opacity: 0}}/>


                                            </IconButton>
                                        </Tooltip>

                                    }
                />

                <Divider sx={{height:'0px'}} />

                <FireSideSectionHeader title={'Project shortcuts'}/>

                <FireDraggableList
                    {...props} //!!! for do_close()
                />

                <FireSideSectionHeader  title={'Services categories'}/>

                <FireGroups
                    {...props} //!!! for do_close()
                    array_of_groups={global_props.navigation.array_of_groups}
                    array_of_items={global_props.navigation.array_of_items}
                />

                {/*<div style={{color:'white'}}>SideBarFire</div>*/}

                {/*================================*/}
                {/*================================ CONTENT END  */}
                {/*================================*/}


                {/*================================*/}
                {/*================================ ALL APLICATIONS  */}
                {/*================================*/}

                <FireSideItemSingle title={'All aplications'}

                                    id={'side_bar_section_all_aplications'}

                                    onPress={()=>{
                                        const _moment = Date.now()
                                        console.log("=== onPress side_bar_section_all_aplications "+_moment)

                                        const tdata = global_props.pages_navigation
                                        tdata.mode_name = "ALLAPPLICATIONS"
                                        tdata.can_go_to_route = "allapplications"
                                        console.log("=== SETTER_PAGES_NAVIGATION start ", tdata)
                                        global_dispatch({
                                            type: 'SETTER_PAGES_NAVIGATION',
                                            global_new_data: {pages_navigation: tdata},
                                        })

                                    }

                                    }
                                    icon_left={<IconCustom
                                        style={{
                                            height:'20px',
                                            width:'20px',
                                            color: ('side_bar_section_all_aplications'=== global_props.navigation.navigation_pressed?.place_pressed?.place_guid)
                                                ?"rgb(102, 157, 246)"
                                                :'rgba(255, 255, 255, 0.8)',
                                            // :'red',
                                        }}

                                    >{'apps'}</IconCustom>}

                                    is_pressed={'side_bar_section_all_aplications'=== global_props.navigation.place_pressed?.place_guid}

                                    do_after_click = { ()=>{
                                        console.log("=== side_bar_section_all_aplications")
                                    }}
                />

                {/*================================*/}
                {/*================================ ALL APLICATIONS END */}
                {/*================================*/}

                {/*================================*/}
                {/*================================ SIGN IN  */}
                {/*================================*/}

                {(!global_props.navigation.drawer_left_show_wide)?'':
                    <Box sx={{flex:'1'}} ></Box>
                }

                {global_props.current_user.step_logged_in
                    ?''
                    :
                    <FireSideItemSingle title={'Sign in'}

                                        id={'side_bar_section_signin'}

                                        onPress={()=>{
                                            const _moment = Date.now()
                                            console.log("=== onPress side_bar_section_signin "+_moment)

                                            const tdata = global_props.entrance
                                            tdata.mode_name = "SIGNIN"
                                            tdata.can_go_to_route = "entrance"
                                            console.log("=== SETTER_ENTRANCE start ", tdata)
                                            global_dispatch({
                                                type: 'SETTER_ENTRANCE',
                                                global_new_data: {entrance: tdata},
                                            })


                                        }

                                        }
                                        icon_left={<LoginOutlined
                                            // globals
                                            sx={{
                                                height:'20px',
                                                width:'20px',
                                                color: ('side_bar_section_signin'=== global_props.navigation.navigation_pressed?.place_pressed?.place_guid)
                                                    ?"rgb(102, 157, 246)"
                                                    :'rgba(255, 255, 255, 0.8)',
                                                // :'red',
                                            }}
                                        />}

                                        is_pressed={'side_bar_section_signin'=== global_props.navigation.place_pressed?.place_guid}

                                        do_after_click = { ()=>{
                                            console.log("=== side_bar_section_signin")
                                        }}
                    />
                }

                {/*================================*/}
                {/*================================ SIGN IN END */}
                {/*================================*/}

                {global_props.current_user.step_logged_in
                    ?''
                    :
                    <FireSideItemSingle title={'Register'}

                                        id={'side_bar_section_registration'}

                                        onPress={()=>{
                                            const _moment = Date.now()
                                            console.log("=== onPress side_bar_section_registration "+_moment)

                                            const tdata = global_props.entrance
                                            tdata.mode_name = "REGISTER"
                                            tdata.can_go_to_route = "entrance"
                                            console.log("=== SETTER_ENTRANCE start can_go_to_route entrance",tdata)
                                            global_dispatch({
                                                type: 'SETTER_ENTRANCE',
                                                global_new_data:{
                                                    entrance:tdata,
                                                },
                                            })


                                        }
                                        }
                                        icon_left={<AppRegistrationOutlined
                                            // globals
                                            sx={{
                                                height:'20px',
                                                width:'20px',
                                                color: ('side_bar_section_registration'=== global_props.navigation.navigation_pressed?.place_pressed?.place_guid)
                                                    ?"rgb(102, 157, 246)"
                                                    :'rgba(255, 255, 255, 0.8)',
                                                // :'red',
                                            }}
                                        />}

                                        is_pressed={'side_bar_section_registration'=== global_props.navigation.place_pressed?.place_guid}

                                        do_after_click = { ()=>{
                                            console.log("=== side_bar_section_registration")

                                        }}
                    />
                }

                {!global_props.current_user.step_logged_in
                    ? ''
                    :
                    <FireSideItemSingle title={'Sign Out'}

                                        id={'side_bar_section_signout'}

                                        onPress={() => {
                                            const _moment = Date.now()
                                            console.log("=== onPress side_bar_section_signout " + _moment)
                                            // sign_out_with_google()
                                        }
                                        }
                                        icon_left={<LogoutOutlined
                                            // globals
                                            sx={{
                                                height: '20px',
                                                width: '20px',
                                                color: ('side_bar_section_signout' === global_props.navigation.navigation_pressed?.place_pressed?.place_guid)
                                                    ? "rgb(102, 157, 246)"
                                                    : 'rgba(255, 255, 255, 0.8)',
                                                // :'red',
                                            }}
                                        />}

                                        is_pressed={'side_bar_section_signout' === global_props.navigation.place_pressed?.place_guid}

                                        do_after_click={() => {
                                            console.log("=== side_bar_section_signout")
                                        }}
                    />
                }
                {/*================================*/}
                {/*================================ SIGN IN END  */}
                {/*================================*/}


                <Divider/>

                {(!global_props.navigation.drawer_left_show_wide) ? '' :
                    <Stack
                        direction={'row'}
                        justifyContent={'end'}
                        alignItems={'center'}
                        id={'id_do_fold_button'}
                        sx={{
                            width: '100%',
                            height: '42px',
                            color: global_props.theme.colors.icon_color,
                        }}
                        onClick={() => {
                            console.log('=== !!!!!!!!!! props.do_fold() ', Date.now())
                            props.do_fold()
                        }}
                    >
                        <Box
                            sx={{
                                mr: '22px',
                            }}
                        >
                            <KeyboardArrowLeft/>
                        </Box>
                    </Stack>
                }

                {(global_props.navigation.drawer_left_show_wide) ? '' :
                    <Stack
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        id={'id_do_close_button'}
                        sx={{
                            width: '100%',
                            height: '42px',
                            color: global_props.theme.colors.icon_color,
                        }}
                        onClick={() => {
                            console.log('=== !!!!!!!!!! props.do_close() ', Date.now())
                            props.do_close() // close SideBar button
                        }}
                    >
                        <Close/>
                    </Stack>
                }

                {(global_props.navigation.drawer_left_show_wide) ? '' :
                    <Stack
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        id={'id_do_wide_button'}
                        sx={{
                            width: '100%',
                            height: '42px',
                            color: global_props.theme.colors.icon_color,
                        }}
                        onClick={() => {
                            console.log('=== !!!!!!!!!! props.do_wide() ', Date.now())
                            props.do_wide()
                        }}
                    >
                        <KeyboardArrowRight/>
                    </Stack>
                }

            </Stack>

        </Paper>


    )//return

}

export default SideBarFire
