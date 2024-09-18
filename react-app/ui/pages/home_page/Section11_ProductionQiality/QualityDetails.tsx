
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';

const containerStyle = css`
  display: flex;
  margin-top: 10px;
  max-width: 100%;
  width: 400px;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
`;

const logoWrapperStyle = css`
  display: flex;
  width: 100px;
  max-width: 100%;
  
  overflow: hidden;
  justify-content: center;
`;

const logoStyle = css`
  aspect-ratio: 1.37;
  object-fit: contain;
  object-position: center;
  width: 100%;
`;

const contentStyle = css`
  display: flex;
  width: 100%;
  padding-left: 10px;
  flex-direction: column;
  font-family: Inter, sans-serif;
  justify-content: center;
`;

const titleStyle = css`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-size: 24px;
  font-weight: 700;
`;

const descriptionStyle = css`
  color: var(--s_paragraph_gray, #838383);
  font-size: 14px;
  font-weight: 500;
  margin-top: 20px;
`;

const QualityDetails: React.FC = () => {

    const landscape_mode=(window.innerWidth>window.innerHeight)
    const portrate_mode=(window.innerWidth<window.innerHeight)

    return (
        <article id='div_QualityDetails' css={css` ${containerStyle};
            align-items: ${(portrate_mode)?'center':'left'};
        `}>
            <div id='div_stamp' css={css `${logoWrapperStyle}; 
                //flex-direction: row;
                //align-items: center; 
            `}>
                <img loading="lazy" src={require("./haccp_stamp.png")} css={logoStyle} alt="HACCP logo" />
                {/*https://youtu.be/yCCyJD7cVKU*/}

            </div>
            <div
                data-aos="fade-up"
                css={contentStyle}
            >
                <h2
                    css={css` ${titleStyle};
                          text-align: ${(portrate_mode)?'center':'left'};
                          background: linear-gradient(90deg, #ffcb3b 0%, #feba3c 2.88%, #fda03d 8.63%, #fd8d3f 14.38%, #fd813f 20.14%, #fd7e40 26.85%, #8f66ff 64.24%, #4dd7be 85.34%);
                        `}
                >
                    Only HACCP verified product suppliers
                </h2>
                <p
                    data-aos="fade-down"
                   css={css` ${descriptionStyle};
                          text-align: ${(portrate_mode)?'center':'left'};
                        `}
                >
                    Daily food supply
                    <br />
                    Local companies responsible for quality
                    <br />
                    We comply with HCCP for food storage
                    <br />
                    We monitor the temperature in each warehouse
                </p>
            </div>
        </article>
    );
};

export default QualityDetails
