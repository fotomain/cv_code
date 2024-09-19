
import React, {useEffect} from "react";
import {GlobalsContext} from "../../../system_state/context_globals/globals_context";
import OTPInputForm from "../otp/OTPInputForm";
import {useHistory} from "react-router-dom";
import {Button} from "@mui/material";
import H16 from "./H16";

import {doc,  setDoc} from "firebase/firestore";
import {fidb, fifunc, fiauth} from "../../../system_code/firebase_stack/fi_firebase-config";
import { httpsCallable } from "firebase/functions";

import fi_sign_in_user_email_password from "./fi_sign_in_user_email_password";
import fi_create_user_email_password from "./fi_create_user_email_password";
import {initial_setings} from "../../../system_state/context_globals/globals_initial_setings";


const SignUpModeCheckOTPForm = (props:any) => {

  const { global_props } = React.useContext(GlobalsContext);

    const init_state={
        step_name:((props.enter_email_mode)?props.enter_email_mode:'input_data'),
        otp:['1','2','3','4',],
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

    const history = useHistory();

    useEffect(() => {
        return () => {

        };
    }, [global_props.entrance_step]);


    return (
      <>
        {("sign_up_mode_with_email"!==global_props.entrance_step)?
            <>
                <H16>Sign Up time expired...</H16>
                <Button
                    disabled={state.otp.length===0}
                    // ref={ref_button_local}
                    onClick={()=>{
                        history.push('/entrancemain/entrance_main_form')
                    }}
                    variant="contained">
                    Continue
                </Button>

            </>:
            <>
                <div>SignUpModeCheckUserForm</div>
                <div>entrance_step {global_props.entrance_step}</div>

                  <OTPInputForm
                      // bp_sign_up_with_email_otp_input
                      titile={<div>Input code from email to Sign Up please...</div>}

                      beforeStart={()=>{
                        // TODO timer_input_otp
                      }}

                      onChange={(ret:any)=>{
                          console.log("=== OTPInputForm value", ret.value)
                          in_state('otp',ret.value)
                      }}

                      onContinue={()=>{
                          //bp_sign_up_with_email_otp_check

                          //fi_crud_create_post_otp_intup
                            // new_email
                          //fi_get_post_otp_intup
                            // new_email
                            // otp_is_correct
                          // str_otp = state.otp.map(el=>el.)
                          let str_otp=''
                          for (let i = 0; i <state.otp.length ; i++) {
                              str_otp+=state.otp[i]
                          }
                          console.log('=== bp_sign_up_with_email_otp_check str_otp ', str_otp, state.otp)
                          const key_=JSON.stringify({
                              email: global_props.input_data.new_email,
                              device_guid: global_props.current_device.settings.device_guid
                          })
                          setDoc(
                              doc(fidb,'port_otp_input', key_ )
                              ,{
                                  bp:'bp_sign_up_with_email_otp_check',
                                  otp_input:str_otp,
                              }
                          ).then((res_otp)=>{
                              //get-> otp_is_ok

                              const params1_ = {
                                  docId: key_,
                                  new_email: global_props.input_data.new_email,
                                  // otp_input: 58804
                                  otp_input: str_otp
                              }

                              const port_check_otp = httpsCallable(fifunc, 'port_check_otp');
                              // call the function and pass data
                              port_check_otp(params1_).then( async (result:any) => {
                                  alert('=== sayHello '+JSON.stringify(result?.data.otp_verified) +' === '+ JSON.stringify(result?.data));
                                  console.log('=== sayHello ',result?.data.otp_verified, result?.data);
                                  if(result?.data.otp_verified){

                                        if(result?.data.user_exist){

                                            if( global_props.system.strong.sign_up ){
                                                alert('=== user already exist - you can go to sing in !!! (user_exist)')
                                                history.push(`/entrancemain/entrance_success`)
                                            }
                                            else {
                                                await fi_sign_in_user_email_password({
                                                    email: global_props.input_data.new_email,
                                                    password: global_props.input_data.new_password,
                                                    do_after: () => {
                                                        history.push(`/entrancemain/entrance_success`)
                                                    }
                                                })
                                            }

                                        }else {

                                            await fi_create_user_email_password({
                                                new_email:global_props.input_data.new_email,
                                                new_password:global_props.input_data.new_password,
                                                do_after: () => {
                                                    history.push('/entrancemain/entrance_success')
                                                }
                                            })

                                        }

                                  }
                              });


                              // if(state.otp[0]==='1')
                              //     history.push('/entrancemain/entrance_success')
                              // else
                              //     history.push('/entrancemain/entrance_failure')
                          })




                      }}
                      onBack={()=>{
                          history.push('/entrancemain/entrance_main_form')
                      }}

                  />
            </>
        }
      </>

  );
};

export default SignUpModeCheckOTPForm
