
import React from "react";

import {GlobalsProvider} from "./system_code/context_globals/globals_context";
import AppInitFirebaseSettings from "./AppInitFirebaseSettings";

interface Props  {
    user_work_data?:any,
    children?:JSX.Element
}

const AppInitContextGlobals: React.FC<Props> = (props:Props) => {

    return(

                <GlobalsProvider>

                    <AppInitFirebaseSettings user_work_data={props.user_work_data}/>

                </GlobalsProvider>

    )

}

export default AppInitContextGlobals
