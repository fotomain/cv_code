
import {useTheme} from "@mui/material/styles";

import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import * as React from "react";
import { tw_row_center_basic } from "../../../../system_code/tw/tw_tools";

const C_StarsRatio=()=>{
    const theme = useTheme();
    const fs_='13px'
    return(
        <div className={tw_row_center_basic}>
            <StarOutlinedIcon           sx={{fontSize:fs_, color:theme.palette.primary.main}}/>
            <StarOutlinedIcon           sx={{fontSize:fs_, color:theme.palette.primary.main}}/>
            <StarHalfOutlinedIcon       sx={{fontSize:fs_, color:theme.palette.primary.main}}/>
            <StarOutlineOutlinedIcon    sx={{fontSize:fs_, color:theme.palette.primary.main}}/>
            <StarOutlineOutlinedIcon    sx={{fontSize:fs_, color:theme.palette.primary.main}}/>
        </div>
    )
}

export default C_StarsRatio
