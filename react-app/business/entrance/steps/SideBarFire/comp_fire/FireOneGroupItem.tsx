


import {Box, Link, Stack} from "@mui/material"
import React, {useEffect, useState} from "react";

import {GlobalsContext} from "../../../../../system_state/context_globals/globals_context";
import IconCustom from "../IconCustom";


const FireOneGroupItem = (props:any) =>{

    // console.log("=== _ww  I am item", props.data_to_use.guid)

    // console.log("=== FireOneGroupItem props ", props)
    // console.log("=== FireOneGroupItem icon ", props.data_to_use.guid , props.data_to_use.icon)

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const IconLeft = props.data_to_use.icon

    const local_state = { //!!! draggable -> change color here
        item_was_pressed: global_props.navigation.navigation_pressed?.place_pressed?.place_guid_last
            === props.data_to_use.guid,
        item_group_is_open: props.item_group_is_open,
        mouse_is_over_item_group: props.mouse_is_over_item_group,
    }

    if (local_state.item_was_pressed) {
        console.log("=== item_was_pressed ", props.data_to_use.guid, local_state.item_was_pressed)
    }

    //=== STRUCTURE
    //=== GROUP ITEM
    //        Link -> onPress
    //         === ICON LEFT
    //              <div>
    //                 <i
    //              </div>
    //         === TEXT
    //              <div>
    //                  Authentication
    //              </div>

    // --nav-item-color rgba(255, 255, 255, 0.8)


    useEffect(() => {

        // console.log("=== item_was_pressed global_props useEffect", global_props)

        // console.log("=== _ww  I am item useEffect ", props.data_to_use.guid)

        if(global_props.navigation.navigation_pressed?.place_pressed)
        {

            if(
                props.data_to_use.guid===
                global_props.navigation.navigation_pressed?.place_pressed.place_guid
            )
            {
                // console.log("=== _ww  item_was_pressed global_props useEffect", global_props)
                // console.log("=== _ww  place_pressed", global_props.navigation.navigation_pressed?.place_pressed)
                // console.log("=== _ww  guid", global_props.navigation.navigation_pressed?.place_pressed.place_guid)

                const t_data = global_props.navigation
                t_data.navigation_pressed =
                    {   e: t_data.navigation_pressed.e,
                        place_pressed: {
                            place_guid_last:t_data.navigation_pressed.place_pressed.place_guid,
                            place_guid: null,
                            place_from_draggable_zone:null,
                        }
                    }
                console.log("=== SETTER_NAVIGATION start ",t_data)
                global_dispatch({
                    type: 'SETTER_NAVIGATION',
                    global_new_data:{navigation:t_data},
                })

                    if( global_props.navigation.drawer_left_auto_close ) {
                        console.log("=== do_close TYPE 1 FireOneGroupItem place_pressed")
                        props.do_close() // FireOneGroupItem place_pressed
                    }

                        if( props.on_item_pressed ) {
                            props.on_item_pressed({
                                e:global_props.navigation.navigation_pressed.e,
                                data_to_use:props.data_to_use
                            })
                        }

            }
            // else{
            //     if(null == global_props.navigation.navigation_pressed?.place_pressed.place_guid) {
            //         console.log("=== _ww  guid NULL")
            //     }
            // }
        }
        return () => {

        };
    }, [local_state]);


    return(

    <Stack

        boxSizing={'content-box'}
        id={'fire_group_item_' + props.id}
        // key={props.guid+_key}
        direction='row'
        justifyContent='start'
        alignItems='center'
        flexWrap={'nowrap'}
        sx={{
            borderRadius: '4px',
            //step3
        }}

    >

        <Link
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',

                // paddingLeft:'20px',
                // paddingRight:'24px',
                height: '32px',
                fontSize: '14px',
                fontWeight: '500px',
                lineHeight: '20px',

                // --nav-item-color,
                color: (
                    local_state.item_was_pressed
                ) ? 'rgb(102, 157, 246)'
                    //step3
                    : (local_state.item_group_is_open && local_state.mouse_is_over_item_group)
                        ? '#fff'
                        : 'rgba(255,255,255,0.8)',
                // hwb(217.1 40% 3.5%));
                // color:(link_is_active)?'rgba(255,255,255,0.8)':'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                fontFamily: "roboto-regular",

                // border:'1px red solid',

            }}
            flex={1}
            id={'link_'+props.data_to_use.guid}

            onClick={(e) => {
                // props.onClick(e)
                console.log("=== onClick FireGroupItem")

                if (e.currentTarget.id) {
                    console.log(e.currentTarget.id)
                }

                        if (global_props.navigation) {

                            let new_array_of_dnd = [...global_props.navigation.array_of_dnd]
                                if( !props.place_from_draggable_zone ){
                                    const element_exist = new_array_of_dnd.filter((el)=>{
                                        console.log("=== element_exist === ", el.data_to_use.guid,props.data_to_use.guid)
                                        return el.data_to_use.guid===props.data_to_use.guid
                                    })

                                    console.log("=== element_exist",element_exist)

                                    if(0===element_exist.length) {
                                        new_array_of_dnd = [
                                            ...new_array_of_dnd,
                                            ...[{guid: props.data_to_use.guid, data_to_use: props.data_to_use}]]
                                    }
                                    else {
                                        console.log("=== element_exist",element_exist)
                                    }

                                }

                            const t_data = global_props.navigation
                            t_data.array_of_dnd = new_array_of_dnd
                            t_data.drawer_left_groups_opened=[]
                            t_data.navigation_pressed =
                                {   e: e,
                                    place_pressed: {
                                        place_guid: props.data_to_use.guid,
                                        place_from_draggable_zone: props.place_from_draggable_zone,
                                    }
                                }
                            console.log("=== SETTER_NAVIGATION start ",t_data)
                            global_dispatch({
                                type: 'SETTER_NAVIGATION',
                                global_new_data:{navigation:t_data},
                            })


                            // if( props.on_item_pressed ) {
                            //     props.on_item_pressed({e:e, data_to_use:props.data_to_use})
                            // }

                            // if( global_props.navigation.drawer_left_auto_close ) {
                            //     props.do_close()
                            // }
                        }

            }}
        >

            <Stack
                direction='row'
                // gap={'2px'}
                justifyContent='center'
                alignItems='center'
            >
                <IconCustom
                    local_state = {local_state}

                    style={{
                        fontSize: '20px',
                        color: (
                            local_state.item_was_pressed
                        ) ? 'rgb(102, 157, 246)'
                            //step3
                            : (local_state.item_group_is_open && local_state.mouse_is_over_item_group)
                                ? '#fff'
                                : 'rgba(255,255,255,0.8)',

                    }}

                >
                    {IconLeft}
                </IconCustom>

                {/*{!('string' === type_of_icon_left) ? '' :*/}
                {/*    <i style={{*/}
                {/*        fontSize: '20px',*/}
                {/*        color: (*/}
                {/*            local_state.item_was_pressed*/}
                {/*        ) ? 'rgb(102, 157, 246)'*/}
                {/*            //step3*/}
                {/*            : (local_state.item_group_is_open && local_state.mouse_is_over_item_group)*/}
                {/*                ? '#fff'*/}
                {/*                : 'rgba(255,255,255,0.8)',*/}

                {/*    }} className='material-icons'*/}
                {/*    >*/}
                {/*        {IconLeft}*/}
                {/*    </i>*/}
                {/*}*/}

                {/*<IconCustom*/}
                {/*    type_of_icon = {type_of_icon_left}*/}
                {/*    id={'icon_left_' + props?.data_to_use?.guid}*/}
                {/*    sx={{*/}
                {/*        fontSize: '20px', width: '20px', height: '20px',*/}
                {/*        color: (*/}
                {/*            local_state.item_was_pressed*/}
                {/*        ) ? 'rgb(102, 157, 246)'*/}
                {/*            //step3*/}
                {/*            : (local_state.item_group_is_open && local_state.mouse_is_over_item_group)*/}
                {/*                ? '#fff'*/}
                {/*                : 'rgba(255,255,255,0.8)',*/}

                {/*    }}>*/}
                {/*    {IconLeft}*/}
                {/*</IconCustom>*/}



                {(!global_props.navigation.drawer_left_show_wide) ? '' :
                <Box sx={{marginLeft: '16px', fontFamily: 'roboto-medium'}} id={'item_title_'+props.data_to_use.guid}>
                    {props?.data_to_use.title}
                </Box>
                }

            </Stack>
        </Link>

    </Stack>

    )

}

export default FireOneGroupItem
