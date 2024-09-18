
import { useLocation } from "react-router-dom"

import React from "react";
import {makeStyles, useTheme} from "@mui/styles";
import InputManager from "../../../../system_code/input_material5/inner/InputManager";

import {Button} from "@mui/material";
import Spacer from "../../../components/Spacer";
import {theme_color_contrastText, theme_color_primary_main} from "../../../theme/AppMUIThemeLight";

const hereStyles = makeStyles({
    flexGrow: {
        flex: '1',
    },
    button: {
        backgroundColor: theme_color_contrastText,
        color: theme_color_primary_main,
        '&:hover': {
            backgroundColor: theme_color_contrastText,
            color: theme_color_primary_main,
            transform: 'scale(1.1, 1.1)',
        },
    }})
const SalePage = () => {

    const location=useLocation()
    const location_data = JSON.parse(JSON.stringify(location))
    const classes = hereStyles()

    //
    // useEffect(() => {
    //
    //     console.log('=== h1 location ',location_data.state.ancor_path)
    //     // alert('=== SalePage '+loc.state.ancor_path)
    //     const el = window.document.getElementById(loc.state.ancor_path)
    //         if(el) {
    //
    //             el.scrollIntoView();
    //         }
    //
    //     return () => {
    //
    //     };
    // }, [location?.state]);

  const theme = useTheme()

  return(
      <div tabIndex={-101}>

          {(''!==location_data.state.ancor_path)?<>

                  <div id='sale1' tabIndex={-101} style={{paddingTop:'8px', paddingBottom:'16px', fontSize:'16px', color:'white',backgroundColor:theme.palette.primary.main, justifyContent:'center', alignItems:'center', flexDirection:'column', display:'flex', height:'max-content', width:'100%'}}>

                      <div tabIndex={-101}>Enter your phone number to order</div>
                      <div tabIndex={-101}>Sale is valid for 1 month</div>

                      <div id='div_order' tabIndex={-101} style={{paddingTop:'8px', paddingBottom:'16px', fontSize:'16px', color:'white',backgroundColor:theme.palette.primary.main, justifyContent:'center', alignItems:'center', flexDirection:'column', display:'flex', height:'max-content', width:'100%'}}>
                          <div id='sale2' style={{marginTop:'8px', borderRadius:'5px', padding:'4px', backgroundColor:'white', maxWidth:'200px', width:'100%'}}>
                              <InputManager
                                  autoFocus={true}
                                  theme={theme}
                                  type={'text'}
                                  label_text={'Input phone'}

                                  helper_text={(par:any)=>{
                                      return <div style={{marginLeft:'16px', color:'darkgray'}}>country code needed</div>
                                  }}
                              />
                          </div>
                          <Spacer data={'h-[12px]'}/>
                          <Button variant="text" className={classes.button}>Order</Button>
                      </div>
                  </div>

                  <div tabIndex={-101}>
                      <img loading="lazy" src={require("../Section1_SwiperMain/landscape/s" + location_data.state.ancor_path + ".png")} alt=""/>
                  </div>
          </>
          :null}

          {/*<div id='sale2' style={{fontSize:'30px', color:'white',backgroundColor:theme.palette.primary.main, justifyContent:'center', alignItems:'center', display:'inline-flex', height:'55px', width:'100%'}}>Sale #2 Is is valid for 2 weeks</div>*/}
          {/*<div>*/}
          {/*    <img src="/images_home/s2_.png" alt=""/>*/}
          {/*</div>*/}

          {/*<div id='sale3' style={{fontSize:'30px', color:'white',backgroundColor:theme.palette.primary.main, justifyContent:'center', alignItems:'center', display:'inline-flex', height:'55px', width:'100%'}}>Sale #3 Is is valid for 3 weeks</div>*/}
          {/*<div>*/}
          {/*    <img src="/images_home/s3_.png" alt=""/>*/}
          {/*</div>*/}

          {/*<div id='sale4' style={{fontSize:'30px', color:'white',backgroundColor:theme.palette.primary.main, justifyContent:'center', alignItems:'center', display:'inline-flex', height:'55px', width:'100%'}}>Sale #4 Is is valid for 4 weeks</div>*/}
          {/*<div>*/}
          {/*    <img src="/images_home/s4_.png" alt=""/>*/}
          {/*</div>*/}

          {/*<div id='sale5' style={{fontSize:'30px', color:'white',backgroundColor:theme.palette.primary.main, justifyContent:'center', alignItems:'center', display:'inline-flex', height:'55px', width:'100%'}}>Sale #5 Is is valid for 5 weeks</div>*/}
          {/*<div>*/}
          {/*    <img src="/images_home/s5_.png" alt=""/>*/}
          {/*</div>*/}

      </div>
  )
}

export default SalePage
