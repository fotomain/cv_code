
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';
import ProcessStep, {iconStyles} from './Section5_OrderProcess/ProcessStep';
import {ReactSVG} from "react-svg";

import { ReactComponent as YourSvg } from './Section5_OrderProcess/i11.svg';
import Icon_ProcessStep from "./Section5_OrderProcess/Icon_ProcessStep";

interface SVGIconProps {
    width: string | number;
    color: string;
    name: string;
}


const orderProcessStyles = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 80px;///arrows111
`;

const Section5_OrderProcess = () => {

    const orderSteps:any = [
        { icon: Icon_ProcessStep({id:1}), title: 'Order the Program',
            progressImage: Icon_ProcessStep({id:10}),
            css_arrow:css` margin-top: 50px; `,
        },
        { icon: Icon_ProcessStep({id:2}), title: 'Confirm Order',
            progressImage: Icon_ProcessStep({id:20}),
            css_arrow:css` margin-top: -60px; `,
        },
        { icon: Icon_ProcessStep({id:3}),  title: 'Delivery',
            progressImage: Icon_ProcessStep({id:10}),
            css_arrow:css` margin-top: 50px; `,
        },
        { icon: Icon_ProcessStep({id:4}), title: 'Enjoy the quality',

        },
    ];

    const row_mode=(window.innerWidth>=810)
    const column_mode=(window.innerWidth<810)
    const gap_row=(window.innerWidth<=810)?' 0px ':' 40px 84px '

    return (
        <div
            data-aos="fade-up"
            css={css` ${orderProcessStyles};
            flex-direction: ${(row_mode)?'row':'column'};           
            align-items: ${(row_mode)?'flex-start':'center'};
            //transform: translate(50%);
            //left:50%;
            gap: ${(row_mode)?gap_row:'16px'};
        `} >

            {orderSteps.map((step:any, index:any) => (
                <ProcessStep
                    data={step}
                    key={index}
                    icon={step.icon}
                    title={step.title}
                    progressImage={step.progressImage}
                />
            ))}

        </div>
    );
};
export default Section5_OrderProcess

