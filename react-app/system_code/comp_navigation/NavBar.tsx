
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

import {makeStyles} from "@mui/styles";

import { useHistory } from "react-router";

import React, {useEffect, useRef, useState} from "react";
import {GlobalsContext} from "../../system_state/context_globals/globals_context";
import HamburgerButton from "./HamburgerButton";

import {Badge, ClickAwayListener, IconButton} from "@mui/material";
import MenuHamburger from "./MenuHamburger";
import LogoImage from "./LogoImage";

import './_tests_/styles_transition.css'
import MenuHorizontal from "./MenuHorizontal";
import AppUserAvatar from "./AppUserAvatar";

import { MdOutlineAdminPanelSettings } from "react-icons/md";

import {hamburger_toggle} from "./hamburger_toggle";
import { close_hamburger_menu } from "./close_hamburger_menu";
import {free_space_if_no_largest_width, largest_width} from "../../AppInitTheme";
import {useTheme} from "@mui/styles";
import {hamburger_menu_hide} from "./hamburger_menu_hide";
import {JSON_stringify} from "../code_global/GlobalFunctions";
import {Simulate} from "react-dom/test-utils";
import touchEnd = Simulate.touchEnd;
import {useSelector} from "react-redux";
import {SEL_CART_DATA} from "../../system_state/products_state/selectors/cart_selector";
import IconCart from "./IconCart";
import Spacer from "../../ui/components/Spacer";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// const debug_mode_local=true
const debug_mode_local=false

