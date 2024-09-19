import React, {useEffect, useState} from "react";


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';


/* Optional CSS utils that can be commented out  */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


import AppInitTheme from "./AppInitTheme";
import {GlobalsContext} from "./system_state/context_globals/globals_context";
import {drawer_left_width} from "./system_state/context_globals/globals_types";
import AppInitReduxData from "./AppInitReduxData";

interface Props {
    user_work_data?: any,
    children?: JSX.Element
}


const AppInitSettings: React.FC<Props> = (props: Props) => {

    //=== DOC https://react-redux.js.org/using-react-redux/accessing-store

    const {global_props, global_dispatch} = React.useContext(GlobalsContext);


    useEffect(() => {

        // TODO -> READ globals FROM localStorage and SET
        console.log("=== set global_props.is_ready ")

        if (!global_props.is_ready) {
            main_menu_state_refresh()
        }

        return () => {

        };
    }, []);


    useEffect(() => {

        if (global_props.current_user.step_user_ready_to_work) {
            console.log("=== store_main step_user_ready_to_work ", global_props.current_user.step_user_ready_to_work)
            console.log("=== store_main step_user_ready_to_work user_work_data ", global_props.current_user.user_work_data)
            console.log("=== store_main step_user_ready_to_work global_props ", global_props)
        }

        return () => {

        };
    }, [global_props.current_user.step_user_ready_to_work]);


    function main_menu_state_refresh() {

        const tdata = global_props.current_device

        tdata.do_refresh = true

        console.log("=== SETTER_DEVICE start ", tdata)
        global_dispatch({
            type: 'SETTER_DEVICE',
            global_new_data: {current_device: tdata},
        })
    }

    window.onresize = function () {
        console.log("=== window.onresize")
        // alert(window.onload)
        main_menu_state_refresh();
    }

    useEffect(() => { // do_refresh useEffect

        if (global_props.current_device.do_refresh) {

            console.log("=== current_device.do_refresh useEffect")

            var tdata = global_props
            tdata.is_ready = true

            const t_is_wide = (window.innerWidth > global_props.current_device.min_width_for_wide)
            console.log('=== t_is_wide', t_is_wide)
            global_props.current_device.is_wide_for_drawer = t_is_wide

            if (t_is_wide) {
                tdata.navigation.drawer_left_variant = 'persistent'
                tdata.navigation.drawer_left_width = drawer_left_width.wide
                tdata.navigation.do_open_drawer_left = true
                tdata.navigation.drawer_left_auto_close = false
                // tdata.navigation.visibility.hamburger_left=false
                tdata.navigation.visibility.hamburger_left = true
            } else {
                tdata.navigation.drawer_left_variant = 'temporary'
                tdata.navigation.drawer_left_width = drawer_left_width.wide
                // tdata.navigation.do_open_drawer_left = false
                tdata.navigation.drawer_left_auto_close = true
                tdata.navigation.visibility.hamburger_left = true
            }

            tdata.theme.layout.innerWidth = window.innerWidth
            tdata.theme.layout.all_applications.card.width = '296px'
            tdata.theme.layout.all_applications.card.height = '240px'
            tdata.theme.layout.all_applications.card.part_up.height = '124px'


            if (window.innerWidth <= 660) {
                tdata.theme.layout.all_applications.columns.number = 1
                // tdata.navigation.do_open_drawer_left = false
                console.log("innerWidth 111111111")
                tdata.theme.layout.all_applications.card.width = '90%'
                tdata.theme.layout.all_applications.card.height = '326px'
                tdata.theme.layout.all_applications.card.part_up.height = '80%'
                tdata.theme.layout.all_applications.container.width = '100%'
            }


            if (660 < window.innerWidth && window.innerWidth <= 1239) {
                tdata.theme.layout.all_applications.columns.number = 2
                tdata.theme.layout.all_applications.container.width = '660px'
                if (window.innerWidth < 920) {
                    // tdata.navigation.do_open_drawer_left = false
                } else {
                    // tdata.navigation.do_open_drawer_left = true
                }
                console.log("innerWidth 2222222222")
            }

            if (1239 < window.innerWidth) {
                tdata.theme.layout.all_applications.columns.number = 3
                tdata.theme.layout.all_applications.container.width = '960px'
                // tdata.navigation.do_open_drawer_left = true
                console.log("innerWidth 3333333333")
            }

            tdata.current_device.do_refresh = false

            tdata.is_ready = true
            tdata.system.runtime = '333'
            console.log("=== SETTER_GLOBALPROPS start ", tdata)
            global_dispatch({
                type: 'SETTER_GLOBALPROPS',
                global_new_data: {global_props: tdata},
            })

            //=========================

        }

        return () => {

        };
    }, [global_props.is_ready]);

    return (
        <>
            {(!global_props.is_ready)
                ?
                <div>Loading settings...</div>
                :
                <AppInitReduxData/>
            }
        </>
    )

}

export default AppInitSettings
