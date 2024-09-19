
import {Box, Divider, Stack} from "@mui/material";

import React from "react";
import FireOneGroup from "./FireOneGroup";

import {GlobalsContext} from "../../../../../system_state/context_globals/globals_context";
import {random_key} from "../../../../../system_code/code_global/GlobalFunctions";

/*======= DOC STRUCTURE of Group */
/*class="ng-tns*/
/*class="nav-group id="nav-group-container-Build" */
/*class="group-header*/
/*class="group-header-label*/
/*class="group-title*/
/*class="mat-icon*/
/*======= Start Groups */
/*class="ng-tns*/

const FireGroups = (props:any) =>{

    const { global_props } = React.useContext(GlobalsContext);
    // console.log("==================")
    // console.log("================== FireGroup ")
    // console.log("==================")

return(

    <>
    {(!global_props.navigation.drawer_left_show_wide) ? '' :

        <Stack direction="column" sx={{
            //=== FINAL --fire-color-sidenav-bg-selected
            //=== group-step1-usual
            backgroundColor: 'rgba(71,98,130,0.2)',

            marginRight: '10px',
            marginLeft: '10px',

            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',

            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '8px',

        }}>
            <React.Fragment>
                {
                    props.array_of_groups.map((side_group: any) => {
                        return (
                            <React.Fragment key={'fire_one_group_fragment' + random_key()}>

                                <FireOneGroup
                                    {...props} //!!! for do_close()
                                    array_of_groups={side_group}
                                    array_of_items={props.array_of_items

                                        .filter((el: any) => {
                                            return el.group_data.group_item.title === side_group.title
                                        })
                                        .map((side_item: any) => {
                                                return side_item
                                            }
                                        )}/>
                                <Divider id={'divider1'} sx={{borderColor: '#051e34', height: '0px'}}/>
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>

        </Stack>

    }
    </>

)

}

export default FireGroups
