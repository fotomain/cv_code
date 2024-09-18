
/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';

const logoStyles = css`
  aspect-ratio: 1.44;
  object-fit: contain;
  object-position: center;
  width: 127px;
  
`;

interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
    return <img css={logoStyles} src="https://cdn.builder.io/api/v1/image/assets/TEMP/bf1b21ce950af0dfb385f3b77ac28d0e7dc42826c7a6a81bbca86f1295822818?placeholderIfAbsent=true&apiKey=f057f8d1c3ab42b8990f876b9b6e3239" alt="Level Deluxe Logo" />;
};

export default Logo;
