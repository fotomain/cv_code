
import React from "react";

import Row1_D_UserDashboard from "./row1/Row1_D_UserDashboard";
import Row2_D_UserDashboard from "./row2/Row2_D_UserDashboard";
import ProfilePersonalData from "./row1/ProfilePersonalData";
import ProfileImage from "./row1/ProfileImage";
import ProfileActionsButtons from "./row1/ProfileActionsButtons";
import {TWDivider} from "../../../../system_code/tw/tw_components";
import {tw_col, tw_col_center, tw_col_left, tw_row_center} from "../../../../system_code/tw/tw_tools";


const UserProfile2 = () => {
  return (
    <>

        {/*============== lg:*/}
        {/*overflow-auto*/}
        <div id={'main_d'} className="
            md:flex sm:hidden xs:hidden
            bg-white-main h-[657px] flex flex-col items-start justify-start
            overflow-visible
            ">

          <Row1_D_UserDashboard />
            <TWDivider id={'divider1'} style={{marginTop:'24px'}}/>
          <Row2_D_UserDashboard />

        </div>
        {/*============== sm:*/}
        {/*items-start justify-start relative*/}
        {/*overflow-auto*/}
        <div className="
            flex flex-col
            items-start justify-start relative
            overflow-auto
            md:hidden
            xs:flex
            sm:flex
            bg-white-main
            h-auto
            "
        >

            <div className={tw_col_center}>
                <ProfileImage />
                <div className={' pl-[30px] '}>
                    <ProfilePersonalData/>
                </div>
            </div>

            <TWDivider id={'divider1'} style={{marginTop:'24px'}}/>

            <div className={tw_col + ' pl-[30px] pt-[12px]  '}>
                <ProfileActionsButtons/>
            </div>


            <div className={tw_col +' w-[80%] pl-[15px] pt-[12px]  '}>
                <Row2_D_UserDashboard/>
            </div>

        </div>
    </>
  );
};

export default UserProfile2
