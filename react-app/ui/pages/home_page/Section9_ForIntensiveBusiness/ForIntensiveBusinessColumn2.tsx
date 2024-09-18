
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";

import React from "react";
import {useHistory} from "react-router";
import {free_space_if_no_largest_width, largest_width} from "../../../../AppInitTheme";
import {css_row_center} from "../Section4_ChooseProgram/TargetFilterLevel4_Days";
import {ButtonOnCard} from "../inner/ButtonOnCard";
import {card_main_background} from "../AppHomeFinal";

const SatisfiedCustomersColumn2 = (p:any) => {


  const history = useHistory();

  const subtitle='Welcome to success'

  const title='For Intensive Business!'

  const description='We are engaged in the organization of proper nutrition with delivery to your office, home, or any destination point. The main goal of the service is to prepare tasty and healthy food for intensive lifestyle.'

    const row_mode = "row" === p.card_direction

    const text_align=(row_mode)
        ?css` text-align:left `
        :css` text-align:center `

    const align_items=(row_mode)
        ?css` align-items: start; `
        :css` align-items: center; `

    const landscape_mode= (window.innerWidth >= largest_width)

    // sss1
  return(<div css={css`
        background-color: ${card_main_background};
        //background-color: pink;
        display: flex;
        flex-direction: column;     
        gap:15px;
        ${align_items}
      `}
  >
    <div
        css={css`
          color: #96A3AB;
          font-family: Inter;
          font-size: ['1.2vw','1.2vw','1.2vw','1.2vw','1.2vw'][get_media_number()]; 
          margin: 0;
          max-width: 250px;
          ${text_align}
        `}>
        {subtitle}
    </div>

    <div
        css={css`
          color: #505D68;
          font-family: Inter;
          font-size: ${(row_mode)?'3.0vw':'3.5vh'};
          margin: 0;
          ${text_align} 
        `}>
        {title}
    </div>

    <div
        css={css`
          color: #838383;
          font-family: Inter;
          font-size: ['1.2vw','1.2vw','1.6vw','1.6vw','1.4vw'][get_media_number()]; 
          margin: 0;
          max-width: 500px;
          text-align: justify;
          ${(landscape_mode)?'':' padding-left:'+free_space_if_no_largest_width+'px; padding-right:'+free_space_if_no_largest_width+'px; '} 
        `}>
      {description}
    </div>

      {/*<div>landscape_mode {JSON.stringify(landscape_mode)}</div>*/}
      <div css={css` 
                marginTop:'30px'; gap:30px; justifyContent:'space-between'; width:100%; ${css_row_center};
                ${(landscape_mode)?'':' padding-left:'+free_space_if_no_largest_width+'px; padding-right:'+free_space_if_no_largest_width+'px; '}
              `}
      >
          <ButtonOnCard variant="primary"
                        onPress={()=>{
                            history.push('/products', {filter: 'increase'}, )
                        }}
          >TASTE NOW</ButtonOnCard>

          <ButtonOnCard variant="secondary"
                        onPress={()=>{
                            document.location.href = "tel: +44 20 7930 9442";
                        }}
          >ASK MORE</ButtonOnCard>

      </div>

  </div>)
}

export default SatisfiedCustomersColumn2
