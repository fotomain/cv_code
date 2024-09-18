
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';
import {ButtonOnCard} from "../inner/ButtonOnCard";

interface CardContentProps {
    imageSrc: string;
    buttonVariant: string;
}

const cardContentStyle = css`
  display: flex;
  margin-top: 20px;
  //min-height: 801px;
  width: 100%;
  max-width: 374px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  font: 700 15px Inter, sans-serif;
`;

const imageStyle = css`
  aspect-ratio: 0.51;
  object-fit: contain;
  object-position: center;
  width: 100%;
`;

const buttonContainerStyle = css`
  display: flex;
  margin-top: 15px;
  width: 344px;
  max-width: 100%;
  align-items: flex-start;
  gap: 40px;
  justify-content: center;
  padding: 0 40px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const CardContent: React.FC<CardContentProps> = ({ imageSrc, buttonVariant }) => {

    return (
        <div css={cardContentStyle}
             data-aos="zoom-in"
        >
            <img id={'div_insta'}
                css={imageStyle} src={imageSrc} alt="Food preparation illustration" />
            <div css={buttonContainerStyle}>
                <ButtonOnCard variant={buttonVariant as "primary" | "secondary" }>ORDER TO SAVE YOUR TIME</ButtonOnCard>
            </div>
        </div>
    );
};

export default CardContent;
