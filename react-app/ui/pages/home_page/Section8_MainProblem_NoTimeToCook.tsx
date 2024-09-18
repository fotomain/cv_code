
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';
import CardContainer from './Section8_MainProblem_NoTimeToCook/CardContainer';

const containerStyle = css`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10px;
`;

const cardData = [
    { imageSrc: require('./Section8_MainProblem_NoTimeToCook/p1.png'),
        buttonVariant: 'secondary' },
    { imageSrc: require('./Section8_MainProblem_NoTimeToCook/p2.png'),
        buttonVariant: 'primary' },
    { imageSrc: require('./Section8_MainProblem_NoTimeToCook/p3.png'),
        buttonVariant: 'secondary' },
];

const Section8_MainProblem_NoTimeToCook = () => {

    const landscape_mode=(window.innerWidth > window.innerHeight)

    return (
        <main css={css` ${containerStyle};
          flex-direction: ${(landscape_mode)?'row':'column'} ;
          justify-content: ${(landscape_mode)?'center':'flex-start'};
          align-items: ${(landscape_mode)?'center':'center'};
        `}
              data-aos="fade-up"
        >
            {cardData.map((data, index) => (
                <CardContainer key={index} {...data} />
            ))}
        </main>
    );
};

export default Section8_MainProblem_NoTimeToCook;
