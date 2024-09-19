'use client';

import React, {useEffect, useRef} from "react";

import NavBar from "../system_code/comp_navigation/NavBar";
import TopBar from "../system_code/comp_navigation/TopBar";
import Spacer from "../ui/components/Spacer";
import {GlobalsContext} from "../system_state/context_globals/globals_context";

const AppBarCustom: React.FC = (props:any) => {


    const div_menu_ref=React.useRef<HTMLInputElement>(null);

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    // const handleScroll =()=>{
    //     console.log('=== handleScroll')
    // }

    useEffect(() => {

        console.log('=== ref1 ',div_menu_ref)
        console.log('=== ref1 ',div_menu_ref.current?.getBoundingClientRect())
        console.log('=== ref1 ',div_menu_ref.current?.offsetTop)

        if (div_menu_ref) {

            let data_xy = div_menu_ref.current?.getBoundingClientRect();

            console.log("=== div_menu_ref 111 data_xy before", data_xy)

            const txy = {
                empty: false,
                // TODO PROBLEM
                // ref_button: JSON.parse(JSON.stringify(div_menu_ref.current)),
                // ref_button: div_menu_ref.current,
                menu_x: (undefined === data_xy) ? 0 : (data_xy?.left + window.scrollX),
                menu_y: (undefined === data_xy) ? 0 : (data_xy?.top + window.scrollY),
                data_xy:data_xy,
            }

            console.log("=== div_menu_ref 222 data_xy txy ", txy)

            let tdata = global_props
            tdata.navigation.visibility.xy_data_menu=txy
            tdata.system.runtime='555'
            global_dispatch({
                type: 'SETTER_GLOBALPROPS',
                global_new_data:{global_props:tdata},
            })


        }


        return () => {
            // window.removeEventListener('scroll',handleScroll);
        };
        // div_menu_ref.current_w

    }, [JSON.stringify(div_menu_ref?.current?.getBoundingClientRect()), global_props.current_device.innerWidth]);


    return(
    <>

        <TopBar/>

        <div id={'div_top_bar'}>

            <Spacer data={'h-[5px]'}/>

                <NavBar/>

            <Spacer data={'h-[5px]'}/>

            <div
                ref={div_menu_ref}
                id={'div_under_logo_hamburger_ref'}
                style={{
                    alignSelf:'flex-start'
                }}
            >
            </div>

        </div>
    </>

    )
};

export default AppBarCustom

