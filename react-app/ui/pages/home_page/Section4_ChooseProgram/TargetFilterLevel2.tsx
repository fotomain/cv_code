
import {Tab} from "@headlessui/react";
import React from "react";
import {classNames, color_glamour_paper, color_regular} from "./TargetFilterLevel1_Programs";
import {color_main} from "../AppHomeFinal";
import {target_calories_list} from "./section_3_program_data";

const TargetFilterLevel2 = (props:any) => {

    // let targets_list: {[index: string]:any} = {}
    var targets_list: Array<any>;
    if(props?.target_parent_id) {
        targets_list = target_calories_list[props?.target_parent_id]
    } else {
        console.error('=== not exist props?.target_parent_id ')
        return null
    }

    if(1===targets_list.length) {
            setTimeout(()=>{
                props.onChange?.(0)
            },100)
    }

    return(
      <div
          id={props.id}
          className="w-full"
      >
          <Tab.Group
              defaultIndex={props?.default_item}
              onChange={(index) => {
                  console.log('=== Changed filter1 :', index)
                    props.onChange?.(index)
                  }}
          >
              <Tab.List className={"flex space-x-1 rounded-xl bg-[" + color_glamour_paper + "] p-1"}>
                  {targets_list.map((current_target:any,current_target_n) => (
                      <Tab
                          key={current_target.id}
                          style={{
                              color: (current_target_n===props?.default_item)?color_main:color_regular,
                              borderBottom: ((1===targets_list.length) || current_target_n===props?.default_item)?'2px solid  '+color_main:'none',

                          }}
                          className={({ selected }) =>
                              classNames(
                                  'w-full outline-none rounded-lg py-2.5 text-sm font-medium leading-5 bg-['+color_glamour_paper+']',
                                  selected
                                      ? 'bg-white shadow'
                                      : 'bg-white shadow'
                              )
                          }

                          onClick={(index:any) => {
                              console.log('=== Changed filter1 :', current_target_n)
                              props.onChange?.(current_target_n)
                          }}

                      >
                          {current_target.title}
                          <br/>
                          {current_target.subtitle}
                      </Tab>
                  ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                  {Object.values(targets_list).map((target_element, idx) => (
                      <Tab.Panel
                          key={idx}
                          className={classNames(

                              'w-[100%]'
                          )}
                      >
                      </Tab.Panel>
                  ))}
              </Tab.Panels>
          </Tab.Group>
      </div>
  )
}
export default TargetFilterLevel2
