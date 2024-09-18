
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React from 'react';
import Logo from "./Section14_FooterHome/FooterLogo";
import FootertSocialIcons from "./Section14_FooterHome/FootertSocialIcons";
import FooterLinks from "./Section14_FooterHome/FooterLinks";
import DiscountBanner from "./Section14_FooterHome/FooterDiscountOffer";
import FooterMobileApplicationsDownload from "./Section14_FooterHome/FooterMobileApplicationsDownload";


const footerStyles = css`
  //padding-bottom: 35px;
  align-items: center;
  //background: pink;
  background: var(--main-black, #000);
  display: flex;
  width: 100%;
`;

const paddingAll = css`
  padding-left:   15px;
  padding-right:  15px;
`

const cssRow = css`
  flex-direction: row;
  flex-wrap:wrap;
  //TODO COLUMN + space-between for all subcolumns
  justify-content: space-evenly; //c+
  //justify-content: space-between; //c+
  width: 100%;
`
const cssColumn = css`
  flex-direction: column;
  flex-wrap:wrap;
  //TODO COLUMN + space-between for all subcolumns
  justify-content: center;   
  align-items: center;
  
`

const contentStyles = css`
  justify-content: start;
  align-items: start;
  display: flex;
  //width: 1200px;
  max-width: 100%;
  
  flex-wrap: wrap;
  padding: 30px 0;
  
`;

const leftColumnStyles = css`
  margin-top: 3px; //c+ TODO 04.09.2024 19:53
  align-self: stretch;
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: space-between;
  height:230px; //c+ 30.08.2024 14:03
  //height:max-content;
`;

const logoLoginStyles = css`
  display: flex;
  max-width: 100%;
  width: 330px;
  align-items: start;
  gap: 40px 45px;
  justify-content: space-between;
`;

const addressStyles = css`
  leading-trim: both;
  text-edge: cap;
  align-self: stretch;
  //margin-top: 42px;
  gap: 10px;
  color: var(--main-white, #FFF);
  padding: 10px 0;
  font: 700 16px/32px Inter, sans-serif;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const dividerStyles = css`
  background-color: rgba(191, 191, 191, 1);
  height: 1px;
  margin-top: 10px;
  width: 100%;
  //max-width: 100%;
`;

const footer2_item = css`
  width:320px;
  cursor:pointer;
`

const bottomTextStyles = css`
  display: flex;
  margin-top: 10px;
  width: 100%;
  //max-width: 1200px;
  justify-content: space-between;
  align-items: center;
  //gap: 40px 100px;
  color: rgba(255, 255, 255, 1);
  flex-wrap: wrap;
  font: 700 16px/2 Inter, sans-serif;
`;

interface FooterProps {}

const Section14_FooterHome: React.FC<FooterProps> = () => {

    // const landscape_mode=false
    const landscape_mode=
        (window.innerWidth>window.innerHeight)
        // (window.innerWidth>=largest_width )

    const portrate_mode=(!landscape_mode)
        // || window.innerWidth<=1280

    const portrate_mode_footer2 = (window.innerWidth<(320*3))

    const gap_=(window.innerWidth>=1280)?' 40px 78px; ':' 10px 10px; '

    // sss1
    return (<>
        <footer id={'div_footer1'}
                css={css` ${footerStyles};
                ${(landscape_mode)?cssRow:cssColumn};
                ${paddingAll};
            `}

        >
            <div id='div_column123' css={css` ${contentStyles} 
                ${(landscape_mode)?cssRow:cssColumn}
                gap: ${gap_}}  
            `}>
                <div css={css` ${leftColumnStyles};  align-items:center `} id='div_column1'>
                    <div css={logoLoginStyles}>
                        <Logo />
                        <FootertSocialIcons />
                    </div>
                    <address css={css` ${addressStyles}; text-align:${(portrate_mode)?'center':'start'} `}>
                        1 World Trade Center, London, L10007. <br />
                        or call <a style={{color:'white'}} href='tel:+44 20 7930 9442'> +44 20 7930 9442</a> <br />
                        (outside the United States,  +44 20 7930 9442)
                    </address>
                </div>

                <FooterLinks />
                {/*{(window.innerWidth<500)?<Spacer data={" py-[20px] bg-['transparent'] " }/>:null}*/}

                <div id='div_column3' css={css`
                    display: flex; min-width: 240px; gap: 20px; justify-content: start;
                    //margin: auto;
                `}>
                    <DiscountBanner />
                    <FooterMobileApplicationsDownload />
                </div>
            </div>
        </footer>


        <footer id={'div_footer2'}
                css={css` ${footerStyles};
                flex-direction:column;
                padding-bottom: 35px;
                ${paddingAll};
            `}
        >
            <div id='div_footer2_divider' css={dividerStyles} />
            <div id='div_footer2_texts' css={css` ${bottomTextStyles};
              flex-direction:${(portrate_mode_footer2)?'column':'row'};
              flex-basis:30%;
            `}>
                <div css={css`  width:320px; text-align: ${(portrate_mode_footer2)?'center':'left'};
                    `}>© Level Deluxe, Inc. All Rights reserved</div>
                <div css={css`  width:320px; text-align: center
                    `}>Terms of Service</div>
                <div css={css`  width:320px; text-align: ${(portrate_mode_footer2)?'center':'right'};
                    `}>Privacy Policy</div>
            </div>
        </footer>

        </>);
};

export default Section14_FooterHome
