
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";
import {Button, Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import DrawerFooter from "./DrawerFooter";
import DrawerHeader from "./DrawerHeader";
import {useTheme} from "@mui/material/styles";
import {drawerWidthWide} from "./DrawerMinMax";
import {useContext} from "react";
import {CatalogContext} from "../Catalog.1.Shop";
import PT_FiltersBar_v1_no_form from "../filters/PT_FiltersBar_v1_no_form";


const DrawerOver = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    console.log('=== props.drawerOverOpen',props)

    const {show_icon, show_title, isWide, handleIsWide, theme }=props

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    // const theme = useTheme();
    // sss
    return(
      <Drawer
          variant="temporary"
          open={drawer_state.drawerOverOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={()=> {
              setIsClosing(true);
              props?.setDrawerOverClose();
          }          }
          ModalProps={{
              keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
              // display: { xs: 'block', sm: 'none'},
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidthWide },
          }}
      >

          <DrawerHeader {...props} show_icon={true} show_title={true} isWide={true} handleIsWide={()=>{}} theme />

          <PT_FiltersBar_v1_no_form {...props} />
          {/*<div>*/}
          {/*    input DrawerOver <input type="text"/>*/}
          {/*</div>*/}
          {/*{props?.drawer_content(props)}*/}

          <DrawerFooter {...props} show_icon={true} show_title={true} isWide={true} handleIsWide={()=>{}} theme />

      </Drawer>

  )
}

export default DrawerOver
