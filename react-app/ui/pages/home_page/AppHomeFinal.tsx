
/** @jsxImportSource @emotion/react */

// import AOS from 'aos';
// import 'aos/dist/aos.css';

import React, {useEffect} from "react";

import "swiper/swiper-bundle.css";
import Section1_SwiperMain from "./Section1_SwiperMain";
import {GlobalsContext} from "../../../system_code/context_globals/globals_context";
import {useTheme} from "@mui/styles";
import {useHistory} from "react-router";
import Section2_Manifest from "./Section2_Manifest";
import Section3_HowItWorks from "./Section3_HowItWorks";
import TitleMain from "./inner/TitleMain";
import Section4_ChooseProgram from "./Section4_ChooseProgram";
import Spacer from "../../components/Spacer";
import AppearIt from './inner/AppearIt';
import { css } from '@emotion/react';
import TestCase_AppearIt from "./TestCase_AppearIt";
import Section5_OrderProcess from "./Section5_OrderProcess";
import Section6_WelcomeSet from "./Section6_WelcomeSet";
import Section7_Features from "./Section7_Features";
import Section14_FooterHome from "./Section14_FooterHome";
import Section8_MainProblem_NoTimeToCook from "./Section8_MainProblem_NoTimeToCook";
import Section9_ForIntensiveBusiness from "./Section9_ForIntensiveBusiness";
import Section10_SatisfiedCustomers from "./Section10_SatisfiedCustomers";
import Section11_ProductionQiality from "./Section11_ProductionQiality";


// npm i swiper@latest

const color_main='#1EB949'
const card_main_background='#F0F5F0';

const color_main_light='#83f95d'
const color_border='#d7d7d7'


// AOS.init(
//     {
//         offset: 1500,
//         duration : 1000
//     }
// );

const SpacerHome = () => {
    return(
        <Spacer data={'h-[60px]'}/>
    )
}


const AppHomeFinal = () => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);
    const theme = useTheme()
    const history = useHistory();

    let iw_ = global_props.current_device.work_screen_width

    console.log('=== global_props ',global_props)

    // const show_all=false
    const show_all=true

    // sss1`
    return(
        <>
            {(!global_props?.is_ready)
                ?
                <div>Loading Home...</div>
                :
                <div id={'div_HomeFinal'} className={iw_+""} >

                    <Section1_SwiperMain theme={theme} history={history} />

                    {( !(global_props.loading.swiper_is_ready && show_all) )?null:<>


                        <AppearIt once mode='fade-up' duration={1} >
                            <Section2_Manifest/>
                        </AppearIt>


                        <AppearIt once  mode='fade-up' duration={1} delay={1000} >
                            <Section3_HowItWorks/>
                        </AppearIt>

                        <div id={'ancor_choose_target_program'}></div>

                        <AppearIt once  mode='fade-up' duration={1} >
                            <TitleMain title={'Choose Target Program'} />
                        </AppearIt>

                        <AppearIt mode='fade-up' duration={1} delay={1000} >
                            <Section4_ChooseProgram/>
                        </AppearIt>


                        <AppearIt mode='fade-up' duration={1} >
                            <TitleMain title={'Follow the Process...'}/>
                        </AppearIt>
                        <AppearIt mode='fade-up' duration={1} >
                            <Section5_OrderProcess/>
                        </AppearIt>

                        <AppearIt mode='fade-up' duration={1} >
                            <Section6_WelcomeSet/>
                        </AppearIt>

                        <AppearIt mode='fade-up' duration={1} >
                            <TitleMain title={'Why people Love us ?'}/>
                        </AppearIt>
                        <AppearIt mode='fade-up' duration={1} >
                            <Section7_Features/>
                        </AppearIt>

                        <AppearIt mode='fade-up' duration={1} >
                            <Section8_MainProblem_NoTimeToCook/>
                        </AppearIt>

                        <AppearIt mode='fade-up' duration={1} >
                            <Section9_ForIntensiveBusiness/>
                        </AppearIt>

                        <AppearIt mode='fade-up' duration={1} >
                            <Section10_SatisfiedCustomers/>
                        </AppearIt>
                    </>}


                    <AppearIt mode='fade-up' duration={1} >
                        <TitleMain title={'Total Quality Control'}/>
                    </AppearIt>
                    <AppearIt mode='fade-up' duration={1} >
                        <Section11_ProductionQiality/>
                    </AppearIt>

                </div>
                }
        </>
  )
}

export {card_main_background, SpacerHome, color_main_light, color_main, color_border}
export default AppHomeFinal
