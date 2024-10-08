
import React from "react";

import {GlobalsContext} from "../../../system_state/context_globals/globals_context";

import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";
import {GoogleAuthProvider, signInWithCredential} from "firebase/auth";
// import {auth} from "../../is/firebase_stack/firebase-config";

import {fiauth, fidb} from "../../../system_code/firebase_stack/fi_firebase-config";
import {  collection, query, getDocs, where } from "firebase/firestore";
import {debug_login_google} from "../../../App";
import { google_clientId } from "../secrets";

const EnterWithCodetrix = (props:any) => {

    const {handle_step_start, handle_history_success, handle_history_failure, ...props_rest} = props;

    {/*============== google   */}
    {/*===DOC https://developers.google.com/identity/branding-guidelines*/}

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    GoogleAuth.initialize({
        //WEB++
        clientId: google_clientId,

        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
    })


    const process_user_with_firebase = async (params:any) => {
        const colRef = collection(fidb, "port_users");
        const q = query(colRef, where("user_email", "==", params.user_email));
        const querySnapshot = await getDocs(q);
        console.log("=== user_doc querySnapshot", querySnapshot)

        let user_doc = null;

        if(querySnapshot.empty) {

            alert("=== user_doc user not found getDoc")

            if(("sign_up_mode"===params.entrance_mode) && params.do_enter_firebase){
                // sign_up_mode + user NOT found = do auto sugn up
                params.do_enter_firebase()

            }
            else{
                // sign_in_mode + user NOT found
                if( global_props.system.strong.sign_in )
                {   //no sign in
                    props.handle_history_failure()
                }
                else
                {   //yes sign in
                    params.do_enter_firebase()
                }
            }
        }
        else {
            // sign_up_mode + user found = automaticaly sign in
            // sign_in_mode + user found
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                if(debug_login_google) alert("=== user_doc user found getDoc")
                user_doc = doc
                console.log("=== user_doc querySnapshot ", user_doc.id, " => ", user_doc.data());

                if(params.do_enter_firebase){

                    params.do_enter_firebase()

                }

            });
        }

    } //process_user_with_firebase

    const enter_firebase = async (params:any) => {
        signInWithCredential(fiauth,
            GoogleAuthProvider.credential(params.user_result_google.authentication.idToken)
        ).then((credential: any) => {
            console.log('=== user_result_credential OK enter_firebase ', credential.user);
            alert('=== user_result_credential OK === enter_firebase ' + JSON.stringify(credential.user));
            //see->  update_user_after_sign_in_firebase
            props.handle_history_success()
        }).catch((err: any) => {
            console.log('=== user_result_credential ERR enter_firebase ', err);
            alert('=== user_result_credential ERR enter_firebase' + JSON.stringify(err));
            props.handle_history_failure()
        });
    }

    return (
      <div className=" flex flex-row items-center justify-center
            hover:cursor-pointer
          "
           onMouseEnter={(e)=> {

               // in_state('on_hover_google',true)

           }}
           onMouseLeave={(e)=> {

               // in_state('on_hover_google',false)

           }}

      >

          <img
              {...props_rest}

              onClick={()=>{

                  props.handle_step_start()

                  const handleAuthGGL = async () => {

                      alert('=== user_result O1-2 START EnterWithGoogle '  )

                      await GoogleAuth.signIn()
                          .then(user_result_google=>{

                              const udata = global_props.current_user
                              udata.logged_in_google_info = user_result_google
                              global_dispatch({type: "SETTER_USER", global_new_data: {user: udata}})

                                //=== call firebase check and login
                                process_user_with_firebase(
                                    {
                                            user_email:user_result_google.email,
                                            entrance_mode:props.entrance_mode,
                                            do_enter_firebase:()=> {

                                                enter_firebase({user_result_google})

                                                }
                                            }
                              ) //process_user_with_firebase



                          })
                          .catch((err:any)=>{
                              alert('=== user_result my101 ERROR EnterWithGoogle '+JSON.stringify(err))
                              // === user_result my101 ERROR {"error":"popup_closed_by_user"}
                          });


                  }

                  handleAuthGGL()
              }}

              className={"w-auto h-[35px]"}
              alt=""
              // src={(state.on_hover_google)?"/images_is/google-logo.svg":"/images_is/google-logo.svg"}
              src={"/images_is/google-logo.svg"}
          />

      </div>
  );
};

export default EnterWithCodetrix
