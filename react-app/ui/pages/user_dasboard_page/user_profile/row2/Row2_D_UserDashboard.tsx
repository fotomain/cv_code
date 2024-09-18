import React from "react";
import WorkPlacesForm from "./WorkPlacesForm";
import PforileData from "./PforileData";

const Row2_D_UserDashboard = () => {
  return (
    <div id={'Row2_D_UserDashboard'} className="
    flex flex-row flex-wrap items-start justify-start
    pt-2.5 pb-0
    pr-0
    md:pl-[15px]
    z-[4]
    ">

        <WorkPlacesForm />

        {/*<TWDivider/>*/}

        <PforileData />
    </div>
  );
};

export default Row2_D_UserDashboard;
