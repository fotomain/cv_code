import FireOneGroupItem from "./FireOneGroupItem";
import {Box, Link, Stack} from "@mui/material";
import React, {useState} from "react";

import {GlobalsContext} from "../../../../../system_code/context_globals/globals_context";

const FireDraggableItem = (props:any) => {

    const { global_props } = React.useContext(GlobalsContext);


    //=== STRUCTURE
    // === MENU ITEM <a->onPress
    // === ICON Drag
    //     <a class="mat-mdc-tooltip-trigger fire-router-link-host
    //
    //         === ICON LEFT
    //              <div>
    //                 <i
    //              </div>
    //         === TEXT
    //              <div>
    //                  Authentication
    //              </div>
    //      </a>
    // === ICON RIGHT == EYE
    //      <fire-cdk-popover>
    //      </fire-cdk-popover>
    //  <button ->onPress CLOSE=HIDE( MENU ITEM )


    const [mouse_is_over_link, set_mouse_is_over_link] = useState(false);
    const IconDrag = props.icon_drag
    const IconRight = props.icon_right

    return (
            <Stack

                gap={0}
                boxSizing={'content-box'}
                id='cdk-drag'
                direction='row'
                justifyContent='center'
                alignItems='center'
                sx={{
                    borderRadius:'4px',
                    '&:hover, &:focus':{ bgcolor:'rgba(27,50,69,100)'},
                }}

                onMouseEnter={(e:any)=>{
                    //console.log("=== onMouseEnter IconDrag")
                    set_mouse_is_over_link(true)
                }}

                onMouseLeave={(e:any)=>{
                    //console.log("=== onMouseLeave IconDrag")
                    set_mouse_is_over_link(false)
                }}

            >
                {(!global_props.navigation.drawer_left_show_wide) ? '' :
                    <IconDrag
                        id='mat-icon'
                        sx={{
                            fontSize: '16px',
                            height: '16px',
                            left: '5px', //not 4
                            top: '8px',
                            width: '16px',
                            right:'0px',
                            color:(mouse_is_over_link)?'rgba(255,255,255,0.8)':'transparent',
                        }}


                    />
                }

                <Box id={'draggable_item_wrap'}

                     flex={1}
                     sx={{
                         marginLeft:'3px',
                         display:'flex',
                         flexDirection:'row',
                         justifyContent: (global_props.navigation.drawer_left_show_wide) ?'start':'center',
                         // color:(mouse_is_over_link)?'rgba(255,255,255,0.8)':'rgba(255,255,255,0.4)',
                     }}

                     onClick={(e:any)=>{
                         console.log("=== onClick Link")

                         // var guidT = null
                         if(e.currentTarget.id) {
                             // guidT = e.currentTarget.id
                             console.log(e.currentTarget.id)
                         }

                     }}
                >
                    <FireOneGroupItem
                        {...props} //!!! for do_close()
                        place_from_draggable_zone={true}
                        data_to_use={props.data_to_use}
                    />

                </Box>


                {/*EYE*/}
                {(!global_props.navigation.drawer_left_show_wide) ? '' :
                    <Stack
                        justifySelf={'end'}
                        id={'link_right_stack1_draggable'}
                        direction='column'
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{
                            height: '32px',
                            right: '8px',
                            top: '0',
                            width: '32px',
                        }}
                    >
                        <Link
                            // flexDirection='column'
                            id={'link_right'}
                            onClick={(e: any) => {
                                console.log("=== onClick link_right")
                                if (e.currentTarget.id) {
                                    console.log(e.currentTarget.id)
                                }
                            }}

                        >
                            <IconRight id={'icon_right'} sx={{
                                height: '16px', width: '16px',
                                mr:'18px',
                                color: (mouse_is_over_link) ? 'rgba(255,255,255,0.8)' : 'transparent',
                            }}/>
                        </Link>
                    </Stack>
                }
            </Stack>
    )
}

export default FireDraggableItem
