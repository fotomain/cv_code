
import React, {useContext} from "react";

import PT_CategoriesTreeBasic from "./PT_CategoriesTreeBasic";
import {CatalogContext} from "../../Catalog.1.Shop";

const FiltersCategoryComponent = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    return(
        <PT_CategoriesTreeBasic
            initialy_expanded={true}
            selectedItems={drawer_state.filters_category_selected_items}
            onSelectChange={(st:any)=>{
                console.log('=== filters_category1 onSelectChange ',st)

                let filters_category1 = st.selectedItems.join(',')
                localStorage.setItem('filters_category_selected_items',JSON.stringify(st.selectedItems))

                console.log('=== filters_category1 ',filters_category1)

                drawer_set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        filters_category: filters_category1,
                        filters_category_selected_items: st.selectedItems,
                        current_page: 1,
                        state_refresh: Date.now(),
                    }
                })

            }}
        />

    )

}

export default FiltersCategoryComponent