const SvgIconCustom = (props:any) => {

    // stroke_color_on_hover
    const [mouse_is_over_card, set_mouse_is_over_card] = useState(false);

    return(
        <span
            onMouseEnter={()=>{set_mouse_is_over_card(true)}}
            onMouseLeave={()=>{set_mouse_is_over_card(false)}}
            onClick={()=>{props?.onPress?.()}}
            title={props.title}
        >
            {props.icon({stroke_color: (mouse_is_over_card)?props.stroke_color_on_hover:props.stroke_color})}
        </span>
    )
}
const NavBar = (props:any) => {

    const debug_local=false

    const history = useHistory()


  const { global_props, global_dispatch } = React.useContext(GlobalsContext);

  let iw_ = ' w-['+global_props.current_device.work_screen_width+'px]'
  const className1_=iw_+"  overflow-hidden flex flex-row py-0 box-border items-start justify-between font-f-menu-disktop "

    var nav_bar_style_inline={}
    if( props.main_mode==='user_space'){
        // https://stackoverflow.com/questions/75364475/implementing-a-variable-width-in-tailwind-css-nativewind
        nav_bar_style_inline={width:global_props.navigation.free_width}
    }
    if(debug_local) console.log('=== nav_bar_style_inline',nav_bar_style_inline)

    if(debug_local) console.log('=== iw_',iw_,className1_)

    let innerWidth_ = global_props.current_device.innerWidth
    if(debug_local) console.log('=== innerWidth_ ',innerWidth_)

      if(innerWidth_<largest_width) {
          nav_bar_style_inline={...nav_bar_style_inline,...{paddingLeft:free_space_if_no_largest_width+'px',paddingRight:free_space_if_no_largest_width+'px'}}
      }

    const handleClickAway = (e:any) => {

        console.log('=== test1 ClickAwayListener')
        if(debug_local) console.log("=== on_press handleClickAway e.target.localName",e.target.localName)
        if(debug_local) console.log("=== on_press handleClickAway e.target ",e.target)
        if(debug_local) console.log("=== on_press handleClickAway e.target ",e.target.id)
        if (
            e.target.id !== "hamburger_main"
        ) {

            if(debug_local) console.log("=== on_press HamburgerButton handleClickAway")

            hamburger_menu_hide({global_props, global_dispatch})
            // let tdata = global_props
            // tdata.navigation.visibility.hamburger_open=false
            // tdata.system.runtime='888'
            // global_dispatch({
            //     type: 'SETTER_GLOBALPROPS',
            //     global_new_data:{global_props:tdata},
            // })

        }



    };

    useEffect(() => {

        console.log('=== div_menu_ref 333',global_props.navigation.visibility.xy_data_menu)

        return () => {

        };
    }, [global_props.navigation.visibility.xy_data_menu]);

    const theme = useTheme()

    const isDarkTheme = theme.palette.mode === 'dark';
    let icon_color_main=theme.palette.primary.main
        icon_color_main=(isDarkTheme)?icon_color_main:'#2C2C2C'
        // icon_color_main='#6cd04c'
    console.log('=== icon_color_main ',icon_color_main)
    const icon_color_on_hover=theme.palette.primary.light

    const useClasses = makeStyles(theme => ({
        iconContainer: {
            "&:hover $icon": {
                color: icon_color_on_hover,
            }
        },
        icon: {
            color: icon_color_main,
        },
    }))

    const classes = useClasses()

    // sss1
    return(

      //flex2 menu widht

      <div id={'div_nav_bar'} style={nav_bar_style_inline} className={className1_}>
      {/*<div id={'nav_bar'} className={`${className1_}`}>*/}

        <div id='div_app_bar' className="flex-1  h-[95px] flex flex-row items-center justify-between">

          <div className={"flex-1 h-20 flex flex-row items-center justify-between"}>

            <div className={"flex-1 flex flex-row items-center gap-[40px]"}>

                <LogoImage
                    onClick={()=>{
                        // close_hamburger_menu()
                        history.push('/home', 'params')
                    }}
                />



                      {(global_props.current_device.use_phone_mode )?<></>
                      :
                      <>
                          {(!global_props.navigation.visibility.xy_data_menu?<></>
                              :
                              <>
                                  <HamburgerButton

                                      id={'hamburger_main'}

                                      hamburger_open = {global_props.navigation.visibility.hamburger_open}

                                      on_press={()=>{
                                          hamburger_toggle({global_props, global_dispatch, debug_local})
                                      }}
                                  />

                              </>
                          )}

                      </>}

            </div>



            {/*  ==================== MMenu v3 */}


              {(!(global_props.navigation.visibility.hamburger_open
                  &&
                  global_props.navigation.visibility.xy_data_menu?.menu_y>0))?<></>:
                  // !!!
                  <ClickAwayListener onClickAway={(e:any)=> {

                      let xo
                      let yo
                      const hamb = global_props.navigation?.visibility?.xy_data_hamburger
                      if( e?.changedTouches ) {                      // if(global_props.navigation?.visibility?.xy_data_hamburger?.x)
                          console.log('=== div_hamburger_ref ClickAwayListener hamb', hamb)
                          console.log('=== div_hamburger_ref ClickAwayListener', hamb.x)
                          console.log('=== div_hamburger_ref ClickAwayListener', hamb.y)
                          console.log('=== div_hamburger_ref ClickAwayListener', hamb.width)
                          console.log('=== div_hamburger_ref ClickAwayListener', hamb.height)
                           xo = e?.changedTouches[0].clientX
                           yo = e?.changedTouches[0].clientY
                          console.log('=== div_hamburger_ref ClickAwayListener', xo)
                          console.log('=== div_hamburger_ref ClickAwayListener', yo)
                      }else{
                          console.log('=== e1 ',e)
                           xo = e?.clientX
                           yo = e?.clientY
                          console.log('=== e1 xo',xo)
                          console.log('=== e1 yo',yo)
                      }

                          if (
                              ((hamb.x < xo) && (xo < hamb.x + hamb.width))
                              &&
                              ((hamb.y < yo) && (yo < hamb.y + hamb.height))
                          ) {
                              console.log('=== no handleClickAway ')
                          } else {
                              handleClickAway(e)
                          }

                  }}>

                      <div

                          data-aos="fade-down"
                          data-aos-delay="500"
                          data-aos-duration="300"

                          style={{

                              zIndex:90909,
                              // backgroundColor:'red',
                              position:'fixed',

                              width:'100%',
                              height:'auto',

                              left: global_props.navigation.visibility.xy_data_menu?.menu_x?(global_props.navigation.visibility.xy_data_menu.menu_x  ):0, //correction for Mozilla
                              top:  global_props.navigation.visibility.xy_data_menu?.menu_y?(global_props.navigation.visibility.xy_data_menu.menu_y):0,

                          }}

                      >

                          <div
                              // sx = {box_style}
                              style={{
                                  position:'relative',
                                  width:'100%',
                                  // top:200,
                                  // left:300,
                                  // backgroundColor:'white',
                                  // left:params.xx-1, //correction for Mozilla
                                  // top:params.yy+55,
                                  // top:params.yy,
                                  boxShadow: 'none',
                                  // width:'auto',
                                  // border: '1px solid red',
                              }}
                          >
                              <MenuHamburger />
                          </div>

                      </div>
                  </ClickAwayListener>
              }
            {/*  ==================== MMenuEND*/}

                {(global_props.current_device.use_phone_mode || global_props.navigation.visibility.hamburger_open)?<></>
                :
                   <MenuHorizontal/>
                }

          </div>

            {(!debug_mode_local)?<></>:
                <>
                {(!global_props.debug_mode_global)?<></>:
                    <div id={'div_innerWidth'}>
                        <div>{global_props.current_device.innerWidth}. .</div>
                        <div>{global_props.current_device.innerHeight}. .</div>
                    </div>
                }
                </>
            }

              <div className="flex flex-row items-center justify-between
                w-[130px]
                lg:w-[186px]
                md:w-[150px]
                sm:w-[140px]

              ">
                {/*<img id={'search_icon'}*/}
                {/*    className="hover:cursor-pointer  relative w-[22px] h-[22px] overflow-hidden shrink-0"*/}
                {/*    alt=""*/}
                {/*    src="/images_figma/searchoutlineicon.svg"*/}
                {/*/>*/}


                  {/*https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke*/}
                  <SvgIconCustom
                      title={'Search productx'}
                      stroke_color={icon_color_main}
                      stroke_color_on_hover={icon_color_on_hover}
                      icon = {(p:any)=><svg id={'search_icon'}
                          // stroke="#2C2C2C"
                          stroke={p.stroke_color}
                          className={"hover:cursor-pointer relative w-[22px] h-[22px] overflow-hidden shrink-0"}
                          width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.49996 2.75C8.16495 2.75 6.85991 3.14588 5.74989 3.88757C4.63986 4.62927 3.7747 5.68347 3.26381 6.91686C2.75292 8.15026 2.61925 9.50745 2.8797 10.8168C3.14015 12.1262 3.78302 13.3289 4.72702 14.2729C5.67102 15.2169 6.87375 15.8598 8.18311 16.1202C9.49248 16.3807 10.8497 16.247 12.0831 15.7361C13.3165 15.2252 14.3707 14.3601 15.1124 13.25C15.854 12.14 16.2499 10.835 16.2499 9.49996C16.2498 7.70979 15.5386 5.99298 14.2728 4.72714C13.0069 3.46131 11.2901 2.75011 9.49996 2.75Z"
                                strokeWidth="2" strokeMiterlimit="10"/>
                          <path d="M14.5359 14.5359L19.25 19.25"
                                strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                      </svg>
                      }
                      onPress={(e:any) => {
                          console.log('=== search_icon')
                          history.push('/products', 'params')
                      }}
                  />


                  {(!global_props.current_user.step_logged_in) ? <></> :

                      <SvgIconCustom
                          title={'Admin dashboard'}
                          stroke_color={icon_color_main}
                          stroke_color_on_hover={icon_color_on_hover}
                          icon = {(p:any)=>
                              <MdOutlineAdminPanelSettings id={'icon_admin1'}

                                   style={{color:p.stroke_color, fontSize:'24px', cursor: 'pointer'}}

                                   onClick={(e:any) => {
                                       history.push('/admin_space', 'params')
                                   }}

                              />
                          }
                          />
                      // <IconCustomMUI
                      //
                      //     icon={MdOutlineAdminPanelSettings}
                      //
                      //     onClick={(e:any) => {
                      //         history.push('/admin_space', 'params')
                      //     }}
                      //
                      // />
                  }

                  {/*<Chip icon={<AdminPanelSettingsOutlinedIcon/>}/>*/}

                  {(!global_props.current_device.use_phone_mode )?<></>:
                      <div css={css` pdding-bottom:2px  `}
                           title={'CRUD products'}
                      >
                          <EditOutlinedIcon
                              className={classes.icon}
                              id={'crud_products_icon1'}

                              onClick={() => {
                                  close_hamburger_menu({global_props, global_dispatch})
                                  history.push('/admin_products', 'params')
                              }}

                          />
                      </div>
                  }

                  {(global_props.current_user.step_logged_in) ? <></> :
                          <SvgIconCustom
                              title={'Login'}
                              stroke_color={icon_color_main}
                              stroke_color_on_hover={icon_color_on_hover}
                              icon = {(p:any)=>
                                  <div id={'login_icon'} className={'w-[23px] h-[23px] overflow-hidden shrink-0 flex flex-col pt-px px-0 pb-0 box-border items-center justify-center'}
                                                    onClick={() => {
                                                        close_hamburger_menu({global_props, global_dispatch})
                                                        if (global_props.current_user.step_logged_in)
                                                            history.push('/user_space', 'params')
                                                        else
                                                            history.push('/entrancemain', 'params')
                                                    }}
                                    >
                                  <svg
                                      stroke={p.stroke_color}
                                      id={'login_icon1'}
                                      className="hover:cursor-pointer relative w-[11.97px] h-[10.62px] overflow-hidden shrink-0"
                                      width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M11.469 6.27795C11.2476 8.65095 8.98443 10.5868 6.49989 10.5868C4.01536 10.5868 1.74822 8.6514 1.53082 6.27795C1.30495 3.80934 3.50716 1.9691 6.49989 1.9691C9.49263 1.9691 11.6948 3.85422 11.469 6.27795Z"
                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>


                                  <svg
                                      stroke={p.stroke_color}
                                      id={'login_icon2'}
                                      className="hover:cursor-pointer relative w-[22.5px] h-[8.44px] overflow-hidden shrink-0"
                                      width="23" height="10" viewBox="0 0 23 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M11.4997 1.58679C6.85538 1.58679 2.14163 3.52003 1.26935 7.169C1.16418 7.60881 1.49409 8.0309 2.10426 8.0309H20.8952C21.5059 8.0309 21.8358 7.60881 21.7307 7.169C20.8578 3.52003 16.1441 1.58679 11.4997 1.58679Z"
                                          strokeWidth="2" strokeMiterlimit="10"/>
                                  </svg>

                              </div>
                              }
                          />

                  }


                  {(global_props.current_device.use_phone_mode )?<></>
                      :
                      <SvgIconCustom
                          title={'Favorites'}
                          stroke_color={icon_color_main}
                          stroke_color_on_hover={icon_color_on_hover}
                          icon = {(p:any)=>
                              <svg
                                  stroke={p.stroke_color}
                                  id={'star_icon'}
                                  className="hover:cursor-pointer relative w-[22px] h-[22px] overflow-hidden shrink-0"
                                  width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_2_113)">
                                      <path d="M22.625 9.65179H14.4665L12 2.0625L9.53348 9.65179H1.375L8.01563 14.2054L5.45424 21.7946L12 17.0513L18.5458 21.7946L15.9844 14.2054L22.625 9.65179Z"
                                            strokeWidth="2" strokeLinejoin="round"/>
                                  </g>
                                  <defs>
                                      <clipPath id="clip0_2_113">
                                          <rect width="22" height="22" fill="white"/>
                                      </clipPath>
                                  </defs>
                              </svg>
                          }
                      />
                  }

                    <Badge badgeContent={global_props.cart?.products?.length} color="primary" id={'badge_cart'}
                           // font https://stackoverflow.com/questions/66438741/how-to-change-font-size-of-material-ui-badge-content-in-reactjs
                                onClick={()=>{
                                    console.log('=== onClick IconCart')
                                    history.push('/cart', 'params')
                                }}
                    >
                        <IconCart
                            title={'Cart'}
                            icon_color_main={icon_color_main}
                            icon_color_on_hover={icon_color_on_hover}
                        />
                    </Badge>

                    {/*{(0===global_props.cart?.products?.length)?null:<Spacer data={'w-[15px]'}/>}*/}
                    <Spacer data={'w-[15px]'}/>


                  {(global_props.current_device.use_desktop_mode || global_props.current_device.use_tablet_mode)?
                      <>
                          {(!global_props.current_user.step_logged_in)?<></>:
                              <AppUserAvatar/>
                          }
                      </>
                      :
                      <></>
                  }



                  {(global_props.current_device.use_desktop_mode || global_props.current_device.use_tablet_mode)?<></>
                      :
                      <>
                          <HamburgerButton

                              id={'hamburger_main'}

                              hamburger_open = {global_props.navigation.visibility.hamburger_open}

                              on_press={()=>{
                                  hamburger_toggle({global_props, global_dispatch, debug_local})
                              }}

                          />
                      </>
                  }


              </div>


        </div>
        {/*</div>*/}

      </div>
  )
}

export {SvgIconCustom}
export default NavBar;
