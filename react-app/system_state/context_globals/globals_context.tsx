import * as React from "react";
import {useEffect} from "react";
// import {Database, Storage} from "@ionic/storage";

import userReducer from "./globals_reducer";
import {TGloabal_context} from "./globals_types";
import {initial_setings} from "./globals_initial_setings";
import { debug_orientationchange } from "../../App";

// import { Device } from '@capacitor/device';
// import internal from "stream";

const initial_logrecs = [
    {id: "1", text: "First", completed: false, is_active: false},
    {id: "2", text: "Second", completed: true, is_active: false},
];

// const initial_user = new C1_current_user()
// initial_user.email = 'aa@bb.cc'
// initial_user.is_signed_in = false

// let initial_user = {email:'aa'}
// initial_user.email  = 'bb';

export const GlobalsContext = React.createContext({} as TGloabal_context);

interface IProps {
    children?: React.ReactChild;
}

const cart_products_from_localStorage = () => {
    let from_Storage: any = localStorage.getItem('app888_cart')
    console.log('=== from_Storage ', from_Storage)
    if (from_Storage) {
        from_Storage = JSON.parse(from_Storage)
        console.log('=== from_Storage ', from_Storage)
        if (from_Storage?.products && from_Storage?.products?.length !== 0) {
            console.log('=== cart from_Storage?.products ', from_Storage?.products)
            return from_Storage?.products
        }
        return []
    }
}

export function GlobalsProvider(props: IProps) {

    let cartInitData = {products: []}

    cartInitData.products = (undefined !== cart_products_from_localStorage()) ? cart_products_from_localStorage() : []

    //global_props STEP 3
    const [global_props, global_dispatch] = React.useReducer(userReducer, {
        loading: {swiper_is_ready: false},
        cart: cartInitData,
        logrecs: initial_logrecs,
        debug_mode_global: false,
        is_ready: initial_setings.is_ready,
        default_settings: initial_setings.default_settings,
        info_for_login: initial_setings.info_for_login,
        theme: initial_setings.theme,
        pages_navigation: initial_setings.pages_navigation,
        entrance: initial_setings.entrance,
        navigation: initial_setings.navigation,
        current_user: initial_setings.current_user,
        current_application: initial_setings.current_application,
        current_device: initial_setings.current_device,
        show_timestamp: initial_setings.show_timestamp,
        entrance_step: '',
        set_entrance_step: (p) => initial_setings.set_entrance_step(p),
        input_data: initial_setings.input_data,
        system: initial_setings.system,
    });

    // user_settings_crud_read


    const value = {global_props, global_dispatch};

    useEffect(() => {

        console.log("=== window1 ", window)
        console.log("=== window.screen ", window.screen)

        // Device.getId().then((info:any) => {
        // Device.getInfo().then((info:any) => {
        //     console.log("=== Device info ");
        //     console.log(info);
        //     // console.log(info.operatingSystem);
        //     const tdata = global_props.current_device
        //     tdata.info = info
        //     console.log("=== tdata",tdata)
        //     global_dispatch({
        //         type: 'SETTER_DEVICE',
        //         global_new_data:{current_device:tdata},
        //     })
        //
        // });
        // js addEventListener on device change in chrome


        window.addEventListener('orientationchange', (event: any) => {
            const cur_screen = event.target.screen
            if(debug_orientationchange) {
                console.log("=== orientationchange ", event)
                console.log("=== appVersion ", event.target.navigator.appVersion)
                console.log("=== event.target.screen ", event.target.screen)
                console.log("=== height ", event.target.screen.height)
                console.log("=== width ", event.target.screen.width)
                console.log("=== cur_screen ", (cur_screen))
                console.log("=== event.target.screen.orientation.type ", event.target.screen.orientation.type)
            }            const tdata = global_props.current_device
            tdata.orientation = event.target.screen.orientation.type
            tdata.screen = typeof event.target.screen
            console.log("=== tdata", tdata)
            global_dispatch({
                type: 'SETTER_DEVICE',
                global_new_data: {current_device: tdata},
            })
        });

        // window.addEventListener('devicechange', (event) => {
        //
        //     if(debug_orientationchange) console.log("=== devicechange ", event)
        //
        // });


        // if (navigator.mediaDevices) {
        //     // console.log("=== navigator.mediaDevices ")
        //     navigator.mediaDevices.ondevicechange = (event) => {
        //         // console.log("=== navigator.mediaDevices.ondevicechange ", event)
        //     };
        // }

        return () => {

        };
    }, []);


    return (
        <GlobalsContext.Provider
            value={value}
        >
            {props.children}
        </GlobalsContext.Provider>)
}

export {cart_products_from_localStorage}
