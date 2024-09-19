
import React from "react";
import {GlobalsContext} from "../../system_state/context_globals/globals_context";


const AboutCustom = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    return(

        <div id={'div_about_custom'}>

            <div className="w-screen flex flex-row justify-center" style={{backgroundColor:'pink'}}>
                <div className=" h-12" style={{backgroundColor:'gray'}} >
                    About Custom Page
                </div>
            </div>

            AboutCustom

        </div>
    )
};

export default AboutCustom

