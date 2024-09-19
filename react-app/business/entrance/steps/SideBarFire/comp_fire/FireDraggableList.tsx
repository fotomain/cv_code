

import React from "react";
import {Box} from "@mui/material";
import {DragIndicator, Visibility} from "@mui/icons-material";
import FireDraggableItem from "./FireDraggableItem";

import {GlobalsContext} from "../../../../../system_state/context_globals/globals_context";

const FireDraggableList = (props:any) =>{

    const { global_props } = React.useContext(GlobalsContext);

return(
    <Box id='fire_side_draggable_list'
         sx={{
             borderColor:'rgba(0,0,0,0)',
             borderStyle:'solid',
             borderTopWidth:'0px',
             borderBottomWidth:'0px',
             borderLeftWidth:'4px',
             borderRightWidth:'4px',
         }}>
        {/*class="cdk-drop-list*/}

    {global_props.navigation.array_of_dnd.map((el:any)=>{
        return(
            // <div key={el.id}>{el.title}</div>
            <React.Fragment key={el.guid}>
                {(!el.data_to_use)?'':
                    <FireDraggableItem

                        {...props} //!!! for do_close()

                        data_to_use={el.data_to_use}
                        icon_drag={DragIndicator}
                        icon_right={Visibility}

                    />
                }
            </React.Fragment>

        )
    })}

</Box>
)
}

export default FireDraggableList
