
import React, {useEffect} from "react";
import OTPInputMaterial from "./OTPInputMaterial";
import {Button} from "@mui/material";
import {tw_row_between} from "../../../system_code/tw/tw_tools";
import H16 from "../steps/H16";

const OTPInputForm = (props:any) => {

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

    useEffect(() => {
        console.log("=== 111 state.code",state.otp)
        props.onChange?.({value:state.otp})
        return () => {

        };
    }, [state]);

    useEffect(() => {
        props.beforeStart?.()
        return () => {

        };
    }, []);


    return (
    <>
    <H16>
        {props.titile}
        {/*<div>entrance_step {global_props.entrance_step}</div>*/}
    </H16>
    <div>
    <OTPInputMaterial
        // showDebug={true}

        value={state.otp}
        state={state}
        set_state={set_state}

        // onChange={(otp_ret:any)=> {
        //     console.log('=== 111 otp_ret',otp_ret)
        //     in_state('code', otp_ret.value)
        // }}

        ifDelete={'shift'}
        ifBackspace={'shift'}

        numInputs={5}
        divider={(ind:any)=> {
            return <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                width: "18px"
            }}>-</div>
        }}
        // inputType={'number'}
        inputType={'text'}

        shouldAutoFocus={true}
        containerStyle={{padding:'15px', backgroundColor:'lightgray'}}

        focusedStyle={{
            outline: "2px solid teal",
        }}
        inputStyle={{
            ':focused':{
                outline: "2px solid red",
            },
            backgroundColor:'#ffffe0', //TODO
            outline:'none',
            border: "1px solid #008080", //TODO
            borderRadius: "8px",
            borderColor: "#006060", //TODO
            width: "54px",
            height: "54px",
            textAlign:'center',
            fontSize: "20px",
            color: "#008080",
            fontWeight: "400",
            caretColor: "#006060" //"red" //"#000000"
        }}
        onPaste={(e:any)=>{
            // alert('=== onPaste '+JSON.stringify(e))
            console.log('=== onPaste ',e.clipboardData.getData('text'))
            in_state('step_name','step_pin_correct')
            // in_state('step_name','step_pin_error')
        }
        }
    />


        <div className={tw_row_between+' py-[10px]'}>
            <Button
                disabled={state.otp.length===0}
                // ref={ref_button_local}
                onClick={()=>{
                    props.onBack()
                }}
                variant="contained">
                Back
            </Button>
            <Button
                disabled={state.otp.length===0}
                // ref={ref_button_local}
                onClick={()=>{
                    props.onContinue()
                }}
                variant="contained">
                Continue
            </Button>
        </div>



    </div>

    </>
  );
};

export default OTPInputForm
