
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';
import CardHeader from './CardHeader';
import CardContent from './CardContent';

interface CardContainerProps {
    imageSrc: string;
    buttonVariant: string;
}

const cardContainerStyle = css`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: flex-start;
  width: 30%; //c+ 3 cards
  //width: 374px;
`;

const CardContainer: React.FC<CardContainerProps> = ({ imageSrc, buttonVariant }) => {
    return (
        <article css={cardContainerStyle}>
            <CardHeader />
            <CardContent imageSrc={imageSrc} buttonVariant={buttonVariant}  />
        </article>
    );
};

export default CardContainer;
