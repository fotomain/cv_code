
import React from "react";

const LogoImage = (props:any) => {

  return (
      <img {...props} id={'div_LogoImage'}
          className="relative w-[100px] h-[69.47px] object-cover"
          alt=""
          src="/images_figma/logo-desktop@2x.png"
      />
  );
};

export default LogoImage
