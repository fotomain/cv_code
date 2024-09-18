
import React, {useEffect, useRef, useState} from "react";

import ButtonWorkDeleteVideos from "../crud_buttons/ButtonWorkDeleteVideos";
import H16 from "../../../entrance/steps/H16";
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";
import {tw_col_center} from "../../../../system_code/tw/tw_tools";


const WooProductsCRUDVideosDELETEPage = (props:any) => {

    const history = useHistory()

    return(<div className={tw_col_center}>
        {/*<ButtonWorkDeleteVideos/>*/}
        <H16>You can delete video URL</H16>
        <H16>in Products dashboard</H16>
        <Button
            variant={'contained'}
            onClick={() =>{
                history.push('/products')
            }}
        >Continue with Products</Button>

    </div>)//return
}

export default WooProductsCRUDVideosDELETEPage
