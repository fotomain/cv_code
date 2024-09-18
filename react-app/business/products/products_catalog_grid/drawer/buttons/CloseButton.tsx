
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";

const CloseButton = (props:any) => {
    return(
        <IconButton id={'div_close_button_header'}
            // sx={{padding:'0px'}}
                    sx={{marginLeft:'15px' }}
                    title={'Close filters bar'}
                    onClick={()=>{
                        props?.handleDoClose?.()
                    }}
        >
            <ClearIcon
                sx={{marginRight:'0px'}}
            />
        </IconButton>
    )
}

export default CloseButton
