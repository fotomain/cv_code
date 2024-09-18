
import React, {useContext, useEffect, useState} from "react";
import {Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material";
import {CatalogContext} from "../../Catalog.1.Shop";

const PT_FiltersOnSale = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)


    useEffect(() => {
        //TODO ALL AUTOSAVE LIKE THIS
        localStorage.setItem('filters_on_sale_mode',drawer_state.filters_on_sale_mode)

        return () => {

        };
    }, [drawer_state.filters_on_sale_mode]);


    return(
        <Grid container direction='row'
              justifyContent={'start'}
              alignItems={'start'}
        >
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">prices on sale</FormLabel>
                <RadioGroup
                    // style={{ width: 'auto' }}
                    // row={true}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={drawer_state.filters_on_sale_mode}
                    onChange={(event)=>
                    {
                        props.drawer_set_state((prev_state: any) => {return {...prev_state,
                            filters_on_sale_mode: event.target.value,
                            current_page: 1,
                            state_refresh: Date.now(),
                        }})
                    }}
                >
                    {/*date, id, include, title, slug, price, popularity*/}
                    <Grid
                        container direction='row'
                        justifyContent={'start'}
                        alignItems={'start'}
                        sx={{paddingLeft:'2px'}}
                    >
                        <FormControlLabel  value="on_sale_yes"  control={<Radio />} label="yes" />
                        <FormControlLabel  value="on_sale_no"   control={<Radio />} label="no" />
                        <FormControlLabel  value="on_sale_all"  control={<Radio />} label="all" />
                    </Grid>
                </RadioGroup>
            </FormControl>

        </Grid>
    )

}

export default PT_FiltersOnSale
