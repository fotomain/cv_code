import InputManager, {_input_inner_content_max_height} from "./inner/InputManager";

import React, {useEffect} from "react";

import {faClose} from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import IconForInputFA from "./inner/IconForInputFA";
import {useTheme} from "@mui/styles";

const InputSearchStandard = (props:any) => {


  // sss1
  return(
      <InputManager
          id={props.id}
          variant={'standard'}

          label_text={'Search...'}
          input_value={props.input_value}

          node_left_show={(p:any)=> {
              return true
              // return false
          }}

          node_left={(p:any)=>
              <div  style={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center',
                            height:_input_inner_content_max_height+'px',
                            paddingLeft:'4px',
                        }}>

                      <IconForInputFA {...p} tabIndex={-202}
                                      style_wrapper={{paddingTop:'6px'}}
                                      style={{fontSize: '1.5em'}}
                                      onClick={(e:any)=>
                                             {
                                                 props?.onSearch?.({input_value: props.input_value})
                                             }}
                       >
                                    {faSearch}
                       </IconForInputFA>

               </div>
          }

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
                                      style={{fontSize: '1.5em'}}
                                      onClick={(e:any)=>{
                                          console.log('=== IconForInputFA faClose')
                                          props.onClear?.(e)
                                      }}
                      >
                          {faClose}
                      </IconForInputFA>


              </div>
          }

          {...props}

      />
  )
}

export default InputSearchStandard
