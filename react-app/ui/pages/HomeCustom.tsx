
import React from "react";
import {GlobalsContext} from "../../system_code/context_globals/globals_context";

const HomeCustom: React.FC = () => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    let iw_ = global_props.current_device.work_screen_width
    const csuffix = global_props.current_device.media_querry_suffix

    // let iw = global_props.current_device.innerWidth
    //
    // if(iw<1280) {
    //     if(iw<360) {
    //         iw = 'w-[360px]'
    //     }
    //     else{
    //         iw = 'w-screen'
    //     }
    //
    // }
    // else {
    //     iw = "w-[" + csuffix + "px] "
    // }


    return(
        <>
        {(!global_props.is_ready)
            ?
            <div>Loading Home...</div>
            :
        <div id={'div_home_custom'} className={iw_+""} >



        </div>}
        </>
    )
};

export default HomeCustom;

