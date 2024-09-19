
import React, {useRef, useState} from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Section1_SwiperMain/swiper_home_main.css'

import {GlobalsContext} from "../../../system_state/context_globals/globals_context";

// "version": "8.4.6",
// npm i swiper@latest
// https://codesandbox.io/p/sandbox/swiper-react-template-z1od1?file=%2Fsrc%2FApp.js%3A43%2C11
import {Swiper, SwiperSlide} from "swiper/react";

import {Autoplay, Navigation, Pagination} from 'swiper/modules';

const slides_array_portrait = [
    {
        ancor_path:'1',
        image_path: require("./Section1_SwiperMain/portrait/s1p.png"),
    },
    {
        ancor_path:'2',
        image_path: require("./Section1_SwiperMain/portrait/s2p.png"),
    },
    {
        ancor_path:'3',
        image_path: require("./Section1_SwiperMain/portrait/s3p.png"),
    },
    {
        ancor_path:'4',
        image_path: require("./Section1_SwiperMain/portrait/s4p.png"),
    },
]

const slides_array_landscape = [
    {
        ancor_path:'1',
        image_path: require("./Section1_SwiperMain/landscape/s1_.png"),
    },
    {
        ancor_path:'2',
        image_path: require("./Section1_SwiperMain/landscape/s2_.png"),
    },
    {
        ancor_path:'3',
        image_path: require("./Section1_SwiperMain/landscape/s3_.png"),
    },
    {
        ancor_path:'4',
        image_path: require("./Section1_SwiperMain/landscape/s4_.png"),
    },
    {
        ancor_path:'5',
        image_path: require("./Section1_SwiperMain/landscape/s5_.png"),
    },
]

const Section1_SwiperMain = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);
    const navigationNextRef = useRef() as any

    let iw_ = global_props.current_device.work_screen_width
    const csuffix = global_props.current_device.media_querry_suffix
    console.log('=== h1 iw_ ',iw_)
    console.log('=== h1 csuffix ',csuffix)

    let swiper_color_main='teal'
    if(props.theme){
        swiper_color_main=props.theme.palette.primary.main
    }

    const landscape_mode= (window.innerWidth>812)

    const [state, set_state] = useState(
        {slides_array: [...(landscape_mode)?slides_array_landscape:slides_array_portrait]}
    )

    console.log('=== h1 state.slides_array ',state.slides_array)

    const SlideHerou = (s:any) => {

      return(
          // backgroundColor:'red'
          <div id={'div1'} style={{ height:'max-content', }}>

              <img
                  className={iw_+""}
                  // loading="lazy"
                  // src={'/images_home/herou_slide5_w1280.png'} alt=""
                  // src={'/images_home/cnt_Hero_Slide1_'+csuffix+'.jpg'} alt=""
                  src={state.slides_array[s.index].image_path} alt=""
              />

                <div id='fake_space_click_sale' style={{
                        left:'10%',
                        top:'0px',
                        height:'90%', width:'80%',
                        position:'absolute',
                        // backgroundColor:'blue',
                        zIndex:99,
                }}
                     onClick={()=>{
                         props?.history?.push(
                             { pathname: '/sale',
                                 // search: '#sale'+s.index,
                                 state: { ancor_path: state.slides_array[s.index].ancor_path }
                             }
                         )
                     }}

                >
                </div>
          </div>

      )
    }


    // sss1
    return(<>
        {/*{(state.slides_array[])?}*/}
        <Swiper id={'Swiper1'}
            ref={navigationNextRef}
            style={{
                    "--swiper-theme-color":swiper_color_main,
                    marginTop:'1px',
                    // height:'480px'
                    height:'max-content',
            }}
            // spaceBetween={30}

            modules={[Autoplay, Pagination, Navigation]}

            loop
            slidesPerView="1"
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                speed={3000}
                pagination={{
                    clickable: true,
                }}
            navigation={true}

                // swiper_is_ready
                onSlideChange={(e:any) => {
                    // console.log('=== swiper slide change', e)
                    // f+ how to detect when swiper js 1st slide  ready
                    if(!global_props.loading.swiper_is_ready) {
                        let tdata = global_props
                        tdata.loading.swiper_is_ready = true
                        global_dispatch({
                            type: 'SETTER_GLOBALPROPS',
                            global_new_data: {global_props: tdata},
                        })
                    }
                }}

            // onSwiper={(swiper:any) => console.log('=== swiper swipe ',swiper)}

        >
            {state.slides_array.map((slide:any,index)=> {
                return (
                    <SwiperSlide id={'SwiperSlide1'} key={`slide${index} `}
                                 style={{
                                     // backgroundColor:'red',
                                     height:'auto'
                                 }}
                    >
                        <div className={iw_+""}>
                            {/*SwiperSlide {index}*/}
                            <SlideHerou index={index}/>
                        </div>

                    </SwiperSlide>
                 )
                })
            }

        </Swiper>
        {/*<div>Swiper222</div>*/}
    </>)
}

export default Section1_SwiperMain

