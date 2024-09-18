
/** @jsxImportSource @emotion/react */

import React from "react";
import {css} from "@emotion/react";
import {color_main} from "../AppHomeFinal";


interface ButtonOnCardProps {
    variant: "primary" | "secondary";
    children: React.ReactNode;
    onPress?:()=>void;
}

const buttonOnCardStyles = css`
  justify-content: center;
  align-items: center;

  display: flex;
  gap: 10px;
  flex: 1;
  font-family: Inter;
  flex-basis: 0%;
  padding: 20px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  
`;

const ButtonOnCard: React.FC<ButtonOnCardProps> = (props) => {

    const { variant, children } = props

    return (
        <button
                 id='ButtonOnCard'
                 onClick={()=>{
                     props?.onPress?.()
                 }}
                 onMouseEnter={()=>{
                     console.log('onMouseEnter++')
                 }}
           css={css`
            ${buttonOnCardStyles}; 
            ${(variant === "primary") 
                    ? css`
                          color: white; 
                          background-color: black;
                          border: 1px solid black;
                          
                          &:hover {
                            background-color: ${color_main}; !important;
                            border: 1px solid ${color_main}; !important;
                            transform: scale(1.05); 
                          }
                    `
                    : css`
                          color: black; 
                          background-color: transparent;
                          border: 1px solid black;
                          
                          &:hover {
                            color: ${color_main}; !important;
                            border: 1px solid ${color_main}; !important;
                            transform: scale(1.05); 
                          }
                      `
           };

        `}>
            {children}
        </button>
    );
};

export {ButtonOnCard}
