

import React from "react";
import {GlobalsContext} from "../context_globals/globals_context";

import {useHistory} from "react-router";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const MenuHorizontal = () => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const history = useHistory();

    let menu_text_letter_space: string =''
    let menu_text_gap: string =''
    let menu_text_fontsize: string =' text-[1.0vw] '


    // console.log('=== global_props.current_device.use_tablet_mode',global_props.current_device.use_tablet_mode)
    if( global_props.current_device.use_tablet_mode  ){
        menu_text_fontsize = ' text-[15px] '
        menu_text_gap = ' gap-[20px] '
        menu_text_letter_space = ' tracking-[1.2px] '
    }
    else {
        menu_text_gap = ' gap-[60px] '
    }

    return (

      <>

          <div id='div_MenuHorizontal' className={menu_text_gap+"flex flex-row py-2.5 pr-10 pl-0 items-center justify-center "}>

              <div className="flex flex-row items-center justify-center">
                  <div className={menu_text_fontsize+menu_text_letter_space+"relative font-semibold " +
                      " hover:text-tw_primary hover:cursor-pointer "}

                       onClick={()=>{
                           history.push('/products', 'params')
                       }}

                  >Products</div>
              </div>

              <div className="flex flex-row items-center justify-center">
                  <div className={menu_text_fontsize+menu_text_letter_space+"relative font-semibold " +
                      "hover:text-tw_primary hover:cursor-pointer "}
                       onClick={()=>{
                           history.push('/delivery', 'params')
                       }}
                  >Delivery</div>
              </div>

              <div className={"flex flex-row items-center justify-center"}>
                  <div className={menu_text_fontsize+menu_text_letter_space+"relative font-semibold " +
                      " hover:text-tw_primary hover:cursor-pointer " +
                      ""}
                       onClick={()=>{
                           history.push('/about', 'params')
                       }}
                  >About</div>
              </div>

              <div className="flex flex-row items-center justify-center"
                   title="CRUD products"
              >
                  <div className={menu_text_fontsize+menu_text_letter_space+"relative font-semibold " +
                  " hover:text-tw_primary hover:cursor-pointer "}

                       onClick={()=>{
                           history.push('/admin_products', 'params')
                       }}

                  ><EditOutlinedIcon/></div>
                  {/*=== Admin */}
              </div>


          </div>
      </>

  );
};

export default MenuHorizontal
