import * as React from "react";
import Box from "@mui/material/Box";
import {Divider} from "@mui/material";
import {tw_col_left} from "../../../system_code/tw/tw_tools";

export interface TabPanelProps {
    // other?: any;
    children?: React.ReactNode;
    index: number;
    value: number;

    // id?:string;
}

export const DividerV = (props: any) => {

    return <Divider orientation='vertical'sx={{ borderLeftWidth: 16, ...props }}  />

}

export const DividerH = (props: any) => {

    return <Divider sx={{ borderBottomWidth: 16 }} {...props} />

}

export const TabPanel = (props: TabPanelProps) => {
    const {  children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}

            // style={{justifySelf:'start'}}
            // className={tw_col_left}

        >
            {value === index && (

                    children

            )}
        </div>
    );
}

export const Props1Tab = (index: number) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
        sx:{padding:'2px'}, // gl
    };
}
