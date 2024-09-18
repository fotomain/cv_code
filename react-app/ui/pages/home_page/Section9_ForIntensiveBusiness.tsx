

/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";


import React from "react";
import Card2Columns from "./inner/Card2Columns";
import {card_main_background} from "./AppHomeFinal";
import ForIntensiveBusinessColumn1 from "./Section9_ForIntensiveBusiness/ForIntensiveBusinessColumn1";
import ForIntensiveBusinessColumn2 from "./Section9_ForIntensiveBusiness/ForIntensiveBusinessColumn2";


const Section9_ForIntensiveBusiness
    = (p:any) => {
    return(<div css={css`
        background-color: ${card_main_background};
        width: 100%;
        padding-top: 35px;
        padding-bottom: 35px;
        //padding-left: 150px;
      `}>
        <Card2Columns

            dx1={'10%'}
            column1_width={'100%'}
            dx2={{if_row: '10%',if_column: '40px'}}
            column2_width={'100%'}
            dx3={'10%'}
            Column1={ForIntensiveBusinessColumn1}
            Column2={ForIntensiveBusinessColumn2}
            card_direction={(window.innerWidth<=640)?'column':'row'}


        />
    </div>)
}


export default Section9_ForIntensiveBusiness
