

import React from "react";


import {get_required_color} from "../inner/InputManager";
import {is_empty} from "../../code_global/GlobalFunctions";

const _max_sidth_above= {'--max-width-above':230}

const InputFilledAbstract = (props:any) => {
  const {state, set_state, ref_input, ref_component,props_rest} = props


    const _node_left_show = (p:any) => {
        return ((props?.node_left_show && props?.node_left_show({input_state:p.input_state}))?true:false)
    }
    const _node_right_show = (p:any) => {
        return ((props?.node_right_show && props?.node_right_show({input_state:p.input_state}))?true:false)
    }

    // const marginLeft1 = () => {
    //     const _exist = (!is_empty(props.node_left))
    //     const _show = _node_left_show({props,input_state:state} )
    //     if(  _exist  &&   _show)       return '-4px'
    //     if(  _exist  && (!_show))    return '-4px' //will work id='fake16px'
    //     if((!_exist) &&   _show)    return '16px'
    //     if((!_exist) && (!_show))    return '-4px' //will work id='fake16px'
    // }

    // useEffect(() => {
    //     return () => {
    //
    //     };
    // }, [state.labal_must_be_above]);

    let background_normal='rgb(245, 245, 245)'
    let background_hover='#ECECEC'
    let background_focused='#DBDBDB'

    if(state.is_standard){
         background_normal   ='transparent'
         background_hover    ='transparent'
         background_focused  ='transparent'
    }

    let style1_filled_normal= {
        height:'50px',
        marginTop:'3px',
        "--mdc-ripple-fg-size": "128px",
        "--mdc-ripple-fg-scale": "1.8062952073652931",
        "--mdc-ripple-fg-translate-end": "43px, -36px",
        // border:'2px red solid',
    } as React.CSSProperties;

    style1_filled_normal={ ...style1_filled_normal,
        "--mdc-ripple-fg-translate-start": "-24.5px, -36px",
        backgroundColor:background_normal,
    } as React.CSSProperties;

    let style2_filled_hover={ ...style1_filled_normal,
        "--mdc-ripple-fg-translate-start": "-24.5px, -36px",
        backgroundColor:background_hover,
    } as React.CSSProperties;

    let style3_filled_focused={ ...style1_filled_normal,
        "--mdc-ripple-fg-translate-start": "-7.5px, -28px",
        backgroundColor:background_focused,
    } as React.CSSProperties;


    // sss1
    return(
        <div className="inline-text-field-container"
             style={{position:'relative',width:'100%'}}

        >

        <label
                    className={
                    (!state.is_focused)
                    ?"mdc-text-field mdc-text-field--filled mdc-ripple-upgraded"
                    :"mdc-text-field mdc-text-field--filled mdc-ripple-upgraded mdc-text-field--label-floating"
                    }
               style={{
                   ...(!state.is_focused)?(state.is_hovered)?style2_filled_hover:style1_filled_normal:style3_filled_focused,
                   // borderLeftColor:'red',
                   // borderTopLeftRadius:'10px',
                   cursor:'text',

                   ...(_node_left_show({props,input_state:state}))? {paddingLeft:'4px'}:{},

                }}

        >

                    <input className="mdc-text-field__input"   aria-labelledby="label1"
                           ref={ref_input}
                           id={props.id}

                           style={{
                               width:'100%',
                               // backgroundColor:'green',
                               // color:'yellow',
                               // color:'darkgray',
                               // height:"50px", //c+ DO NOT DO IT => CHROME WORKS BAD : BORDER AND SPACE APPEARED
                               marginTop:"3px",
                               // paddingTop:"36px",

                               border:'none',
                               zIndex:(state.labal_must_be_above)?51:0, //OVERT NOTCH
                               ...state.input_style,
                               ...props.style_underline,
                               ...props.style,
                               ...props.style_from_theme,
                           }}

                        //ii
                           value={(props?.onChange)?props.input_value:state.input_value}
                        //ii
                           onChange={(e)=>{

                               props.onChangeHandler(e)

                           }}
                        //ii
                           onFocus={(e)=>{
                               props.onFocusHandler(e)

                           }}
                        //ii

                           onBlur={(e)=>{
                               props.onBlurHandler(e)
                           }}

                           {...props_rest}

                    />

                            {/* ======== file input    */}
                            {(!props.disabled)?null:
                            <div style={{
                                    position: 'absolute', left: '0', right: '0', top: '0', bottom: '0',
                                    zIndex:999, cursor:'pointer'
                                }}

                                onClick={(e)=>
                                {
                                    // https://stackoverflow.com/questions/3100319/event-on-a-disabled-input
                                    // alert('onClick222')
                                    //=== for input text
                                    e.stopPropagation()
                                    if(!props.disabled) {

                                    }else {
                                        if(props.on_click_if_disabled){
                                            props.on_click_if_disabled(this)
                                        }
                                    }

                                }}

                            ></div>
                            }


            <span id="label1"
                  className={(!state.labal_must_be_above)
                                ?"mdc-floating-label"
                                :"mdc-floating-label mdc-floating-label--float-above "
                            }
                  style={{
                      color:(state.is_focused)?state.color_label_text_focused:((state.is_hovered)?state.color_label_text_hovered:state.color_label_text),
                     ...(_node_left_show({props,input_state:state}))? {left: '0px'}:{},
                     ...(_node_left_show({props,input_state:state}))? {paddingLeft:'4px'}:{},
                  }}

            >
                {state.label_text}{(!props.required)?'':<a style={{color: get_required_color({state})}}> *</a>}
            </span>

        </label>
    </div>
  )
}

export default InputFilledAbstract
