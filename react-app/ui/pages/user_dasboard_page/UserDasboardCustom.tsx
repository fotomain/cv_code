

import React, {useEffect, useState} from "react";

// npm start -- --reset-cache.

//===DOC https://codesandbox.io/s/mui-tabs-t8bog?file=/src/App.js:437-708
//===DOC Tabs https://codesandbox.io/p/sandbox/37324691-how-change-active-tab-color-in-react-material-ui-ovde8?file=%2Fdemo.tsx%3A41%2C7-46%2C11
//===DOC Tabs

import {Button, createTheme, Stack, Tabs} from "@mui/material";
import {styled, ThemeProvider, withStyles} from "@mui/styles";
import UserDasboardCustomTabs from "./UserDasboardCustomTabs";
import {tw_get_current_breakpoints} from "../../../system_code/tw/tw_tools";
import {GlobalsContext} from "../../../system_code/context_globals/globals_context";
import LayoutBrand from "../../../business/entrance/steps/LayoutBrand";
import {useHistory} from "react-router-dom";
import LayoutWebPages from "../../../system_code/comp_navigation/LayoutWebPages";
import {blue, green, pink, red, yellow} from "@mui/material/colors";
import OfferToEntrance from "./OfferToEntrance";



const UserDasboardCustom = (props:any) => {


  const { global_props, global_dispatch } = React.useContext(GlobalsContext);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 360, // phone
        sm: 640, // tablets
        md: 768, // small laptop
        lg: 1024, // desktop
        xl: 1280, // large screens
      }
    },

    // palette: {
    //   primary: {main: '#6cd04c'},
    //   secondary: {main: '#ffffff'},
    // },

  });

  const RootDiv = styled('div')(({ theme:any }) => ({
    padding: theme.spacing(1),
    height: '640px',
    // width: '100vh',
    // height: '100%',
    // height: '100vh',

    //===global_width
    [theme.breakpoints.up('xs')]: {
      backgroundColor: pink[500],
      width: '360px'
    },
    [theme.breakpoints.up('sm')]: {
       backgroundColor: red[500],
      width: '65vh'
    },
    [theme.breakpoints.up('md')]: {
       backgroundColor: blue[500],
      width: '800px'
    },
    // [theme.breakpoints.down('lg')]: {
    //    backgroundColor: yellow[500],
    //   width: '800px'
    // },
    [theme.breakpoints.up('lg')]: {
       backgroundColor: green[500],
      width: '960px'
    },
  }));

  const [window_innerWidth, set_window_innerWidth] = useState('');

  window.addEventListener("resize", (event) => {
    // console.log('=== window.innerWidth === '+window.innerWidth)


    const mq =
        (window.innerWidth<=360)?'xs':
          (window.innerWidth<=640)?'sm':
              (window.innerWidth<=768)?'md':
                (window.innerWidth<=1024)?'lg':
                  (window.innerWidth<=1280)?'xl':
                    (window.innerWidth<=1536)?'xl':'2xl'

    set_window_innerWidth(window.innerWidth.toString()+' ======= mq '+tw_get_current_breakpoints())
    // set_window_innerWidth(' size '+mq)

  });

  useEffect(() => {

    return () => {

    };
  }, [window_innerWidth]);


  return (
  <>
       <ThemeProvider theme={theme}>

          {/*<div style={{color:'brown', fontSize:'24px'}}>change and see window.width {window_innerWidth}</div>*/}

          {(!global_props.current_user.step_logged_in)
              ?
              <OfferToEntrance id={'user_dashboard'}/>
              :
              <RootDiv id={'UserDasboardCustom'} > <UserDasboardCustomTabs {...props} /> </RootDiv>
          }

       </ThemeProvider>
  </>
  );
};

export default UserDasboardCustom
