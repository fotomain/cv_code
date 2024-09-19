
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, {useEffect, useState} from "react";
import {GlobalsContext} from "../../../system_state/context_globals/globals_context";
import TitleMain from "../../../ui/pages/home_page/inner/TitleMain";
import AppearIt from "../../../ui/pages/home_page/inner/AppearIt";
import {PRODUCTS_READ_RUN_ACTION} from "../../../system_state/products_state/actions";
import {useDispatch, useSelector} from "react-redux";
import {SEL_PRODUCTS_READ} from "../../../system_state/products_state/selectors";
import {PRODUCTS_READ_DO} from "../../../system_state/products_state/api";
import {is_empty, JSON_stringify, round2} from "../../../system_code/code_global/GlobalFunctions";
import ProductCardForCart from "./ProductCardForCart";
import {
    css_column_center,
    css_column_left, css_column_top_center,
    css_row_center
} from "../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";
import {SEL_CART_DATA} from "../../../system_state/products_state/selectors/cart_selector";
import TotalForOrder from "../../../ui/pages/home_page/Section4_ChooseProgram/TotalForOrder";
import SpinnerMain from "../products_catalog_grid/SpinnerMain";
import {useTheme} from "@mui/styles";
import SpinnerFast from "../products_catalog_grid/SpinnerFast";


const CartPage = () => {

    const keyvalBasic:{[index:string]:any} = {}

    const { global_props,global_dispatch } = React.useContext(GlobalsContext);
    const [state, set_state] = useState({
        catalog_products: keyvalBasic,
        is_ready: false,
        state_refresh:Date.now(),

        total_meals_count:0,
        total_before_discount:0,
        total_invoice:0,
        invoice_products:[{to_invoice:0}],

    });

    const products_data:any[] = useSelector(SEL_PRODUCTS_READ)

    const do_read1product = async (p:any) => {

        const ret2 = await PRODUCTS_READ_DO({
            read_json_data:{
                entity_guid:p.entity_guid
            }
        }).then(prod1=>{
            console.log('=== prod1 ',prod1)
            return  prod1
        })

        return ret2

    }

    useEffect(() => {


        const do_read = async ()=>{
            const work_array = cart_data.products
            console.log('=== cart products_data work_array ', work_array)
            await Promise.all(work_array.map(async (el: any, ii: number) => {
                    return do_read1product({entity_guid: el.entity_guid})
                        .then((res:any)=>{
                            // let retData:any = {...res}
                            // let retProd = {...retData?.products[0]}
                            // retProd.cart_quantity=el.cart_quantity
                            // retData.products[0]=retProd
                            return Promise.resolve(res);
                        })

                }
            )).then((res: any) => {
                console.log('===  cart products_data Promise.all  prod1 ', res)

                // props.dispatch(PROGRESS_DIALOG_OPEN_ACTION({new_value:false}))
                let res_products:any={}
                for (let i = 0; i < res.length; i++) {
                    let el=res[i].products[0]
                    res_products[el.entity_guid] = {...el}
                }
                console.log('===  cart products_data res_products  prod1 ', res_products)
                set_state((prev_state: any) => {return {...prev_state,
                    catalog_products: res_products,
                }})

            })
        }

        do_read()

        return () => {

        };
    }, []);

    const cart_data = useSelector(SEL_CART_DATA)

    useEffect(() => {
        console.log('=== cart products_data',products_data)
        console.log('=== cart state.catalog_products',state.catalog_products)

        let total_meals_count =0
        let total_before_discount =0
        let total_invoice =0

        let invoice_products = cart_data.products.slice(0)

        if(keyvalBasic!==state.catalog_products) {
            for (let i = 0; i < cart_data.products.length; i++) {

                let cartLine= {...cart_data.products[i],to_invoice:0}
                let productData = state.catalog_products[cartLine.entity_guid]
                console.log('=== cart cartLine',cartLine)
                console.log('=== cart productData',productData)

                total_meals_count += cartLine.cart_quantity
                    let before_discount = cartLine.cart_quantity *
                        parseFloat(productData.regular_price)
                    let to_invoice      = cartLine.cart_quantity *
                        parseFloat((is_empty(productData.sale_price))?productData.regular_price:productData.sale_price)

                            to_invoice=round2(to_invoice)

                            cartLine.to_invoice=to_invoice
                            invoice_products[i]= {...cartLine,lineProductData:productData}

                        console.log('=== cart before_discount',before_discount)
                        before_discount = round2(before_discount)

                            total_before_discount+=before_discount
                            total_invoice+=to_invoice

                console.log('=== new_products ',invoice_products)

                set_state((prev_state: any) => {return {...prev_state,
                    total_meals_count: total_meals_count,
                    total_before_discount: total_before_discount,
                    total_invoice:total_invoice,
                    invoice_products:invoice_products,
                    is_ready: true,
                }})
            }
        }
            return () => {

            };
        }, [cart_data, state.catalog_products]);

    // useEffect(() => {
    //
    //     console.log('=== cart cart_data',cart_data)
    //     set_state((prev_state: any) => {return {...prev_state,
    //         state_refresh: Date.now(),
    //     }})
    //
    //     return () => {
    //
    //     };
    // }, [cart_data]);

    const landscape_mode= (window.innerWidth>412)

    const is_native = global_props.current_device.device_info?.is_native

// sss1
  return(
     // background-color:aliceblue
    <div id='div_cart_main' css={css` width: max-content; ${css_column_left} ` }>

        {((cart_data.products.length!==0) && (!state.is_ready))?
        // {(true)?
            <div css={css` padding-top:75%; height: 40vh; width: 100%; ${css_column_top_center}; `}>
                <SpinnerFast/>
            </div>
            :
            (cart_data.products.length===0)?
                <div css={css` padding-top:55%; height: 40vh; width: 100%; ${css_column_top_center}; `}>
                    <TitleMain title={'Cart is empty.'}  nospaces/>
                </div>
                :
                <div css={css` height: 5vh; width: 100%; ${css_column_center} `}>
                    <TitleMain title={'Cart'}  nospaces/>
                </div>
        }

        <div id='div_cart_row1' css={css` width: max-content; ${(landscape_mode)?css_row_center:css_column_left}; align-items:flex-start; ` }>

            <div id='div_cart_table' css={css` width: max-content; ${css_column_left} ` }>
                {(!state.is_ready)?null:
                    <>
                        {cart_data.products.map((el:any,ii:number)=>{
                            return <div id='cart_line'  css={css` width: max-content; ${css_column_center} ` } key = {ii} >
                                {/*<div>{el.entity_guid}</div>*/}
                                {/*<div>{state.cart_products[el.entity_guid].name}</div>*/}
                                {/*<div>{el.cart_quantity}</div>*/}
                                <ProductCardForCart
                                    index={ii}
                                    data={{...state.catalog_products[el.entity_guid], to_invoice: state.invoice_products[ii].to_invoice ,...el}}
                                    onRemove={()=>{
                                        set_state((prev_state: any) => {return {...prev_state,
                                            state_refresh: Date.now(),
                                        }})
                                    }}
                                />
                            </div>



                        })}
                    </>
                }
            </div>

            {(!state.is_ready)?null:
            <div id='div_cart_total' css={css` width: 100%; ${css_column_top_center} ` }>
                <TotalForOrder
                    state={state}
                    specification={'Total '+state.total_meals_count+' meals for order'}
                    meals_text={'  '}
                    delivery_text={'Delivery: included to 1 address'}
                    landscape_mode={false}
                />
            </div>
            }


        </div>

      </div>
  )
}

export default CartPage
