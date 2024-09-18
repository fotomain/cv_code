
import IconButton from "@mui/material/IconButton";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import * as React from "react";
import {useContext} from "react";
import {CatalogContext} from "../../Catalog.1.Shop";

const SetDefaultsButton = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)
    return(
        <IconButton id={'set_default_value'}
                    sx={props?.sx}
                    title={'Default settings'}
                    onClick={()=>{
                        drawer_set_state((prev_state: any) => {
                            return {
                                ...prev_state,
                                filters_search: '',
                                filters_category: '',
                                filters_price_min: '',
                                filters_price_max: '',
                                filters_sort_1value: 'title',
                                filters_on_sale_mode: 'on_sale_all',
                                filters_sort_1value_order_checked: true,
                                current_page: 1,
                                state_refresh: Date.now(),
                            }
                        })

                        localStorage.setItem('filters_search','')
                        localStorage.setItem('filters_category','')
                        localStorage.setItem('filters_price_min','')
                        localStorage.setItem('filters_price_max','')
                        localStorage.setItem('filters_sort_1value','title')
                        localStorage.setItem('filters_on_sale_mode','on_sale_all')
                        localStorage.setItem('filters_sort_1value_order_checked','true')

                    }}
        >
            <AssuredWorkloadOutlinedIcon />
        </IconButton>
    )
}

export default SetDefaultsButton
