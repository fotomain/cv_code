
import React, {useState} from "react";
import TargetFilterLevel1_Programs from "./Section4_ChooseProgram/TargetFilterLevel1_Programs";
import TargetFilterLevel3 from "./Section4_ChooseProgram/TargetFilterLevel3";
import DaysNavigation from "./Section4_ChooseProgram/DaysNavigation";

import MealsNavigation from "./Section4_ChooseProgram/MealsNavigation";
import TitleMain from "./inner/TitleMain";
import TotalForOrder from "./Section4_ChooseProgram/TotalForOrder";
import {color_main} from "./AppHomeFinal";
import Spacer from "../../components/Spacer";
import {kit_calculation} from "./Section4_ChooseProgram/section_3_program_data";
import TargetFilterLevel6_ExcludeFish from "./Section4_ChooseProgram/TargetFilterLevel6_ExcludeFish";
import {is_empty} from "../../../system_code/code_global/GlobalFunctions";
import SubTitleMain from "./inner/SubTitleMain";

const Section4_ChooseProgram = () => {

    let meal_days_list_init = [
        {title:'Su',day_number:1},
        {title:'Mo',day_number:2},
        {title:'Tu',day_number:3},
        {title:'We',day_number:4},
        {title:'Th',day_number:5},
        {title:'Fr',day_number:6},
        {title:'Sa',day_number:7},
    ]

    const [state, set_state] = useState({
        target_program:2,
        target_calories:0,
        days_mode:'days_full_week',
        days_count:2,
        day_number:1,
        meal_days_list:meal_days_list_init,
        exclude_fish:false,

        total_before_discount:0,
        discount:0,
        total_invoice:0,

  });

  return(
  <div style={{width:'100%'}}
       data-aos="fade-up"
       // data-aos="zoom-in"

  >
    <TargetFilterLevel1_Programs
            state={state}
            onChangeLevel1={(index:any)=> {
                set_state((prev_state: any) => {
                    return ({
                        ...prev_state,
                        target_program: index,
                        target_calories: 0
                    })
                })
            }}

            onChangeLevel2={(target_calories:any)=>{
                set_state((prev_state:any)=>{return({...prev_state,
                    target_calories:target_calories
                })
                })
            }}
    />

      <SubTitleMain title={'Program Kits Examples'} nospaces />

      <DaysNavigation state={state}
          onChangeLevel5={(p:any)=>{
              set_state((prev_state: any) => {return {...prev_state,
                  day_number: p.day_number,
              }})
          }}
      />

      <MealsNavigation state={state} set_state={set_state}/>

      <Spacer data={'h-[12px]'}/>

      <TargetFilterLevel6_ExcludeFish state={state} set_state={set_state}/>

      {/*<Spacer data={'h-[12px]'}/>*/}
      <SubTitleMain title={'Select delivery days and program duration.'} nospaces />

      <TargetFilterLevel3
            state={state}
            sx={{color: color_main}}
            onChangeLevel3={(e:any)=>{

                let tdays_count=2
                let tdays=meal_days_list_init
                if('days_working'===e.target.value) {
                    tdays_count=5
                    tdays = meal_days_list_init.filter((el,kk)=> {
                            if ((kk !== 0) && (kk !== 6)) return el
                        }
                    )
                    console.log('=== tdays ',tdays)
                }

              set_state((prev_state: any) => {return {...prev_state,
                days_mode: e.target.value,
                meal_days_list: tdays,
                days_count:tdays_count,
              }})
            }}
            onChangeLevel4={(params:any)=>{
              set_state((prev_state: any) => {return {...prev_state,
                days_count: params.days_count,
              }})
            }}
    />

      <TotalForOrder
          state={state}
          specification={kit_calculation({state:state}).specification}
          meals_text={'5 Meals per day'}
          delivery_text={'Delivery: included to 1 address'}
      />


      {/*<br/>*/}
      {/*<br/>*/}
      {/*<div>{JSON.stringify(state)}</div>*/}

  </div>
  )
}

export default Section4_ChooseProgram
