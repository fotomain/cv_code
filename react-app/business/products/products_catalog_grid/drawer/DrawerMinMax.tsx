

// https://codesandbox.io/s/r5x6qnml6p

import {CSSObject, styled, Theme, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import * as React from "react";
import {useEffect, useRef} from "react";

import DrawerHeader from "./DrawerHeader";
import DrawerFooter from "./DrawerFooter";


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
        width: drawerWidthWide,
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



const DrawerMinMax = (props:any) => {

    console.log('=== props DrawerMinMax ',props)

    const [isWide, setIsWide] = React.useState((undefined!==props?.state.isWide)?props.state.isWide: true);
    const theme = useTheme();
    // const ref_drawer_minmax=useRef<HTMLDivElement>(null)

    const handleIsWide = () => {
        setIsWide(!isWide);
    };

    useEffect(() => {
        console.log('=== isWide111 ',isWide)
        props?.onChangeWidth({isWide, drawerWidthWide, drawerWidthNarrow, ref_drawer_instance:props.ref_drawer_minmax})
        return () => {};
    }, [isWide]);

    useEffect(() => {
        return () => {

        };
    }, [props?.drawer_content,props.top]);

    // sss
    return(
      <DrawerStyled variant="permanent" open={isWide} id={'div_drawer_minmax'}
                  // ref={props.ref_drawer_minmax}
                  //hhh www
          PaperProps={{ id:'div_DrawerMinMax', style: { position: 'fixed' , top:props.top , left:props.left,
                  // ...(props.state.drawerMinMaxVisible && (!props.state.innerWidth_greater_largest_width))? {marginLeft: free_space_if_no_largest_width+'px'}:{},
          } }}
      >

          {/*//============= wide-narrow */}
          {/*import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';*/}
          {/*=== the sama as layout 'div_item_line' + (isWide)?'auto':'15px' */}
          <DrawerHeader {...props} handleIsWide={handleIsWide} theme />

          {/*<Divider />*/}

          {props?.drawer_content()}

          <DrawerFooter {...props} handleIsWide={handleIsWide} theme />


      </DrawerStyled>

)
}

export default DrawerMinMax
