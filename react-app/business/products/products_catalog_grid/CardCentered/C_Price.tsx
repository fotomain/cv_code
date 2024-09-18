

import * as React from "react";
import './fonts_for_cards/fonts_for_cards.css'
import {useTheme} from "@mui/styles";
export     const math_price_decimal_text=(v:number)=>{

    let dec_mumber = Math.round((v % 1) * 100)
    if(0===dec_mumber)
        return ',-'

    if(dec_mumber<100) dec_mumber = dec_mumber+0
    return ','+dec_mumber
}

const fontSize_price_valute='20px'
const fontSize_price_main='24px'
const fontSize_price_decimal='16px'

const fontSize_regular_price_striked='14px'


const C_Price = (props:any) => {

    const debug_local=false

    let striked_top=28
    let striked_left=3
    if(props.striked_top)
        striked_top=props.striked_top
    if(props.striked_left)
        striked_left=props.striked_left

    const _price = (''!==props.data.sale_price)?props.data.sale_price:props.data.regular_price
    const _price_striked = (''!==props.data.sale_price)?props.data.regular_price:''

    if (debug_local) console.log('=== _price_striked',_price_striked, props.data)

    const currency_main_symbol = '£'

    const theme = useTheme()
    const isDarkTheme = theme.palette.mode === 'dark';
    let     card_price_color=(isDarkTheme )?theme.palette.primary.main:'black'
            card_price_color=(isDarkTheme && _price_striked)?'teal':card_price_color

    return(
        <div
            style={{position:'relative',height:'auto',
                backgroundColor:(props.data.sale_price)?'yellow':''
            }}
        >
                <div id="div_price" className={'flex flex-row justify-center items-start'}>
                    <span style={{color:card_price_color,fontSize:fontSize_price_valute, fontFamily:'poppins-regular'}}>
                        {currency_main_symbol}
                    </span>
                    <span style={{color:card_price_color,fontSize:fontSize_price_main, fontFamily:'poppins-regular'}}>
                        {Math.round(_price)}
                    </span>
                    <span style={{color:card_price_color,fontSize:fontSize_price_decimal, fontFamily:'poppins-regular', marginLeft:'3px', marginTop:'3px'}}>
                        {math_price_decimal_text(_price)}
                    </span>
                </div>

                <div id={'div_price_striked'}
                    style={{
                    position:'absolute',
                    top:striked_top,
                    left:striked_left,
                    color:'red',
                    zIndex:9999,
                    // marginBottom:'16px',
                    textDecorationLine: 'line-through', textDecorationStyle: 'solid',
                    fontSize:fontSize_regular_price_striked, fontFamily:'poppins-regular',
                }}
                >
                    {_price_striked}
                </div>

        </div>)

}
export default C_Price
