
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';

import QRCode from "react-qr-code";
import PhoneMockup1 from "./PhoneMockup1";

const discountBannerStyles = css`
  align-self: start;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  text-align: center;
  line-height: 25px;
  width: 111px;
  //background-color: #6200ee;
`;

const bannerContentStyles = css`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: red;
  
  border-radius: 0px 0px 0px 0px;
  position: relative;
  aspect-ratio: 0.491;
  width: 111px;
  //padding: 10px 7px 35px;
  //padding-left: 10px;
  //padding-right: 10px;
  padding-top: 10px;
  //padding-bottom: 10px;
  
`;

const footerPhoneMockupStyles = css`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const footerQRCodeStyles = css`
  position: absolute;
  aspect-ratio: 1;
  width: 80%;
  padding-top: 20px;
  left: 22px; 
`;

const discountTextStyles = css`
  position: absolute;
  width: 80%;
  top: 50%;
  left: 22px;
  
  //position: relative;
  color:white;
  leading-trim: both;
  text-edge: cap;
  background: var(--main-black, #000);
  margin-top: 21px;
`;

interface DiscountBannerProps {}

const DiscountBanner: React.FC<DiscountBannerProps> = () => {
    return (
        <div css={discountBannerStyles}>
            <div css={bannerContentStyles}>
                {/*phone*/}
                <div
                    css={footerPhoneMockupStyles}
                >
                    <PhoneMockup1/>
                </div>

                {/*<img css={footerPhoneMockupStyles} src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7702594bc20d70761b28b67e824e6bc75766ea12cf28bfa0339e1b6b846666d?placeholderIfAbsent=true&apiKey=f057f8d1c3ab42b8990f876b9b6e3239" alt="" />*/}

                <div css={css` ${footerQRCodeStyles}; cursor:pointer `}
                     onClick={()=>{
                         window.open('https://port777-tests.netlify.app/')
                     }}
                >
                    <QRCode size={80} value="https://port777-tests.netlify.app/"/>
                </div>

                {/*<img css={footerQRCodeStyles} src="https://cdn.builder.io/api/v1/image/assets/TEMP/06d460ad5f3396f8789c6c08ec4e5041959f8540f8aed13fa4126e032cfa4eb6?placeholderIfAbsent=true&apiKey=f057f8d1c3ab42b8990f876b9b6e3239" alt="Discount icon" />*/}
                <div css={discountTextStyles}>
                    -10 % OFF <br /> ON FIRST ORDER
                </div>
            </div>
        </div>
    );
};

export default DiscountBanner

