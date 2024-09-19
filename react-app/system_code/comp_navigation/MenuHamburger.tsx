
import React from "react";
import {GlobalsContext} from "../../system_state/context_globals/globals_context";

import {useHistory} from "react-router";
import {page_orientation} from "../../system_state/context_globals/globals_types";
import Spacer from "../../ui/components/Spacer";
import MenuColumn1 from "./MenuColumn1";
import MenuColumn2 from "./MenuColumn2";
import MenuColumn3 from "./MenuColumn3";
import {useTheme} from "@mui/styles";

const MenuHamburger = () => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const history = useHistory();

    let iw0_ = global_props.current_device.work_screen_width


    let innerHeight_ = global_props.current_device.innerHeight
    // let ih_=' h-['+innerHeight_+"px]"

    let innerWidth_ = global_props.current_device.innerWidth

    let iw_row = iw0_
    let iw_col = ''
    let main_justify = ''
    let col_height = ''

    if(page_orientation.lanscape===global_props.current_device.orientation) {
        main_justify = ' justify-between '
        col_height='h-[calc(45dvh)]'
    }else {
        main_justify =   ' justify-center '
    }

    if(innerWidth_<1280) {
        //
        iw_row += ' py-[20px] px-[20px] '
        iw_col = ' py-[20px]  '
        if(innerWidth_<400) {
            iw_col += ' w-screen  ' + ' px-[20px] '
        } else {
            iw_col += ' w-[360px]  '
        }

    }


    const theme = useTheme()
    // const isDarkTheme = theme.palette.mode === 'dark';
    const style_theme = {
        color:theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper
    }

    // sss1
    return (

      <div id={'menu_main'} className={` flex flex-row w-auto bg-white-main  `+main_justify+` `}
           style={style_theme}
      >

          {(!(page_orientation.lanscape==global_props.current_device.orientation))?<></>:
              <div>
              <div id={'menu_main_as_row'}
                  style={style_theme}
                  className={`
                      `+iw_row+`
                      max-w-screen-xl
                      overflow-hidden
        
                      relative
                      flex flex-row
                      items-start
                      justify-around
        
                      lg:justify-between
                      md:justify-between
                      sm:justify-around
        
                      lg:flex-nowrap
                      md:flex-nowrap
                      flex-wrap
        
                      box-border
                      text-left  text-darkgray font-f-header-small
        
                      `}
              >

                  <MenuColumn1 height={col_height} />

                  <MenuColumn2 height={col_height} />

                  <MenuColumn3 height={col_height}/>

              </div>
              <Spacer style={style_theme} id={'spacer_menu1'} data={' py-[200px] bg-[#fff] '}/>
              </div>
          }

          {(!(page_orientation.portrait==global_props.current_device.orientation))?<></>:
              <div  id={'menu_main_as_col'}
                    style={style_theme}
                    className={`
                      `+iw_col+`
                      max-w-screen-xl
                      bg-white-main overflow-hidden
     
                      relative
                      flex flex-col
                      items-center
                      justify-around
                      
                  `}
              >
                  <div  id={'menu_main_as_col_row1'}
                      style={style_theme}
                      className={`                       
                          
                          `+iw_col+`
                          
                          bg-white-main overflow-hidden
         
                          relative
                          flex flex-row
                          
                          
                          justify-between
                          
                          
                      
                      `}
                  >

                      <MenuColumn1 />

                      <MenuColumn2 />

                  </div>

                  <div  id={'menu_main_as_col_row1'}

                        style={style_theme}

                        className={`                      
                          
                          `+iw_col+`
                          
                          bg-white-main overflow-hidden
         
                          relative
                          flex flex-row
                                                    
                          justify-between
                          
                          
                      
                      `}
                  >
                    <MenuColumn3  />
                  </div>

                  <Spacer style={style_theme} data={'py-[200px] bg-[#fff]'}/>

              </div>

          }

          <Spacer style={style_theme} data={'py-[200px] bg-[#fff]'}/>

      </div>

  );
};

export default MenuHamburger;


// <div className="flex mx-20 my-32">
//   <div>Menu</div>
// </div>
//
