import React from "react";
import ProfileImage from "./ProfileImage";
import ProfileHeaders from "./ProfileHeaders";


const Row1_D_UserDashboard = () => {
  return (
      <>
          {/*className="flex flex-col flex-wrap items-start justify-start pt-2.5 px-20 pb-0 gap-[20px] z-[2]"*/}
        <div id='user_dashboard_row1' className="flex flex-row flex-wrap items-start justify-start pt-2.5 px-20 pb-0 gap-[20px] z-[2]">
            <ProfileImage />
            <ProfileHeaders />
        </div>

      </>
  );
};

export default Row1_D_UserDashboard;
