
import React from "react";
import {GlobalsContext} from "../../system_state/context_globals/globals_context";
import AppUserAvatar from "./AppUserAvatar";
import {hamburger_toggle} from "./hamburger_toggle";
import {useHistory} from "react-router";
import {hamburger_menu_hide} from "./hamburger_menu_hide";
import {useTheme} from "@mui/styles";
import AppearIt from "../../ui/pages/home_page/inner/AppearIt";

const MenuColumn2 = (props:any) => {

    const theme = useTheme()
    // const isDarkTheme = theme.palette.mode === 'dark';
    const style_theme = {
        color:theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper
    }

    const MenuItemNavigation = (props:any) => {

        let font_size=`
                            lg:text-[32px]
                            md:text-[20px]
                            sm:text-[16px]
        `
        if(props.font_size){
            font_size = props.font_size
        }


        return(

            <div
                style={{...style_theme, color:'black'}}
                className={`flex flex-col items-start justify-start
                            
                            font-inter_light
                            
                            `+font_size+`
                            
                            hover:text-tw_primary
                            hover:cursor-pointer 

                `}
                    onClick={()=>{
                        props?.onClick?.()
                    }}
            >
                <div className="relative">{props.children}</div>
            </div>


        )
    }

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    let col_height=''
    let col_justify=''
    let col_items=''
    let col_mr=''
    let font_size=''
    if(props.height && props.height!=='') {
        // landscape mobile
        col_height = props.height
        if(global_props.current_device.innerHeight<=500) {
            font_size='text-[16px]'
        }

        col_justify = ' justify-between '
        // if(global_props.current_device.innerHeight>500) {
        //     col_justify = ' justify-between '
        // }
        // else {
        //     col_justify = ' justify-start '
        // }

        col_items = ' items-start '
        col_mr = ' mr-[50px] '
    }else{
        col_height = `
                        lg:h-auto
                        md:h-auto
                        lg:mr-[80px]
                   `
        col_justify = ' justify-between '
        col_items = ' justify-between '
    }


    const history = useHistory();

    const delay0 = 100

    return(
    <>

        <div id={'div_menu_column1'} className={`self-stretch flex flex-col 

            flex-wrap
                       
            `+col_height+col_justify+col_items+col_mr+`

        `}>

                <>
                    {(!global_props.current_user.step_logged_in)?<></>:

                            <AppUserAvatar
                                do_close_hamburger_menu={true}
                            />

                    }
                </>
            <AppearIt mode='slide-down' duration={1.4} delay={delay0}>
                <MenuItemNavigation font_size={font_size}
                                onClick={()=>{ hamburger_menu_hide({global_props,global_dispatch}); history.push('/about')}}
                >About</MenuItemNavigation>
            </AppearIt>
            <AppearIt mode='slide-down' duration={1.4} delay={delay0+100}>
                <MenuItemNavigation font_size={font_size}
                                onClick={()=>{ hamburger_menu_hide({global_props,global_dispatch}); history.push('/products')}}
                >Products</MenuItemNavigation>
            </AppearIt>
            <AppearIt mode='slide-down' duration={1.4} delay={delay0+200}>
                <MenuItemNavigation font_size={font_size} >Corporative</MenuItemNavigation>
            </AppearIt>
            <AppearIt mode='slide-down' duration={1.4} delay={delay0+300}>
                <MenuItemNavigation font_size={font_size} >FAQ</MenuItemNavigation>
            </AppearIt>
            <AppearIt mode='slide-down' duration={1.4} delay={delay0+400}>
                <MenuItemNavigation font_size={font_size} >Blog</MenuItemNavigation>
            </AppearIt>
            <AppearIt mode='slide-down' duration={1.4} delay={delay0+500}>
                <MenuItemNavigation font_size={font_size} >HACCP</MenuItemNavigation>
            </AppearIt>
            <AppearIt mode='slide-down' duration={1.4} delay={delay0+600}>
                <MenuItemNavigation font_size={font_size} >Contacts</MenuItemNavigation>
            </AppearIt>

        </div>

    </>
     )
};

export default MenuColumn2;

