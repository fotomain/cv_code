
import React, {createContext, useEffect, useRef, useState} from "react";

import CatalogDrawerManager from "./Catalog.2.DrawerManager";
import {useDispatch, useSelector} from "react-redux";

import {SEL_CART_DATA} from "../../../system_state/products_state/selectors/cart_selector";
import {is_empty, JSON_stringify} from "../../../system_code/code_global/GlobalFunctions";
import {GlobalsContext} from "../../../system_code/context_globals/globals_context";
import ProductCardCentered from "./CardCentered/ProductCardCentered";
import {useLocation} from "react-router-dom";


export const notCorrectY=-100000
export const  m1_portrait=1
export const  m2_landscape=2
export const  m3_monitor=3

export const drawers_mode_change_width = 800
export const CatalogContext = createContext({

    drawer_state: {
        device_info: {is_native:false},
        display_mode: 0,
        innerWidth_greater_largest_width: 0,
        show_fab_filters:false,
        show_close_drawer_button:true,
        show_toggle_width_drawer_button:true,
        drawerMode:'',
        drawerOverOpen:false,
        drawerMinMaxVisible:false,

        scrollLimin:150,
        widthWIDE:240,
        widthNARROW:70,
        co1Wide: ('true'===localStorage.getItem('co1Wide'))?true:false,
        co1Visible: true,
        co1x1: 0,
        co1y1: notCorrectY,
        co2x1: 0,
        co2y1: 0,
        co2width: 0,

        scroll_targer: null,
        scrollTop: 0,
        fab_main_top: 0,
        fab_main_left: 0,

        // =========== DATA
        // =========== DATA
        // =========== DATA


        state_refresh: 0,
        state_scroll_top:false,
        current_page: 1,
        this_is_last_page: false,
        filters_category_selected_items: [] ,

        filters_prices_expanded: ('true' === localStorage.getItem('filters_prices_expanded')),

        filters_tag_expanded: ('true' === localStorage.getItem('filters_tag_expanded')),
        filters_tag_selected_items: [] ,
        filters_tag_string: '',
        filters_tags_place: ('filters_panel' === localStorage.getItem('filters_tags_place'))?'filters_panel':'over_grid',
        tags_data: [],
        selectedTags: [],

        filters_sort_expanded: ('true' === localStorage.getItem('filters_sort_expanded')),
        filters_on_sale_mode: '',
        filters_sort_1value: (localStorage.getItem('filters_sort_1value') || 'price' ),
        filters_sort_1value_order_checked: ('false' === localStorage.getItem('filters_sort_1value_order_checked'))?false:true,
        filters_search: '',
        filters_category: '',
        filters_price_min: (localStorage.getItem('filters_price_min') || '' ),
        filters_price_max: (localStorage.getItem('filters_price_max') || '' ),
        price_min:'',
        price_max:'',
        load_data_started: false,
        load_data_finished: false,
        load_page_started: false,
        load_page_finished: false,

        items:[],


    },
    drawer_set_state: (loggedIn: any) => { },
});


