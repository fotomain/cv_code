

import {tw_col_center} from "../../../system_code/tw/tw_tools";
import React, {Ref, useEffect, useRef, useState} from "react";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import {DividerH, Props1Tab, TabPanel} from "./MUITools";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


const CRUDTabPanelBasic = (props:any) => {


    const [state, set_state] = useState({
        upload_guid:'upload_guid111',
        products_goog_data:[],
        products_file_parsed:[],
        auto_udate_if_product_exist:true,
        errors:'',
    });

    // interface ExampleProps {
    //     buttonRef: Ref<HTMLInputElement>
    // }

    let ref_local = useRef<HTMLInputElement>(null)

    //refresh_
    useEffect(() => {
        console.log('=== ref_local',ref_local)
        console.log('=== state.products_goog_data',state.products_goog_data)
        return () => {

        };
    }, [ref_local,state.products_goog_data]);


    const [tab_value, set_tab_value] = React.useState(props.tab_value);
    const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        set_tab_value(newValue);
        props.set_tab_value(newValue);
    };


    return(

        <div className={tw_col_center} id={'div_TabPanel'} >


            <h3>{props.title}</h3>


            <Tabs value={tab_value} onChange={onChangeTab} aria-label="icon label tabs example">
                <Tab icon={<AddCircleOutlineOutlinedIcon />}  title="Create"  {...Props1Tab(0)} />
                <Tab icon={<ChromeReaderModeOutlinedIcon />} title="Read"  {...Props1Tab(1)} />
                <Tab icon={<DriveFileRenameOutlineOutlinedIcon />} title="Update"  {...Props1Tab(2)}  />
                <Tab icon={<DeleteForeverOutlinedIcon />} title="Delete"  {...Props1Tab(3)}  />
            </Tabs>

            <DividerH/>

            <TabPanel value={tab_value} index={0} >

                {props.create}

            </TabPanel>

            <TabPanel value={tab_value} index={1} >

                {props.read}

            </TabPanel>

            <TabPanel value={tab_value} index={2} >

                {props.update}

            </TabPanel>

            <TabPanel value={tab_value} index={3} >

                {props.delete}

            </TabPanel>



        </div>

            )

}

export default CRUDTabPanelBasic
