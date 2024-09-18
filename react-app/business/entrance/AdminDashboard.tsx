
import React, {useEffect} from "react";
import {GlobalsContext} from "../../system_code/context_globals/globals_context";
import {Button} from "@mui/material";
import {sign_out_with_google} from "../../system_code/firebase_stack/global_google_in_out";
import {fidb} from "../../system_code/firebase_stack/fi_firebase-config";

import {collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc} from "firebase/firestore";
import {is_empty, stringify_clear} from "../../system_code/code_global/GlobalFunctions";
import {
    fi_login_places_crud_delete,
    fi_login_places_crud_disconnect_start, fi_login_places_crud_read, fi_login_places_crud_update
} from "../../system_code/firebase_stack/fi_login_places_crud";
import {work_place_detail_txt} from "./work_place_detail_txt";
import GlobalShowContent from "../../ui/pages/user_dasboard_page/show_global/GlobalShowContent";
import GlobalShowContentCall from "../../ui/pages/user_dasboard_page/show_global/GlobalShowContentCall";



const AdminDashboard = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const init_state={
        logged_in_list:[],
        refresh_time_stamp:0,
    }

    const [state, set_state] = React.useState({...init_state});
    const in_state = (name:string, data:any) => {

        set_state({
            ...state,
            ...{
                [name]: data,
            }
        })

    }





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



    // setInterval(function () {
        // console.log('===  window.Tab '+(isTabActive ? 'active' : 'hidden')+Date.now());
    // }, 1000);

    return (

    <div className=" flex flex-col items-center justify-center
            hover:cursor-pointer
          ">

        <GlobalShowContentCall/>

        <h1>AdminDashboard</h1>

        {((is_empty(global_props.current_user.login_places)) || (is_empty(global_props.current_device.settings.device_guid)) )?
            <>
                        <div>No logged in users...</div>
            </>:
            <>

                <div style={{color:'pink'}}>
                    current_device.settings.device_guid = {global_props.current_device?.settings?.device_guid}</div>
                <div style={{color:'yellow'}} >global_props.current_application.visibility {JSON.stringify(global_props.current_application.visibility)}</div>
                <div>OS</div>
                <div>{ (work_place_detail_txt('os',global_props))}</div>
                <div>state</div>
                <div>{JSON.stringify(state)}</div>

                {global_props.current_user.login_places.map((el_logged_in:any)=>{

                    return  <div key={'log_out_button_'+el_logged_in?.device_guid}>

                        <div>
                            <div><span>====== el_logged_in.device_guid =</span>
                                <span style={{color:'magenta'}} > <b>{el_logged_in.device_guid} </b> </span> ===========
                            </div>

                            <div>{el_logged_in?.os}</div>
                            <div>{el_logged_in?.email}</div>
                            <div style={{color:'yellow'}}>
                                {el_logged_in?.visibility}
                            </div>
                            <button onClick={()=>{

                                fi_login_places_crud_disconnect_start(
                                    {
                                    user_guid: global_props.current_user.user_guid,
                                    device_guid:el_logged_in.device_guid,
                                    }
                                )

                            }

                            }>Disconect</button>
                           <span>___</span>

                            <button onClick={()=>{
                                console.log('=== el_logged_in.device_guid delete',el_logged_in.device_guid)

                                fi_login_places_crud_delete({
                                    user_guid:global_props.current_user.user_guid,
                                    device_guid:el_logged_in.device_guid,
                                    do_after:(p:any)=>{
                                    }
                                })

                            }

                            }>Delete Workplce Settings</button>

                        </div>
                        <div>
                            {el_logged_in.userAgent}
                        </div>
                        <br/>


                    </div> //return
                })}
            </>
        }

        {(!global_props.current_user.step_logged_in)?<>
                User not logged in...

                <div>current_user.step_logged_in {(global_props.current_user.step_logged_in)?'true':'false'}</div>

            </>:
        <>
            <Button
                variant="contained"
                onClick={()=> {
                    sign_out_with_google({do_after:()=>{
                            //history.push('/home', 'params')
                        }})
                }}
            >
                Sign Out
            </Button>


            <div>==============</div>
            <Button
                variant="contained"

                onClick={()=> {
                    const td = global_props.current_application
                    td.show_global.show_form = 'alert' //snackbar // alert
                    td.show_global.show_title = 'Copied to clipboard' //yes_no
                    td.show_global.show = true
                    global_dispatch({type: "SETTER_APPLICATION", global_new_data: {current_application: td}})
                    console.log("=== OK ")
                }}
            >
                Alert = show_form
            </Button>

            {(is_empty(global_props.current_user.user_guid))?<></>:
                <>
                <div>firebase uid = user_guid   {global_props.current_user.user_guid}</div>
                <br/>
                <div>firebase uid =       {global_props.current_user.logged_in_auth_info.currentUser.uid}</div>
                <div>firebase displayName =     {global_props.current_user.logged_in_auth_info.currentUser.displayName}</div>
                <br/>
                <div>google logged_in_google_info.id</div>
                <div>{JSON.stringify(global_props.current_user.logged_in_google_info?.id)}</div>
                <div>{JSON.stringify(global_props.current_user.logged_in_google_info?.email)}</div>
                <br/>
                <div>google logged_in_google_info</div>
                <br/>
                <textarea cols={10} rows={(null===global_props.current_user?.logged_in_google_info)?0:10} onChange={()=>{}} value = {JSON.stringify(global_props.current_user.logged_in_google_info)}/>
                <br/>
                <div>firebase logged_in_auth_info</div>
                <br/>
                <textarea rows={20} cols={80} onChange={()=>{}} value = {JSON.stringify(global_props.current_user.logged_in_auth_info)}/>


                    <div>==============</div>
                    <Button
                        variant="contained"

                        onClick={()=> {
                            const td = global_props.current_application
                            td.show_global.show_form = 'snackbar' //snackbar // alert
                            td.show_global.show_title = 'Delete settings?' //yes_no
                            td.show_global.show_timeout = 2000
                            td.show_global.show = true
                            global_dispatch({type: "SETTER_APPLICATION", global_new_data: {current_application: td}})
                            console.log("=== OK ")
                        }}
                    >
                        Snackbar = show_form
                    </Button>



                    <div>==============</div>
                    <Button
                        variant="contained"

                        onClick={()=> {
                            const td = global_props.current_application
                            td.show_global.show_form = 'dialog' //snackbar // alert
                            td.show_global.show_variant = 'cancel_ok' //yes_no
                            td.show_global.show_title = 'Delete settings?' //yes_no
                            td.show_global.show = true
                            global_dispatch({type: "SETTER_APPLICATION", global_new_data: {current_application: td}})
                            console.log("=== OK ")
                        }}
                    >
                        Dialog = show_form
                    </Button>

                    <div>==============</div>

                </>

            }
        </>}
    </div>

);
};

export default AdminDashboard

//
// function isFocused() {
//     return document.hasFocus() || document.getElementById('iframe').contentWindow.document.hasFocus();
// }
