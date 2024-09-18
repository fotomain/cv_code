

/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';

import {Route, useHistory, useLocation, useRouteMatch, withRouter} from 'react-router-dom';
import LayoutWebPages from './system_code/comp_navigation/LayoutWebPages';
import {Box} from "@mui/material";

import React, {useEffect, useState} from "react";
import EntranceProviders from "./system_code/firebase_stack/EntranceProviders";

import GridMemoPage from "./system_code/comp_grid/GridMemo/GridMemoPage";
import LayoutEntrance from "./system_code/comp_navigation/LayoutEntrance";

import {GlobalsContext} from "./system_code/context_globals/globals_context";

import EntranceRoutes from "./business/entrance/steps/EntranceRoutes";
import DrawersLeftRight from "./business/entrance/steps/DrawerLeft/DrawersLeftRight";
import AdminDashboard from "./business/entrance/AdminDashboard";

import UserDasboardCustom from "./ui/pages/user_dasboard_page/UserDasboardCustom";
import {onAuthStateChanged} from "firebase/auth";
import {fiauth, fidb} from "./system_code/firebase_stack/fi_firebase-config";
import {is_empty, stringify_clear} from "./system_code/code_global/GlobalFunctions";
import {collection, doc, onSnapshot, setDoc} from "firebase/firestore";
import {
    fi_login_places_crud_create, fi_login_places_crud_disconnect_finish,
    fi_login_places_crud_read, fi_login_places_crud_update,
    one_row_login_places
} from "./system_code/firebase_stack/fi_login_places_crud";
import {sign_out_with_google} from "./system_code/firebase_stack/global_google_in_out";
import WooProductsAdminPage from "./business/products/WooProductsAdminPage/WooProductsAdminPage";

import CatalogShop from "./business/products/products_catalog_grid/Catalog.1.Shop";
import AppHomeFinal from "./ui/pages/home_page/AppHomeFinal";
import SalePage from "./ui/pages/home_page/inner/SalePage";
import CartPage from "./business/products/cart_page/CartPage";

import ComingSoon from "./ui/pages/ComingSoon";
import AppPage404 from './AppPage404';


const do_log=false

