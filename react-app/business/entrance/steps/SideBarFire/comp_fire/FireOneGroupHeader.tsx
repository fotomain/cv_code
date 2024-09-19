import React from 'react';
import {Box, Stack} from "@mui/material";

import {KeyboardArrowDown} from "@mui/icons-material";

import {GlobalsContext} from "../../../../../system_state/context_globals/globals_context";
import {random_key} from "../../../../../system_code/code_global/GlobalFunctions";

const FireOneGroupHeader = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    return (
        <Box
            id={'fire_one_group_header_'+props.data_to_use.guid}
            display='flex'
            // direction="row"
            flexDirection="row"
            flexWrap={'nowrap'}
            justifyContent={'start'}
            sx={{
                // display: 'block',
                letterSpacing: '.25px',
                maxWidth: '100%',
                position: 'relative',
                textAlign: 'left',
                transition: 'background-color .15s ease',
                transitionDuration: '0.15s',
                transitionTimingFunction: 'ease',
                transitionDelay: '0s',
            }}

            onClick={(e)=>{
                // gl_ call as global func
                const tdata = global_props.navigation

                const t_just_opened = (tdata.drawer_left_groups_opened[0]===props.data_to_use)

                tdata.drawer_left_groups_opened[0]=(t_just_opened)?[]:props.data_to_use

                console.log("=== SETTER_NAVIGATION start ",tdata)
                global_dispatch({
                    type: 'SETTER_NAVIGATION',
                    global_new_data:{navigation:tdata},
                })

            }}

        >

            {/*=== stack_group_header_title start*/}
            <Stack id={'group_header_title'}
                //=== class="group-header-label
                   flex={1}
                   direction="row"
                   justifyContent={'start'}
                   sx={{
                       paddingTop:'10px',
                       paddingRight:'14px',
                       paddingBottom:'10px',
                       paddingLeft:'14px',
                       // marginBottom:'2px',
                   }} >
                <Box
                    flex={1}
                    sx={{
                        fontFamily: "google-sans-medium",
                        //step3
                        color:(!props.group_is_open)
                                ?'rgba(255,255,255,0.8)'
                                :(props.mouse_is_over
                                    ?'#fff'
                                    :'rgba(255,255,255,0.8)'),
                        fontSize: '15px',
                        fontWeight: '500',
                        lineHeight: '20px',
                        marginBottom:'2px',
                    }}>
                    {props.data_to_use.title+'.......'+random_key()}
                </Box>
                {/*<Box justifySelf={'flex-end'} >*/}
                {/*</Box>*/}


            </Stack>
            {/*=== stack_group_header_title end*/}

            {/*=== stack_group_header_arrow start*/}
            <Box
                id={'row_group_icon_right_stack'}
                // justifySelf={'flex-end'}

                sx={{
                    display:'flex',
                    flexDirection : "column",
                    justifyContent : 'center',
                    alignItems : 'center',
                }}
            >
                <Box>
                    <KeyboardArrowDown
                        id={'icon_arrow1'}
                        sx={{
                            color:(!props.group_is_open)
                                ?'rgba(255,255,255,0.8)'
                                :(props.mouse_is_over
                                    ?'#fff'
                                    :'rgba(255,255,255,0.8)'),
                            mr: '8px',
                            opacity: 1,
                            transform: ((props.group_is_open)?props.group_is_open:false) ? 'rotate(-180deg)' : 'rotate(0)',
                            transition: '0.3s',
                        }}
                    />
                </Box>
            </Box>
            {/*=== stack_group_header_arrow end*/}

        </Box> //fire_one_group_header
    )
};

export default FireOneGroupHeader;
