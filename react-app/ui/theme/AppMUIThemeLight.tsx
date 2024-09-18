
import {largest_width} from "../../AppInitTheme";

const theme_color_primary_main="#1EB949"
const theme_color_contrastText="#fff"
const AppMUIThemeLight:any = (p:any)=> {
return {
    palette: {
        background: {
            default: "#ffffff", //white
            // default: "#fffcf3"
            // default: "#ffdfad"
        },
        mode:'light',
        primary: {
                main: theme_color_primary_main, //"#6cd04c",
                light: "#83f95d",
                dark: "#60b944",
                // main: "#008080",
                // main: "#1A73E8",
                contrastText: theme_color_contrastText, //button text white instead of black,

        },
        text: { //text color
            primary:'#000000', //black
            secondary:'#141414', //darkgray
            disabled:'#90EE90', //lightgreen
        },
        action: {
            disabledBackground: 'darkgray',
                disabled: '#83f95d',
        },
        secondary: {
            main: "#702F8A",
                light: "#FFEAFF",
                dark: "#612A80",
                contrastText: "#fff", //button text white instead of black,
        },
        anger: p.createColor('#F40B27'),
            apple: p.createColor('#5DBA40'),
            steelBlue: p.createColor('#5C76B7'),
            violet: p.createColor('#BC00A3'),
            color_text_black: p.createColor('#413F3FFF'),
    },
    breakpoints: {
        values: {
            xs: 360, // phone xs000
                sm: 640, // tablets sm000
                md: 768, // small laptop md000
                lg: 1024, // desktop lg000
                xl: largest_width, // large screens xl000
        }
    },

    components: {
        MuiButton: {
            //===DOC https://stackoverflow.com/questions/55586626/react-material-ui-how-to-give-a-button-a-custom-color-when-disabled
            defaultProps: {
                color: "primary"
            },
            styleOverrides: {
                root: {
                    padding: ".5rem 1.5rem",
                        borderRadius:   50,
                        "&.Mui-disabled": {
                        background: "#f3f3f3",
                            // borderColor:'red',
                            border:'solid 2px #612A80',
                            color: "#612A80"
                    }
                }
            }
        }
    }
}}

//TODO EXCLUDE AFTER SETTINGS
export {theme_color_primary_main,theme_color_contrastText}
export default AppMUIThemeLight

