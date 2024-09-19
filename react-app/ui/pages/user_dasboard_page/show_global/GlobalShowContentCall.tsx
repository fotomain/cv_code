
import GlobalShowContent from "./GlobalShowContent";
import React from "react";
import {GlobalsContext} from "../../../../system_state/context_globals/globals_context";

const GlobalShowContentCall = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    return (

    (global_props.current_application.show_global?.show)?
        <GlobalShowContent
            title_message_snackbar={'GlobalShowContent 11111'}
            use_timeout={1000}
            anchorOrigin={{ vertical: "center", horizontal: "center" }}

            do_after={()=>{

                setTimeout(()=>{

                    const td = global_props.current_application
                    td.show_global.show = false
                    global_dispatch({type: "SETTER_APPLICATION", global_new_data: {current_application: td}})

                },1100)                            }}
        />
        :<></>

    )
}

export default GlobalShowContentCall
