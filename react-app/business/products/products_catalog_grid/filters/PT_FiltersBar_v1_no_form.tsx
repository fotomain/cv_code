

import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Box,
    IconButton,
} from "@mui/material";

import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import FiltersPricesComponent from "./inner/FiltersPricesComponent";
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import FiltersTagsComponent from "./inner/FiltersTagsComponent";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import {useTheme} from "@mui/material/styles";
import {color_hex_to_rgba, is_empty} from "../../../../system_code/code_global/GlobalFunctions";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {drawerWidthWide} from "../drawer/DrawerMinMax";
import FiltersInputSearch from "./inner/FiltersInputSearch";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FiltersSortComponent from "./inner/FiltersSortComponent";
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import FiltersCategoryComponent from "./inner/FiltersCategoryComponent";
import {largest_width} from "../../../../AppInitTheme";

import {CatalogContext} from "../Catalog.1.Shop";

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

]
const PT_FiltersBar_v1_no_form = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    const ref_input_search = useRef<HTMLInputElement>(null)
    const isWide = drawer_state.co1Wide

    const [state, set_state] = useState({
        items_state: [],
    })

    const theme = useTheme();

    const expandItem = (p:any) => {
        console.log('=== expandItem ')
        const {ii} = p

        let tItemState:any = p.state.items_state[ii]
        console.log('=== tItemState',tItemState)
        let arr:any[] = [...p.state.items_state]
        if(undefined===tItemState)
        {
            tItemState={item_is_expanded:true}
        } else {
            tItemState.item_is_expanded = !tItemState.item_is_expanded
        }
        if(p.value)
            tItemState.item_is_expanded = p.value
        arr[ii]=tItemState
        p.set_state((prev_state:any)=>{return  {...prev_state,
            items_state: arr,
        }})
    }

    // sss
    return(
            <Box  id={'div_toolbar_left_content'}
                  sx={{width:'100%'}}
            >
                {list_items.map((el,ii)=>{

                    const ItemIcon=el.item_icon
                    const ItemComponent=el.item_component
                    const show_icon = (!isWide)||(el.show_icon_if_wide)
                    const show_title = (isWide)
                    let  item_color = color_hex_to_rgba({hex:theme.palette.primary.light, opacity:'0.3'})
                    console.log('=== item_color',item_color)

                    let item_is_expanded=false
                    if(state?.items_state.length>0) {
                        if(undefined!==state?.items_state[ii]) {
                            item_is_expanded = state?.items_state[ii]['item_is_expanded']
                        }
                    }

                    // return null
                    return <React.Fragment key={el.item_id}>
                        <Box id='div_item_line'
                             sx={{display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:(item_is_expanded)?item_color:''
                                ,...(ii===(10000))?{}: {borderTop: ('solid 1px ' + theme.palette.primary.main)}
                                ,...(ii!==(list_items.length-1))?{}:{borderBottom:('solid 1px ' + theme.palette.primary.main)},
                             }}

                        >

                            {(!show_icon)?null:
                            <IconButton
                                    sx={{marginLeft:'15px'}}
                                    title={el.item_title}
                                    onClick={() => {
                                        if(isWide)
                                            expandItem({ii,state,set_state})
                                        else {
                                            expandItem({ii,state,set_state, value:true})
                                            console.log('=== props?.ref_toggle_drawer',props?.ref_toggle_drawer)
                                            props?.ref_toggle_drawer?.current?.click()
                                        }
                                    }}
                                >
                                    <ItemIcon
                                        sx={{marginRight: '0px'}}
                                    />
                            </IconButton>}

                            {(!show_title)?null:
                                <Box id={'div_item_title'} sx={{cursor:'pointer',display:'flex', flexDirection:'row', alignItems:'center', flexGrow:1, fontFamily: 'Inter' }}
                                    onClick={()=>{
                                        expandItem({ii,state,set_state})
                                    }}
                                >{el.item_title+((catalog_filter_is_used({el, drawer_state}))?' (!)':'')}</Box>
                            }
                                {/*=== the sama as layout 'div_drawer_header' */}
                                <IconButton sx={{marginLeft: 'auto'}}
                                    onClick={()=>{
                                        expandItem({ii,state,set_state})
                                    }}
                                >
                                    {(item_is_expanded)?<ExpandLessOutlinedIcon />:<ChevronRightIcon />}
                                </IconButton>

                        </Box>{/*=== icon + text */}

                        {/*<div>item_is_expanded {JSON.stringify(item_is_expanded)}</div>*/}

                          {(!(isWide && item_is_expanded))?null
                              :<Box sx={{display:'flex',flexDirection:'column', justifyContent:'end', minHeight:'55px',
                                        ...(drawer_state.drawerOverOpen)? {marginLeft: '4px'}:{},
                                        ...(drawer_state.drawerOverOpen)? {marginRight: '4px'}:{},
                                        marginBottom: '4px',
                                        }}
                               >
                                  <ItemComponent {...props} ref_input_search={ref_input_search}/>
                                  {/*<div>ItemComponent</div>*/}
                                </Box>
                          }

                        {/*{(!(isWide))?null*/}
                        {/*    :<Box sx={{display:'flex',flexDirection:'column', justifyContent:'end', minHeight:'55px',*/}
                        {/*        ...(drawer_state.drawerOverOpen)? {marginLeft: '4px'}:{},*/}
                        {/*        ...(drawer_state.drawerOverOpen)? {marginRight: '4px'}:{},*/}
                        {/*        marginBottom: '4px',*/}
                        {/*    }}*/}
                        {/*    >*/}
                        {/*        <ItemComponent {...props} ref_input_search={ref_input_search}/>*/}
                        {/*        /!*<div>ItemComponent</div>*!/*/}
                        {/*    </Box>*/}
                        {/*}*/}


                    </React.Fragment>

                })} {/*list_items*/}

            </Box>
    )

}

export default PT_FiltersBar_v1_no_form

