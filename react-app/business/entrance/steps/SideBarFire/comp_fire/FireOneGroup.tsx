
import {Box} from "@mui/material";
import React from "react";

import FireOneGroupHeader from "./FireOneGroupHeader";

import FireOneGroupItem from "./FireOneGroupItem";
import {GlobalsContext} from "../../../../../system_code/context_globals/globals_context";
import {random_key} from "../../../../../system_code/code_global/GlobalFunctions";

const FireOneGroup = (props:any) =>{

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const local_state = {
        mouse_is_over:global_props.navigation.mouse_is_over_guid === props.array_of_groups.guid,
        group_is_open:(0 === global_props.navigation?.drawer_left_groups_opened.length)
            ?false
            :global_props.navigation?.drawer_left_groups_opened[0].guid === props.array_of_groups.guid
    }


return(
    <Box id={'fire_one_group_with_items'}
         sx={{
             // height:'300px',
             //=== group-step2-hovered
             //=== group-step3-opened-cursor-in
             backgroundColor:(
                 (!local_state.mouse_is_over)?
                     //not over
                     (!local_state.group_is_open)?'transparent':'transparent'
                     //over
                     :(!local_state.group_is_open)?'rgba(37,61,83)':'rgba(71,98,130,0.4)'
             ),
         }}
         onMouseEnter={(e:any)=>{
             //console.log("=== onMouseEnter IconDrag")
             // set_mouse_is_over(true)

             const tdata = global_props.navigation
             if(tdata.mouse_is_over_guid!==props.array_of_groups.guid) {
                 tdata.mouse_is_over_guid = props.array_of_groups.guid
                 console.log("=== SETTER_NAVIGATION start ", tdata)
                 global_dispatch({
                     type: 'SETTER_NAVIGATION',
                     global_new_data: {navigation: tdata},
                 })
             }


         }}

         onMouseLeave={(e:any)=>{
             //console.log("=== onMouseLeave IconDrag")
             // set_mouse_is_over(false)
             const tdata = global_props.navigation
             tdata.mouse_is_over_guid = props.array_of_groups.guid
             console.log("=== SETTER_NAVIGATION start ",tdata)
             global_dispatch({
                 type: 'SETTER_NAVIGATION',
                 global_new_data:{navigation:tdata},
             })
         }}

    >

        {/*=== stack_group_header*/}
        <FireOneGroupHeader

            data_to_use={props.array_of_groups}

            group_is_open={local_state.group_is_open}
            mouse_is_over={local_state.mouse_is_over}

        />
        {/*=== end stack_group_header*/}

        {/*=== stack_group_items1*/}
        {!local_state.group_is_open?'':
            <React.Fragment key={'fire_one_group_items_'+random_key()}>
                {props.array_of_items.map((data_item:any,id:any)=>{
                    return(
                        (null===data_item)?
                            // <Box>null==data_item 159</Box>:
                            '':
                            <Box sx={{
                                paddingLeft:'14px',
                                // step3                                      //-----------   --fire-color-sidenav-hover-bg
                                '&:hover, &:focus':{
                                    bgcolor:(!local_state.mouse_is_over)
                                            ?'rgba(27,50,69,100)'
                                            :'rgba(71,98,130,0.4)'},
                            }}
                                 key={data_item.guid}
                            >
                                <FireOneGroupItem
                                    {...props} //!!! for do_close()
                                    item_group_is_open={local_state.group_is_open}
                                    mouse_is_over_item_group={local_state.mouse_is_over}

                                    data_to_use={data_item}

                                />
                            </Box>


                    )
                })}
            </React.Fragment>
        }
        {/*=== end stack_group_items1*/}


    </Box>
)

}

export default FireOneGroup
