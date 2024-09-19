
import React from "react";
import {useTheme} from "@mui/styles";
import {useHistory} from "react-router";
import {hamburger_menu_hide} from "./hamburger_menu_hide";
import {GlobalsContext} from "../../system_state/context_globals/globals_context";

const MenuItemProgram = (props:any) => {

    const theme = useTheme()
    // const isDarkTheme = theme.palette.mode === 'dark';
    const style_theme = {
        color:theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper
    }

    return(

        <div id={'dMenuItemProgram'}

             style={style_theme}

             className="flex flex-col items-start justify-start

            font-inter_regular
            flex-nowrap

            hover:text-tw_primary

            lg:text-[32px]
            md:text-[20px]
            sm:text-[16px]

            hover:cursor-pointer
        "
             onClick={()=>{
                 props?.onPress?.()
             }}
        >
            <b style={style_theme} className="relative truncate ... ">{props.children}</b>
        </div>
    )
}

const MenuColumn1 = (props:any) => {

    const history = useHistory();

    const theme = useTheme()
    // const isDarkTheme = theme.palette.mode === 'dark';
    const style_theme = {
        color:theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper
    }

        let col_height=''
        if(props.height) {
            col_height = props.height
        }else{
            col_height = `
                            lg:h-auto
                            md:h-auto
                            gap-[25px]
                        `
        }

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    return(

            <div id={'div_menu_column1'}

                 style={style_theme}

                 className={`self-stretch flex flex-col items-start

                        justify-between
                        `+col_height+`
                        
                        pr-[30px]

            `}>

                <MenuItemProgram
                    //welcomeset
                    onPress={()=>{hamburger_menu_hide({global_props,global_dispatch});
                        history.push('/products', {filter: ''}, )
                    }}
                >
                    Welcome set
                </MenuItemProgram>

                <MenuItemProgram
                    onPress={()=>{hamburger_menu_hide({global_props,global_dispatch});
                        history.push('/products', {filter: 'hit'}, )
                    }}
                >
                    Bestseller
                </MenuItemProgram>

                <MenuItemProgram
                    onPress={()=>{hamburger_menu_hide({global_props,global_dispatch});
                        history.push('/products', {filter: 'detox'}, )
                    }}
                >
                    Detox
                </MenuItemProgram>

                <MenuItemProgram
                    onPress={()=>{hamburger_menu_hide({global_props,global_dispatch});
                        history.push('/products', {filter: 'decrease'}, )
                    }}
                >
                    Reduce weight
                </MenuItemProgram>

                <MenuItemProgram
                    onPress={()=>{hamburger_menu_hide({global_props,global_dispatch});
                        history.push('/products', {filter: 'balance'}, )
                    }}
                >
                    Balance
                </MenuItemProgram>

                <MenuItemProgram
                    onPress={()=>{hamburger_menu_hide({global_props,global_dispatch});
                        history.push('/products', {filter: 'increase'}, )
                    }}

                >
                    Gain weight
                </MenuItemProgram>

            </div>

     )
};

export default MenuColumn1;

