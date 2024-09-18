
import React from "react";

const OTPInput1Value = (props:any) => {

    const ctrlKey = 17
    const cmdKey = 91
    const vKey = 86
    // const cKey = 67

    // const array1 : string[] = [];

    const init_state={
        ctrlDown:false,
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

    const isInputValueValid = function (value:any) {
        if(props.inputType && "number"===props.inputType )
        {
            const is_ok = (value===Number(value).toString())
            if(!is_ok) alert('Input number pleae!')
            return is_ok
        }
        return typeof value === 'string' && value.trim().length === 1;
    };

    const set_1value_props = (v:any,index:number,index_new:number) =>
    {
        console.log('111 set_1value_props')
        let lotp = props.otp
        lotp[index] = v
        props.set_state({
            ...props.state,
            ...{
                activeInput: index_new,
                otp: lotp,
            }
        })
    }

    const handleChange = (event:any,index:any,index_new:any) => {
        let v = event.target.value;
        event.preventDefault()
        console.log("=== otp_new 3 handleChange ",v)
        if (isInputValueValid(v)) {
            console.log("=== otp_new 4 handleChange")
            set_1value_props(v,index,index_new)

            // changeCodeAtFocus(v,state.activeInput + 1);
            // focusInput(state.activeInput + 1);
        }
    }

    const styles_all = {...props.otp_1value_styles,...{
            maxLength: 1,
        }}

        const set_pasted_text = (pasted_text:any,index:number) => {
            props.set_state({
                ...props.state,
                ...{
                    step_otp_pasted: true,
                    activeInput: index,
                    pastedData: pasted_text,
                }
            })
        }

        const handlePaste = (event:any,index:any) => {
            event.preventDefault()
            let pastedData = event.clipboardData
                .getData('text/plain')
            set_pasted_text(pastedData,index)
        }

        const handleKeyUp = (event:any) => {

            if (event.keyCode === ctrlKey || event.keyCode === cmdKey)
            {
                event.preventDefault();
                in_state('ctrlDown', false);
            }

        }

        const handleKeyDown = (event:any,index:any) => {

            console.log("=== event.code ", event.code)
            console.log("=== event.keyCode ", event.keyCode)
            if (event.code === 'Backspace') {
                event.preventDefault();
                // set_1value_props('',index,index)
                props.in_state("backspace_item",props.state.activeInput);

            } else if (event.code === 'Delete') {
                event.preventDefault();
                // set_1value_props('',index,index)
                props.in_state("delete_item",props.state.activeInput);

            } else if (event.code === 'ArrowLeft') {
                event.preventDefault();
                props.in_state("activeInput",props.state.activeInput-1);
            } else if (event.code === 'ArrowRight') {
                event.preventDefault();
                props.in_state("activeInput", props.state.activeInput + 1);
            } else if (event.key === props.otp[props.state.activeInput]) {
                event.preventDefault();
                props.in_state("activeInput",props.state.activeInput+1);
            } else if (event.code === 'Spacebar' ||
                event.code === 'Space' ||
                event.code === 'ArrowUp' ||
                event.code === 'ArrowDown') {
                event.preventDefault();

            } else
                if (event.keyCode === ctrlKey || event.keyCode === cmdKey) {
                    event.preventDefault();
                    // console.log('=== ctrlDown',event.keyCode)
                in_state('ctrlDown', true);

            } else if (state.ctrlDown && (event.keyCode === vKey)) {
                    event.preventDefault();
                console.log("Document catch Ctrl+V ");
                navigator.clipboard.readText().then((txt1) => {
                    console.log("=== txt", txt1);
                    set_pasted_text(txt1, index)
                    // in_state("ctrlDown", false)
                })
                    .catch(err => {
                        console.error('Failed to read clipboard contents: ', err);
                    });
            }

        }

        return (
        <React.Fragment key={props.index} >
              {(props.divider)?props.divider(props.index):<></>}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
            }}>
            <input

                  value={(props.otp[props.index])?props.otp[props.index]:''}
                  type={'text'}

                  ref={rr => props.ref_calc(rr)}

                  {...{style:styles_all }}

                  onFocus={()=>{
                      props.in_state('activeInput',props.index)
                  }}

                  onChange={(e:any)=>{handleChange(e,props.index,props.index+1 )}}

                  onKeyDown={(e:any)=>{handleKeyDown(e,props.index )}}
                  onKeyUp={(e:any)=>{handleKeyUp(e)}}

                  onPaste={(e:any)=> {handlePaste(e,props.index )}}


                  id={'otp_1value_'+props.index}


              ></input>
                {/*<div>{JSON.stringify(state)}</div>*/}
            </div>

        </React.Fragment>

  );
};

export default OTPInput1Value
