
/** @jsxImportSource @emotion/react */


import React from 'react';

import { css } from '@emotion/react'
import {ButtonOnCard} from "./inner/ButtonOnCard";
import TitleMain from "./inner/TitleMain";
import TitleOnBanners from "./inner/TitleOnBanners";
import {hamburger_menu_hide} from "../../../system_code/comp_navigation/hamburger_menu_hide";
import {useHistory} from "react-router";

interface WelcomeSetProps {
  title?: string ;
  subtitle?: string ;
}

const containerStyles = css`
  align-items: center;
  background: var(--v_choose_program_background, #F0F5F0);
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  padding: 10px 10px 15px;
`;

const contentStyles = css`
  display: flex;
  width: 552px;
  max-width: 100%;
  flex-direction: column;
  justify-content: start;
`;

const headerStyles = css`
  align-self: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const subtitleStyles = css`
  color: rgba(80, 93, 104, 1);
  
  font-weight: 400;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;


const buttonContainerStyles = css`
  display: flex;
  margin-top: 44px;
  width: 100%;
  align-items: start;
  gap: 40px;
  font-size: 15px;
  font-weight: 700;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 50px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 0 20px;
  }
`;



const Section6_WelcomeSet: React.FC<WelcomeSetProps> = ({ title, subtitle }) => {

    const history = useHistory();

    const lanscape_mode=(window.innerWidth>640)

    // sss1
  return (
    <section css={containerStyles}>
      <div css={contentStyles}>
        <header css={headerStyles}>
          <div css={css` ${subtitleStyles};
                font-size: ${(lanscape_mode)?'1.7vw':'5.0vw'};
                font-weight: ${(lanscape_mode)?'500':'300'};
                text-align: center;
          `}>
              {'Is it hard to decide?'}
          </div>

            <TitleOnBanners animate_title title={'Try Welcome Set !'} />

        </header>

        <div css={buttonContainerStyles}>

                <ButtonOnCard variant="primary"
                              onPress={()=>{
                                  history.push('/products', {filter: 'increase'}, )
                              }}
                >TRY</ButtonOnCard>
                <ButtonOnCard variant="secondary"
                              onPress={()=>{
                                  document.location.href = "tel: +44 20 7930 9442";
                              }}
                >ASK MORE</ButtonOnCard>

        </div>

      </div>
    </section>
  );
};

export default Section6_WelcomeSet
