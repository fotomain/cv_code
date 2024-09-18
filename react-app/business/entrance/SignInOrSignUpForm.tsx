
import React from "react";
import EnterWithGoogle from "./steps/EnterWithGoogle";
import EnterWithFacebook from "./steps/EnterWithFacebook";
import EnterWithX from "./steps/EnterWithX";
import EnterWithEmail from "./steps/EnterWithEmail";
import {GlobalsContext} from "../../system_code/context_globals/globals_context";
import {useHistory} from "react-router";
import fi_sign_in_user_email_password from "./steps/fi_sign_in_user_email_password";
import sign_up_user_email_password from "./steps/fi_sign_up_user_email_password";
import H16 from "./steps/H16";

const SignInOrSignUpForm = (props:any) => {

  const { global_props, global_dispatch } = React.useContext(GlobalsContext);

  const history = useHistory();

  return (

    <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-center text-sm text-c-main-black font-inder">
      <div className="flex flex-col items-start justify-start min-w-[320px]">

        <div className="self-stretch flex flex-row items-center justify-center text-base font-f-menu-disktop">

          <div className="pb-[20px] text-[16px]">
            <H16>with social</H16>
          </div>

        </div>

        <div id="enters_social" className="flex flex-row items-center justify-around w-[100%]">


            <EnterWithGoogle
                {...props}
                handle_step_start={()=>global_props.set_entrance_step({g:global_props, d: global_dispatch, s:props.entrance_mode+'_with_google'})}
                handle_history_success={()=>{                    //send_user_password

                    history.push(`/entrancemain/entrance_success`,
                        JSON.stringify({
                            title:'You are succesfully logged in with Google!',
                            after:'google',
                        })
                    )

                }}
                handle_history_failure={()=>history.push(`/entrancemain/entrance_failure`)}
            />

            <EnterWithFacebook />

            <EnterWithX />


        </div>



      </div>
      <div className="self-stretch flex flex-row items-center justify-start gap-[10px] text-left text-base font-f-menu-disktop">
        <img
          className="flex-1 relative max-w-full overflow-hidden h-[2.49px]"
          alt=""
          src="/images_is/line-1.svg"
        />
        <div className="text-[16px]">
            <H16>{"or "+((props.entrance_mode==='sign_in_mode')?"sign in":"sig up")+" with e-mail"}</H16>
        </div>
        <img
          className="flex-1 relative max-w-full overflow-hidden h-[2.49px]"
          alt=""
          src="/images_is/line-2.svg"
        />
      </div>

        <EnterWithEmail
            button_title={("sign_up_mode"===props.entrance_mode)?'Sign Up':'Sign In'}
            handle_step_start={ async (bp_data:any)=> {
                global_props.set_entrance_step({g: global_props,d: global_dispatch, s: props.entrance_mode+'_with_email'})

                console.log('=== bp_data ',bp_data)

                if("sign_up_mode"===props.entrance_mode) {

                    console.log('=== bp_data ',bp_data)

                    await sign_up_user_email_password({
                        global_props,
                        email:bp_data.new_email,
                        password:bp_data.new_password,
                        do_after:()=>{
                            let tdata = global_props
                            tdata.input_data.new_email = bp_data.new_email
                            tdata.input_data.new_password = bp_data.new_password
                            tdata.system.runtime='666'
                            global_dispatch({
                                type: 'SETTER_GLOBALPROPS',
                                global_new_data: {global_props: tdata},
                            })

                            history.push(`/entrancemain/sign_up_mode_input_otp`)

                        }
                    })

                } // sign_up_mode


                if("sign_in_mode"===props.entrance_mode) {

                    await fi_sign_in_user_email_password({
                        email: bp_data.new_email,
                        password: bp_data.new_password,
                        do_after:()=>{
                            history.push(`/entrancemain/entrance_success`)
                        }
                    })

                }


            }}



            // handle_step_success={()=> {}}
            // handle_step_failure={()=> {}}


        />


    </div>
  );
};

export default SignInOrSignUpForm;
