
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {useEffect, useState} from "react";
import {Box, Button, CircularProgress, IconButton} from "@mui/material";
import * as React from "react";

import {useTheme} from "@mui/styles";
import {
    css_column_center,
    css_column_right, css_column_spacebetween,
    css_row_center,
    css_row_left
} from "../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";


import {TJSONValue} from "../../../system_state/products_state/models/global_types";
import {CART_ADD_1UNIT_ACTION} from "../../../system_state/products_state/actions";
import {useDispatch} from "react-redux";
import {get_media_number} from "../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel3";
import C_Price from "../products_catalog_grid/CardCentered/C_Price";
import C_LikeStarsShare from "../products_catalog_grid/CardCentered/C_LikeStarsShare";
import C_AddToCartButton from "../products_catalog_grid/CardCentered/C_AddToCartButton";
import SpinnerMain from "../products_catalog_grid/SpinnerMain";

const fontSizeCartName  =['3.5vw','3.5vw','2.vw','0.9vw','0.9vw'][get_media_number()]
const fontSizeSumLine   =['3.8vw','3.8vw','2.4vw','1.0vw','1.0vw'][get_media_number()]
const fontSizeSumLine1   =[3.8,3.8,2.4,1.0,1][get_media_number()]
const ProductCardForCart = (props:any) => {

    console.log('=== ProductCardForCart props.data ',props.data)

    const dispatch = useDispatch();


    const debug_local=false

        const card_space_lr='0px'
        //hardcode
        const is_detox=(props.data.name.indexOf('Detox')!==-1)

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


    const imageUrl = props.data.main_image_url;
    if (debug_local) console.log('=== imageUrl 1',props.data.entity_guid, imageUrl)

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

    const currency_main_symbol = '£'

    const card_min_height='150px'
    // sss1
    return(
        <div id='div_ProductCardForCart'
             css={css` ${css_row_center} `}
        >
            <div id='div_cart_c1' css={css` min-height: ${card_min_height}; ${css_column_spacebetween} ` }>

                    {(''===img.url)?
                        <Box sx={{
                            zIndex:999,
                            backgroundColor:theme.palette.primary.light,
                            opacity:0.9,
                            color:'transparent',
                            borderRadius:'50%',
                            height:'100%',
                        }}
                        >
                            {/*=== spinner */}
                            <SpinnerMain size={(is_native)?20:30} sx={{color:'white'}} />
                        </Box>
                        :
                        <img id={'card_image1_cart'}
                            style={style_img} //works
                            src={`${img.url}`}
                            alt={'card image'}
                        />
                    }

                <C_Price {...props} striked_top={20} striked_left={60} />

                <C_LikeStarsShare {...props} />

            </div>

            <div id='div_cart_c2' css={css` min-height: ${card_min_height}; ${css_column_spacebetween}; justify-content: space-between ` }>
                <div id='div_cart_name' css={css` max-width:130px ; min-height:60px; text-align:center; 
                  font-size: ${fontSizeCartName}; font-family:Inter; ${css_column_center} ` }>
                    {props.data.name}
                </div>
                <div>
                    <div id='div_cart_id' css={css` width:150px ; ${css_row_center} ` }>id: {props.data.entity_guid}</div>
                    <div id='div_cart_add_to_cart' css={css` font-size: 0.9vw;  font-family:Inter; width:150px ; ${css_row_left} ` }>
                        <C_AddToCartButton {...props} />
                    </div>
                </div>
            </div>

            <div id='div_cart_c3' css={css` font-size: ${fontSizeSumLine} ; font-weight:400; font-family:Inter; 
                width: ${fontSizeSumLine1*3}vw; min-height: ${card_min_height}; ${css_column_right} ` }>
                {currency_main_symbol}{props.data.to_invoice}
            </div>

            <div id='div_cart_c4' css={css` min-height: ${card_min_height}; ${css_column_right} ` }>
                <IconButton color="primary" title={'Remove'}
                            onClick={()=>{
                                let gotoAction:TJSONValue = {
                                    action_mode:'remove_value',
                                    entity_guid:props.data.entity_guid,
                                }
                                dispatch(CART_ADD_1UNIT_ACTION(gotoAction as TJSONValue))
                                props?.onRemove()
                            }}
                >
                    <HighlightOffIcon/>
                </IconButton>
            </div>

        </div>

    )

}

export default ProductCardForCart
