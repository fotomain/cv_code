//
//
// <button onClick={()=>{
//     history.push(`${url}/components`, 'params')
// }}>Go Components</button>

import React, {useEffect, useRef} from "react";
import {Button, Checkbox, FormControlLabel, FormGroup, Link, Typography} from "@mui/material";
import {is_correct, is_empty} from "../../../system_code/code_global/GlobalFunctions";

import InputPasswordOutlined from "../../../system_code/input_material5/InputPasswordOutlined";
import InputEmailAdvanced from "../../../system_code/input_material5/InputEmailAdvanced";
import {useTheme} from "@mui/styles";


const  EnterWithEmail = (props:any) => {


    const init_state={
        step_name:((props.enter_email_mode)?props.enter_email_mode:'input_data'),
        new_email:'vtest777999@gmail.com',
        new_password:'111222333',
        code:['1','2','3','4',],
        checked_remember_me:true,
        show_password:false,
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

    let ref_input_local_password = useRef<HTMLInputElement>(null)

    let ref_button_local = useRef<HTMLButtonElement>(null)
    let ref_link_local = useRef<HTMLAnchorElement>(null)
    let ref_label_local = useRef<HTMLSpanElement>(null)
    let ref_checkbox_local = useRef<HTMLButtonElement>(null)


    // useEffect(() => {
    //     // ref_input_local_password.current?.blur()
    //     return () => {
    //
    //     };
    // }, []);

    let ref_input_passeord = useRef<HTMLInputElement>(null)

    const theme = useTheme()

    let style_form={}
    if(!is_empty(theme)){
        style_form={
            backgroundColor:theme?.palette?.background?.default,
            color:theme?.palette?.text.primary,
            ...style_form, // spec style is !important
        }
    }


    // sss1
    return (
    <>

        {('input_data'===state.step_name)
        ?
            <div className="self-stretch bg-white-main flex flex-col items-center justify-start gap-[14px]"
                 style={style_form}
            >

                <InputEmailAdvanced
                    theme={theme}
                    variant={'outlined'}

                    input_value={state.new_email}
                    onChange={(ret:any)=>{
                        console.log('=== 111 InputEmail',ret)
                        in_state('new_email',ret.target.value)
                    }
                }/>

                <InputPasswordOutlined
                    // ref_input  = {ref_input_passeord}

                    theme={theme}

                    // color_main={'lightgreen'}
                    // color_main_hovered={'teal'}
                    // color_main_focused={'teal'}

                    input_value={state.new_password}
                    onChange={(ret:any)=>{
                        console.log('=== 111 InputPassword',ret)
                        in_state('new_password',ret.target.value)
                    }}
                />

                <div className="flex flex-row items-start justify-start min-w-[320px] text-left text-xs">
                    <div className="w-80 flex flex-row items-center justify-start">
                        <div className="rounded-8xs flex flex-row items-center justify-start py-3.5 px-0 ">
                            <div className="flex flex-col items-start justify-center gap-[1px]">
                                <div className="relative tracking-[-0.05em] inline-block w-40">
                                    <FormGroup>
                                        <FormControlLabel
                                            ref={ref_checkbox_local}
                                            control={
                                                <Checkbox

                                                    size="small"
                                                    checked={state.checked_remember_me}
                                                    onChange={(event, checked)=>in_state('checked_rememger_me',checked)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            }
                                            label={<Typography
                                                ref={ref_label_local}
                                                sx={{
                                                    fontFamily: 'Inter',
                                                    fontSize: '12px',
                                                }}
                                            >Remember me
                                            </Typography>
                                            }
                                        />
                                    </FormGroup>
                                </div>
                                <Link
                                    sx={{
                                        fontFamily: 'Inter',
                                        fontSize: '12px',
                                    }}
                                    ref={ref_link_local}
                                    href="src/bl/entrance/steps/EnterWithEmail#" underline="hover">
                                    {'Fogot Password'}
                                </Link>
                            </div>
                        </div>
                        {/*border-[1px] border-solid border-hero-green*/}
                        <div className="flex-1 rounded-8xs flex flex-row items-center justify-end py-3.5 px-0 text-center text-sm font-f-menu-disktop ">
                            {/*aa@aa.com*/}
                            <Button
                                disabled={is_empty(state.new_email) || is_empty(state.new_password)
                                    || ((!is_correct('email',state.new_email)) || (!is_correct('password', state.new_password))) }
                                ref={ref_button_local}
                                onClick={()=>{
                                    // in_state('step_name','step_input_otp' )
                                    // history.push('entrancemain/entrance_input_otp')
                                    props.handle_step_start(state)

                                }}
                                variant="contained">
                                {props.button_title}
                            </Button>

                        </div>
                    </div>
                </div>

            </div>
            :<></>}
    </>);
};

export default EnterWithEmail
