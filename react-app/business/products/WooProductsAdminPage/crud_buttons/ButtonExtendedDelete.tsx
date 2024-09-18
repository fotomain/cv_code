import React, {useRef} from "react";
import ButtonExtendedComponent from "./ButtonExtendedComponent";
import {Button} from "@mui/material";

const ButtonExtendedDelete = (props:any) => {

    const {
        use_confirm_dialog,

        use_mount_alert,
        title_message_alert,

        use_mount_snackbar,
        title_message_snackbar,

        button_title,
        item1_title,
        item2_title,
        main_element,
        main_action,
        ...other
    } = props

    const MainElement = main_element

    const btn_ref = useRef<HTMLButtonElement>(null)

    return(
        <div>

            <ButtonExtendedComponent

                btn_ref={btn_ref}

                props_alert={{severity:'info'}}

                use_timeout={2000}

                use_mount_alert={true}
                title_message_alert={props.title_message_alert}

                show_where={'over'}
                // show_where={'under'}

                use_mount_snackbar={true}
                title_message_snackbar={props.title_message_snackbar}

            >

                {(par_button:any) => {
                    return(
                        <MainElement

                            {...other}
                            onClick={() =>{
                                console.log('=== props.use_confirm_dialog  ',props)
                                if(props.use_confirm_dialog)
                                {
                                    // variant1 = confirm then main_action - see item1,2
                                    console.log('=== variant1 = confirm then main_action')
                                    par_button.onClickDialog()

                                }else{

                                    // variant2 = main_action then 1) NO confirm 2) alerts
                                    console.log('=== variant2 = main_action DELETE')
                                    // par_button.onClickDialog(
                                    //     {
                                    //         no_confirm_dialog:true,
                                    //         close_from:'close_from_ok',
                                    //     }
                                    // )

                                    props.main_action?.(
                                        {do_after_main_action:()=>{

                                                par_button.onClickDialog(
                                                    {
                                                        no_confirm_dialog:true,
                                                        close_from:'close_from_ok',
                                                    }
                                                )

                                            }}
                                    ).then(() =>{

                                    })

                                }

                            }}
                            ref={btn_ref}
                        >
                            {props.button_title}
                        </MainElement>
                    )
                }}

                {(par_cancel:any) => {
                    return(
                        <Button variant="text"
                                onClick={() =>par_cancel.onClickDialog(
                                    {close_from: 'close_from_cancel'}
                                )}
                        >
                            {props.item1_title}
                        </Button>
                    )
                }}

                {(par_ok:any) => {
                    return(
                        <Button variant="contained"
                                onClick={() =>
                                {
                                    par_ok.onClickDialog(
                                        {close_from: 'close_from_ok'}
                                    )

                                    props.main_action?.().then(() =>{

                                    })
                                }}
                        >
                            {props.item2_title}
                        </Button>
                    )
                }}

            </ButtonExtendedComponent>

        </div>
    )
}

export default ButtonExtendedDelete
