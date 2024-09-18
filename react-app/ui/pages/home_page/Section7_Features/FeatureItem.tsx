
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';

interface FeatureItemProps {
    imageSrc: any;
    description: string;
}

const featureItemStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items:center;
  flex: 1;
  flex-basis: 0%;
  margin: auto 0;
  padding: 10px;
`;

// const imageStyles = css`
//   aspect-ratio: 1;
//   object-fit: contain;
//   object-position: center;
//   width: 44px;
//   align-self: center;
// `;

const descriptionStyles = css`
  leading-trim: both;
  text-edge: cap;
  align-self: stretch;
  flex: 1;
  margin-top: 10px;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
`;

const FeatureItem: React.FC<FeatureItemProps> = ({ imageSrc, description }) => {

    const lanscape_mode=(window.innerWidth>640)
    const min_width = (!lanscape_mode)?' min-width:45%':''

    return (<div css={css` ${featureItemStyles}
          ${min_width} ;
    `}>
        {imageSrc}
        <p css={descriptionStyles}>{description}</p>
    </div>)
};

export default FeatureItem
