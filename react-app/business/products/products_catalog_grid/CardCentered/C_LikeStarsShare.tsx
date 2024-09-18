import React, {useState} from "react";
import {Button, IconButton, Tooltip} from "@mui/material";

import C_StarsRatio from "./C_StarsRatio";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {useTheme} from "@mui/material/styles";
import {tw_row_center} from "../../../../system_code/tw/tw_tools";

const C_LikeStarsShare = (props:any) => {

    const theme = useTheme();

    return(<div className={tw_row_center}>

        <Tooltip title="Add to favorites" placement="right-start">
            <IconButton
                // style={{ marginRight: "auto" }}
                color="inherit"
                onClick={(e)=> {
                    // handleFilterIconClick2(e)
                }}
            >
                <BookmarkAddedOutlinedIcon
                    sx={{
                        // padding:'1px',
                        fontSize:'22px',
                        color: theme.palette.primary.main,
                    }}
                />
            </IconButton>
        </Tooltip>

        <Tooltip title="Sgare data" placement="right-start">
        <IconButton
            // style={{ marginRight: "auto" }}
            color="inherit"
            onClick={(e)=> {
                // handleFilterIconClick2(e)
            }}
        >
            <ShareOutlinedIcon
                sx={{
                    // padding:'1px',
                    fontSize:'20px',
                    color: theme.palette.primary.main,
                }}
            />
        </IconButton>
        </Tooltip>

        <C_StarsRatio {...props}  />

    </div>)

}

export default C_LikeStarsShare