const CatalogShop = (props:any) => {

    const location=useLocation()
    const location_data = JSON.parse(JSON.stringify(location))
    console.log('=== location_data CatalogShop ',location_data)

    const arr1 = localStorage.getItem('filters_category_selected_items')
    const arr2 = localStorage.getItem('filters_tag_selected_items')

    // localStorage.setItem('filters_on_sale_mode','on_sale_all')
    const filters_on_sale_mode = localStorage.getItem('filters_on_sale_mode')

    console.log('=== filters_on_sale_mode',filters_on_sale_mode)

    const [drawer_state, drawer_set_state] = useState({

        device_info: {is_native:false},
        display_mode: 0,

        innerWidth_greater_largest_width:0,

        show_fab_filters:false,
        show_close_drawer_button:true,
        show_toggle_width_drawer_button:true,
        drawerMode:'',
        drawerOverOpen:false,
        drawerMinMaxVisible:false,

        scrollLimin:150,
        widthWIDE:240,
        widthNARROW:70,
        co1Wide: ('true'===localStorage.getItem('co1Wide'))?true:false,
        co1Visible: true,
        co1x1: 0,
        co1y1: notCorrectY,
        co2x1: 0,
        co2y1: 0,
        co2width: 0,

        scroll_targer: null,
        scrollTop: 0,
        fab_main_top: 0,
        fab_main_left: 0,

        // ============== DATA
        // ============== DATA
        // ============== DATA

        state_refresh: 0,
        state_scroll_top:false,
        current_page: 1,
        this_is_last_page: false,
        filters_category_selected_items: (null!==arr1)?(JSON.parse(arr1)):[] ,

        filters_prices_expanded: ('true' === localStorage.getItem('filters_prices_expanded')),

        filters_tag_expanded: ('true' === localStorage.getItem('filters_tag_expanded')),
        filters_tag_selected_items: (null!==arr2)?(JSON.parse(arr2)):[] ,
        filters_tag_string: '',
        filters_tags_place: ('filters_panel' === localStorage.getItem('filters_tags_place'))?'filters_panel':'over_grid',
        tags_data: [],
        selectedTags: [],

        filters_sort_expanded: ('true' === localStorage.getItem('filters_sort_expanded')),
        filters_on_sale_mode: filters_on_sale_mode || 'on_sale_all',
        filters_sort_1value: (localStorage.getItem('filters_sort_1value') || 'price' ),
        filters_sort_1value_order_checked: ('false' === localStorage.getItem('filters_sort_1value_order_checked'))?false:true,
        filters_search: '',
        // filters_search: (!is_empty(location_data?.state?.filter))?location_data?.state?.filter:'',
        filters_category: '',
        filters_price_min: (localStorage.getItem('filters_price_min') || '' ),
        filters_price_max: (localStorage.getItem('filters_price_max') || '' ),
        price_min:'',
        price_max:'',
        load_data_started: false,
        load_data_finished: false,
        load_page_started: false,
        load_page_finished: false,

        items:[],


    });


    const dispatch = useDispatch();

    const ref_co1 = useRef<HTMLDivElement>(null)
    const ref_co2 = useRef<HTMLDivElement>(null)
    const ref_input_search = useRef<HTMLDivElement>(null)
    const ref_toggle_drawer = useRef<HTMLDivElement>(null)

    const { global_props,global_dispatch } = React.useContext(GlobalsContext);

    useEffect(() => {
            // drawer_set_state((prev_state: any) => {return {...prev_state,
            //     filters_search: location_data?.state?.filter,
            // }})

                if(!is_empty(location_data?.state?.filter)) {
                    console.log('=== location_data?.state?.filter ',location_data?.state?.filter)
                    const arr: any[] = []
                    const tag_=location_data?.state?.filter

                    switch (tag_) {
                        case 'balance':{arr[78] = 78; break;}
                        case 'decrease':{arr[76] = 76; break;}
                        case 'detox':{arr[75] = 75; break;}
                        case 'hit':{arr[74] = 74; break;}
                        case 'increase':{arr[77] = 77; break;}
                    }


                    drawer_set_state((prev_state: any) => {
                        return {
                            ...prev_state,
                            selectedTags: arr,
                        }
                    })
                }
        },
        [location_data?.state?.filter]
    )

    const cart_data = useSelector(SEL_CART_DATA)
    useEffect(() => {

        let new_products=cart_data.products
        console.log('=== cart new_products 111 cart_data',new_products)
        console.log('=== cart new_products 222 global_props.cart ',global_props.cart)
        if((0===cart_data?.products?.length) && (0!==global_props.cart.products.length)){
            new_products=global_props.cart.products
        }
        console.log('=== cart new_products',new_products)

                let tdata = global_props
                tdata.cart.products = new_products
                global_dispatch({
                    type: 'SETTER_GLOBALPROPS',
                    global_new_data: {global_props: tdata},
                })

        return () => {

        };
    }, [JSON_stringify(cart_data),global_props.cart]);



    // sss1
    return(
        <CatalogContext.Provider value={{ drawer_state, drawer_set_state }}>
            {/*<div>===drawer_state actual</div>*/}
            {/*<div>co1Wide {JSON.stringify(drawer_state.co1Wide)} </div>*/}
            <CatalogDrawerManager {...{
                ref_co1,
                ref_co2,
                ref_toggle_drawer,
                ref_input_search,
                drawer_state, drawer_set_state,
                // data_state,
                // drawer_set_state,
                // CATALOG_DATA,
                // CATALOG_READ_RUN_ACTION,
                CatalogItemCard:ProductCardCentered,
            }} />
        </CatalogContext.Provider>
    )
}

export default CatalogShop
