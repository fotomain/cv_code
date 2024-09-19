
import {styled} from "@mui/styles";

import {Drawer} from "@mui/material";
import { Theme } from '@mui/material/styles';
import React from "react";
import {GlobalsContext} from "../../../../system_state/context_globals/globals_context";

declare module '@mui/styles/defaultTheme' {
    interface DefaultTheme extends Theme {}
}

// STEP4_drawer_left
const css_opened=(theme:any)=>({

    overflow:'hidden',

    transition:theme.transitions.create('width',
        {
            easing:theme.transitions.easing.sharp,
            duration:theme.transitions.duration.enteringScreen
        })

})

const css_closed=(theme:any)=>({
    width: `0px`,
    // width: `calc(${theme.spacing(7)} + 1px)`,
    overflow:'hidden',
    transition:theme.transitions.create('width',
        {
            easing:theme.transitions.easing.sharp,
            duration:theme.transitions.duration.enteringScreen
        })

})

// =================
// ================= DrawerDiv
// =================

const DrawerDiv = styled(Drawer)

(
    ({theme, open, })=>({

        containerStyle:{height: 'calc(100% - 64px)', top: 64},


        flexShrink:0,
        whiteSpace:'nowrap',
        boxSizing:'border-box',
        ...(open && {
            ...css_opened(theme),
            '& .MuiDrawer-paper': css_opened(theme)
        }),
        ...(!open && {
            ...css_closed(theme),
            '& .MuiDrawer-paper': css_closed(theme)
        })
    })



)

const DrawerLeft = (props:any) =>{

    const { global_props } = React.useContext(GlobalsContext);

    const Comp = props.children[0]

    console.log("=== global_props.navigation.do_open_drawer_left",global_props.navigation.do_open_drawer_left)

return(

    <DrawerDiv
        id='drawer_left_1'
        PaperProps={{
            sx: {
                width: global_props.navigation.drawer_left_width,
                //=== DOC no scroll
                // overflowY: 'hidden',
                // overflowX: 'hidden',
                // height: '100%',
                // height: 'calc(100% - 64px)',
            }
        }}
        // variant='persistent'
        variant={global_props.navigation.drawer_left_variant}
        // open={true}
        open={global_props.navigation.do_open_drawer_left}
        // drawer click outside
        ModalProps={{ onBackdropClick: ()=>{

            props.do_close()
        } }}

        >

            {props.children
                ?React.cloneElement(props.children, {...props})
                :''}

            {(!(!props.children && global_props.navigation.do_open_drawer_left))?'':
                <>
                    <div>!!!!!!!!!!! DrawerLeft111 </div>

                    <button
                        onClick={(e)=>props.do_wide(e)}
                    >WIDE
                    </button>
                    <br/>
                    <button
                        onClick={(e)=>props.do_fold(e)}
                    >FOLD
                    </button>
                    <br/>
                    <button
                        onClick={(e)=>props.do_close(e)}
                    >CLOSE
                    </button>
                </>
            }

        </DrawerDiv>
)

}

export default DrawerLeft
