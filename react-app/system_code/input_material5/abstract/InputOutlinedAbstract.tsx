

import React, {useEffect} from "react";


import {get_required_color} from "../inner/InputManager";
import {is_empty} from "../../code_global/GlobalFunctions";

const _max_width_above= {'--max-width-above':230}

const InputOutlinedAbstract = (props:any) => {
  const {state, set_state, ref_input, ref_component, props_rest} = props

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


    // sss1
    return(

        <div className="inline-text-field-container"
             style={{position:'relative',width:'100%'}}
        >

        <label className={(!state.is_focused)
          ? "mdc-text-field mdc-text-field--outlined "
          : "mdc-text-field mdc-text-field--outlined "
          }
             style={{height:"54px", border:'none',
               //not over border bottom
               width:'100%',
               paddingLeft: '4px', //c+1-1 4px for INPUT <= from paddint labek text / no16px <= 16px from shift_left_input
               // ...(state.labal_must_be_above )?{paddingLeft: '4px'}:{}, // ===margin of space in left label text
             }}
          id='label1'
      >

        <input className="mdc-text-field__input" aria-labelledby="label1"
               ref={ref_input}
               id={props.id}
               style={{
                 width:'100%',
                 // backgroundColor:'green',
                 // color:'yellow',
                 // color:'darkgray',
                 height:"50px",
                 marginTop:"3px",
                 border:'none',
                 // zIndex:(state.labal_must_be_above)?0:0, //under label NOTCH
                 ...state.input_style,
                 ...props.style,
                 ...props.style_underline,
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

        {is_empty(state.label_text)?null:
            <div className={(!state.is_focused)
                ?"mdc-notched-outline mdc-notched-outline--upgraded"
                :"mdc-notched-outline mdc-notched-outline--upgraded mdc-notched-outline--notched"
            }

            >
              <div className="mdc-notched-outline__leading" style={{border:'none'}}></div>

              {/*TODO if labal_must_be_above->4 else if(nleft + nleft not visible + !is_full )=> 16px */}
              <div id={'notch1'} className="mdc-notched-outline__notch"
                   style={{
                     width:(state.labal_must_be_above)?state.notch_width+'px':'100%',
                     height:'52px', //c+ no over bottom border
                     // backgroundColor:'red',
                     // backgroundColor:(state.is_full || state.is_focused)?state.color_main_background:'transparent',
                     zIndex:50,
                     // marginTop:'-10px', //experiment -> over top line
                     marginTop:'2px', //c+ -> text on center of container
                     border:'none',
                     position: 'absolute', //stable on focus
                     maxWidth:'130%', //may be > w(input) if right node exist
                     ...(state.labal_must_be_above)?{zIndex:95}:{},
                   }} //'red'

              >
                            <span id="span1"  className={(state.labal_must_be_above )
                                    ?"mdc-floating-label mdc-floating-label--float-above"
                                    :"mdc-floating-label"
                                    }
                                  style={{
                                    ..._max_width_above,
                                    position: 'absolute', //stable on focus
                                    paddingLeft:'4px', //c+2-1 -> no c+1-1 no c+1-2
                                    paddingRight:'4px', //c+2-1 -> no c+1-1 no c+1-2
                                    // paddingTop:'2px', //c+2-1 -> no c+1-1 no c+1-2
                                    // width:'120px',
                                    // width:'max-content',

                                    //c2-2 -4px shift_left  1st - NODE is 2nd NO NODE

                                    color:(state.is_focused)?state.color_label_text_focused:((state.is_hovered)?state.color_label_text_hovered:state.color_label_text),
                                    backgroundColor:state.color_label_fly_up_background,
                                    // backgroundColor:'yellow',
                                    // zIndex:999,
                                  }}

                                  >
                                {state.label_text}{(!props.required)?'':<a style={{color: get_required_color({state})}}> *</a>}
                            </span>



              </div>
              <div className="mdc-notched-outline__trailing" style={{border:'none'}} ></div>
            </div>
        }{/*===== {is_empty(state.label_text)?null:*/}

      </label>
    </div>
  )
}

export default InputOutlinedAbstract
