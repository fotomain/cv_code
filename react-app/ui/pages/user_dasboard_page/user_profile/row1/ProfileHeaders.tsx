import { FunctionComponent } from "react";
import ProfileActionsButtons from "./ProfileActionsButtons";
import ProfilePersonalData from "./ProfilePersonalData";


const ProfileHeaders: FunctionComponent = () => {
  return (
    <div className="overflow-hidden flex flex-col items-start justify-start pt-[90px] pb-2.5 pr-2.5 pl-0
    gap-[6px]
    text-left text-xs text-c-main-black font-f-menu-disktop">
        <ProfilePersonalData/>
        <ProfileActionsButtons />
    </div>
  );
};

export default ProfileHeaders;
