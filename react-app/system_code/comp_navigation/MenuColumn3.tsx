
import React from "react";
import {GlobalsContext} from "../../system_state/context_globals/globals_context";

import {page_orientation} from "../../system_state/context_globals/globals_types";
import {useTheme} from "@mui/styles";

// interface Props {
//     cta_box_width?  :string;
// }

const MenuColumn3 = (props:any) => {


    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const theme = useTheme()
    const isDarkTheme = theme.palette.mode === 'dark';
    let style_dark={}
    if(isDarkTheme) style_dark = {borderRadius:'15px',padding:'16px',backgroundColor:'white'}

    let cta_box_width = ''
    let cta_show_divider = ' h-[0px] '
    let cta_button_padding=' pb-[0px] '
    let innerWidth_ = global_props.current_device.innerWidth
    if(innerWidth_<640) {
        if((!props.cta_box_width) || (''===props.cta_box_width))
        {
            cta_box_width = ' w-auto '
        }
        else
        {
            cta_box_width = ' w-[300px] '
        }
        cta_show_divider=' h-[20px] '
        cta_button_padding=' pb-[15px] '
    }

    let col_height=''
    if(props.height && props.height!=='') {

        col_height = props.height

    }
    // 360 ok
    // land + mobile
    let iw_=' w-[290px] h-auto mb-[20px]'
    iw_=' w-[360px] h-auto mb-[20px]'
    iw_=' '

    let src1=''
    let clr1=''
    if(page_orientation.lanscape===global_props.current_device.orientation){
        src1='/images_menu/herou_slide5_for_menu_640.png'
        clr1="bg-darkgray"
    } else {
        src1='/images_menu/herou_slide5_for_menu_360.png'
        clr1="bg-herou-green-dots"
    }

    // sss1
    return(
        <div id='div_menu_column3' className={``+col_height+` flex flex-col items-start justify-start `}
             style={style_dark}
        >

            <div>
                <div id={'menu_dots'} className={`
                          flex flex-col items-start justify-center
                          h-[18px]
                          md:mt-[15px]
                          md:mb-[40px]
                          mb-[20px]
                          gap-[10px]
                        `}>
                    <div className="bg-white-main flex flex-row items-center justify-start gap-[10px]
                            ">
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                    </div>
                    <div className="bg-white-main flex flex-row items-center justify-start gap-[10px]">
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                        <div className={`relative rounded-[50%] `+clr1+` w-[5px] h-[5px]`} />
                    </div>
                </div>

            </div>

            <div id={'menu_image_box'} className={` flex flex-col items-start justify-between
                                `+cta_box_width+`                                
                          `}>

                <img
                    className={iw_+""}
                    src={src1} alt=""
                />

            </div>

            <div id={'menu_terms'} className="self-stretch flex flex-row items-end justify-end gap-[20px]
                mt-auto
                md:pt-[0px]
                pt-[20px]
            ">
                <div className="relative

                               lg:text-[18px]

                               md:text-[14px]

                               text-[10px]

                               text-right

                               hover:cursor-pointer

                            ">
                    Terms of Service
                </div>

                <div className="relative

                                   lg:text-[18px]

                                   md:text-[14px]

                                   text-[10px]

                                   hover:cursor-pointer

                             ">|</div>

                <div className="relative

                                   lg:text-[18px]

                                   md:text-[14px]

                                   text-[10px]

                                   text-left

                                   hover:cursor-pointer

                             ">
                    Privacy Policy
                </div>
            </div>


        </div>
    )
};

export default MenuColumn3;

