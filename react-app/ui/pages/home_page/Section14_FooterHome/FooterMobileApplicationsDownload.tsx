

/** @jsxImportSource @emotion/react */


import React from 'react';
import { css } from '@emotion/react';

const appDownloadSectionStyles = css`
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 16px;
  text-align: right;
  line-height: 32px;
  justify-content: space-between;
  width: 179px;
  padding-top: 10px;
  margin-bottom: 10px;
`;

const appStoreImageStyles = css`
  aspect-ratio: 3.38;
  object-fit: contain;
  object-position: center;
  width: 179px;
  max-width: 100%;
`;

const appDescriptionStyles = css`
  color: white;
  leading-trim: both;
  text-edge: cap;
  background: var(--main-black, #000);
  //margin-top: 38px;
  max-width: 100%;
  width: 176px;
`;



const FooterMobileApplicationsDownload = () => {
  return (
    <div css={appDownloadSectionStyles}>
        {/*TODO LINKS*/}
      <img css={appStoreImageStyles} src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6de84ba117ca20b5b66743c2cefcd8b8a41aacb49817460d074ec84a55871dc?placeholderIfAbsent=true&apiKey=f057f8d1c3ab42b8990f876b9b6e3239" alt="Download on the App Store" />
      <p css={appDescriptionStyles}>
        One touch Order in <br /> Mobile App
      </p>
      <img css={appStoreImageStyles} src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6b5a7bfa6d53bfee26d7a83f4a756de1dd4f1f9bdbbab834c8d2063d4ddfe73?placeholderIfAbsent=true&apiKey=f057f8d1c3ab42b8990f876b9b6e3239" alt="Get it on Google Play" />
    </div>
  );
};

export default FooterMobileApplicationsDownload
