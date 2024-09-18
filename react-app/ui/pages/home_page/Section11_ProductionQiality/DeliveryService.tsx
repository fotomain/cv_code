
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';
import QualityDetails from "./QualityDetails";

const imageStyle = css`
  aspect-ratio: 1.8;
  object-fit: contain;
  object-position: center;
  width: 100%;
  min-width: 240px;
  flex: 1;
  flex-basis: 0%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const contentWrapperStyle = css`
  display: flex;
  min-width: 240px;
  padding-right: 10px;
  flex-direction: column;
  justify-content: flex-start;
  width: 410px;
`;

const contentStyle = css`
  display: flex;
  max-width: 100%;
  width: 400px;
  flex-direction: column;
  font-family: Inter, sans-serif;
  justify-content: center;
  padding: 0 10px;
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

const DeliveryService: React.FC = () => {

    const row_mode=(window.innerWidth>640)
    const landscape_mode=(window.innerWidth>window.innerHeight)
    const portrate_mode=!landscape_mode

    return (
        <>
            {/*<img css={css` max-width: ${(landscape_mode)?'50%':'100%'} `} loading="lazy" src={require("./p1.png")} />*/}
            {/*<embed css={css` width: ${(landscape_mode)?'50%':'100%'} `} src={`https://youtu.be/dWlRyYtf1Iw`}></embed>*/}
            <iframe
                data-aos="fade-up"
                css={css` height:450px; width: ${(landscape_mode)?'50%':'100%'} `}
                    id="player"
                    src="https://www.youtube.com/embed/yCCyJD7cVKU?enablejsapi=1&origin=https://yourdomain.com&showinfo=0&iv_load_policy=3&modestbranding=1&theme=light&color=white&rel=0"
                    frameBorder="0"></iframe>
            {/*<iframe css={css` width: ${(landscape_mode)?'50%':'100%'} `} src={`https://youtu.be/yCCyJD7cVKU`}></iframe>*/}
            <div id='div_right_side' css={css` ${contentWrapperStyle};
              align-self: ${(row_mode)?'center':'flex-start'} ;
            `}>
                <div css={contentStyle}>
                    <h2
                        data-aos="fade-up"
                        css={css` ${titleStyle};
                          text-align: ${(portrate_mode)?'center':'left'};
                          margin-top: ${(portrate_mode)?'16px':null};
                        `}
                    >24x7 punctual couriers</h2>
                    <p
                        data-aos="fade-down"
                       css={css` ${descriptionStyle};
                          text-align: ${(portrate_mode)?'center':'left'};
                        `}
                    >
                        Own delivery service
                        <br />
                        Express delivery: we will deliver within the selected hour
                        <br />
                        In the city + 100 km
                        <br />
                        If you order before 12:00 we will deliver tomorrow
                    </p>
                </div>
                <QualityDetails />

            </div>
        </>
    );
};

export default DeliveryService;
