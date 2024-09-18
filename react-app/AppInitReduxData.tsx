

import React from "react";

import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './system_state/state_old_school/state_redux/store';

import AppInitLocalDatabase from "./AppInitLocalDatabase";

const store = configureStore({  });

const AppInitReduxData=()=>{

    return(

            <ReduxProvider store={store}>

                <AppInitLocalDatabase />

            </ReduxProvider>

        )

}

export default AppInitReduxData
