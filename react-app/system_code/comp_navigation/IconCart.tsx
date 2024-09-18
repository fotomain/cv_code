import React from "react";
import {SvgIconCustom} from "./NavBar";

const IconCart = (props:any) => {
  return(
      <SvgIconCustom
          stroke_color={props.icon_color_main}
          stroke_color_on_hover={props.icon_color_on_hover}
          icon = {(p:any)=>
              <svg
                  stroke={p.stroke_color}
                  id={'cart_icon'}
                  className="hover:cursor-pointer relative h-[21px] overflow-hidden shrink-0"
                  width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.25 7.34615V5.88462C6.25 4.72174 6.75045 3.6065 7.64124 2.78422C8.53204 1.96195 9.74022 1.5 11 1.5C12.2598 1.5 13.468 1.96195 14.3588 2.78422C15.2496 3.6065 15.75 4.72174 15.75 5.88462V7.34615M2.29167 7.34615C2.0817 7.34615 1.88034 7.42315 1.73187 7.56019C1.58341 7.69724 1.5 7.88311 1.5 8.07692V17.9423C1.5 19.3235 2.77458 20.5 4.27083 20.5H17.7292C19.2254 20.5 20.5 19.3806 20.5 17.9994V8.07692C20.5 7.88311 20.4166 7.69724 20.2681 7.56019C20.1197 7.42315 19.9183 7.34615 19.7083 7.34615H2.29167Z"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          }
          {...props}
      />
  )
}

export default IconCart
