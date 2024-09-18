
import React, {useEffect, useState} from "react";
import {Button, LinearProgress} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {tw_col_left, tw_row_between, tw_row_center, tw_row_left, tw_row_right} from "../../../../system_code/tw/tw_tools";
import {DividerV} from "../../WooProductsAdminPage/MUITools";
import Box from "@mui/material/Box";
import CircularProgressBasic from "../../WooProductsAdminPage/CircularProgressBasic";

const ProgressDialogDouble = (props:any) => {

    // console.log('=== ProgressDialogDouble ',props)

    const {onClose,onCloseByKey,...other} = props

    const [state, set_state] = useState(
        {
            // progress_linear:{percent:0},
            // state_refresh:0,
            open: true,
        }
    );

    const handleClose = (p:any) => {
        props.onCloseByKey?.()
    }
    const handleKeyDown = (event:any) => {

        // Check if CTRL + S is pressed (event.ctrlKey) and the 's' key (event.key)

        console.log("=== event.ctrlKey && event.key ", event.ctrlKey, event.key)

        if(
            (event.ctrlKey && event.key === 's')
            ||
            ((event.key === "Enter" && (event.metaKey || event.ctrlKey)))
        )
        {

            // Trigger the action you want here, e.g., close the dialog

            handleClose({close_from:'key_s'});

        }

    };

    React.useEffect(() => {

        if (props.open) {

            document.addEventListener('keydown', handleKeyDown);

        } else {

            document.removeEventListener('keydown', handleKeyDown);

        }

    }, [props.open]);

    // React.useEffect(() => {
    //
    //     console.log('=== printToPdf111 props?.state_upper?.pdf_output_finished ',props?.state_upper?.pdf_output_finished)
    //     console.log('=== printToPdf111 props?.title ',props?.title)
    //     console.log('=== printToPdf111 props.progress_linear ',props.progress_linear)
    //
    //     set_state((prev_state:any)=>{return  {...prev_state,
    //         state_refresh:Date.now(),
    //         progress_linear:props.progress_linear,
    //     }})
    //
    //     return () => {
    //
    //     };
    // }, [ props.progress_linear.finished]);

    // props?.state_upper?.pdf_output_finished,


    let children = React.Children.toArray(props.children)


    return(<>
        <Dialog

            // open={props.open}
            PaperProps={{
                sx: {
                    width: "20%",
                    minHeight: 295,
                    // maxHeight: 350,
                    borderRadius:'20px',
                }
            }}

            {...other}

        >
            <DialogTitle>{props.title}</DialogTitle>
            {/*<div>{state.progress_linear?.percent}</div>*/}
            {/*<div>{props?.state_upper?.pdf_output_finished}</div>*/}

            <DialogContent>
                <div className={tw_col_left+' gap-[15px] '}
                >
                    <div className={tw_row_left}>
                        <DialogContentText>{props.progress_linear.title} {Math.round(props.progress_linear.percent)}%</DialogContentText>
                    </div>

                    <Box sx={{ width: '100%',
                        // marginLeft: '20px',marginRight: '20px',
                    }}>
                        <LinearProgress variant="determinate" value={props.progress_linear.percent} />
                    </Box>

                    <div className={tw_row_left}>
                        <DialogContentText>{props.progress_circlular.title} {props.progress_circlular.finished} of {props.progress_circlular.total} </DialogContentText>
                    </div>

                    <div className={tw_row_center}>
                        <CircularProgressBasic
                            progress={props.progress_circlular.percent}
                        />
                    </div>

                </div>
            </DialogContent>

            <DialogActions sx={{marginLeft:'15px', marginRight:'10px', marginBottom:'7px',  }}>

                {(!props.onCancel)?<></>:
                <Button
                    variant={'text'}
                    onClick={() =>{
                        props.onCancel?.()
                    }}
                >
                    Cancel
                </Button>
                }

                <DividerV/>

                <div className={tw_row_right}>
                    {/*=== all childrens>0*/}
                    {children.map((child:any, index:number) => {
                        return <div key={index}>
                                {child}
                            </div>
                    })//map
                    }
                </div>


            </DialogActions>
        </Dialog>
    </>)

}

export default ProgressDialogDouble
