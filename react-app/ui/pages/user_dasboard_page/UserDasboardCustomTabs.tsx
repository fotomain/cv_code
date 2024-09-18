

// tabs_new1

import {Box, Divider, IconButton, Tabs, Typography} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";
import React, {forwardRef, RefObject} from "react";
import {Theme} from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {LocalActivityTwoTone, ProductionQuantityLimitsOutlined} from "@mui/icons-material";

import {tw_get_current_breakpoints} from "../../../system_code/tw/tw_tools";
import UserDasboardCustomPages from "./UserDasboardCustomPages";
import {GlobalsContext} from "../../../system_code/context_globals/globals_context";
import {is_empty} from "../../../system_code/code_global/GlobalFunctions";


var  user_dasboard_tabs_variant=''
// user_dasboard_tabs_variant = 'srtandard'
user_dasboard_tabs_variant = 'style1'

let local_settings = {
    show: {
        //TODO global
        // user_profile_scroll_buttons: {variant: 'standard'},
        user_profile_scroll_buttons: {variant: 'arrows'},
        // user_profile_scroll_buttons: {variant: 'fa'},
    },
    code:{
        user_profile_right_scroll_button:(a:any, b:any)=>{},
        user_profile_left_scroll_button:(a:any, b:any)=>{},
    }
}

local_settings.code.user_profile_left_scroll_button = (props:any, ref:any)=>
    <IconButton {...props}
                ref={ref}
        // sx={{marginRight:'45px'}}
                sx={{
                    padding:'0px', marginTop:'16px',
                    width:'16px', height:'16px'
                }}
    >

        {('fa'!==local_settings.show.user_profile_scroll_buttons.variant)?<></>:
            <FontAwesomeIcon id={'arrow_left'}
                             style={{
                                 // marginRight: "2px",
                                 //TODO global
                                 width:'12px', height:'12px'
                             }}
                             color="#6cd04c"
                             icon={faCircleArrowLeft}
            />
        }

        {('arrows'!==local_settings.show.user_profile_scroll_buttons.variant)?<></>:
            //TODO global
            <ArrowBackIcon sx={{color:'#6cd04c',width:'14px', height:'14px'}} />
        }

        {('standard'!==local_settings.show.user_profile_scroll_buttons.variant)?<></>:
            <KeyboardArrowLeftIcon sx={{color:'#6cd04c'}} />
        }

    </IconButton>

local_settings.code.user_profile_right_scroll_button = (props:any, ref:any)=>
    <IconButton {...props}
                ref={ref}
        // sx={{marginRight:'45px'}}
                sx={{
                    padding:'0px', marginTop:'16px',
                    width:'16px', height:'16px'
                }}
    >

        {('fa' !== local_settings.show.user_profile_scroll_buttons.variant) ? <></> :

            <FontAwesomeIcon id={'arrow_rignt'}
                             style={{
                                 // marginRight: "7px",
                                 //TODO global
                                 width: '12px', height: '12px'
                             }}
                             color="#6cd04c"
                             icon={faCircleArrowRight}
            />
        }

        {('arrows'!==local_settings.show.user_profile_scroll_buttons.variant)?<></>:
            //TODO global
            <ArrowForwardIcon sx={{color:'#6cd04c',width:'14px', height:'14px'}} />
        }

        {('standard'!==local_settings.show.user_profile_scroll_buttons.variant)?<></>:
            <KeyboardArrowRightIcon sx={{color:'#6cd04c'}} />
        }



    </IconButton>

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // flexGrow: 1,
        // width: "360px",
        //00
        width: "100%",
        backgroundColor: theme.palette.background.paper
    }
}));


const TabStyle1 = styled((props: any) => (
    <Tab
        // TODO global
        disableRipple

        {...props}
    />
))(({ theme }) => ({
    // width: '33%', //all TODO
    backgroundColor:'white',
    textTransform: 'none',
    fontWeight: '400',
    fontSize: '15px',
    marginRight: '1px',



    color: '#6cd04c', //regular text_color
    '&:hover, &:focus': { color:'green'},

    '&.Mui-selected': {
        backgroundColor: '#6cd04c',
        color: '#fff', //active text_color
        // color: 'red',
        '&:hover, &:focus': {color: 'fff', opacity:'0.8'}
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
        color: '#fff',
        // color: 'blue',
    },

}));

const StyledTabs = styled((props: any) => {

    return(
        <Tabs
            {...props}
            TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}

            // [ 'sm','md', 'lg', 'xl', '2xl'].indexOf(props.tw_width) === -1

            {...(false)?{}:{ScrollButtonComponent:forwardRef((props0, ref) => {

                    return ScrollButtonCustom(props0,ref)

                })}} //ScrollButtonComponent


        />
    )})({

    // '& .${tabsClasses.scrollButtons':{
    //     '&.Mui-disabled': { opacity: 0 },
    //     backgroundColor:'red',
    // },

    height: '20px', //active
    width: '100%', //all
    // marginLeft:'10px',
    // marginRight:'10px',
    marginTop:'0px',
    padding:'0px',
    alignContent: 'center',
    justifyContent: 'center',

    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: '4px', //active
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',

        backgroundColor: 'white', //active
    },

    //section
    "& .MuiTabScrollButton-root:first-child": {
        backgroundColor: 'white',

    },
    "& .MuiTabScrollButton-root:last-child": {
        backgroundColor: 'white',

    },

    // near icon

    "& .MuiTabScrollButton-root:first-child::before": {
        backgroundColor: 'white',
        content: "'...'",
        color:'#6cd04c',
    },
    "& .MuiTabScrollButton-root:last-child::after": {
        backgroundColor: 'white',
        content: "'+...'",
        color:'#6cd04c',
    },

    // scrollButtons: {
    //     "&.Mui-disabled": {
    //         opacity: 0.3
    //     }
    // }

});

