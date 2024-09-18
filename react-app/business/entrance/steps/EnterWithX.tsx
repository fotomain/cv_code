
import React from "react";
import {useTheme} from "@mui/styles";

const EnterWithX = (props:any) => {

    let src_="/images_figma/logo-x-black.svg"

    const theme = useTheme()
    let className_ = "w-auto h-[30px]"

    if(theme.palette?.mode === 'dark'){
        src_="/images_figma/logo-x-white.svg"
        className_ = "w-auto h-[45px]"
    }


    //File history https://en.m.wikipedia.org/wiki/File:X_logo_2023.svg
    return (

    <div id={'xlogo1'} className=" flex flex-row items-center justify-center
            hover:cursor-pointer
          ">

        <img
            {...props}
            // className={className_}
            alt=""
            src={src_}
            width={'35px'}
        />

    </div>

);
};

export default EnterWithX
