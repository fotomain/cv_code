
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';

const featureStyle = css`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: center;
  
  color: #000;
  letter-spacing: 0.6px;
  
  flex: 1;
  flex-basis: 0%;
  padding: 10px 0;
  font: 500 20px Inter, sans-serif; 
  //@media (max-width: 991px) {
  //  max-width: 100%;
  //}
`;

const textStyle = css`
  align-self: stretch;
  flex: 1;
  width: 100%;
  gap: 10px;
  padding: 10px 0;
  
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const imageWrapperStyle = css`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: flex-start;
  width: 400px;
`;

const imageContainerStyle = css`
  display: flex;
  max-width: 100%;
  //width: 400px;
  padding-bottom: 20px;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
`;

const imageStyle = css`
  aspect-ratio: 1.29;
  object-fit: contain;
  object-position: center;
  width: 120px;
  align-self: stretch;
  margin: auto 0;
`;

const QualityManifest: React.FC = () => {


    const landscape_mode=(window.innerWidth>window.innerHeight)
    const portrate_mode=(window.innerWidth<window.innerHeight)

    return (
        <>
            <article css={css`  ${featureStyle};
              max-width: ${(landscape_mode)?'45%':'100%'};
            `}>
                <p css={css` ${textStyle};
                        text-align: ${(portrate_mode)?'center':'justify'};
                    `}>
                    Only own production in each metropolis. unique modern equipment.
                    A special personnel training system. this is interesting to look at ...
                </p>
            </article>
            <div css={css` {imageWrapperStyle}
                margin-left: ${(landscape_mode)?'5%':null}
            `}>
                <div css={imageContainerStyle}>
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1a6d1b3d70ea697c733601a06945f4b8d4be39ed8334e58751879faf1e0c2b3?placeholderIfAbsent=true&apiKey=f057f8d1c3ab42b8990f876b9b6e3239" css={imageStyle} alt="Production facility" />
                </div>
            </div>
        </>
    );
};

export default QualityManifest;
