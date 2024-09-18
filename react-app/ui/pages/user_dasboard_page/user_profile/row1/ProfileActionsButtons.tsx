
import { FunctionComponent, useMemo, type CSSProperties } from "react";

type PropsType = {
  /** Style props */
  textLine5ActionsFlexShrink?: CSSProperties["flexShrink"];
};

const ProfileActionsButtons = () => {

  return (
    <div
      className="flex flex-row items-start justify-start pt-5 px-0 pb-0
        gap-[10px]
        md:gap-[30px]
        text-left text-xs text-gray-200 font-f-menu-disktop
      "

    >
      <div className="shrink-0 flex flex-row items-center justify-start
        gap-[4px]
        ">
        <img
          className="relative w-3.5 h-3.5 overflow-hidden shrink-0 object-cover"
          alt=""
          src="/user_dashboard/icon-mail@2x.png"
        />
        <b className="relative">Message to suport</b>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start gap-[4px]">
        <img
          className="relative w-3.5 h-3.5 overflow-hidden shrink-0 object-cover"
          alt=""
          src="/user_dashboard/icon-book@2x.png"
        />
        <b className="relative">Timeline</b>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start gap-[4px]">
        <img
          className="relative w-3.5 h-3.5 overflow-hidden shrink-0 object-cover"
          alt=""
          src="/user_dashboard/icon-clipboardsharp@2x.png"
        />
        <b className="relative">Reviews</b>
      </div>
    </div>
  );
};

export default ProfileActionsButtons;
