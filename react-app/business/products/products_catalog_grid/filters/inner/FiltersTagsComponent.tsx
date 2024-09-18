
import React from "react";

import {Box} from "@mui/material";
import PT_FiltersTags from "./PT_FiltersTags";

const FiltersTagsComponent = (props:any) => {

    return(
        <Box sx={{display:'flex', flexDirection:'column'}} >

            <PT_FiltersTags
                {...props}
            />

        </Box>
    )
}

export default FiltersTagsComponent
