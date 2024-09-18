
import React from 'react';
import { css } from "@emotion/css"
import AppearIt from "./inner/AppearIt";
import {hamburger_menu_hide} from "../../../system_code/comp_navigation/hamburger_menu_hide";
import {ButtonOnCard} from "./inner/ButtonOnCard";
import {useHistory} from "react-router";

interface StepCardProps {
  icon: string;
  title: string;
  description: string;
  onPress?:()=>void;
}

const cardStyle = css`
  display: flex;
  min-width: 240px;
  padding-top: 15px;
  flex-direction: column;
  justify-content: start;
  flex: 1;
  flex-basis: 0%;
`;

const iconStyle = css`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 44px;
  align-self: center;
`;

const contentStyle = css`
  display: flex;
  margin-top: 10px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 10px 0;
`;

const titleStyle = css`
  leading-trim: both;
  text-edge: cap;
  //align-self: stretch;
  flex-grow: 1;
  width: 240px;
  max-width: 100%;
  gap: 10px;
  font-size: 24px;
  color: #13302B;
  font-weight: 700;
  flex-wrap: wrap;
`;

const descriptionStyle = css`
  //align-self: stretch;
  width: 375px;
  margin-top: 10px;
  max-width: 100%;
  gap: 10px;
  font-size: 16px;
  color: #6E7C6F;
  font-weight: 500;
  flex-wrap: wrap;
`;

const StepCard: React.FC<StepCardProps> = (props:any) => {
    const { icon, title, description } = props
  return (
      <div className={cardStyle}
        onClick={()=>{
            console.log('onClick111',props?.onPress)
            props?.onPress?.()
        }}
      >
        <img className={iconStyle} src={icon} alt="" loading="lazy" />
        <div className={contentStyle}>
          <h3 className={titleStyle}>{title}</h3>
          <p className={descriptionStyle}>{description}</p>
        </div>
      </div>
  );
};


interface Step {
  icon: string;
  title: string;
  description: string;
  onPress?:()=>void;
}


const containerStyle = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 25px;
  font-family: Inter, sans-serif;
  text-align: center;
  justify-content: start;
  flex-wrap: wrap;
`;

const Section3_HowItWorks: React.FC = () => {

    const history = useHistory();

    const steps: Step[] = [
        {
            icon: "/home_icons/icon1.svg",
            title: "Set your goal",
            description: "Would you like to eat healthier, get leaner, or become stronger?",
                onPress:()=>{
                    const elAncor = document.getElementById('ancor_choose_target_program')
                    if (elAncor) elAncor.scrollIntoView();
                }
        },
        {
            icon: "/home_icons/icon2.svg",
            title: "Meal plan is tailored to your needs",
            description: "Get nutritionist-approved tailored meal plan",
                onPress:()=>{
                    history.push('/products', {filter: 'increase'}, )
                }
        },
        {
            icon: "/home_icons/icon3.svg",
            title: "Meals are prepared according to plan",
            description: "Our chefs cook each meal specially for you"
        },
        {
            icon: "/home_icons/icon4.svg",
            title: "Enjoy your healthy meals",
            description: "Fresh meals are delivered to you everyday"
        }
    ];

    return (
      // <AppearIt once  mode='fade-up' duration={1} delay={1000} >
      <section className={containerStyle}
               data-aos="fade-up"
      >
        {steps.map((step, index) => (
            <StepCard key={index} {...step} />
        ))}
      </section>
      // </AppearIt>
  );
};

export {StepCard};
export default Section3_HowItWorks;

