

// {(global_props.navigation.drawer_left_show_wide) ? '' :

import {Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack} from "@mui/material";
import React from "react";
import {GlobalsContext} from "../../../../../system_code/context_globals/globals_context";
import {random_key} from "../../../../../system_code/code_global/GlobalFunctions";
import {tw_no_wrap, tw_row_center, tw_row_right} from "../../../../../system_code/tw/tw_tools";


const FireSideItemSingle = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const IconLeft = props.icon_left
    const IconRight = props.icon_right

    return (
        <>
            {(global_props.navigation.drawer_left_show_wide) ? '' :
                <div
                    id={props.id}
                    className={tw_row_center}
                    // flexWrap={'nowrap'} direction={'row'}
                    // justifyContent={'center'} alignItems={'center'}

                       onClick={(e) => {

                           const tdata = global_props.navigation
                           tdata.navigation_pressed =
                               {   e: e,
                                   place_pressed: {
                                       place_guid: props.id,
                                       //'side_bar_section_home',
                                   }
                               }
                           console.log("=== SETTER_NAVIGATION start ",tdata)
                           global_dispatch({
                               type: 'SETTER_NAVIGATION',
                               global_new_data:{navigation:tdata},
                           })

                       }}

                >
                    {/*{IconLeft}*/}
                    {IconLeft
                        ?React.cloneElement(IconLeft,{ id: 'icon_left_of_single_fold_' + random_key(),})
                        :''}
                </div>
            }

            {(!global_props.navigation.drawer_left_show_wide) ? '' :
                <div
                    // flexWrap={'nowrap'} direction={'row'}
                    // justifyContent={'end'} alignItems={'center'}
                    id={props.id}
                    className={tw_row_right+tw_no_wrap}

                >

                    <ListItem id={'id_list_item'} component="div" disablePadding
                              sx={{
                                  height: '56px',
                                  padding: '0',
                                  // '&:hover, &:focus':{ bgcolor:'rgba(71,98,130,0.2)'}
                                  //=== GOOD Group header - not hover rgba(71,98,130,0.2)
                                  // '&:hover, &:focus':{ bgcolor:'rgba(255,255,255,0.1)'}
                                  '&:hover, &:focus': {bgcolor: 'rgba(27,50,69,100)'}
                              }}
                    >

                        {/*=== Box in Stack*/}
                        {/*<ListItemButton id={'id_list_item_button'+JSON.stringify(IconLeft)}*/}
                        <ListItemButton id={'id_list_item_button'}
                                        onClick={(e) => {

                                            const tdata = global_props.navigation
                                            tdata.navigation_pressed =
                                                {   e: e,
                                                    place_pressed: {
                                                        place_guid: props.id,
                                                            // 'side_bar_section_home',
                                                    }
                                                }
                                            console.log("=== SETTER_NAVIGATION start ",tdata)
                                            global_dispatch({
                                                type: 'SETTER_NAVIGATION',
                                                global_new_data:{navigation:tdata},
                                            })

                                            props.onPress(e)

                                        }}
                                        sx={{
                                            // height: 56,
                                            width: '100%',
                                            // globals
                                            '&:hover, &:focus': {bgcolor: 'transparent'}
                                        }}

                        >

                            <ListItemIcon sx={{ml:'6px'}}>
                                {IconLeft
                                    ?React.cloneElement(IconLeft, {
                                        ...{ id: 'icon_left_of_single_wide' + random_key(),
                                            //=== !!!works filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)'
                                            }
                                        },

                                        )
                                    :<></>}
                            </ListItemIcon>

                            {/*"Project overview"*/}
                            <ListItemText
                                primary={props.title}
                                primaryTypographyProps={{
                                    // globals
                                    // globals
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    fontWeight: 500,
                                    // --nav-section-header-color
                                    color: ( props.id
                                        == global_props.navigation.navigation_pressed?.place_pressed?.place_guid)
                                        ?"rgb(102, 157, 246)"
                                        :'rgba(255, 255, 255, 0.8)',

                                    fontFamily: 'roboto-medium',
                                }}
                            />

                        </ListItemButton>

                    </ListItem>

                    <Box id={'icon_right_item_single'} sx={{mr:'6px'}}>
                        {/*{IconRight}*/}
                        {IconRight
                            ?React.cloneElement(IconRight,{ id: 'icon_left_of_single_fold_' + random_key(),})
                            :''}
                    </Box>


                </div>
            }
        </>
    )
}

export default FireSideItemSingle
