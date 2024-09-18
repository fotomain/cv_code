
//===DOC https://medium.com/bina-nusantara-it-division/exploring-the-differences-between-redux-toolkit-and-redux-saga-5e46e9c97333
// actins
// reducer
// sagas
// store_main

import React from "react";

import AppInitContextGlobals from "./AppInitContextGlobals";

// == user_doc user found get
const debug_sqlite=false
const debug_login_google=false
//=== DOC c+ o+
const AppRoot = () => {

    return(

        <div id={'div_main_root'}  >
            <AppInitContextGlobals/>
        </div>

    )
};

export {debug_login_google,debug_sqlite}
export default AppRoot
