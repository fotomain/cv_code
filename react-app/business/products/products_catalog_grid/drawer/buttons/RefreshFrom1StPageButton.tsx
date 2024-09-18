import IconButton from "@mui/material/IconButton";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import * as React from "react";

const RefreshFrom1StPageButton = (props:any) => {

    return(
        <IconButton
            // sx={{padding:'0px'}}
            sx={{marginLeft:'15px' }}
            title={'Refresh from 1st Page'}
            onClick={()=>{
                // setItems([])
                props.set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        current_page: 1,
                        state_refresh: Date.now(),
                    }
                })
            }}
        >
            <SyncOutlinedIcon
                sx={{marginRight:'0px'}}
            />
        </IconButton>
    )
}

export default RefreshFrom1StPageButton
