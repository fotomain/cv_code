import React, {useState} from "react";
import {Button} from "@mui/material";
import YesNoDialog from "./YesNoDialog";
import {YESNO_WINDOW_ACTION} from "../../../../system_state/products_state/actions";
import {useSelector} from "react-redux";
import {SEL_YESNO_WINDOW_DATA} from "../../../../system_state/products_state/selectors";

const YesNoWindowOK = (props:any) => {


    const yesno_window_data = {...(useSelector(SEL_YESNO_WINDOW_DATA) as unknown as Record<any, unknown>)}
    if(props.window_name!==yesno_window_data.window_name)
        return(<></>)

    // console.log('=== YesNoWindowRoot1',yesno_window_data)


    return(<>
        <YesNoDialog
            open={yesno_window_data.window_open}
            title={yesno_window_data.window_title}
            text={yesno_window_data.window_text}
            onBackdropClick={()=>{

                props.dispatch(YESNO_WINDOW_ACTION({
                    new_value :{
                        window_name:props.window_name,
                        window_open:false,
                    }
                }))

            }}
        >
            <Button
                variant={'contained'}
                onClick={() =>{

                    props.dispatch(YESNO_WINDOW_ACTION({
                        new_value :{
                            window_name:props.window_name,
                            window_open:false,
                        }
                    }))

                }}
            >
                Ok
            </Button>
        </YesNoDialog>

    </>)

}

export default YesNoWindowOK
