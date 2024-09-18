

// cd C:\W\dtc_dispatcher

/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

import React, {useState} from "react";


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import {
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel, Radio,
    RadioGroup,
    Switch, TextareaAutosize,
    TextField
} from "@mui/material";
import WallpaperIcon from '@mui/icons-material/Wallpaper';

import Papa from 'papaparse'
import {Button} from "@mui/material";
import fi_job_queue_crud_create from "../../../system_code/firebase_stack/fi_job_queue/fi_job_queue_crud_create";
import {tw_col_center} from "../../../system_code/tw/tw_tools";
import {Props1Tab, TabPanel} from "./MUITools";
import WooProductsCRUDVideos from "./crud_pages/WooProductsCRUDVideos";
import OfferToEntrance from "../../../ui/pages/user_dasboard_page/OfferToEntrance";
import {GlobalsContext} from "../../../system_code/context_globals/globals_context";
import ProductsCRUDStateProvider from "../../../system_state/products_state/ProductsCRUDStateProvider";
import ProductsTableCRUD from "../products_crud_table/ProductsTableCRUD";
import {JSON_stringify} from "../../../system_code/code_global/GlobalFunctions";
import {css_column_center} from "../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";


const WooProductsAdminPage = () => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const [tab_value, set_tab_value] = React.useState(0);
    const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        set_tab_value(newValue);
    };

    return(
        //
        <div css={css` ${css_column_center} `} id={'div_WooProductsAdmin'} >


            {/*{(!global_props.current_user.step_logged_in)*/}
            {/*    ?<OfferToEntrance id={'woo_products_admin_panel'}/>*/}
            {/*    :*/}
            <div className={tw_col_center} >

                {/*// glwidth*/}
                <Tabs id={'div_tabs_WooProductsAdminPanel'}
                    sx={{
                        gap:'2px',
                        maxWidth:{xs: '355px', sm: '655px', md: '760px', lg: '100%', xl: '100%',}
                    }}

                    value={tab_value} onChange={onChangeTab} aria-label="icon label tabs example">
                    <Tab icon={<FavoriteBorderOutlinedIcon />}  label="Products"  {...Props1Tab(0)} />
                    <Tab icon={<OndemandVideoOutlinedIcon />} label="Videos"  {...Props1Tab(1)} />
                    <Tab icon={<WallpaperIcon />} label="Images"  {...Props1Tab(2)}  />
                    <Tab icon={<LocalOfferOutlinedIcon />} label="Prices"  {...Props1Tab(3)}  />
                </Tabs>

                <TabPanel value={tab_value} index={0} >

                    {/*justifySelf={'start'}*/}
                    {/*<Box   id={'div_DemoProductsIndex'} sx={{marginLeft:'24px' , marginTop:'24px' }} >*/}
                        {/*CRUD Products*/}
                        <ProductsCRUDStateProvider>
                            <ProductsTableCRUD
                                // global_props={global_props} global_dispatch={global_dispatch}
                                // saveCart={(p:any)=>{
                                //
                                //     console.log('=== cart_data ',p.cart_data)
                                //
                                //     localStorage.setItem('app888_cart',JSON_stringify(p.cart_data))
                                //
                                //     let tdata = global_props
                                //     tdata.cart.products = p.cart_data
                                //     global_dispatch({
                                //         type: 'SETTER_GLOBALPROPS',
                                //         global_new_data: {global_props: tdata},
                                //     })
                                //
                                //
                                // }}
                            />
                        </ProductsCRUDStateProvider>
                    {/*</Box>*/}

                </TabPanel>

                <TabPanel value={tab_value} index={1} >

                    <WooProductsCRUDVideos/>

                </TabPanel>

                <TabPanel value={tab_value} index={2}  >
                    CRUD Images
                </TabPanel>

                <TabPanel value={tab_value} index={3}  >
                    CRUD Prices
                </TabPanel>

            </div>


            {/*TODO <div><CSVLink data={state.products_main_to_csv}>Download me</CSVLink></div>*/}

        </div>

    )
};

export default WooProductsAdminPage
