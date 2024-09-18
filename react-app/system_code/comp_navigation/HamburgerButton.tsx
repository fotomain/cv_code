
import React, {useEffect, useRef, useState} from "react";
import {SvgIcon} from "@mui/material";
import {GlobalsContext} from "../context_globals/globals_context";
import {useTheme} from "@mui/styles";

const HamburgerButton = (props:any) => {

    const [state, set_state] = useState({
        hamburger_open: (null!==props.hamburger_open)?props.hamburger_open:false,
    })

    useEffect(() => {
        set_state(
            {
                ...state,
                ...{hamburger_open: props.hamburger_open},
            }
        );
        return () => {

        };
    }, [props.hamburger_open]);

    const div_hamburger_ref = useRef<HTMLDivElement>(null)

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    useEffect(() => {

        const xy_data_hamburger_=JSON.parse(JSON.stringify(div_hamburger_ref?.current?.getBoundingClientRect()))
        console.log('=== div_hamburger_ref 111 ',div_hamburger_ref)
        console.log('=== div_hamburger_ref tdata ',xy_data_hamburger_)


        let tdata = global_props
        tdata.navigation.visibility.xy_data_hamburger=xy_data_hamburger_
        tdata.system.runtime='1599'
        global_dispatch({
            type: 'SETTER_GLOBALPROPS',
            global_new_data:{global_props:tdata},
        })


        return () => {

        };
    }, [JSON.stringify(div_hamburger_ref?.current?.getBoundingClientRect())]);

    const theme = useTheme()

    const isDarkTheme = theme.palette.mode === 'dark';

    return(

        <div id={'div_hamburger'}>

            <div id={'div_hamburger_ref'}
                ref={div_hamburger_ref}

                className={ ((state.hamburger_open)?" rotate-90 duration-[500ms] ":" rotate-0 duration-[500ms] ")
                    +" relative w-[25px] h-[23px] overflow-hidden shrink-0 " +
                    " hover:cursor-pointer relative " +
                    " stroke-[#2C2C2C] hover:stroke-tw_primary "
                }
                onClick={(e)=>{
                    console.log('=== onClick ')
                    set_state(
                        {
                            ...state,
                            ...{hamburger_open: !state.hamburger_open},
                        }
                    );

                    // window.document.body.classList.toggle("dark");

                    if(props.on_press){
                        props.on_press()
                    }

                }} >
                {/*<img*/}
                {/*    id={props.id}*/}
                {/*    alt=""*/}
                {/*    src="/images_figma/hamburger-usual-tablet.svg"*/}
                {/*/>*/}

                <svg
                    id={props.id}
                    fill={(isDarkTheme)?"#ffffff":"#2C2C2C"}
                    // fill={'#ffffff'}
                    className={" hover:cursor-pointer relative stroke-[#2C2C2C] hover:stroke-tw_primary "+
                        " hover:fill-tw_primary "}


                    width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2_119)">
                        <path d="M25 0.5H0V3.92857H25V0.5Z" />
                        <path d="M25 9.92871H0V13.3573H25V9.92871Z" />
                        <path d="M25 20.0714H0V23.5H25V20.0714Z" />
                    </g>
                    <defs>
                        <clipPath id="clip0_2_119">
                            <rect width="25" height="23" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                    </defs>
                </svg>

            </div>

        </div>
    )
};

export default HamburgerButton;

