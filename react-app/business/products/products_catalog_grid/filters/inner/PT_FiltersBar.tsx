

import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    IconButton,
} from "@mui/material";

import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import FiltersPricesComponent from "./FiltersPricesComponent";
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import FiltersTagsComponent from "./FiltersTagsComponent";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import {useTheme} from "@mui/material/styles";
import {color_hex_to_rgba, is_empty} from "../../../../../system_code/code_global/GlobalFunctions";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {drawerWidthWide} from "../../drawer/DrawerMinMax";
import FiltersInputSearch from "./FiltersInputSearch";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FiltersSortComponent from "./FiltersSortComponent";
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import FiltersCategoryComponent from "./FiltersCategoryComponent";

const catalog_filter_is_used = (p:any) => {

    switch (true) {
        case (p.el.item_id==='filters_search_item') && (!is_empty(p.drawer_state.filters_search)): {
            console.log('=== p00 ', p)
            console.log('=== p00 ', p.el.item_id)
            return true
            break;
        }
        case (p.el.item_id==='filters_price_item') && (!is_empty(p.drawer_state.filters_price_min)): {
            return true
            break;
        }
        // TODO ALL
    }

    return false
}


const list_items=[

    {item_id:'filters_search_item',
        is_expanded:true,   item_title:'Search', show_icon_if_wide:true,  item_icon:SearchOutlinedIcon, item_component:FiltersInputSearch},
    {item_id:'filters_price_item',
        is_expanded:false,  item_title:'Price', show_icon_if_wide:true,  item_icon:SellOutlinedIcon,    item_component:FiltersPricesComponent},
    {item_id:'filters_tag_item',
        is_expanded:false,  item_title:'Tags',   show_icon_if_wide:true,  item_icon:LabelOutlinedIcon,  item_component:FiltersTagsComponent},
    {item_id:'filters_order_by_item',
        is_expanded:false,  item_title:'Order by',   show_icon_if_wide:true,  item_icon:SwapVertOutlinedIcon,  item_component:FiltersSortComponent},
    {item_id:'filters_categories_item',
        is_expanded:false,  item_title:'Categories',   show_icon_if_wide:true,  item_icon:CategoryOutlinedIcon,  item_component:FiltersCategoryComponent},
    // 'filters_order_by_item':{},
]
const PT_FiltersBar = (props:any) => {

    return (<div>

        PT_FiltersBar

    </div>)

}
export default PT_FiltersBar

