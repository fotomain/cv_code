import {tw_opacity_lignt} from "../../../../../system_code/tw/tw_tools";


const PforileData = () => {
  return (
    <div className="overflow-auto flex flex-col items-start justify-start pt-0 pb-2.5 pr-2.5 pl-0 gap-[8px]

    w-[100%]

    md:w-[350px]

    text-left text-xs text-gray-300 font-f-menu-disktop">
      <div className="shrink-0 flex flex-row items-start justify-start gap-[30px] text-gray-200">
        <div className="shrink-0 flex flex-row items-center justify-start gap-[4px]">
          <img
            className="relative w-3.5 h-3.5 overflow-hidden shrink-0 object-cover"
            alt=""
            src="/user_dashboard/icon-shop@2x.png"
          />
          <b className="relative">Orders</b>
        </div>
        <div className="shrink-0 flex flex-row items-center justify-start pt-0 px-0 pb-2.5 gap-[4px] text-gray-100 border-b-[2px] border-solid border-hero-green">
          <img
            className="relative w-3.5 h-3.5 overflow-hidden shrink-0 object-cover"
            alt=""
            src="/user_dashboard/timer@2x.png"
          />
          <b className="relative">Contacts</b>
        </div>
        <div className="shrink-0 flex flex-row items-center justify-start gap-[4px]">
          <img
            className="relative w-3.5 h-3.5 overflow-hidden shrink-0 object-cover"
            alt=""
            src="/user_dashboard/icon-settingssharp@2x.png"
          />
          <b className="relative">Settings</b>
        </div>
        <div className="shrink-0 flex flex-row items-center justify-start gap-[4px]">
          <img
            className="relative w-3.5 h-3.5 overflow-hidden shrink-0 object-cover"
            alt=""
            src="/user_dashboard/icon-personaddsharp@2x.png"
          />
          <b className="relative">Login</b>
        </div>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start py-2.5 px-0 text-3xs text-gray-200">
        <b className="relative">CONTACT INFORMATION</b>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start pt-[5px] px-0 pb-0">
        <b className="relative flex items-center w-[108px] shrink-0">Phone</b>
        <b className={tw_opacity_lignt+" relative text-limegreen-300 whitespace-pre-wrap"}>
          +1 28465 321 3213
        </b>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start pt-[5px] px-0 pb-0">
        <b className="relative flex items-center w-[108px] shrink-0">Address</b>
          <b className={tw_opacity_lignt+" relative text-gray-400 whitespace-pre-wrap"}>
          S34 MB125 Vision Street
        </b>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start pt-[5px] px-0 pb-0 text-c-main-black">
        <b className="relative flex items-center w-[108px] shrink-0">{` `}</b>
          <b className={tw_opacity_lignt+" relative text-gray-400"}>New York</b>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start pt-[5px] px-0 pb-0">
        <b className="relative flex items-center w-[108px] shrink-0">E-mail</b>
          <b className={tw_opacity_lignt+" relative text-limegreen-300"}>o.mark@gmail.com</b>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start pt-[5px] px-0 pb-0">
        <b className="relative flex items-center w-[108px] shrink-0">Site</b>
          <b className={tw_opacity_lignt+" relative text-limegreen-300"}>www.mylife.com</b>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start py-2.5 px-0 text-3xs text-gray-200">
        <b className="relative">BASIC INFORMATION</b>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start pt-[5px] px-0 pb-0">
        <b className="relative flex items-center w-[108px] shrink-0">
          Birthday
        </b>
          <b className={tw_opacity_lignt+" relative text-gray-400"}>Dec 25, 2000</b>
      </div>
      <div className="shrink-0 flex flex-row items-center justify-start pt-[5px] px-0 pb-0">
        <b className="relative flex items-center w-[108px] shrink-0">Male</b>
          <b className={tw_opacity_lignt+" relative text-gray-400"}>Female</b>
      </div>
    </div>
  );
};

export default PforileData;
