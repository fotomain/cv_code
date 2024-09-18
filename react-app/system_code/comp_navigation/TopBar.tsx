
import React from "react";

import {GlobalsContext} from "../context_globals/globals_context";
import {AccessAlarmOutlined, Twitter} from "@mui/icons-material";
import IconButton from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { FaPhoneFlip } from "react-icons/fa6";
import {largest_width} from "../../AppInitTheme";
import {get_media_number} from "../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel3";
const TopBar = () => {

    const { global_props } = React.useContext(GlobalsContext);


    // if(theme.palette?.mode === 'dark'){

    let iw_ = global_props.current_device.work_screen_width
    // console.log('=== work_screen_width 111 TopBar ',iw_)

    let innerWidth_ = global_props.current_device.innerWidth

    if(innerWidth_<largest_width) {
        iw_ += ' pl-[20px] pr-[20px] ' //c+
    }

    let logo_mr=''
    if( !global_props.current_device.use_desktop_mode  ){
        logo_mr = ' mr-[5px] '
    }

    return (
      //flex2 top bar width
      //   w-[" + csuffix + "px]
    // <div className={"relative w-full  h-full bg-darkslategray flex flex-row py-0  items-start justify-between text-left text-smi text-white-main font-f-menu-disktop "}>
    //   <div  className={"min-w-full flex flex-row"}>
    //       <div id={'TopBar'} className={" flex flex-row justify-center "} >

          <div id={'top_bar_wrapper'} className={"w-screen  flex flex-col  items-center justify-cneter bg-darkslategray text-left text-smi text-white-main font-f-menu-disktop "} >

          {/*<div id={'top_bar_box'} style={{width:""+iw + "px"}} >*/}

              <div id={'top_bar_items'} className={iw_+"   flex-shrink-0 flex flex-row items-center justify-between bg-darkslategray text-left text-smi text-white-main font-f-menu-disktop "} >

                  <div
                      className="h-10 flex flex-row py-2.5  box-border items-center justify-start gap-[10px]"
                  >
                      <div id={'div_get_media_number'}>{get_media_number()}</div>

                      <b className="relative whitespace-nowrap ">New offer:</b>
                      <div className="relative text-xs whitespace-nowrap ">
                          especially for 2 days only <a style={{color:'white'}} href='tel:+44 20 7930 9442'> +44 20 7930 9442</a>
                      </div>
                  </div>

                  {/*href='tel:+44 20 7930 9442'*/}
                  {(global_props.current_device.use_phone_mode )
                      ?<a style={{color:'white'}} href='tel:+44 20 7930 9442'><FaPhoneFlip size={16} color={'white'} /></a>
                      :null}

                  {(global_props.current_device.use_phone_mode )?<></>
                      :
                      <>

                              <div
                                  className={logo_mr+" w-[183px] h-10 flex flex-row items-center justify-between"}

                              >
                                  <img
                                      className="relative w-[26px] h-[26px] overflow-hidden shrink-0"
                                      alt=""
                                      src="/images_figma/logofacebook.svg"
                                  />
                                  <img
                                      className="relative w-[26px] h-[26px] overflow-hidden shrink-0"
                                      alt=""
                                      src={"/images_figma/logoinstagram.svg"}
                                  />

                                  <img
                                      className={"relative w-[24px] h-[24px] overflow-hidden shrink-0"}
                                      alt=""
                                      src="/images_figma/logo-x-white.svg"
                                      color={'white'}
                                  />

                              </div>

                      </>
                     }

              </div>
          {/*</div>*/}
          </div>

      // </div>
    // </div>

  );
};

export default TopBar;
