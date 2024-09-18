import React, {useContext, useState} from "react";
import {Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Switch} from "@mui/material";
import {CatalogContext} from "../../Catalog.1.Shop";

const PG_FiltersOrderBy = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    return(
        <Grid container direction='column'
              justifyContent={'start'}
              alignItems={'start'}
        >

            <FormControl>

                <FormControlLabel control={
                    <Switch
                        checked={drawer_state.filters_sort_1value_order_checked}
                        onChange={(event)=> {
                            localStorage.setItem('filters_sort_1value_order_checked', (event.target.checked).toString())
                            drawer_set_state((prev_state: any) => {return {...prev_state,
                                filters_sort_1value_order_checked: event.target.checked,
                                current_page: 1,
                                state_refresh: Date.now(),
                            }
                            })
                        }}
                    />
                }
                    label={(drawer_state.filters_sort_1value_order_checked)?'Ascending':'Descending'}
                />

            </FormControl>


            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Order fields</FormLabel>
                <RadioGroup
                    // style={{ width: 'auto' }}
                    // row={true}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={drawer_state.filters_sort_1value}
                    onChange={(event)=>
                    {
                        localStorage.setItem('filters_sort_1value',event.target.value)
                        drawer_set_state((prev_state: any) => {return {...prev_state,
                            filters_sort_1value: event.target.value,
                            current_page: 1,
                            state_refresh: Date.now(),
                        }})
                    }}
                >
                    {/*date, id, include, title, slug, price, popularity*/}
                    <Grid
                        container direction='column'
                        justifyContent={'start'}
                        alignItems={'start'}
                        sx={{paddingLeft:'20px'}}
                    >
                        <FormControlLabel  value="title" control={<Radio />} label="Name" />
                        <FormControlLabel  value="price" control={<Radio />} label="Price" />
                    </Grid>
                </RadioGroup>
            </FormControl>

        </Grid>

    )

}

export default PG_FiltersOrderBy
