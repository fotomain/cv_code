



/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import {useEffect, useRef, useState} from "react";


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import 'swiper/css/effect-coverflow';
import 'swiper/css/mousewheel';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/grid';

import './inner/SwiperMealExamples.css';
// npm i swiper@latest


// @ts-ignore
import {Swiper, SwiperSlide} from "swiper/react";
// @ts-ignore
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import CardMealExample from "./inner/CardMealExample";
import {kit_calculation} from "./section_3_program_data";
import {color_main} from "../AppHomeFinal";
import {get_media_number} from "./TargetFilterLevel3";
import {data_for_navigation} from "./inner/data_file_products";


const MealsNavigation = (props:any) => {

    const swiperRef = useRef() as any

    const data_items:any[] = data_for_navigation.filter((el:any)=>{
      if (-1===el.id.toString().indexOf('x')) {
          const el1:any = el
          el1.imageObjectURL=null
          return el1
      }
    })

    const [state, set_state] = useState({
        data_items:data_items,
        data_cache:{},
    });

    useEffect(() => {

        // console.log('=== data_image useEffect ',data_items)

        return () => {};
    }, [state.data_items]);


    useEffect(() => {

        console.log('=== props.state.day_number ',props.state.day_number)
        swiperRef.current.swiper.slideTo(Math.round(Math.random()*20));

        const kit_state = kit_calculation({state:props.state})

            props.set_state((prev_state:any)=>{return({...prev_state,
                total_before_discount:kit_state.total_before_discount,
                discount:kit_state.discount,
                total_invoice:kit_state.total_invoice,
            })})

        return () => {};
    }, [
        props.state.target_program,
        props.state.target_calories,
        props.state.days_mode,
        props.state.days_count,
        props.state.exclude_fish,
        props.state.day_number,
    ]);

    let swiper_color_main=color_main
    if(props.theme){
        swiper_color_main=props.theme.palette.primary.main
    }

    const swiper_height  =[250,250,220,250,350][get_media_number()]
    // const swiper_height=350

    const style_swiper =
        {
            "--swiper-theme-color": swiper_color_main,
            "--swiper-height": ''+swiper_height+'px',
        }

    useEffect(() => {

        console.log('=state.data_cache',state.data_cache)

        return () => {

        };
    }, [state.data_cache]);

    const row_mode=(window.innerWidth>640)
    const column_mode=(window.innerWidth<=640)

    // sss1
    return(<div>
      {(0===data_items.length)?<div>Loading data...</div>:

          <>
              <Swiper
                  ref={swiperRef}
                  style={{marginTop:'1px',
                      height:'max-content',
                      ...style_swiper
                  }}

                  // onInit={(core: SwiperCore) => {
                  //   navigationNextRef.current = core.el
                  // }}

                  spaceBetween={30}
                  // centeredSlides={true}

                  // autoplay={{
                  //   delay: 1000,
                  //   disableOnInteraction: false,
                  // }}

                  loop

                  // pagination={{
                  //   clickable: true,
                  // }}
                  navigation={true}

                  modules={[Autoplay, Pagination, Navigation]}
                  // className="mySwiper"
                  //=== c+slides
                  slidesPerView={(row_mode)?4:2}

              >
                  {state.data_items.map((el,index)=>{
                      return <SwiperSlide key={`slide${index} `}
                              style={{marginTop:'2px'}}
                      >
                          <CardMealExample item_data={el} swiper_height={swiper_height}/>
                      </SwiperSlide>
                  })}

              </Swiper>


          </>
          // <>{JSON.stringify(data_items)}</>
      }
  </div>)
}

export default MealsNavigation