const ScrollButtonCustom = (props0:any, ref:any) => {

    const {slotProps, ...props} = props0

    console.log('=== props ScrollButtonComponent ',props)
    if (
        props.direction === "left" &&
        !props.disabled
    ) {
        return (
            <>
                {(local_settings.code.user_profile_left_scroll_button)?local_settings.code.user_profile_left_scroll_button(props,ref):<></>}
            </>
        );
    } else if (
        props.direction === "right" &&
        !props.disabled
    ) {
        return (
            <>
                {(local_settings.code.user_profile_right_scroll_button)?local_settings.code.user_profile_right_scroll_button(props,ref):<></>}
            </>
        );
    } else {
        return null;
    }

}

const TabsStandard = (props:any) => {
    return(
        <Tabs
            {...props}

            //ScrollButtonComponent={TabScrollButton}

            {...(false)?{}:{ScrollButtonComponent:
                    forwardRef((props0, ref) => {

                        return ScrollButtonCustom(props0,ref)

                        // const {slotProps, ...props} = props0
                        //
                        // console.log('=== props ScrollButtonComponent ',props)
                        // if (
                        //     props.direction === "left" &&
                        //     !props.disabled
                        // ) {
                        //     return (
                        //         <>
                        //             {(local_settings.code.user_profile_left_scroll_button)?local_settings.code.user_profile_left_scroll_button(props,ref):<></>}
                        //         </>
                        //     );
                        // } else if (
                        //     props.direction === "right" &&
                        //     !props.disabled
                        // ) {
                        //     return (
                        //         <>
                        //             {(local_settings.code.user_profile_right_scroll_button)?local_settings.code.user_profile_right_scroll_button(props,ref):<></>}
                        //         </>
                        //     );
                        // } else {
                        //     return null;
                        // }
                    })
            }} //ScrollButtonComponent

            aria-label="scrollable auto tabs example"
        >
            {props.children}
        </Tabs>
    )
}



// ===================
// =================== START
// ===================

export default function ScrollableTabsButtonAuto() {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const mq=tw_get_current_breakpoints()
    const show_titles=(['md','lg','xl','2xl'].indexOf(mq)!==-1)

    const classes = useStyles();
    const [tab_active_number, set_tab_active_number] = React.useState(
        ((!is_empty(global_props.navigation.user_dasboard_tabs_number)))
            ?global_props.navigation.user_dasboard_tabs_number
            :1
    );

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log('=== newValue',newValue)
        set_tab_active_number(newValue);
        let tdata = global_props
        tdata.navigation.user_dasboard_tabs_number=newValue
        global_dispatch({
            type: 'SETTER_GLOBALPROPS',
            global_new_data: {global_props: tdata},
        })
    };

    //TODO global
    const Tabs2Exe = ('style1'==user_dasboard_tabs_variant)?StyledTabs:TabsStandard
    const Tab2Exe = ('style1'==user_dasboard_tabs_variant)?TabStyle1:Tab

    var tab_pages : any[]=[]
    tab_pages[0]= {
        iconPosition:"start",
        label:<React.Fragment>
                <GradingOutlinedIcon/>
                {/*-15px*/}
                <div style={{marginLeft:(show_titles)?'12px':''}}>{(show_titles)?'Orders':''}</div>
              </React.Fragment>
    }

    tab_pages[1]= {
        iconPosition:"start",
        label:<React.Fragment>
                <AccountCircleOutlinedIcon/>
                {/*-15px*/}
                <div style={{marginLeft:(show_titles)?'12px':''}}>{(show_titles)?'Profile':''}</div>
              </React.Fragment>
    }

    tab_pages[2]= {
        iconPosition:"start",
        label:<React.Fragment>
                <SettingsOutlinedIcon/>
                {/*-15px*/}
                <div style={{marginLeft:(show_titles)?'12px':''}}>{(show_titles)?'Settings':''}</div>
              </React.Fragment>
    }

    tab_pages[3]= {
        iconPosition:"start",
        label:<React.Fragment>
                <LocalActivityTwoTone/>
                {/*-15px*/}
                <div style={{marginLeft:(show_titles)?'12px':''}}>{(show_titles)?'Activity':''}</div>
              </React.Fragment>
    }

    tab_pages[4]= {
        iconPosition:"start",
        label:<React.Fragment>
                <ProductionQuantityLimitsOutlined/>
                {/*-15px*/}
                <div style={{marginLeft:(show_titles)?'12px':''}}>{(show_titles)?'Products':''}</div>
              </React.Fragment>
    }

    const pages_mumbers=Array.from(Array(tab_pages.length).keys())

    return (
        <div className={classes.root}>
            <Box position="static" color="default"
                 // sx={{width:'370px'}}
            >
                <Tabs2Exe

                    value={tab_active_number}
                    onChange={handleChange}

                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile

                >

                    {pages_mumbers.map(el=>{
                    // {[0,1,2,3].map(el=>{
                        return(
                                //TODO global disableRipple
                                <Tab2Exe
                                        key={'tab_n_'+el}
                                        // label={"Item "+el}

                                        {...a11yProps(el)}

                                        iconPosition={tab_pages[el].iconPosition}
                                        label={tab_pages[el].label}
                                />

                        )
                    })}

                </Tabs2Exe>
            </Box>

                    <>
                        {/*{ 'TabPanel ' + el}*/}
                        <Divider style={{backgroundColor:'#6cd04c', height:'1px', }}/>
                        <UserDasboardCustomPages tab_active_number={tab_active_number} />

                    </>

        </div>
    );
    // =================== FINISH
}
