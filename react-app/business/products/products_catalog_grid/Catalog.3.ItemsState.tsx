
import React, {useContext, useEffect, useState} from "react";
import {PRODUCTS_READ_RUN_ACTION} from "../../../system_state/products_state/actions";
import {useDispatch, useSelector} from "react-redux";
import CatalogItemsVisual from "./Catalog.4.ItemsVisual";
import {SEL_PRODUCTS_READ} from "../../../system_state/products_state/selectors";
import {CatalogContext} from "./Catalog.1.Shop";

const itemArraysEqual = (a:any, b:any) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    // ???sort
    for (var i = 0; i < a.length; ++i) {
        if (a[i].entity_guid !== b[i].entity_guid) return false;
    }
    return true;
}

const CatalogItemsState = (props:any) => {

    const arr1 = localStorage.getItem('filters_category_selected_items')
    const arr2 = localStorage.getItem('filters_tag_selected_items')
    localStorage.setItem('filters_on_sale_mode','on_sale_all')
    const filters_on_sale_mode = localStorage.getItem('filters_on_sale_mode')

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    // =============
    // ============= SELECT / REFRESH DATA
    // =============

    const dispatch = useDispatch();

    const products_data:any[] = useSelector(SEL_PRODUCTS_READ)

    useEffect(() => {

        // if(props.drawer_state.drawerOverOpen && (1===state.current_page)){
        //     alert('=== no refresh')
        //     return
        // }
        console.log('=== p1 inint  PRODUCTS_READ_RUN_ACTION')
        console.log('=== p1 state.filters_category',drawer_state.filters_category)
        console.log('=== p1 state.filters_search',drawer_state.filters_search)

        drawer_set_state((prev_state: any) => {return {...prev_state,
            load_page_started: true,
            load_page_finished: false,
            load_data_started: true,
            load_data_finished: false,
        }})

        // if((items.length===0) || (1===state.current_page)) {
        console.log('=== p1 ▄▄▄▄▄▄▄▄▄▄▄▄▄ do PRODUCTS_READ_RUN_ACTION',drawer_state.filters_category)

        const state=drawer_state
        dispatch(PRODUCTS_READ_RUN_ACTION({
            read_json_data: {
                //1st page,
                // read_all:true,
                ...{min_price:state.filters_price_min},
                ...{max_price:(''!==state.filters_price_max)?state.filters_price_max:'999999'},
                ...(state.filters_search)?{search:state.filters_search}:{},
                ...(''!==state.filters_category)?{category:state.filters_category}:{},
                ...(''!==state.filters_tag_string)?{tag:state.filters_tag_string}:{},
                ...('on_sale_all'!==state.filters_on_sale_mode)?{on_sale:('on_sale_yes'===state.filters_on_sale_mode)}:{},
                orderby:state.filters_sort_1value,
                order:(state.filters_sort_1value_order_checked)?'asc':'desc',
                // 'category':'81',
                per_page: 30, //per_page000
                page: state.current_page,
            }
        }));

        // }
        return () => {};
    // }, []);
    }, [drawer_state.state_refresh,drawer_state.current_page]);

    // =============
    // ============= DATA TO STATE
    // =============

    useEffect(() => {
        console.log('=== p1 ▄▄▄▄▄▄▄▄▄▄▄▄▄ products_data ', products_data)

        const is_equal = itemArraysEqual(products_data,drawer_state.items)
        console.log('=== p1 ▄▄▄▄▄▄▄▄▄▄▄▄▄ products_data is_equal', is_equal)

        if( is_equal || (products_data.length===0)){
            console.log('=== p1 ▄▄▄▄▄▄▄▄▄▄▄▄▄ products_data empty ', products_data)
            drawer_set_state((prev_state: any) => {return {...prev_state,
                load_data_started: false,
                load_data_finished: true,
            }})
        }

        if (products_data.length > 0) {
            if(!is_equal)
                if (1 == drawer_state.current_page) {
                    drawer_set_state((prev_state: any) => {return {...prev_state,
                        items: products_data,
                        load_data_started: false,
                        load_data_finished: true,
                    }})
                } else
                    drawer_set_state((prev_state: any) => {return {...prev_state,
                        items: [...prev_state.items, ...products_data],
                        load_data_started: false,
                        load_data_finished: true,
                    }})
        } else {
            console.log('=== products_data.length ===0')
            drawer_set_state((prev_state: any) => {return {...prev_state,
                items: [],
                load_data_started: false,
                load_data_finished: true,
            }})
        }


        return () => {};
    }, [products_data]);

    useEffect(() => {

        console.log('=== p1 ▄▄▄▄▄▄▄▄▄▄▄▄▄ drawer_state.items',drawer_state.items)

        return () => {

        };
    }, [drawer_state.items]);

    // sss
    return(<>
        <CatalogItemsVisual {...props} />
    </>)

}
export default CatalogItemsState