const ScrollToTop = (params:any) => {
    useEffect(() => {
        const unlisten = params?.history?.listen(() => {
            console.log("=== scrollTo")
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, []);

    return (null);
}

const AppInitDataAndRoutes = () => {

    const { global_props,global_dispatch } = React.useContext(GlobalsContext);

    const history = useHistory();

    // ================
    // ================ onAuth all
    // ================

    useEffect(() => {


        const call_auth =onAuthStateChanged(fiauth, (user_result) => {

            console.log("=== onAuthStateChanged START")

            // console.log("=== onAuthStateChanged user_result.email " + Date.now(), user_result?.email)

            if (!user_result) {
                // ============== signOut

                if(do_log) {
                    console.log("=== onAuthStateChanged user_result !!!!!! signOut", fiauth)
                    console.log("=== onAuthStateChanged user_result !!!!!! signOut", global_props.current_user.user_guid, global_props.current_device.settings.device_guid)
                }
                if(!is_empty(global_props.current_user.user_guid)
                    && (!is_empty(global_props.current_device.settings.device_guid))) {

                    // TODO current_user.auto_delete_settings_when_log_out
                    // fi_login_places_crud_delete({
                    //     user_guid:global_props.current_user.user_guid,
                    //     device_guid:global_props.current_device.settings.device_guid,
                    //     do_after:(p:any)=>{console.log('=== Log Out + auto_delete_settings_when_log_out OK')}
                    // })

                }

                const udata = global_props.current_user
                udata.logged_in_auth_info = null
                udata.user_guid = ''
                udata.user_work_data = {}
                udata.email =''
                udata.first_name =''
                udata.last_name =''
                udata.step_logged_in = false
                udata.step_can_after_logged_in = false
                global_dispatch({type: "SETTER_USER", global_new_data: {user: udata}})


            } else {
                // ============== signIn

                if(do_log) {
                    console.log("=== onAuthStateChanged user_result !!!!!! signIn", user_result)
                    console.log("=== onAuthStateChanged user_result !!!!!! signIn global_props.current_device.settings.device_guid ", global_props.current_device.settings.device_guid)
                }
                const fi_update_user_after_sign_in = async (params:any) =>{

                    const {user_result} = params;

                    // alert("=== cool user_doc fi_update_user_after_sign_in")
                    // console.log("=== cool user_doc fi_update_user_after_sign_in")
                    //TODO if user not exist in FI
                    // fi_users_crud_create
                    await setDoc(
                        doc(fidb,'port_users',user_result.uid )
                        ,{
                            user_email:user_result.email,
                            ...(global_props.input_data.new_password)?{bp:'bp_sign_up_with_email'}:{bp:'bp_sign_up_with_google'},
                            ...(global_props.input_data.new_password)?{user_password:global_props.input_data.new_password}:{},
                            modified_time_stamp:Date.now().toString(),
                            user_data:JSON.stringify(user_result),
                        },
                        { merge: true }
                    ).then(async (res)=>{

                        if(!global_props.current_user.step_logged_in)
                            fi_login_places_crud_create({
                                user_guid:user_result.uid,
                                device_guid:global_props.current_device.settings.device_guid,
                                data:{
                                    login_time_stamp: Date.now().toString(),
                                    logged_in_auth_info: JSON.parse(JSON.stringify(fiauth)),
                                    current_device: JSON.parse(JSON.stringify(global_props.current_device)),
                                },
                                do_after:(p_login_places_created:any)=>{

                                    fi_login_places_crud_read({
                                        user_guid:user_result.uid,
                                        do_after:(p_login_places_readed:any)=>{

                                            if(do_log) {
                                                console.log('=== p_login_places_readed ', p_login_places_readed)
                                                console.log('=== fi_login_places_crud_create +++ when +++  global_props.current_user.step_logged_in OK ')
                                            }

                                            //=== !!!!! firebase assigned uid
                                            const udata = global_props.current_user
                                            udata.logged_in_auth_info = JSON.parse(JSON.stringify(fiauth))
                                            udata.user_guid = user_result.uid
                                            udata.first_name =user_result.displayName
                                            //TODO
                                            udata.last_name  =user_result.displayName
                                            udata.step_logged_in = true
                                            udata.step_can_after_logged_in = true
                                            if(do_log) {
                                                console.log('=== p_login_places_readed.login_places ', p_login_places_readed.login_places)
                                            }
                                            const result1 = (p_login_places_readed.login_places.map((doc: any) => {
                                                    return(
                                                        one_row_login_places({
                                                            doc:{
                                                                id: doc.device_guid,
                                                                data:doc.data }})
                                                    )})
                                            )

                                            udata.login_places = result1

                                            if(do_log) {

                                                console.log('=== result1 fi_login_places_crud_read ',result1)

                                                console.log("=== udata.user_work_data firebase user_result ", user_result)
                                                console.log("=== udata.user_work_data ", udata.user_work_data)
                                                console.log("=== udata.step_logged_in = true", Date.now())
                                                console.log("=== udata.step_can_after_logged_in = true")
                                            }
                                            global_dispatch({type: "SETTER_USER", global_new_data: {user: udata}})

                                            if(global_props.input_data.new_password) {
                                                // TODO 1 CALL WITH UPPER STATE
                                                let tdata = global_props
                                                tdata.input_data.new_email = ''
                                                tdata.input_data.new_password = ''
                                                tdata.system.runtime='222'
                                                global_dispatch({
                                                    type: 'SETTER_GLOBALPROPS',
                                                    global_new_data: {global_props: tdata},
                                                })
                                            }


                                        }
                                    })

                                },
                            })


                    })

                }

                fi_update_user_after_sign_in({user_result})

            }

        })


        return () => {
            call_auth()
        };
    }, []);

    // ================
    // ================ onAuth all END
    // ================

    // =================================
    // ================================= logged_in_users
    // =================================
    useEffect(() => {

        // fi_login_places_crud_listener
        const unsubscribe = onSnapshot(collection(fidb, 'port_logged_in_users', (global_props.current_user.user_guid)?global_props.current_user.user_guid:'-', 'login_places'), (snapshot: any) => {

            console.log('=== onSnapshot')
            if(is_empty(global_props.current_user.user_guid)) return

            console.log('=== new_test snapshot ',snapshot)

            let change_type=''

            //=========== refresh global_props


            const result1 = (snapshot.docs.map((doc: any) => {
                    return(
                        one_row_login_places({doc:{id: doc.id, data:doc.data() }})
                    )})
            )

            console.log('=== result1',result1)

            const udata = global_props.current_user
            udata.login_places = result1
            udata.login_places_timestamp = Date.now()

            if(do_log) {
                console.log('=== result1 fi_login_places_crud_read ', result1)
                console.log("=== port_logged_in_users new_test login_places", global_props.current_user.login_places)
            }
            let equal1 = (global_props.current_user.login_places.lenght===result1.lenght)
            if(equal1) {
                const intersection = result1.filter((xx: any) => {
                    const res = global_props.current_user.login_places.find((yy:any)=>{ return yy.device_guid===xx.device_guid })
                    return res!==null
                })
                console.log('new_test intersection',intersection)
                equal1 = (intersection.length === result1.length)

            }


            snapshot.docChanges().forEach((change: any) => {

                change_type=change.type

                console.log("=== port_logged_in_users new_test change.type ", change.type)


                if (change.type === "added") {
                    console.log("=== port_logged_in_users added result1 !!!!!!!!!!!!", result1)
                }
                if (change.type === "modified") {
                    console.log("=== port_logged_in_users modified result1 !!!!!!!!!!!!", result1)

                    const modified_device_guid = change.doc.id;
                    const modified_data = change.doc.data();

                    if(modified_data.do_disconect) {

                        fi_login_places_crud_disconnect_finish(
                            {
                                user_guid: global_props.current_user.user_guid,
                                device_guid:modified_device_guid,
                                do_after:(p:any)=>{

                                    console.log("=== fi_login_places_crud_disconnect_finish modified_device_guid", modified_device_guid)
                                    console.log("=== fi_login_places_crud_disconnect_finish modified_data", modified_data)

                                    if (modified_device_guid === global_props.current_device.settings.device_guid) {
                                        console.log("=== fi_login_places_crud_disconnect_finish sign_out_with_google")

                                        sign_out_with_google({do_after:()=>{
                                                history.push('/home', 'params')
                                            }})

                                        console.log("=== fi_login_places_crud_disconnect_finish history")

                                    }
                                }
                            },
                        )

                    }
                }

                if (change.type === "removed") {

                    console.log("=== port_logged_in_users removed", change)

                    const log_out_device_guid = change.doc.id;
                    const log_out_data = change.doc.data();
                    console.log("=== port_logged_in_users log_out_device_guid", log_out_device_guid)
                    console.log("=== port_logged_in_users log_out_data", log_out_data)

                    if (log_out_device_guid === global_props.current_device.settings.device_guid) {
                        console.log("=== port_logged_in_users sign_out_with_google")
                        sign_out_with_google({do_after:()=>{
                                history.push('/home', 'params')
                            }})
                    }

                }


            })

            console.log("=== port_logged_in_users result1 new_test equal1 added  ",equal1)
            console.log("=== port_logged_in_users result1 new_test added  ",result1,global_props.current_user.login_places)
            // if( !equal1 ) {
            //     console.log("=== port_logged_in_users result1 new_test added global_dispatch ")
            global_dispatch({type: "SETTER_USER", global_new_data: {user: udata}})

            // }

        })


        return () => {
            unsubscribe()
        };


    }, [global_props.current_user.user_guid]);


    // =================================
    // ================================= logged_in_users END
    // =================================

    //===== refresh visibility
    //===== refresh visibility
    //===== refresh visibility
    useEffect(() => {

        console.log('=== refresh_local AdminDashboard ')
        // console.log('=== global_props.current_user.login_places_timestamp ',
        //     global_props.current_user.login_places_timestamp,
        //     global_props.current_user.login_places)
        console.log('=== global_props.current_application.visibility ',global_props.current_application.visibility)

        if(
            !is_empty(global_props.current_user.user_guid)
            &&
            !is_empty(global_props.current_device.settings.device_guid)
        )


            fi_login_places_crud_read({
                user_guid: global_props.current_user.user_guid,
                device_guid:global_props.current_device.settings.device_guid,
                do_after:(res:any)=>{
                    console.log('=== res0 ',res)
                    if(res.login_places.length>0) {

                        const tcloud_props = (res.login_places[0]?.data?.cloud_props)?res.login_places[0]?.data?.cloud_props:null
                        console.log('=== tcloud_props',tcloud_props)
                        const old_data = (null!==tcloud_props)?tcloud_props:null

                        console.log('=== old_data',old_data)

                        let do_update=false

                        const new_data_visible = JSON.parse(stringify_clear( {
                                current_application: {...global_props.current_application},
                            }
                        ))

                        // const new_data_visible = JSON.parse(stringify_clear(global_props))
                        if(!old_data) {
                            do_update = true
                        }
                        else
                        {

                            console.log('=== new_data_visible ', new_data_visible)
                            console.log('=== new_data_visible old_data ', new_data_visible)
                            do_update = (
                                JSON.stringify(new_data_visible) !== JSON.stringify(old_data)
                            )
                        }

                        console.log('=== do_update 0 ',do_update)

                        if(do_update){

                            console.log('=== do_update 1 ',old_data?.current_application?.visibility)
                            console.log('=== do_update 2 ',global_props?.current_application?.visibility)
                            console.log('=== do_update 3 new_data_visible ',new_data_visible)


                            fi_login_places_crud_update(
                                {
                                    user_guid: global_props.current_user.user_guid,
                                    device_guid:global_props.current_device.settings.device_guid,
                                    // data: {cloud_props:global_props.current_application.visibility}
                                    data: {cloud_props:new_data_visible}
                                }
                            )
                        }
                    }
                }
            })


        return () => {

        };
    }, [
        global_props.current_application.visibility.visibility_state,
        global_props.current_application.visibility.is_focused,
    ]);

    // browser tab is hidden
    useEffect(() => {

        const tdata = global_props.current_application
        tdata.visibility.visibility_state = 'visible'
        tdata.visibility.is_focused = true
        console.log('=== visibilitychange 111 ',tdata.visibility)
        global_dispatch({type: "SETTER_APPLICATION", global_new_data: {current_application: tdata}})

        document.addEventListener("visibilitychange", (event) => {

            const tdata = global_props.current_application
            tdata.visibility.visibility_state = document.visibilityState
            console.log('=== visibilitychange 222',tdata.visibility)
            global_dispatch({type: "SETTER_APPLICATION", global_new_data: {current_application: tdata}})

            // if (document.visibilityState == "visible") {
            //     console.log("tab is active")
            // } else {
            //     console.log("tab is inactive")
            // }
        });

        return () => {

        };
    }, []);



    // focus / blur
    useEffect(() => {

        const whenFocus = () => {
            console.log('===  page when focus      '+Date.now())
            const tdata = global_props.current_application
            tdata.visibility.is_focused=true

            console.log('===  page when focus      ',Date.now(),tdata.visibility);
            global_dispatch({type: "SETTER_APPLICATION", global_new_data: {current_application: tdata}})
        };
        window.addEventListener('focus',whenFocus)

        const whenBlur = () => {
            const tdata = global_props.current_application
            tdata.visibility.is_focused=false

            console.log('===  page when blur     ',Date.now(),tdata.visibility)
            global_dispatch({type: "SETTER_APPLICATION", global_new_data: {current_application: tdata}})

        };
        window.addEventListener('blur',whenBlur)

        return () => {


            window.removeEventListener('focus',whenFocus)
            window.removeEventListener('blur',whenBlur)

        };
    }, []);


    //===== refresh visibility
    //===== refresh visibility END
    //===== refresh visibility

    const [state, set_state] = useState({
        currentPath:'/',
    });

    const location = useLocation();
    useEffect(() => {
        const currentPath = location.pathname;
        set_state((prev_state: any) => {return {...prev_state,
            currentPath: currentPath,
        }})
        console.log('=== currentPath',currentPath)
    }, [location]);

    // sss1
    return (
        //flex1 main frame of screen
        //TODO - COL FOR WEB
        //TODO - ROW FOR USER
        // <div className={"relative  w-full h-full overflow-auto flex flex-col items-top justify-start "}>
        <div id='div_AppInitDataAndRoutes' className={"relative  w-full h-[100%] overflow-y-auto flex flex-col items-center justify-start "}
             // style={{
             //     scrollbarGutter: 'stable both-edges'         }}

        >

            <ScrollToTop history={history} />
            <Route path="/sale" exact={true}>
                <LayoutWebPages>
                    <SalePage/>
                </LayoutWebPages>
            </Route>
            <Route path="/home" exact={true}>
                <LayoutWebPages>
                    <AppHomeFinal />
                </LayoutWebPages>
            </Route>

            <Route path="/entrancemain" >

                <LayoutWebPages>
                    <EntranceRoutes />
                </LayoutWebPages>


            </Route>

            <Route path="/cart" exact={true}>
                <LayoutWebPages>
                        <CartPage/>
                </LayoutWebPages>
            </Route>

            <Route path="/products" exact={true}>
                <LayoutWebPages>
                        <CatalogShop />
                </LayoutWebPages>
            </Route>

            <Route path="/admin_products" exact={true}>
                <LayoutWebPages>
                    <Box    sx={{ display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                    >
                        <WooProductsAdminPage/>
                    </Box>
                </LayoutWebPages>
            </Route>

            <Route path="/delivery" exact={true}>
                <LayoutWebPages>
                    <ComingSoon/>
                </LayoutWebPages>
            </Route>

            <Route path="/about" exact={true}>
                <LayoutWebPages>
                    <Box    sx={{ display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                    >
                        <ComingSoon/>
                        {/*<AboutCustom/>*/}
                    </Box>
                </LayoutWebPages>
            </Route>


            <Route path="/posts" exact={true}>
                <LayoutWebPages>
                    {/*<GridMemoPage/>*/}
                </LayoutWebPages>
            </Route>


            <Route path="/entrance" exact={true}>
                <LayoutWebPages>
                    <LayoutEntrance>
                        <EntranceProviders/>
                    </LayoutEntrance>
                </LayoutWebPages>
            </Route>
            <Route path="/all_posts" exact={true}>
                <LayoutWebPages>

                    <GridMemoPage />

                </LayoutWebPages>
            </Route>
            <Route path="/admin_space" exact={true}>
                <LayoutWebPages path={'admin_space'}>

                    <AdminDashboard />

                </LayoutWebPages>
            </Route>

            <Route path="/user_space" exact={true}>
                <LayoutWebPages>

                    <UserDasboardCustom />

                </LayoutWebPages>
            </Route>

            <Route path="/admin_space_advanced" exact={true}>

                <DrawersLeftRight/>

            </Route>

            <Route exact path="/">
                <LayoutWebPages>
                    <AppHomeFinal/>
                </LayoutWebPages>
            </Route>

            {(
                (state.currentPath==='/posts') ||
                (state.currentPath==='/all_posts') ||

                (state.currentPath==='/admin_space') ||
                (state.currentPath==='/user_space') ||

                (state.currentPath==='/') ||
                (state.currentPath==='/delivery') ||
                (state.currentPath==='/about') ||
                (state.currentPath==='/products') ||
                (state.currentPath==='/admin_products') ||
                (state.currentPath==='/entrancemain') ||
                (state.currentPath==='/sale') ||
                (state.currentPath==='/cart') ||
                (state.currentPath==='/home')
            )?null:
                <Route path="*">
                     <LayoutWebPages>
                         <AppPage404/>
                     </LayoutWebPages>
                </Route>
            }

        </div>
    );
};

export default withRouter(AppInitDataAndRoutes)

