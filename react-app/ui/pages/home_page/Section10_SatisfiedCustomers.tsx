
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";


import React from "react";
import Card2Columns from "./inner/Card2Columns";
import {card_main_background} from "./AppHomeFinal";
import SatisfiedCustomersColumn2 from "./Section10_SatisfiedCustomers/SatisfiedCustomersColumn2";
import SatisfiedCustomersColumn1 from "./Section10_SatisfiedCustomers/SatisfiedCustomersColumn1";


const Section10_SatisfiedCustomers
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
            Column1={(window.innerWidth<=640)?SatisfiedCustomersColumn2:SatisfiedCustomersColumn1}
            Column2={(window.innerWidth<=640)?SatisfiedCustomersColumn1:SatisfiedCustomersColumn2}
            card_direction={(window.innerWidth<=640)?'column':'row'}

        />
    </div>)
}

export default Section10_SatisfiedCustomers
