

// npm install @headlessui/react@insiders

import React from 'react'

// https://headlessui.com/react/tabs
import { Tab } from '@headlessui/react'
import TargetFilterLevel2 from "./TargetFilterLevel2";
import {target_programs_list} from "./section_3_program_data";
import {color_main} from "../AppHomeFinal";



function classNames(...items:any) {
    return items.filter(Boolean).join(' ')
}


const color_regular='black'
const color_glamour_paper='#F0F5F0'


const TargetFilterLevel1_Programs = (props:any) => {



    return (

        // id='use_desktop_mode'
            <div
                id={props.id}
                // className="w-full max-w-md px-2 py-2 sm:px-0"
            >
                <Tab.Group
                    defaultIndex={props.state.target_program}
                    onChange={(index) => {
                        console.log('=== Changed selected tab to:', index)
                        props.onChangeLevel1(index)
                    }}
                >
                    <Tab.List className={"flex space-x-1 rounded-xl bg-[" + color_glamour_paper + "] p-1"}>
                        {target_programs_list.map((current_target:any, current_target_n) => (
                            <Tab
                                key={current_target.id}
                                style={{
                                    color: (current_target_n===props.state.target_program)?'white':color_regular,
                                    backgroundColor: (current_target_n===props.state.target_program)?color_main:'transparent',
                                    // border: '2px solid red '
                                }}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full outline-none rounded-lg py-2.5 text-sm font-medium leading-5 bg-['+color_glamour_paper+']',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'bg-white shadow'
                                    )
                                }
                            >
                                {current_target.title}
                                <br/>
                                {current_target.subtitle}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {Object.values(target_programs_list).map((target_element, target_element_n) => (
                            <Tab.Panel
                                id={'div_Tab.Panel1_'+target_element_n}
                                key={target_element_n}
                                className={classNames(
                                    'w-[100%]'
                                )}
                                style={{height:'max-content',paddingTop:'0px'}}
                            >
                                <TargetFilterLevel2 target_element={target_element}
                                                    target_parent_id={target_programs_list[props.state.target_program].id}
                                                    default_item={props.state.target_calories}
                                                    onChange={(target_calories:any)=>{
                                                        props.onChangeLevel2?.(target_calories)
                                                    }}
                                />
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>

  );
};


export { classNames, color_regular,color_glamour_paper }
export default TargetFilterLevel1_Programs
