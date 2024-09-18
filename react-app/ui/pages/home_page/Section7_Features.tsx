
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';
import FeatureItem from "./Section7_Features/FeatureItem";
import Icon_ProcessStep from "./Section5_OrderProcess/Icon_ProcessStep";
import Icon_Features from "./Section7_Features/Icon_Features";
import AppearIt from "./inner/AppearIt";


const featureHighlightsStyles = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 25px;
  color: #000;
  text-align: center;
  justify-content: start;
  flex-wrap: wrap;
  font: 600 15px Inter, sans-serif;
`;

const features = [
    {
        imageSrc: Icon_Features({id:1}),
        description: "Delivery every two days from 6 to 12"
    },
    {
        imageSrc: Icon_Features({id:2}),
        description: "We deliver food straight for breakfast"
    },
    {
        imageSrc: Icon_Features({id:3}),
        description: "Menu is not repeated within a month"
    },
    {
        imageSrc: Icon_Features({id:4}),
        description: "Cooking from natural products"
    },
    {
        imageSrc: Icon_Features({id:5}),
        description: "Carcass, bake and su-view"
    },
    {
        imageSrc: Icon_Features({id:6}),
        description: "Modern and safe production"
    }
];

const Section7_Features: React.FC = () => (

        <section css={featureHighlightsStyles}>
            {features.map((feature, index) => (
                <FeatureItem key={index} imageSrc={feature.imageSrc} description={feature.description} />
            ))}
        </section>

);

export default Section7_Features
