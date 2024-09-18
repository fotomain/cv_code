
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';

const socialIconsContainerStyles = css`
  background: var(--main-black, #000);
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 158px;
`;

const loginButtonStyles = css`
  padding-top: 5px;
  align-items: center;
  align-self: start;
  display: flex;
  gap: 10px;
  color: var(--main-white, #FFF);
  background-color: transparent;
  white-space: nowrap;
  justify-content: start;
  font: 700 20px Inter, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const loginIconStyles = css`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 20px;
  align-self: stretch;
  margin: auto 0;
`;

const socialIconsStyles = css`
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin-top: 15px;
  min-height: 40px;
  max-width: 100%;
  width: 158px;
  gap: 40px;
`;

const iconStyles = css`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 26px;
  align-self: stretch;
  margin: auto 0;
`;

interface SocialIconsProps {}

const FootertSocialIcons: React.FC<SocialIconsProps> = () => {
    return (
        <div css={socialIconsContainerStyles}>
            <button css={loginButtonStyles}>
                <img css={loginIconStyles} src="https://cdn.builder.io/api/v1/image/assets/TEMP/433802fce25dd9f0a4824f5e3c146a3a29c2f9f1ceee189f750939b7cf0d72f2?placeholderIfAbsent=true&apiKey=f057f8d1c3ab42b8990f876b9b6e3239" alt="" />
                <span>Login</span>
            </button>
            <div css={socialIconsStyles}>
                <a href="#" aria-label="Facebook">
                    <img css={iconStyles}
                         src="/images_figma/logofacebook.svg"
                    />
                </a>
                <a href="#" aria-label="Instagram">
                    <img css={iconStyles}
                         src={"/images_figma/logoinstagram.svg"}
                    />
                </a>
                <a href="#" aria-label="Twitter">
                    <img
                        className={"relative w-[24px] h-[24px] overflow-hidden shrink-0"}
                        alt=""
                        src="/images_figma/logo-x-white.svg"
                        color={'white'}
                    />
                </a>
            </div>
        </div>
    );
};

export default FootertSocialIcons
