
import React from "react";

import Groups2Icon from '@mui/icons-material/Groups2';

const LogoImageSideBarFire = (props:any) => {
  return (
      <Groups2Icon sx={{color:'red'}}
                   className="relative ml-[20px] pl-[2px] w-[100px] h-[69.47px] object-cover"
      />
      // <img {...props}
      //     className="relative w-[100px] h-[69.47px] object-cover"
      //     alt=""
      //     src="/images_figma/logo-desktop@2x.png"
      // />
  );
};

export default LogoImageSideBarFire
