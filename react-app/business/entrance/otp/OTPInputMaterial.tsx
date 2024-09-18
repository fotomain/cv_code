
//TODO
// del
// bspace

import React, {useEffect} from "react";
import OTPInput1Value from "./OTPInput1Value";


interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {

    value?: any;
    state?: any;
    set_state?: any;

    renderInput?: any;
    renderSeparator?: any;
    containerStyle?: any;
    inputStyle?:any;
    focusedStyle?: any;
    inputType?:any;
    showDebug?:any;
    numInputs:any;
    shouldAutoFocus?:any;

    onChange?:any;
    ifDelete?:any;
    ifBackspace?:any;
    divider?:any;

}

// const OTPInputMaterial = (props:any) => {
const OTPInputMaterial = React.forwardRef<HTMLInputElement,IProps>((props, ref) => {

    const array1 : string[] = [];

    const init_state={
        otp: (props.value)?props.value:array1,
        pastedData: '',
        delete_item: -1,
        backspace_item: -1,
        step_otp_pasted: false,
        key:'',
        numInputs:props.numInputs,
        activeInput:0,
        inputType:props.inputType,
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

    const otp_1value_styles = {...props.inputStyle,...{
            maxLength: 1,
            textAlign:'center',
        }}

    let otp_1value_foucused={}
    if(props.focusedStyle)
        otp_1value_foucused = {...otp_1value_styles, ...props.focusedStyle }

    let inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {

        console.log('=== 111 useEffect state.otp ')

        props.set_state(
            {
                ...props.state,
                ...{
                    otp: state.otp
                }
            }
        )


        return () => {

        };
    }, [state]);


    useEffect(function () {
        console.log('=== useEffect activeInput')
        inputRefs.current[state.activeInput]?.focus()
        inputRefs.current[state.activeInput]?.select()

    }, [state.activeInput]);

    useEffect(function () {

        if(state.step_otp_pasted) {
            console.log('=== useEffect pastedData START')
            const str_pasted = state.pastedData.slice(0, state.numInputs - state.activeInput).split('');

            if (state.inputType === 'number' && str_pasted.some((value: any) => {
                return isNaN(Number(value));
            })) {
                alert('Found non numeric data in Clipboard!!!');
                return;
            }

            let lopt = []
            lopt=[...state.otp.slice(0,state.activeInput)]
            const nstart=lopt.length
            for (let i = 0; i < str_pasted.length; i++) {
                lopt[nstart+i]=str_pasted[i]
            }
            // console.log('=== lopt', lopt)
            set_state(
                {
                    ...state,
                    ...{
                        otp: lopt,
                        activeInput: state.activeInput,
                        step_otp_pasted: false,
                    }
                }
            )
        }else {
            console.log('=== useEffect pastedData FINISH')
        }

    }, [state.step_otp_pasted]);

    useEffect(() => {
        // console.log("=== shouldAutoFocus")
        if(props.shouldAutoFocus){
            in_state('activeInput',0)
        } else {
            // console.log("=== shouldAutoFocus",99)
            inputRefs.current[0]?.blur()
        }
        return () => {

        };
    }, [props.shouldAutoFocus]);


    const set_1value_state = (v:any,index:number,index_new:number) =>
    {
        let lotp = state.otp
        lotp[index] = v
        set_state({
            ...state,
            ...{
                activeInput: index_new,
                otp: lotp,
            }
        })
    }

    useEffect(() => {

        if(state.delete_item>=0) {
            if (props.ifDelete !== 'shift') {
                set_1value_state('', state.delete_item, state.delete_item)
            } else {
                const lotp1=state.otp.slice(0,state.delete_item)
                const lotp2=state.otp.slice(state.delete_item+1,state.otp.length)
                // console.log('=== lotp12 ',lotp1,lotp2)
                set_state({...state,
                    delete_item:-1,
                    otp: [...lotp1, ...lotp2]}
                )


            }
        }

        if(state.backspace_item>=0) {
            if (props.ifBackspace !== 'shift') {
                set_1value_state('', state.backspace_item, state.backspace_item)
            } else {
                const lotp1=state.otp.slice(0,state.backspace_item-1)
                const lotp2=state.otp.slice(state.backspace_item,state.otp.length)
                console.log('=== lotp12 ',lotp1,lotp2)
                set_state({...state,
                    backspace_item:-1,
                    activeInput: state.backspace_item-1,
                    otp: [...lotp1, ...lotp2]}
                )


            }
        }
        return () => {

        };
    }, [state.delete_item,state.backspace_item]);


    return(
        <div style={{...{display:'flex', flexDirection: 'column'}, justifyContent:'center'}} >
        <div style={{...{display:'flex', flexDirection: 'row'}, justifyContent:'center',...(props.containerStyle)?props.containerStyle:{}}} >
            {Array.from({length: props.numInputs}, function (_, index) {
                return index;
            }).map((index)=> {
                    return <React.Fragment key={index} >

                        <OTPInput1Value

                            inputRefs={inputRefs}
                            inputType={props.inputType}

                            in_state={in_state}
                            index={index}
                            otp={state.otp}
                            state={state}
                            set_state={set_state}
                            otp_1value_styles={(index!==state.activeInput)?otp_1value_styles:otp_1value_foucused}
                            ref_calc={(element:any) => {
                                if(element) {
                                    // console.log('=== ref111', element)
                                    return (inputRefs.current[index] = element);
                                }
                            }}
                        />
                        {(props.divider   && (index<(state.numInputs-1))   )?props.divider(index):<></>}
                    </React.Fragment>
                }
            )}

        </div>
            {(!props.showDebug)?<></>:
                <div>{JSON.stringify(state.otp)}</div>
            }
        </div>

    );

})

export default OTPInputMaterial
