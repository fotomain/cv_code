import {GlobalsContext} from "./system_code/context_globals/globals_context";
import React, {useEffect} from "react";

import AppInitSettings from "./AppInitSettings";

interface Props {
    user_work_data?: any,
    children?: JSX.Element
}

const AppInitFirebaseSettings: React.FC<Props> = (props: Props) => {

    const {global_props, global_dispatch} = React.useContext(GlobalsContext);

    useEffect(() => {

        console.log('=== do global_props.default_settings.is_ready  ', global_props.default_settings.is_ready)

        if (!global_props.default_settings.is_ready) {

            //TODO global_props.default_settings.is_ready FROM FIREBASE

            let tdata = global_props
            tdata.default_settings.is_ready = true
            global_dispatch({
                type: 'SETTER_GLOBALPROPS',
                global_new_data: {global_props: tdata},
            })
        }

        return () => {

        };
    }, [global_props.default_settings.is_ready]);


    return (
        <>
            {(!global_props.default_settings.is_ready)
                ?
                <div>Loading default settings...</div>
                :
                <AppInitSettings/>
            }
        </>)

}

export default AppInitFirebaseSettings
