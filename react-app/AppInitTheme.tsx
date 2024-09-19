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

/* Theme variables */
import './ui/theme/variables.css';

import MainlStyles from './ui/theme/main_styled'

import {ThemeProvider,useTheme,  createTheme} from '@mui/material/styles';

import {GlobalsContext} from "./system_state/context_globals/globals_context";
import {get_user_device_features, get_user_device_info} from "./system_code/code_global/get_user_device_info";
import {page_orientation} from "./system_state/context_globals/globals_types";

// import AOS from 'aos';
// import 'aos/dist/aos.css';
import {PaletteColorOptions} from "@mui/material";
import AppMUIThemeLight from "./ui/theme/AppMUIThemeLight";
import AppMUIThemeDark from "./ui/theme/AppMUIThemeDark";
import { get_theme_now } from "./system_code/code_global/GlobalFunctions";

const largest_width=1280
const free_space_if_no_largest_width=20

declare module '@mui/material/styles' {
    interface CustomPalette {
        primary : PaletteColorOptions;
        secondary : PaletteColorOptions;
        anger: PaletteColorOptions;
        apple: PaletteColorOptions;
        steelBlue: PaletteColorOptions;
        violet: PaletteColorOptions;
        color_text_black: PaletteColorOptions;
    }
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        anger: true;
        apple: true;
        steelBlue: true;
        violet: true;
    }
}

const AppInitTheme = (props:any) => {

    // AOS.init(
    //     {
    //         offset: 200,
    //         duration : 1000
    //     }
    // );
    // AOS.refresh();


    const init_state = {
        refresh_device_info:false,
        user_device_window: window,
        user_device_document: window.document,
    }

    const [state, set_state] = useState(init_state);

    useEffect(() => {

        console.log("=== refresh_device_info START")
        set_state(
            {   ...state,
                ...{
                    refresh_device_info:true,
                    user_device_window:window,
                    user_device_document:window.document,
                }
            })

        return () => {

        };

    }, []);



    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const { palette } = createTheme();
    const { augmentColor } = palette;
    const createColor = (mainColor:any) => augmentColor({ color: { main: mainColor } });


    const appThemeLight = createTheme(AppMUIThemeLight({createColor}));
    // no dark now
    // const appThemeDark = createTheme(AppMUIThemeDark({createColor}));
    const appThemeDark = createTheme(AppMUIThemeLight({createColor}));

    // toggle theme
    const [theme_now, set_theme_now] = useState(get_theme_now);

    window.document.body.style.background = ('theme_now_light'===theme_now)?appThemeLight.palette.background.default:appThemeDark.palette.background.default

        // console.log('=== theme_now',theme_now)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        console.log('== theme_now change newColorScheme ',newColorScheme)
        set_theme_now(get_theme_now())
    });
    useEffect(() => {

        console.log('== theme_now useEffect ',theme_now)

        return () => {

        };
    }, [theme_now]);


    useEffect(() => {

        do_when_window_size_changed({www:window})

        if(!global_props.is_ready){

            console.log('=== global_props.is_ready FALSE === work_screen_width ' )

        }
        else {
            console.log('=== global_props.is_ready TRUE === work_screen_width ' )
        }

        return () => {

        };
    }, [global_props.is_ready]);



    const do_when_window_size_changed = (props:any) =>{
        let tdata = global_props
        tdata.current_device.info = {...get_user_device_info(window, document),...get_user_device_features(window,document)}

        console.log("=== work_screen_width props.www ",props.www)

        // === SEE @media screen FOR
        const cw = props.www.innerWidth
        let csuffix = '640';
        switch (true) {
            case (cw<640) : {
                csuffix='360'
                break
            }
            case (640<=cw && cw<768) : {
                csuffix='640'
                break
            }
            case (768<=cw && cw<1024) : {
                csuffix='768'
                break
            }
            case (1024<=cw && cw<largest_width) : {
                csuffix='1024'
                break
            }
            case (largest_width<=cw ) : {
                //TODO 1536px
                csuffix='1280'
                break
            }
        }

        console.log("=== cw csuffix",cw, csuffix)

        tdata.current_device.media_querry_suffix = csuffix


        tdata.current_device.use_desktop_mode   = (largest_width <= window.innerWidth)
        tdata.current_device.use_tablet_mode    = ((640 < window.innerWidth) && (window.innerWidth<largest_width))
        tdata.current_device.use_phone_mode     = (window.innerWidth <= 640)

        console.log('=== tdata.current_device.use_phone_mode',tdata.current_device.use_phone_mode)

        //flex work_screen_width
        let iw_
        if(window.innerWidth<largest_width) {
            iw_ = ' w-screen '
            if(window.innerWidth<=360) {
                iw_ = ' w-[360px] '
                //TODO globals
                props.www.resizeTo(360, 800);
            }
        }
        else {
            // iw_ = " w-[" + csuffix + "px] w-min-[360px] "
            iw_ = " w-screen max-w-screen-xl "
        }
        global_props.current_device.work_screen_width=iw_

        console.log("=== work_screen_width 000",iw_,csuffix)

        tdata.debug_mode_global=(window.location.toString().indexOf("localhost")!==-1)

        tdata.current_device.innerWidth=window.innerWidth

        tdata.navigation.free_width = tdata.current_device.innerWidth - Math.floor(tdata.navigation.drawer_left_width.replace('px',''))

        tdata.current_device.innerHeight=window.innerHeight
        if( tdata.current_device.innerWidth>tdata.current_device.innerHeight) {
            tdata.current_device.orientation=page_orientation.lanscape
        }else {
            tdata.current_device.orientation=page_orientation.portrait
        }
        console.log('=== global_props.is_ready tdata.current_device.info',tdata.current_device.info)
        tdata.is_ready = true
        tdata.system.runtime='444'
        console.log("=== SETTER_GLOBALPROPS start ",tdata)
        global_dispatch({
            type: 'SETTER_GLOBALPROPS',
            global_new_data:{global_props:tdata},
        })

    }


    const fResize = () => {
        let www = window
        do_when_window_size_changed({www:www})
    }

    useEffect(() => {
        window.addEventListener('resize',fResize)
        return () => {
            window.removeEventListener('resize',fResize)
        };
    }, []);

    // sss

    return(
        <>
            {(!global_props.is_ready)
                ?
                <div>Loading settings...</div>
                :<>
                    <MainlStyles/>
                    <ThemeProvider theme={('theme_now_light'===theme_now)?appThemeLight:appThemeDark}>

                        {props.children}

                    </ThemeProvider>
                </>
            }
        </>

    )

}

export {largest_width,free_space_if_no_largest_width}
export default AppInitTheme

