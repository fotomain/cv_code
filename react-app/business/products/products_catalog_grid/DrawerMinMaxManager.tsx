

// https://codesandbox.io/s/r5x6qnml6p

import {CSSObject, styled, Theme, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {useContext, useEffect, useRef} from "react";
import {CatalogContext} from "./Catalog.1.Shop";
import DrawerHeader from "./drawer/DrawerHeader";
import PT_FiltersBar_v1_no_form from "./filters/PT_FiltersBar_v1_no_form";
import DrawerFooter from "./drawer/DrawerFooter";


export const drawerWidthWide = 240;
export const drawerWidthNarrow = 70;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidthWide,
    // position: 'absolute',
    // top: '100px',
    // left: '100px',
    // marginTop: '100px',
    // marginLeft: '100px',

    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerStyled = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        // width: drawerWidthWide,
        // height:'500px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);



const DrawerMinMaxManager = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    console.log('=== props DrawerMinMax ',props)

    // const ref_drawer_minmax=useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     return () => {
    //
    //     };
    // }, [props?.drawer_content,props.top]);



    // console.log('=== drawer_state.co1y1',drawer_state.co1y1)
    const do_fixed = drawer_state.co1y1<0
    // console.log('=== drawer_state.co1x1',drawer_state.co1x1, drawer_state.load_page_finished)
    // console.log('=== drawer_state.co1x2',drawer_state.co2x1, drawer_state.load_page_finished)
    // console.log('=== rops.drawer_state.scrollTop',drawer_state.scrollTop,drawer_state.scrollLimin)


    // sss
    return(
      <DrawerStyled variant="permanent" open={drawer_state.co1Visible} id={'div_drawer_minmax'}
          // ref={props.ref_drawer_minmax}
          //hhh www
          PaperProps={{ id:'div_DrawerMinMax',
              style: { position: 'fixed' , height:'max-content',
                  // backgroundColor:'red',
                  top:((do_fixed)?0:drawer_state.co1y1),
                  // top:((drawer_state.scrollTop>=145)?0:drawer_state.co1y1),
                  left:drawer_state.co1x1,
                  width:(drawer_state.co1Wide)?drawer_state.widthWIDE+'px':drawer_state.widthNARROW+'px',
                  // ...(drawer_state.co1Visible && (!drawer_state.innerWidth_greater_largest_width))? {marginLeft: free_space_if_no_largest_width+'px',
                  //       }:{},
          } }}
      >

          {/*//============= wide-narrow */}
          {/*import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';*/}
          {/*=== the sama as layout 'div_item_line' + (isWide)?'auto':'15px' */}
          <DrawerHeader {...props} theme />

          {/*<Divider />*/}

          {/*<div>*/}
          {/*    input DrawerMinMaxManager <input type="text"/>*/}
          {/*</div>*/}
          {/*{props?.drawer_content(props)}*/}
          <PT_FiltersBar_v1_no_form {...props} />

          <DrawerFooter {...props} theme />

      </DrawerStyled>

)
}

export default DrawerMinMaxManager
