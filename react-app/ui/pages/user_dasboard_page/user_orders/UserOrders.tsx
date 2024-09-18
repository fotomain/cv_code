

import React from "react";

import FlexTests from "./FlexTests";
import IconWithGlobalAlert from "../show_global/IconWithGlobalAlert";
import {CancelOutlined} from "@mui/icons-material";



const UserOrders = () => {

    console.log('=== UserOrders ')
    return (
    <>
            <FlexTests/>
            <FlexTests/>
            <FlexTests/>
            <FlexTests/>
            <FlexTests/>
            <FlexTests/>
            <FlexTests/>
            <FlexTests/>
            <FlexTests/>

                <IconWithGlobalAlert
                    icon={CancelOutlined}
                    show_title={'Copied to clipboard'}
                    on_press={async (p:any) =>{
                        console.log('=== on_press IconOnPressAlert')
                    }}

                />

    </>
    );
  }


export default UserOrders;
