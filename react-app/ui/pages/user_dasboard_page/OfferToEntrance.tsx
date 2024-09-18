

import LayoutBrand from "../../../business/entrance/steps/LayoutBrand";
import {Button} from "@mui/material";
import React from "react";
import {useHistory} from "react-router-dom";

const OfferToEntrance=(props:any)=>{

    const history = useHistory();

    return(

        <LayoutBrand main_message={'User not logged in...'}>
            {/*<div css={css` height: 45%; background-color: red; ${css_column_top_center} `}>*/}
                <Button id={props.id}
                        variant="contained"

                        onClick={()=> {
                            history.push('/entrancemain', 'params')
                        }}
                >
                    Entrance
                </Button>
            {/*</div>*/}
        </LayoutBrand>

    )
}

export default OfferToEntrance
