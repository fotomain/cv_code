

import React, {useContext} from "react";
import {FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material";

import PT_TagsPanel from "../../atoms/PT_TagsPanel";
import {CatalogContext} from "../../Catalog.1.Shop";


const PT_FiltersTags = (props:any) => {

    const {drawer_state} = useContext(CatalogContext)

    console.log('=== props.state.filters_tags_place ',drawer_state.filters_tags_place)


    // sss
    return(<>
        <Grid
            container direction='column'
            justifyContent={'start'} //start
            alignItems={'start'}
            sx={{paddingLeft:'20px'}}
        >

                <FormControl>

                    <PT_TagsPanel
                        {...props}
                        selectedTags={drawer_state.selectedTags}
                        onSelectChange={
                            props.onSelectChange
                        }
                    />


                    <FormLabel id="demo-controlled-radio-buttons-group">Place tags</FormLabel>
                    <RadioGroup
                        // style={{ width: 'auto' }}
                        // row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={drawer_state.filters_tags_place}
                        onChange={(event)=>
                        {
                            localStorage.setItem('filters_tags_place',event.target.value)
                            props.drawer_set_state((prev_state: any) => {return {...prev_state,
                                filters_tags_place: event.target.value,
                            }})
                        }}
                    >
                        {/*date, id, include, title, slug, price, popularity*/}
                        <Grid
                            container direction='row'
                            justifyContent={'start'}
                            alignItems={'start'}
                            // sx={{paddingLeft:'20px'}}
                        >
                            <FormControlLabel  value="over_grid" control={<Radio />} label="over the grid also" title={'Tags are visible over the grid and here'}/>
                            <FormControlLabel  value="filters_panel" control={<Radio />} label="here" />
                        </Grid>
                    </RadioGroup>
                </FormControl>

        </Grid>


    </>)

}

export default PT_FiltersTags
