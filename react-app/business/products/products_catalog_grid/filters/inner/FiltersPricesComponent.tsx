import Box from "@mui/material/Box";
import React, {useContext, useState} from "react";
import PT_FiltersPrices from "./PT_FiltersPrices";
import {CatalogContext} from "../../Catalog.1.Shop";



const FiltersPricesComponent = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

 return(
    <Box sx={{display:'flex', flexDirection:'column'}} >
        <PT_FiltersPrices

            {...props}
            //=== for on_sale sub comp
            onChanges={(st:any)=>{
                console.log('=== PT_FiltersPrices onChanges',st)
                localStorage.setItem('filters_price_min',st.price_min)
                localStorage.setItem('filters_price_max',st.price_max)
                drawer_set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        filters_price_min: st.price_min,
                        filters_price_max: st.price_max,
                        current_page: 1,
                        state_refresh: Date.now(),
                    }
                })

            }}
        />
    </Box>
 )
}

export default FiltersPricesComponent
