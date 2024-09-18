

import {useEffect, useState} from "react";
import {Box, CircularProgress} from "@mui/material";

import * as React from "react";
import C_Name from "./C_Name";

import C_LikeStarsShare from "./C_LikeStarsShare";
import C_Price from "./C_Price";
import C_AddToCartButton from "./C_AddToCartButton";

import {useTheme} from "@mui/styles";
import {tw_col_center} from "../../../../system_code/tw/tw_tools";
import {get_media_number} from "../../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel3";
import SpinnerMain from "../SpinnerMain";



const ProductCardCentered = (props:any) => {

    const i1 = require('./phones1.png')

    const debug_local=false

    // console.log('=== ProductCardCentered props',props)

        const card_space_lr='0px'
        //hardcode
        const is_detox=(props.data.name.indexOf('Detox')!==-1)
        // console.log('=== is_detox ',is_detox,props.data.name)
        let style_id={
            fontFamily:"Inter",
            fontSize:'10px',
        }

        let style_img={
            // www
            // transform: (is_detox)?'rotate(-90deg)':'',
            marginLeft: card_space_lr,
            height:'90px',
            width:'auto',
        }


        // {width:'125px', height:'90px'}
        if(!is_detox){
            style_img={...style_img,...{
                    width: '125px',
                    height:'90px',
                    // paddingTop:'12px',
                }}
        }

    const is_native = props.drawer_state?.device_info?.is_native
    if (debug_local) console.log('=== is_native 1',is_native,props.drawer_state?.device_info)

    // useEffect(() => {
    //     const is_native = props.drawer_state?.device_info?.is_native
    //     console.log('=== is_native 2',is_native)
    //     return () => {
    //
    //     };
    // }, [props.drawer_state?.device_info]);
    //


    const imageUrl = props.data.main_image_url;
    if (debug_local) console.log('=== imageUrl 1',props.data.entity_guid, imageUrl)
    // const imageUrl = "https://i.imgur.com/fHyEMsl.jpg";

    const [img, setImg] = useState({
        url:'',hash:0,
    });

    const fetchImage = async () => {
        if (debug_local) console.log('=== imageUrl 2',props.data.entity_guid, imageUrl)
        const res = await fetch(imageUrl+'?'+Date.now());
        const imageBlob = await res.blob();
        const imageObjectURL:any = URL.createObjectURL(imageBlob);
        setImg({
            url: imageObjectURL,
            hash:Date.now(),
        });
    };

    useEffect(() => {
        fetchImage();
        return () => {};
    }, [props.data.entity_guid]); //!!! refresh needed

    const theme = useTheme()

    const widthCard  =['150px','150px','200px','200px','200px'][get_media_number()]
    // sss1
    return(
        <div id='div_ProductCardCentered'
            // hhh hhhMain Card Height
            className={tw_col_center+ ' h-[100px] gap-[2px]'}
            //www
             style={{padding:'20px', width:widthCard, height: 'max-content', backgroundColor:'peach'}}

        >
            {(''===img.url)?
                <Box sx={{
                    // position:'fixed',
                    // top:'45%',
                    // left:'50%',
                    // left:spinner_left+'px',
                    zIndex:999,
                    // transform: 'translate(-50%, -50%)',
                    backgroundColor:theme.palette.primary.light,
                    opacity:0.9,
                    color:'white',
                    // padding:'12px',
                    borderRadius:'50%',
                    height:'100%',
                }}
                >
                    {/*=== spinner */}
                    <SpinnerMain size={(is_native)?20:30} sx={{color:'white'}} />
                </Box>
                :
                <img id={'card_image1_catalog'}

                    style={style_img} //works
                    src={`${img.url}`}
                    // src={img.url}
                     alt={'card image'}
                    // srcSet={'./phone1.png'}
                />
            }
            {/*Card Flex*/}
            {/*{props.data.entity_guid}*/}

            <C_LikeStarsShare {...props} />
            <C_Name {...props} />

            <div style={style_id}>id: {props.data.entity_guid} </div>

            <C_Price {...props} striked_top={20} striked_left={60} />
            <br/>
            <C_AddToCartButton {...props} />

        </div>

    )

}

export default ProductCardCentered
