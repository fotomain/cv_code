
import React, {useContext, useEffect, useState} from "react";


import {CatalogContext} from "../../Catalog.1.Shop";
import InputSearchStandard from "../../../../../system_code/input_material5/InputSearchStandard";
import {useTheme} from "@mui/styles";

const FiltersInputSearch = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    const theme=useTheme()

    return(
        <div style={{width:'100%', display:'inline-block', height:'50px'}}>
        <InputSearchStandard
            id={props.id}
            theme={theme}
            autoFocus={props.autoFocus}
            style={props?.style}
            ref_input_search={props?.ref_input_search}
            input_changed={drawer_state.filters_search}
            input_value={drawer_state.filters_search}
            onChange={(e:any)=>{
                // setItems([])
                drawer_set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        filters_search: e.target.value,
                        current_page: 1,
                        state_refresh: Date.now(),
                    }
                })
            }}

            onSearch={(e:any)=>{
                // setItems([])
                drawer_set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        filters_search: prev_state.input_search_value,
                        current_page: 1,
                        state_refresh: Date.now(),
                    }
                })

            }}
            onClear={(e:any)=>{
                // setItems([])
                drawer_set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        filters_search: '',
                        current_page: 1,
                        state_refresh: Date.now(),
                    }
                })

            }}
            // on_input_blur

        />
        </div>
    )

}

export default FiltersInputSearch
