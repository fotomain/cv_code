
/** @jsxImportSource @emotion/react */

//

import React from 'react';
import { css } from '@emotion/react';
import QualityManifest from "./Section11_ProductionQiality/QualityManifest";
import DeliveryService from "./Section11_ProductionQiality/DeliveryService";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const contentStyleRow = css`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const contentStyleLine2 = css`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const line1StyleRow = css`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const landscape_mode=(window.innerWidth>window.innerHeight)
const portrate_mode=(window.innerWidth<window.innerHeight)


const Section11_ProductionQiality = () => {
    return (
        <section id='div_Section20_ProductionQiality' css={containerStyle}>
            <section id='div_line1' css={css` ${line1StyleRow};
                flex-direction: ${(portrate_mode)?'column-reverse':'row'};
                align-items: ${(portrate_mode)?'center':'flex-start'};
            `}>
                <QualityManifest />
            </section>

            <section id='div_line2' css={css` ${contentStyleLine2};
                  flex-direction: ${(portrate_mode)?'column':'row'};
                  align-items: ${(portrate_mode)?'center':'flex-start'};
                  justify-content: flex-start;               
            `}>
                <DeliveryService />
            </section>
        </section>
    );
};

export default Section11_ProductionQiality;
