
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

// npm i typewriter-effect
import Typewriter from 'typewriter-effect';


import React, {useEffect} from "react";
import {useHistory} from "react-router";
import {GlobalsContext} from "../../../../system_state/context_globals/globals_context";
import {free_space_if_no_largest_width, largest_width} from "../../../../AppInitTheme";
import {card_main_background} from "../AppHomeFinal";
import {ButtonOnCard} from "../inner/ButtonOnCard";

const SatisfiedCustomersColumn1 = (p:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);
    const history = useHistory();

    const subtitle='More than 500,000\n' +
      'satisfied customers'

    const title='M.D. Mary-Elis Brokovich '

    const description='We are engaged in the organization of proper nutrition with delivery to your office, home, or any destination point. The main goal of the service is to prepare tasty and healthy food for intensive lifestyle.'

    const row_mode = "row" === p.card_direction
    // const column_mode = !row_mode

    const text_align=(row_mode)
            ?css` text-align:left `
            :css` text-align:center `

    const align_items=(row_mode)
            ?css` align-items: start; `
            :css` align-items: center; `


    const landscape_mode= (window.innerWidth >= largest_width)

  // sss1
  return(<div css={css`
        background-color: ${card_main_background};
        //background-color: pink;
        display: flex;
        flex-direction: column;     
        gap:15px;
        ${align_items}
      `}
  >


    <div
        id={'Typewriter1'}
        css={css`
          color: #96A3AB;
          font-size: ${(row_mode)?'1.8vw':'1.8vh'};
          margin: 0;
          max-width: 200px;
          ${text_align}
        `}>
        {subtitle}

    </div>

    <div
        css={css`
          color: #505D68;
          font-size: ${(row_mode)?'3.5vw':'3.5vh'};
          margin: 0;
          ${text_align}
        `}>
        {title}
    </div>

    <div
        css={css`
          color: #838383;
          font-size: ['1.2vw','1.2vw','1.6vw','1.6vw','1.4vw'][get_media_number()];
          margin: 0;
          max-width: 500px;
          text-align: justify;
          ${(landscape_mode)?'':' padding-left:'+free_space_if_no_largest_width+'px; padding-right:'+free_space_if_no_largest_width+'px; '} 
        `}>
      {/*{description}*/}

        <Typewriter
            options={{
                // strings: ['Hello', 'World'],
                autoStart: true,
                loop: true,
            }}
            onInit={(typewriter:any) => {
                typewriter.typeString(description)
                // typewriter.typeString('description description description ')
                    .callFunction(() => {
                        console.log('String typed out!');
                    })
                    .deleteAll(1)
                    .callFunction(() => {
                        console.log('All strings were deleted');
                    })
                    .start()
                    .pauseFor(2500)


            }}

        />

    </div>

      <div style={{marginTop:'30px'}}>
          <ButtonOnCard variant="primary"
                onPress={()=>{
                    history.push('/products', {filter: 'decrease'}, )
                }}
          >TRY FOR FITNESS</ButtonOnCard>
      </div>


  </div>)
}

export default SatisfiedCustomersColumn1
