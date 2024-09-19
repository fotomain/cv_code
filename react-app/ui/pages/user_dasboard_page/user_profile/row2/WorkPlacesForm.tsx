
import React from "react";
import WorkPlacesTable from "./WorkPlacesTable";
import {tw_col_left, tw_opacity_lignt} from "../../../../../system_code/tw/tw_tools";
import {GlobalsContext} from "../../../../../system_state/context_globals/globals_context";

const WorkPlacesFormStatus = () => {
    return(
        <>
            <div className="shrink-0 flex flex-row items-center justify-start py-2.5 px-0 text-3xs">
                <b className="relative">ONLINE / OFF LINE</b>
            </div>
            <div className="shrink-0 flex flex-row items-center justify-start pt-[5px] px-0 pb-0 text-gray-300">
                <b className="relative flex items-center w-[108px] shrink-0">From</b>
                <b className={tw_opacity_lignt+" relative text-limegreen-300 whitespace-pre-wrap"}>
                    20.10.2023 17:00
                </b>
            </div>
            <div className="shrink-0 flex flex-row items-center justify-start pt-[5px] px-0 pb-0 text-gray-300">
                <b className="relative flex items-center w-[108px] shrink-0">IP Address</b>
                <b className={tw_opacity_lignt+" relative text-gray-400 whitespace-pre-wrap"}>
                    127 . 127 . 127 . 127
                </b>
            </div>
            <div className="shrink-0 flex flex-row items-center justify-start pt-[5px] px-0 pb-0 text-c-main-black">
                <b className="relative flex items-center w-[108px] shrink-0">{` `}</b>
                <b className={tw_opacity_lignt+" relative text-gray-400"}>New York</b>
            </div>

            <div id='col_workplaces_header' className={tw_col_left + ' gap-[0px] '}>
                <div className=" w-[340px] h-6 flex flex-row items-center justify-start pt-0 px-0 gap-[4px]">
                    <img
                        className="relative w-3.5 h-3.5 overflow-auto shrink-0 object-cover"
                        alt=""
                        src="/user_dashboard/icon-shop@2x.png"
                    />
                    <b className="relative">Workplaces</b>
                </div>
                <div className={' w-[90px] my-[6px] border-b-[2px] border-solid border-hero-green '}></div>
            </div>
        </>
    )
}

const WorkPlacesForm = () => {

    return (
        <div id='WorkPlacesForm' className=" flex flex-col flex-wrap items-start

        justify-center
        sm:justify-center
        md:justify-start

        pt-0
        pb-2.5
        pr-5
        pl-0

        box-border gap-[8px]

        w-[100%]


        md:w-[350px]


        text-left text-xs text-gray-200 font-f-menu-disktop

        ">

            <div className="self-stretch shrink-0 flex flex-row items-start justify-start">

                <div className="flex-1 shrink-0 flex flex-row items-center justify-start pt-0 px-0 pb-2.5 gap-[4px]">
                    {/*versione green */}
                    {/*<div className="flex-1 shrink-0 flex flex-row items-center justify-start pt-0 px-0 pb-2.5 gap-[4px]*/}
                    {/*    border-b-[2px] border-solid border-hero-green*/}
                    {/*">*/}

                      <img
                        className="relative w-3.5 h-3.5 overflow-auto shrink-0 object-cover

                        "
                        alt=""
                        src="/user_dashboard/icon-shop@2x.png"
                      />
                      <b className="relative ">Status</b>

                </div>

            </div>


            {/*<div className={'md:w-[65px] my-[-9px] border-b-[2px] border-solid border-hero-green '}></div>*/}

            <WorkPlacesFormStatus/>

            <WorkPlacesTable/>

        </div>
  );
};

export default WorkPlacesForm;
