

//=== DOC https://codesandbox.io/s/react-layout-withrouter-cns34?file=/src/components/common/Layout.js

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React from "react";
import {GlobalsContext} from "../../system_state/context_globals/globals_context";
import AppBarGlobal from "./AppBarGlobal";
import LayoutCustom from "../../ui/pages/LayoutCustom";
import LayoutAdminSpace from "./LayoutAdminSpace";
import Section14_FooterHome from "../../ui/pages/home_page/Section14_FooterHome";
import {largest_width} from "../../AppInitTheme";
import {
    css_column_center,
    css_column_top_center,
    css_row_center
} from "../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";

const LayoutWebPages = (props:any) =>{

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const csuffix = global_props.current_device.media_querry_suffix
    console.log('=== csuffix 222 ',csuffix)
    console.log('=== Layout global_props.current_user.step_logged_in ',global_props.current_user.step_logged_in)

    //flex1 layout
    return(

        (!global_props.current_user.step_logged_in)
                ?<div id='div_LayoutWebPages' css={css` position: relative; overflow:auto; height:100%; width:100%; ${css_column_top_center} `}>

                    <AppBarGlobal />
                    <LayoutCustom>
                        {props.children}
                    </LayoutCustom>

                        <div id='div_FooterHome' css={css` margin-top: auto; width: 100%; ${css_row_center}; background-color: black `}>
                            <div css={css` width: ${largest_width}px; margin-top: auto`}>
                                {/*1444*/}
                                <Section14_FooterHome/>
                            </div>
                        </div>

                </div>
                :(global_props.current_user.user_space_for_all_pages)
                    ?<LayoutAdminSpace>
                        {props.children}
                    </LayoutAdminSpace>

                        :('admin_space'===props.path)

                            ?<div className={"relative w-screen h-full overflow-auto flex flex-col items-center justify-start"}>
                                {/*<AppBarGlobal />*/}
                                <LayoutAdminSpace>
                                    {props.children}
                                </LayoutAdminSpace>
                            </div>
                                //www dd overflow-y-hidden w-screen
                                :<div id='div_LayoutCustom1'
                                      className={"relative w-[100%] scroll-auto h-full  flex flex-col items-center justify-start"}
                                      // style={{
                                      //     width:'100%',
                                      //     display:'flex',
                                      //     flexDirection:'row',
                                      //     paddingRight: '30px'
                                      //   }}
                                 >
                                    <AppBarGlobal />
                                    <LayoutCustom>
                                        {props.children}
                                    </LayoutCustom>

                                        <div id='div_FooterHome' css={css` margin-top: auto; width: 100%; ${css_row_center}; background-color: black `}>
                                            <div css={css` width: ${largest_width}px; margin-top: auto`}>
                                                {/*1444*/}
                                                <Section14_FooterHome/>
                                            </div>
                                        </div>

                    </div>

     )
}

export default LayoutWebPages


// <Stack id={'stack_layout_main'}
//        direction='row'
//        // justifyContent={'left'}
//        justifyContent={'start'}
//        alignItems={'top'}
//        bgcolor={"transparent"}
//     // bgcolor={"background.default"}
//        color={"text.primary"}
//     // height='100%'
//        height='auto'
// >

{/*<Stack*/}
{/*    id={'stack_layout_chield'}*/}
{/*    direction='column'*/}
{/*    justifyContent={'top '}*/}
{/*    alignItems={'left'}*/}
{/*    // bgcolor={"magenta"}*/}
{/*    // bgcolor={"background.default"}*/}
{/*    // bgcolor={global_props.theme.colors.background_color} //TODO globals color*/}
{/*    bgcolor={"transparent"}*/}
{/*    color={"text.primary"}*/}
{/*    overflow={'auto'}*/}
{/*    // height='100%'*/}

{/*    height='800px'*/}
{/*    // marginTop={'50px'}*/}
{/*    marginLeft={(global_props.navigation.do_open_drawer_left)?global_props.navigation.drawer_left_width:'0px'}*/}
{/*    // overflow={'scroll'}*/}


{/*>*/}
