
'use client'

// npm i lit

//=============== important comments with //c+

//TODO label_focused_position={'right'}

import './fonts/fire_fonts.css'
// import './css_material_main.css'
import './css_material_input.css'
import './InputManager_css.css'


import React, {useEffect, useMemo, useRef, useState} from "react";

import IconForInputFA from "./IconForInputFA";

import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

import InputOutlinedAbstract from "../abstract/InputOutlinedAbstract";
import InputFilledAbstract from "../abstract/InputFilledAbstract";
import {get_theme_now, is_empty, rectIsInsideRect} from '../../code_global/GlobalFunctions';


const _input_inner_content_max_height = 50

const get_required_color = (p:any) => {

    let _required_color = p.state.color_main
    if( p.state.is_error ){ _required_color = 'red' }
    else{
        switch (true) {
            case p.state.is_focused:{_required_color =p.state.color_main_focused; break;}
            case p.state.is_hovered:{_required_color =p.state.color_main_hovered; break;}
        }
    }
    return _required_color
}

const InputManager = (props:any) => { //<Input5

    const [theme_now, set_theme_now] = useState(get_theme_now);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        console.log('=== theme_now change 111 newColorScheme ',newColorScheme)
        set_theme_now(get_theme_now())
    });
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        console.log('=== theme_now change 222 newColorScheme ',newColorScheme)
        set_theme_now(get_theme_now())
    });

    // console.log('=== props5',props)
    console.log('=== props5',props.type)
    if(!is_empty(props.input_value) && is_empty(props.onChange)) {
        console.error('=== InputManager have not managment - !is_empty(props.input_value) && is_empty(props.onChange) ', props.id, props)
    }

    const {
        is_error,
        show_state,
        required,
        // disabled,
        on_click_if_disabled,
        variant,
        node_left,
        node_left_show,
        node_right,
        node_right_show,
        input_value,
        onChange,
        onBlur,
        onClear,
        onSearch,
        is_focused,
        debug_mode,
        backgroundColor,
        input_error,
        input_error_message,
        style,
        theme,
        helper_text,
        ...props_rest
    } = props




    const firstRender = useRef(true);

    const _node_left_show = (p:any) => {
        return ((props?.node_left_show && props?.node_left_show({input_state:p.input_state}))?true:false)
    }
    const _node_right_show = (p:any) => {
        return ((props?.node_right_show && props?.node_right_show({input_state:p.input_state}))?true:false)
    }

    let _debug_mode= false
    if(props.debug_mode) _debug_mode=((!is_empty(props.debug_mode)) && props.debug_mode)

    let color_main='blue'
    if(props.color_main) color_main=props.color_main
    let color_main_focused='#6200ee'
    if(props.color_main_focused) color_main_focused=props.color_main_focused
    let color_main_hovered='#6200ee'
    if(props.color_main_hovered) color_main_hovered=props.color_main_hovered

        if(!is_empty(theme)){
            color_main = theme.palette?.primary?.main
            color_main_hovered = theme.palette?.primary?.light
            color_main_focused = theme.palette?.primary?.main
        }


    let color_label_text= color_main
    if(props.color_label_text) color_label_text=props.color_label_text
    let color_label_text_focused= color_main_focused
    if(props.color_label_text_focused) color_label_text_focused=props.color_label_text_focused
    let color_label_text_hovered= color_main_hovered
    if(props.color_label_text_hovered) color_label_text_hovered=props.color_label_text_hovered

    // === PRIORITY 1 = AUTO
    let color_background_auto = window.getComputedStyle( document.body ,null).getPropertyValue('background-color');

    // console.log('=== color_background_auto',color_background_auto)
    let color_main_background=color_background_auto

            let style_from_theme_to_state = {} as React.CSSProperties;

            const style_from_theme_reusable = ()=>{
                let style_from_theme = {backgroundColor:'white',color:'black',caretColor:'black'} as React.CSSProperties
                if(!is_empty(theme)){
                    // console.log('=== theme 111',theme.palette?.mode)
                    // console.log('=== theme 111',theme)
                    // === PRIORITY 2 = THEME
                    if(theme.palette?.mode === 'dark'){
                        // alert('props_rest.color=\'white\'')
                        style_from_theme.color='white'
                        style_from_theme.backgroundColor='#2C2C2C'
                        color_main_background='#2C2C2C'
                    }else{
                        style_from_theme.color='#2C2C2C'
                        style_from_theme.backgroundColor='white'
                        color_main_background='white'
                    }
                    if(theme.palette?.text?.primary)
                        style_from_theme.color=theme.palette?.text?.primary
                    // console.log('=== theme 111 style_from_theme.color',style_from_theme.color)
                    // style_from_theme = {color:props_rest.color}
                    style_from_theme.caretColor=style_from_theme.color
                }
                return style_from_theme as React.CSSProperties;
            }

            style_from_theme_to_state=style_from_theme_reusable() as React.CSSProperties;
            console.log('=== style_from_theme_to_state 0',style_from_theme_to_state)

                // === PRIORITY 2 = PROPS
                    if(props.color_main_background) color_main_background=props.color_main_background
                    // console.log('=== color_main_background1',color_main_background)


    let color_label_fly_up_background=color_main_background
    if('rgba(0, 0, 0, 0)'===color_label_fly_up_background) color_label_fly_up_background = 'white'
    if(''===color_label_fly_up_background) color_label_fly_up_background = 'white'
    if(props.color_label_fly_up_background) color_label_fly_up_background=props.color_label_fly_up_background

    let color_input_background=color_main_background
    if(props.color_input_background) color_input_background=props.color_input_background

        if(!is_empty(theme)){
            color_main_background = theme.palette?.background?.default
            color_label_fly_up_background = theme.palette?.background?.default
            // alert('=== color_label_fly_up_background1 '+color_label_fly_up_background)
        }


    let color_border_normal= color_main
    if(props.color_border_normal) color_border_normal=props.color_border_normal
    let color_border_hover= color_main_hovered
    if(props.color_border_hover) color_border_hover=props.color_border_hover
    let color_border_focused= color_main_focused
    if(props.color_border_focused) color_border_hover=props.color_border_focused


    let background_normal='rgb(245, 245, 245)'
    let background_hover='#ECECEC'
    let background_focused='#DBDBDB'

        const _is_standard = (props?.variant==='standard')
        const _no_variant = ((!props.variant) || (props?.variant===''))

            const styles123_reusable = () => {
                let style1_filled_normal= {}
                let style2_filled_hover= {}
                let style3_filled_focused= {}

                        if(_is_standard || _no_variant){
                            background_normal   =color_main_background
                            background_hover    =color_main_background
                            background_focused  =color_main_background
                        }

                                style1_filled_normal={ ...style1_filled_normal,
                                    backgroundColor:background_normal,
                                    borderTopLeftRadius:'4px',
                                    borderTopRightRadius:'4px',
                                } as React.CSSProperties;

                                style2_filled_hover={ ...style1_filled_normal,
                                    backgroundColor:background_hover,
                                    borderTopLeftRadius:'4px',
                                    borderTopRightRadius:'4px',
                                } as React.CSSProperties;

                                style3_filled_focused={ ...style1_filled_normal,
                                    backgroundColor:background_focused,
                                    borderTopLeftRadius:'4px',
                                    borderTopRightRadius:'4px',
                                } as React.CSSProperties;
                 return {style1_filled_normal, style2_filled_hover, style3_filled_focused}
            }

            const {style1_filled_normal,style2_filled_hover,style3_filled_focused } = styles123_reusable()

    console.log('=== props.id ',props.id, props, _debug_mode)

    if(_debug_mode){
        // alert('_debug_mode')
        color_main='#6200ee'
        color_label_fly_up_background='cyan'
        color_input_background='lightgreen'
        color_border_normal='darkgreen'
        color_border_hover='darkblue'
        color_border_focused='cyan'
        // document.body.style.setProperty('--color-border-normal', 'red');
        // document.body.style.setProperty('--color-border-hover', 'blue');
        // document.body.style.setProperty('--color-border-focused', 'darkblue');
    }

    // document.body.style.setProperty('--color-border-normal', color_border_normal);
    // document.body.style.setProperty('--color-border-hover', color_border_hover);
    // document.body.style.setProperty('--color-border-focused', color_border_focused);


    const ref_calc1 = useRef<HTMLDivElement>(null)
    const ref_calc2 = useRef<HTMLDivElement>(null)

    const ref_component_wrapper = useRef<HTMLInputElement>(null)
    const ref_component = useRef<HTMLInputElement>(null)
    let ref_input0 = useRef<HTMLInputElement>(null)
    let ref_input = useRef<HTMLInputElement>(null)
    if(props.ref_input) ref_input = props.ref_input
    const ref_input_container = useRef<HTMLDivElement>(null)
    const ref_node_left_space = useRef<HTMLDivElement>(null)
    const ref_node_right_space = useRef<HTMLDivElement>(null)
    const ref_helper    = useRef<HTMLDivElement>(null)
    const ref_span    = useRef<HTMLDivElement>(null)

    const label_font_family = props?.label_font_family || 'Roboto'
    const label_font_size = props?.label_font_size || 16
    const label_text = props?.label_text
    const modes = props?.modes

    const _is_full = !is_empty(props.input_value)
    const _is_focused = !is_empty(props.is_focused) && props.is_focused
    // alert('_is_focused'+_is_focused)


    let input_container_style = {

        '--color-border-normalL': color_border_normal,
        '--color-border-normalR': color_border_normal,
        '--color-border-normalT': color_border_normal,
        '--color-border-normalB': color_border_normal,

        '--color-border-hoverL': color_border_hover,
        '--color-border-hoverR': color_border_hover,
        '--color-border-hoverT': color_border_hover,
        '--color-border-hoverB': color_border_hover,

        '--color-border-focusedL': color_border_focused,
        '--color-border-focusedR': color_border_focused,
        '--color-border-focusedT': color_border_focused,
        '--color-border-focusedB': color_border_focused,

    } as React.CSSProperties

    //notch_saved STEP1 - check if exist
    let notch_saved_str = localStorage.getItem('notch_saved'+props.label_text)
    let notch_saved = 0
    if (null!==notch_saved_str) {
        notch_saved = parseFloat(notch_saved_str)
        // console.log('=== notch_saved getItem',notch_saved)
    }else{
        // console.log('=== notch_saved 1st load = 0',notch_saved)
    }

    const [state,  set_state] = useState({

        style_from_theme:style_from_theme_to_state,

        is_outlined:(props?.variant==='outlined') || _no_variant,
        is_filled:(props?.variant==='filled') || (props?.variant==='standard'),
        is_standard:_is_standard,
        is_error:false,
        // is_error:(!is_empty(props.is_error))?props.is_error:false, //props.input_error?.({input_state:{}, current_value:props.input_value}),
        notch_width:(0===notch_saved)?-1:notch_saved,
        // notch_width:-1,

        style1_filled_normal:style1_filled_normal,
        style2_filled_hover:style2_filled_hover,
        style3_filled_focused:style3_filled_focused,

        factors_vector:'',

        label_span_class:'',
        label_span_class_back:'',
        label_style: {},

        //debug input_style:{backgroundColor:'lightgreen'} as React.CSSProperties ,
        input_style:{backgroundColor:color_input_background} as React.CSSProperties ,
        input_margin_left:0,

        color_main:color_main,
        color_main_background:color_main_background,
        color_main_focused:color_main_focused,
        color_main_hovered:color_main_hovered,
        color_label_text:color_label_text,
        color_label_text_focused:color_label_text_focused,
        color_label_text_hovered:color_label_text_hovered,
        color_label_fly_up_background:color_label_fly_up_background,

        input_container_style: input_container_style,

        label_font_family:label_font_family,
        label_font_size:label_font_size,
        label_text:label_text,
        use_label:!is_empty(props?.label_text),
        width_of_label_initial:-1,
        width_of_label:0,

        show_label:true,
        input_value:(props.input_value)?props.input_value:'',
        // is_full:true,
        is_full:_is_full,
        is_focused:_is_focused,
        labal_must_be_above:(_is_full || _is_focused),

        is_hovered:false,
        xy_input:{x:0,y:0},
        xy_node_left_space:{x1:0,width:0},
        xy_component:{x:0,y:0},
        node_left_exist:!is_empty(props.node_left),

    });

    const xy_data_actualise = (p:any) => {

        let tdata: any = {}

        const current5_xy_input = ref_input?.current
        if(current5_xy_input) {
            tdata = {...tdata, ...{...JSON.parse(JSON.stringify(current5_xy_input?.getBoundingClientRect()))}}
            tdata.xy_input = tdata
        }
        const current2_xy_component = ref_component?.current
        if(current2_xy_component) {
            tdata = {...tdata, ...{...JSON.parse(JSON.stringify(current2_xy_component?.getBoundingClientRect()))}}
            tdata.xy_component = tdata
        }

        const current1_xy_node_left_space = ref_node_left_space?.current
        if(current1_xy_node_left_space) {
            tdata = {...tdata, ...{...JSON.parse(JSON.stringify(current1_xy_node_left_space?.getBoundingClientRect()))}}
            tdata.x1 = tdata.x + window.scrollX
            tdata.y1 = tdata.y + window.scrollY
            tdata.xy_node_left_space = tdata
        } else {
            console.log('=== no co1_current')
        }

        const current3_xy_node_right_space = ref_node_right_space?.current
        if(current1_xy_node_left_space) {
            tdata = {...tdata, ...{...JSON.parse(JSON.stringify(current3_xy_node_right_space?.getBoundingClientRect()))}}
            tdata.x1 = tdata.x + window.scrollX
            tdata.y1 = tdata.y + window.scrollY
            tdata.xy_node_right_space = tdata
        } else {
            console.log('=== no xy_node_right_space')
        }

        const {do_actualise} = p
        if(do_actualise) {
            console.log('=== xy_data_actualise  InputMaterial5', tdata)
            do_actualise({...tdata})
        }else{
            console.log('=== return tdata', tdata)
            return tdata
        }

    }
    //====== eee is_full  is_focused  is_hovered
    useEffect(() => {

        const xy_data:any = ref_calc1?.current?.getBoundingClientRect()
        console.log('=== xy_data.width',xy_data)

        if(xy_data) {
            //notch_saved STEP2 - CALC+SAVE
            localStorage.setItem('notch_saved'+props.label_text,xy_data.width)
            set_state((prev_state: any) => {
                return {
                    ...prev_state,
                    notch_width:xy_data.width, //c+1-2 +12 empiric add left space
                }
            })
        }       return () => {}
    }, [JSON.stringify(ref_calc1?.current?.getBoundingClientRect())]);

    //=== eee Big
    useEffect(() => {

        if (firstRender.current) {
            console.log('=== firstRender',props.id, firstRender.current,)
            firstRender.current = false;
        }

        if(!firstRender.current) {
            if(is_empty(props.color_main_background)) {
                const parentNode:any = ref_component.current?.parentNode
                color_main_background = parentNode?.style['background-color']
                console.log('=== NOT firstRender GET FROM PARENT parentNode ',parentNode)
                console.log('=== NOT firstRender GET FROM PARENT background-color ',parentNode?.style['background-color'])
            }
            // if(!is_empty(theme)) {
            //     const isDarkTheme = theme.palette.mode === 'dark';
            //     if(isDarkTheme){
            //         console.log('=== isDarkTheme 1 ',isDarkTheme)
            //         color_main_background='#2C2C2C'
            //         color_label_fly_up_background = color_main_background
            //         color_main_background = color_main_background
            //     }
            // }
        }

        style_from_theme_to_state = style_from_theme_reusable()
        console.log('=== style_from_theme_to_state 1',style_from_theme_to_state)

        //=== default but exist + style1_... + style2_filled_hover

        //======== ABOVE == CSS FORVARD



        console.log('=== s1 input_container_style ',input_container_style)
        // console.log('=== s1 label_container_style ',label_container_style)

        let state_factors_label=[
            state.is_full.toString().substring(0,1),
            state.is_focused.toString().substring(0,1),
            _node_left_show({input_state: state}).toString().substring(0,1),
            (!_node_left_show({input_state: state}))?false.toString().substring(0,1):('like_input_classic'===modes?.label_above_positionX).toString().substring(0,1),
        ]

        let label_span_class={}
        let label_span_class_back=''
        let label_style={}
        let input_margin_left=0
        let input_margin_right='16px'

        let labal_must_be_above=false

        const {xy_node_left_space, xy_node_right_space, xy_input, xy_component} = xy_data_actualise({})
        const factors_vector=state_factors_label.join('.').toUpperCase()
        switch (true)  {
            // FALSE == node_left_show
            //1
            case 'F.F.F.F'===factors_vector:{ // F.F.F.F -> F.T.F.F -> T.T.F.F
                labal_must_be_above=false
                break
            }
            //2
            case 'T.F.F.F'===factors_vector:{

                labal_must_be_above=true
                break
            }
            //3
            case 'F.T.F.F'===factors_vector:{ //== previous
                labal_must_be_above=true
                break
            }
            //4
            case 'T.T.F.F'===factors_vector:{ //== previous
                labal_must_be_above=true
                break
            }
            // TRUE == node_left_show
            //51
            case 'F.F.T.F'===factors_vector:{
                labal_must_be_above=false
                break
            }
            //52
            case 'F.F.T.T'===factors_vector:{//=== like previous
                labal_must_be_above=true
                break
            }
            //61 71 81
            case    ('T.F.T.F'===factors_vector)
            ||  ('F.T.T.F'==factors_vector)
            :{
                labal_must_be_above=true
                break
            }
            case   ('T.T.T.F'==factors_vector): {
                labal_must_be_above=true
                break
            }
            // F.F.F.F => F.T.F.F like T.F.T.T=>T.T.T.T
            case  ('T.F.T.T'===factors_vector):{
                labal_must_be_above=true
                break
            }
            case  ('T.T.T.T'===factors_vector):{
                labal_must_be_above=true
                break
            }
            //62 73 84
            case
            ('F.T.T.T'==factors_vector)
            :{
                labal_must_be_above=true
                break
            }
        }

        console.log('=== input_margin_right ',input_margin_right)

        let input_style={...state.input_style,
            // marginLeft:input_margin_left,
            // marginRight:input_margin_right,
        }


        const {style1_filled_normal,style2_filled_hover,style3_filled_focused } = styles123_reusable()

        console.log('=== factors_vector ',factors_vector)
        console.log('=== factors_vector labal_must_be_above ',labal_must_be_above)

        set_state((prev_state: any) => {return {...prev_state,

            style1_filled_normal:style1_filled_normal,
            style2_filled_hover:style2_filled_hover,
            style3_filled_focused:style3_filled_focused,

            style_from_theme:style_from_theme_to_state,

            color_main_background:color_main_background,
            color_label_fly_up_background:color_main_background,

            factors_vector:factors_vector+ ' -- ' + prev_state.factors_vector,

            label_span_class:label_span_class,
            label_span_class_back:label_span_class_back,
            label_style:label_style,
            input_style:input_style,
            input_margin_left:input_margin_left,

            xy_node_left_space:xy_node_left_space,
            xy_input:xy_input,
            xy_component:xy_component,
            labal_must_be_above:labal_must_be_above, //input_state.is_full || input_state.is_focused,

            input_container_style:input_container_style,

        }})

        return () => {

        };

    }, [state.is_full, state.is_focused, state.is_hovered,
        JSON.stringify(ref_node_left_space?.current?.getBoundingClientRect()),
        theme_now,
    ]);



    useEffect(() => {

        let input_container_style = {}
        let color_label_text = ''
        if(state.is_error) {
            console.log('=== state.is_error')
            // if(false) {
            input_container_style = {
                '--color-border-normal': 'red',
                '--color-border-hover': 'red',
                '--color-border-focused': 'red',
            } as React.CSSProperties
            color_label_text='red'
            color_label_text_focused='red'
            color_label_text_hovered='red'
        } else {
            input_container_style = {
                '--color-border-normal': color_border_normal,
                '--color-border-hover': color_border_hover,
                '--color-border-focused': color_border_focused,
            } as React.CSSProperties

            color_label_text=state.color_main
            color_label_text_focused=state.color_main_focused
            color_label_text_hovered=state.color_main_hovered

        }

        set_state((prev_state: any) => {
            return {
                ...prev_state,
                input_container_style: input_container_style,
                color_label_text:color_label_text,
                color_label_text_focused:color_label_text_focused,
                color_label_text_hovered:color_label_text_hovered,
            }
        })
        return () => {

        };
    }, [state.is_error]);

    useEffect(() => {

        set_state((prev_state: any) => {return {...prev_state,
            label_text:label_text,
        }})

        return () => {

        };
    }, [props.label_text]);


    // eee
    useEffect(() => {

        // alert('props.type'+props.type)
        console.log('=== props.is_error ',props.is_error)
        onChangeHandler({target:{value:props.input_value}})

        return () => {

        };
    }, [props.input_value, props.is_error, props.type]);


    // const marginLeft1 = () => {
    //     const _exist = (!is_empty(props.node_left))
    //     const _show = _node_left_show({input_state:state} )
    //     if(  _exist  &&   _show)       return '-4px'
    //     if(  _exist  && (!_show))    return '-4px' //will work id='fake16px'
    //     if((!_exist) &&   _show)    return '16px'
    //     if((!_exist) && (!_show))    return '-4px' //will work id='fake16px'
    // }

                // TODO set_input_value_timeouter(e)
                // const [timer1, set_timer1] = useState(null);
                // const set_input_value_timeouter = (e) =>{
                //
                //     set_input_value((e.target)?e.target.value:e)
                //
                //     clearTimeout(timer1)
                //
                //     const newTimer = setTimeout(()=>{
                //         console.log("=== set_input_value_timeouter")
                //         set_input_changed(e)
                //     },500)
                //
                //     set_timer1(newTimer)
                // }

    const onChangeHandler = (e:any) => {

        // TODO set_input_value_timeouter(e)

        console.log('=== current_value',e.target.value)

        set_state((prev_state: any) => {return {...prev_state,
            input_value:e.target.value,
            is_full:(''!==e.target.value),
            is_error:false,
        }})

        // === obligatory before error !!!
        if(props?.onChange) props?.onChange(e)

        if(props?.input_error) {
            const is_error = props?.input_error({current_value:e.target.value, input_state: state})
            console.log('=== is_error ',is_error)
            if(is_error) {
                set_state((prev_state: any) => {return {...prev_state,
                    is_error: true,
                }
                })
            }
        }

    }

    const onFocusHandler = (e:any) => {
        set_state((prev_state: any) => {return {...prev_state,
            is_focused:true,
        }})
    }
    const onBlurHandler = (e:any) => {

        let is_inside=false
        const do_check_rect = (ref_component.current && e.relatedTarget)
        console.log('===xy_last_click do_check_rect ', do_check_rect)
        if(do_check_rect) {
            let xy_component:any = ref_component.current?.getBoundingClientRect()
            let xy_last_click = e.relatedTarget?.getBoundingClientRect()
            console.log('===xy_last_click xy_component ', xy_component)
            console.log('===xy_last_click xy_last_click ', xy_last_click)
            xy_component = JSON.parse(JSON.stringify(xy_component))
            xy_last_click = JSON.parse(JSON.stringify(xy_last_click))
            if (!is_empty(xy_last_click)) {

                is_inside = rectIsInsideRect(xy_last_click, xy_component)
                console.log('===xy_last_click is_inside ', is_inside)

                props.onBlur?.({...e,is_inside})

                if (is_inside) return //no blur
            }
        }

        set_state((prev_state: any) => {return {...prev_state,
            is_focused:false,
        }})

        props.onBlur?.({...e,is_inside})

    }

    let is_filled_hide_borders=(state.is_filled || state.is_standard)?{

        // 'border-left':          'none !important',

        '--border-normal-widthL':'0px',
        '--border-normal-widthR':'0px',
        '--border-normal-widthT':'0px',
        // '--border-normal-widthB':'0px',

        '--border-hover-widthL':'0px',
        '--border-hover-widthR':'0px',
        '--border-hover-widthT':'0px',
        // '--border-hover-widthB':'5px',

        '--border-focused-widthL':'0px',
        '--border-focused-widthR':'0px',
        '--border-focused-widthT':'0px',
        // '--border-focused-widthB':'0px',

        '--color-border-normalL':'transparent',
        '--color-border-normalR':'transparent',
        '--color-border-normalT':'transparent',

        '--color-border-hoverL':'transparent',
        '--color-border-hoverR':'transparent',
        '--color-border-hoverT':'transparent',

        '--color-border-focusedL':'transparent',
        '--color-border-focusedR':'transparent',
        '--color-border-focusedT':'transparent',

        /*TODO 3 TOP CORNERS ROUND*/

        '--border-top-left-radius':'10px',
        '--border-top-right-radius':'10px',
        '--border-bottom-right-radius':'0px',
        '--border-bottom-left-radius':'0px',

//        '--color-border-normalB':'transparent',
    }:{}




    // sss1 ▄▄▄▄▄▄▄▄▄▄▄▄▄
    return(
        // ===== WHY... relative for -> wrap not full page input_container-focused::before
        // <div ref={ref_component_wrapper} style={{position:"relative"}} tabIndex={-1000} >

        <div ref={ref_component} tabIndex={-100}  id={'div_component'}
             style={{
                 position:"relative",
                 // borderTopLeftRadius:'4px',
                 width:'100%',
                }}
        >
            {(-1==state.notch_width)
                ? //display:'none',
                <div ref={ref_calc1} style={{ width:'max-content', transform:'translateY(-28px) scale(0.75)', color:'transparent'}}>{props.label_text}</div>
                :
                <div className={(!state.is_focused)?'input_container':'input_container-focused'} tabIndex={-101} ref={ref_input_container}

                     style={{

                         // backgroundColor:state.color_main_background,
                         ...input_container_style, //initial outline borders
                         ...state.input_container_style, // borders modifyed by state -> errors
                         ...is_filled_hide_borders, //filled + standard
                         //=== 3 colors: background filled + standard
                         ...(state.is_outlined)?null:(!state.is_focused)?(state.is_hovered)?state.style2_filled_hover:state.style1_filled_normal:state.style3_filled_focused,
                         // backgroundColor:'red',
                         cursor:'text',
                     }}

                     onClick={()=>{

                         if(!props.disabled) {
                             ref_input?.current?.focus()
                         }else {
                             // alert('onClick111')
                             //=== for left+right side
                             if(props.on_click_if_disabled){
                                 props.on_click_if_disabled(this)
                             }
                         }


                         // ref_input0?.current?.focus()
                         // const el=window.document.getElementById('InputSearchStandard-2')
                         // if(el) el.focus()
                     }}

                     onMouseEnter={()=>{
                         set_state((prev_state: any) => {return {...prev_state,
                             is_hovered:true
                         }})
                     }}

                     onMouseLeave={()=>{
                         set_state((prev_state: any) => {return {...prev_state,
                             is_hovered:false
                         }})
                     }}
                >

                    {((is_empty(props.node_left) && state.is_outlined) || ((!is_empty(props.node_left)) && (!_node_left_show({input_state: state}))) )
                        ?<div id='fake16px' style={{
                            width:'16px',
                            height:'45px',
                            }}>

                        </div> //shift_left_input 16px
                        :
                        <div ref={ref_node_left_space} tabIndex={-104}
                            // className={'node-left-div'}
                            // style={{,}}
                             style={{
                                 // border:'2px red solid',
                                 marginTop:'4px',
                                 marginLeft:'4px',
                                 zIndex:200,
                                 // backgroundColor:'lightcyan',
                                 // position: 'absolute',
                                 height:'var(--inner_content_height)', width:'max-content',
                                 // display:'flex',
                                 display:(_node_left_show({input_state: state}))?'flex':'none',
                                 flexDirection:'row', alignItems:'center', justifyContent:'center'
                             }}
                        >
                            {(!_node_left_show({input_state: state}))?null:
                                props.node_left({input_state: state,set_input_state: set_state,ref_input})
                            }
                        </div>
                    }

                        {(state.is_filled)
                            ?
                            <InputFilledAbstract
                                id={props.id}
                                state={state}
                                set_state={set_state}
                                ref_component={ref_component}
                                ref_input={ref_input}
                                // for input HTML
                                props_rest={props_rest}
                                style_from_theme={state.style_from_theme}
                                onChangeHandler={(e:any)=>{
                                    onChangeHandler(e)
                                }}
                                onFocusHandler={(e:any)=>{
                                    onFocusHandler(e)
                                }}
                                onBlurHandler={(e:any)=>{
                                    onBlurHandler(e)
                                }}
                                {...props}
                            />
                            :
                            <InputOutlinedAbstract
                                id={props.id}
                                state={state}
                                set_state={set_state}
                                ref_component={ref_component}
                                ref_input={ref_input}
                                // for input HTML
                                props_rest={props_rest}
                                style_from_theme={state.style_from_theme}
                                onChangeHandler={(e:any)=>{
                                    onChangeHandler(e)
                                }}
                                onFocusHandler={(e:any)=>{
                                    onFocusHandler(e)
                                }}
                                onBlurHandler={(e:any)=>{
                                    onBlurHandler(e)
                                }}
                                {...props}
                            />
                        }


                    {/*====== WHY... */}
                    {/*====== zIndex over input_container + NOT over = paddingTop + paddingBottom */}
                    {/*marginLeft:'auto',*/}
                    {/*, backgroundColor:'green'*/}
                    <div ref={ref_node_right_space} tabIndex={-105}
                         style={{ marginLeft:'auto',display:'flex', flexDirection:'row', width:'max-content', zIndex:'200',
                    }} >

                        {(state.is_error && (!state.is_outlined))?
                            // ======= is_standard + is_filled
                            <IconForInputFA id={'is_error_icon'} input_state={{...state, color_main: 'red',color_main_focused: 'red'}} tabIndex={-202}>
                                {faExclamationCircle}
                            </IconForInputFA>
                            // ======= is_outlined
                            :(state.is_error && state.is_outlined)?
                                <div  style={{height:_input_inner_content_max_height+'px',display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center',
                                    paddingRight:'4px',
                                }}>
                                    <IconForInputFA id={'is_error_icon'} input_state={{...state, color_main: 'red',color_main_focused: 'red'}} tabIndex={-202}
                                                    style_wrapper={{paddingTop:'7px'}}
                                    >
                                        {faExclamationCircle}
                                    </IconForInputFA>
                                </div>
                                :null
                        }
                        {(!_node_right_show({input_state: state,set_input_state: set_state,ref_input}))?null:
                            props.node_right({input_state: state,set_input_state: set_state,ref_input})
                        }
                    </div>

                    {/*=== input_container + border*/}
                </div>
            }

            {(props.helper_text && (!state.is_error))?
                <div id='div_helper_text' style={{height:'max-content', fontSize:'12px',color:'black'}}>
                    {props.helper_text?.({input_state: state})}
                </div>:null}

            {(!state.is_error)?(props.helper_text)?null:<div id='error_0' style={{fontSize:'12px',color:'red'}}>{' '} &nbsp;</div>
                :('string' === typeof props.input_error_message?.({input_state:state}))
                    ?   // 2 border + 1 after border + 16
                    <div id='error_1' style={{fontSize:'12px',color:'red',marginLeft:'19px',justifyContent:'flex-start', alignItems:'center', flexDirection:'row',display:'flex'}}>
                        {props.input_error_message?.({input_state: state})}
                    </div>
                    :
                    <div> {('undefined' == typeof props.input_error_message?.({input_state:state}))
                        ? <div id='error_2' style={{fontSize:'12px',color:'red',marginLeft:'19px',justifyContent:'start', alignItems:'center', flexDirection:'row',display:'flex'}}>value is not correct</div>
                        : <div id='error_3'>{props.input_error_message?.({input_state:state})}</div>
                        }
                    </div>

            }

            {/*<div>color_main_background {JSON.stringify(state.color_main_background)}</div>*/}

            {((is_empty(props.show_state)) || (true!==props.show_state))?null:<>

            {/*<div>is_error {JSON.stringify(state.is_error)}</div>*/}

            {/*<div>id {JSON.stringify(props.id)}</div>*/}

            {/*{(is_empty(props.input_error_message?.({input_state:state}), 999))*/}
            {/*    ?'value is not correct'*/}
            {/*    :props.input_error_message?.({input_state:state})*/}
            {/*}*/}

            {/*<div>props.debug_mode {JSON.stringify(props.debug_mode)}</div>*/}
            {/*<div>color_main {JSON.stringify(state.color_main)}</div>*/}

            {/*<div>color_main_background {JSON.stringify(state.color_main_background)}</div>*/}

            {/*<div>notch_width {JSON.stringify(state.notch_width)}</div>*/}
            {/*<div>input_value {JSON.stringify(state.input_value)}</div>*/}
            {/*<div>labal_must_be_above {JSON.stringify(state.labal_must_be_above)}</div>*/}
            {/*<div>is_full {JSON.stringify(state.is_full)}</div>*/}
            {/*<div>is_focused {JSON.stringify(state.is_focused)}</div>*/}
            {/*<div>color_label_fly_up_background {JSON.stringify(state.color_label_fly_up_background)}</div>*/}
            {/*<div>color_main_background {JSON.stringify(input_state.color_main_background)}</div>*/}
            {/*<div>factors_vector {JSON.stringify(state.factors_vector)}</div>*/}
            {/*<div>firstRender.current {JSON.stringify(firstRender.current)}</div>*/}
            {/*<div>input_state.labal_must_be_above {JSON.stringify(input_state.labal_must_be_above)}</div>*/}
            {/*<div>input_class {JSON.stringify(input_state.input_class)}</div>*/}
            {/*<div>node_left_exist {JSON.stringify(input_state.node_left_exist)}</div>*/}
            {/*<div>node_left {JSON.stringify(props.node_left)}</div>*/}

            {/*<br/>*/}
            {/*<div id='calc2' hidden style={{display:'none',width:state.notch_width+'px', backgroundColor:'pink'}}>-</div>*/}
            {/*<br/>*/}
            {/*<div id='calc1' hidden  ref={ref_calc1} style={{display:'none',fontFamily:'roboto',width:'max-content', transform:'translateY(-28px) scale(0.75)', color:'pink'}}>{props.label_text}</div>*/}

            </>} {/*=== show_state*/}

        </div>
        // </div>
    )
}

export {_input_inner_content_max_height, get_required_color}
export default InputManager


