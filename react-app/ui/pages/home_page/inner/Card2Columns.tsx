
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import {card_main_background} from "../AppHomeFinal";

const Card2Columns = (p:any) => {

    const Column1 = p.Column1
    const Column2 = p.Column2
    const flex_wrap=('row'===p.card_direction)?null:css` flex-wrap: wrap; `

    const gap_column = ('column'===p.card_direction)?css` gap: ${p.dx2.if_column} `:null;

    return(<div css={css`
                    width: 100%;
                    background-color: ${card_main_background};
                    //background-color: cyan;
                    display: flex; flex-direction: row; align-items: center; justify-content: center;
                    ${flex_wrap} 
                    ${gap_column} 
                `}
        >
        {('column'===p.card_direction)?null: <div css={css`width: ${p.dx1};background-color: ${card_main_background};`} id={'div_dx1'} ></div>}
        <div
            data-aos="zoom-in"
            css={css`
                        width: ${p.column1_width};
                        max-width: 600px;
                        //width: 45%;
                        //flex:1;
                        //background-color: pink;
                        background-color: ${card_main_background};
                    `}> <Column1 {...p} />
        </div>

        {('row'     ===p.card_direction)?<div css={css`width:  ${p.dx2.if_row};background-color: ${card_main_background};`} id={'div_dx2'} ></div>:null}

        <div css={css` 
                        width: ${p.column2_width};
                        max-width: 600px;
                        //width: 45%;
                        //flex:1;
                        //background-color: lightgreen;
                        background-color: ${card_main_background};
                    `}><Column2 {...p} />
        </div>

        {('column'===p.card_direction)?null: <div css={css`width: ${p.dx3};background-color: ${card_main_background};`} id={'div_dx3'}></div>}

    </div>)
}


export default Card2Columns


{/*<div>p.card_direction {p.card_direction}</div>*/}
