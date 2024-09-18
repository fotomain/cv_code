import InputManager, {_input_inner_content_max_height} from "./inner/InputManager";

import React, {useEffect, useState} from "react";

import {faClose} from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import IconForInputFA from "./inner/IconForInputFA";
import {is_correct, is_empty} from "../code_global/GlobalFunctions";


const InputEmailAdvanced = (props:any) => {


    const [state,  set_state] = useState({
        style_underline:{
            textDecorationStyle: '',
            textDecorationColor: '',
            textDecorationLine: ''
        },
        is_error:false,
    })

    useEffect(() => {


        if(props.input_value.length>6){
            if(!is_correct('email',props.input_value)){
                // TODO underline
                    let css_underline = {
                        // textDecoration:'underline overline'
                        textDecorationStyle: 'wavy',
                        textDecorationColor: 'green',
                        textDecorationLine: 'underline'
                    }
                set_state((prev_state: any) => {return {...prev_state,
                    style_underline:css_underline,
                }})
            }
            else{
                set_state((prev_state: any) => {return {...prev_state,
                    style_underline:{},
                    is_error:false,
                }})
            }
        }

        return () => {

        };
    }, [props.input_value]);

    useEffect(() => {
        return () => {

        };
    }, [state.is_error]);


// sss1
  return(<>

      {/*<div>is_error {JSON.stringify(state.is_error)}</div>*/}
      {/*  <br/>*/}
      {/*  <br/>*/}

      <InputManager

          type={'text'}
          label_text={'Email address'}
          input_value={props.input_value}
          onChange={(e:any)=>{
              console.log(' === InputEmailAdvanced ',e.target.value)
              props?.onChange?.(e)
          }}
          is_error={state.is_error}
          input_error={(p:any)=>{
              if(state.is_error) {
                  // alert(' === InputEmailAdvanced onBlur222 ')
              }
              return state.is_error
          }}
          onBlur={(e:any)=>{

              if(!is_empty(state.style_underline?.textDecorationStyle)){
                  // alert(' === InputEmailAdvanced onBlur111 ')
                  console.log(' === InputEmailAdvanced onBlur ')
                  set_state((prev_state: any) => {return {...prev_state,
                      is_error:true,
                  }})
              } else {
                  set_state((prev_state: any) => {return {...prev_state,
                      is_error:false,
                  }})
              }
          }}

          node_right_show={(p:any)=> {
              console.log('=== node_right_show ',p)
              return p?.input_state?.input_value && (''!=p?.input_state?.input_value)
          }}

          node_right={(p:any)=>
              <div  style={{height:_input_inner_content_max_height+'px',display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center',
                  paddingRight:'4px',
                        // ,paddingTop:'10px',paddingBottom:'6px'
                    }}
              >

                      <IconForInputFA {...p} tabIndex={-201}
                                      style_wrapper={{paddingTop:'7px'}}
                                      onClick={()=>{
                                          props.onClear?.()
                                      }}
                      >
                          {faClose}
                      </IconForInputFA>

              </div>
          }

          style_underline={state.style_underline}
          {...props}

      />

  </>)
}

export default InputEmailAdvanced
