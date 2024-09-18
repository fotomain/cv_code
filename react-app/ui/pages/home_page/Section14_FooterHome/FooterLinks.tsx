

/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';

const footerLinksStyles = css`
  margin-top: -10px; //c+ TODO 04.09.2024 19:53
  align-items: start;
  background: var(--main-black, #000);
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  min-width: 240px;
  gap: 32px;
  color: var(--main-white, #FFF);
  justify-content: start;
  font: 700 16px/30px Inter, sans-serif;

  height:230px; //c+ 30.08.2024 14:03
  
`;

const listStyles = css`
  //leading-trim: both;
  list-style-type: none;
  text-edge: cap;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height:100%;
  //background-color: red;
`;

interface FooterLinksProps {}

const FooterLinks: React.FC<FooterLinksProps> = () => {
    const links = [
        ['Certificate', 'Price', 'Blog', 'FAQ', 'Documents'],
        ['Delivery', 'About', 'Loyalty', 'Corporate', 'Contacts']
    ];

    return (<>
         <div css={footerLinksStyles} id='div_column2'>
            {links.map((column, index) => (
                <ul key={index} css={listStyles}>
                    {column.map((link, linkIndex) => (
                        <li key={linkIndex} css={css` vertical-align:top; flex-grow:1 `} >
                            <a href="/" css={css` text-decoration:none; height:70px; color:white; `} >{link}</a>
                        </li>
                    ))}
                </ul>
            ))}
         </div>
    </>);
};

export default FooterLinks
