
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import React from "react";
import Typewriter from "typewriter-effect";

const TitleOnBanners = (p:any) => {

    const titleStyles = css`
      color: #505D68;
      font-weight: 700;
      margin-top: 15px;
    `;

    const lanscape_mode=(window.innerWidth>640)

    return(
        <div
            data-aos="fade-up"
            css={css`${titleStyles};
                font-size: ${(lanscape_mode)?'3.5vw':'3.5vh'};
                text-align: center;
                font-family: Inter;
                font-weight: 800;
                @media screen and (min-width: 1200px) {
                  div {
                    font-size: 56px;
                  }
                }
          `}>
            {(p.animate_title)?
                <Typewriter
                    options={{
                        strings: [p.title, '25% off', 'for 1st order...'],
                        autoStart: true,
                        loop: true,
                    }}
                    onInit={(typewriter:any) => {
                        typewriter
                            // .typeString(p.title)
                            // .callFunction(() => {
                            //     console.log('String typed out!');
                            // })
                            .pauseFor(2500)
                            .deleteAll()
                            .callFunction(() => {
                                console.log('All strings were deleted');
                            })
                            .start()



                    }}

                />
                :
                p.title
            }
        </div>
    )
}

export default TitleOnBanners
