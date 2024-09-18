
import React, {useContext, useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import {check_number_input} from "../../../products_crud_table/inner/table_check_number_input";
import {tw_row_between} from "../../../../../system_code/tw/tw_tools";
import PT_FiltersOnSale from "./PT_FiltersOnSale";
import {CatalogContext} from "../../Catalog.1.Shop";

const PT_FiltersPrices = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    // useEffect(() => {
    //     return () => {
    //
    //     };
    // }, [props.price_min,props.price_max]);
    //
    useEffect(() => {

        props?.onChanges(drawer_state)

        return () => {

        };
    }, [drawer_state.price_min, drawer_state.price_max]);

    // sss
    return(<>

        <div className={tw_row_between}
             style={{marginTop:'4px',marginBottom:'4px',}}
        >
        <TextField
            variant="standard"

            type="number"
            value={drawer_state.price_min}

            onKeyDown={(e) => {
                check_number_input(e)
            }}

            onChange={e => {

                drawer_set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        price_min:e.target.value,
                    }
                })


            }}//onChange
            placeholder={`price min`}
            label={`Price from`}
            className="w-24 border shadow rounded"
        />
        {/*=================    */}
        {/*=================  MAX  */}
        {/*=================    */}
        <TextField
            variant="standard"

            type="number"
            value={drawer_state.price_max}

            onKeyDown={(e) => {
                check_number_input(e)
            }}

            onChange={e => {

                drawer_set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        price_max:e.target.value,
                    }
                })


            }}//onChange
            label={`to`}
            placeholder={`price max`}
            className="w-24 border shadow rounded"
        />


        </div>
        <PT_FiltersOnSale {...props} />
    </>)

}

export default PT_FiltersPrices
