import {Button, Dialog, DialogContentText} from "@mui/material";
import { LinearProgress } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import React, {useState} from "react";
import DialogContent from "@mui/material/DialogContent";

import CircularProgressBasic from "../CircularProgressBasic";
import Box from "@mui/material/Box";
import {withStyles, makeStyles} from "@mui/styles";
import {tw_col_left, tw_row_center, tw_row_left, tw_row_right} from "../../../../system_code/tw/tw_tools";
import DialogActions from "@mui/material/DialogActions";

const ProgressDialogForButtonDelete = (props:any) => {

    const [state, set_state] = useState(
        {
            open: true,
            close_from:'',
        }
    );

    const handleClose = (p:any) => {

        console.log('=== t0 handleClose ',p)

        if('close_from_cancel'===p?.close_from){

        }

        set_state((prev_state:any)=>{return  {...prev_state,
            close_from:p?.close_from,
            open: false
        }});

    }

    const useStyles = makeStyles(() => ({
        paper: {
            height: 300,
            width: 325,
        },
    }));

    // ============ CIRCLE
    // ============ CIRCLE
    // ============ CIRCLE



    // ============ LINE
    // ============ LINE
    // ============ LINE

    return(
        <>
            <Dialog
                PaperProps={{
                    sx: {
                        width: "25%",
                        minHeight: 270,
                        maxHeight: 500,
                        borderRadius:'5%',
                        // display: "flex",
                        // frexDirection: "column",
                        // justifyContent: "top",
                        // alignItems: "center",
                        // gap:'16px'
                    }
                }}
                // sx={{
                //     height: 300,
                //     width: 325,
                // }}
                //===DOC https://codesandbox.io/p/sandbox/dynamic-filterable-material-modal-1z7o8?fontsize=14&hidenavigation=1&theme=dark
                open={state.open}

                onClose={()=> {
                    handleClose({close_from: 'dialog'})
                }}
            >

                <DialogTitle>Progress</DialogTitle>
                {/*<div>{JSON.stringify(props.state_upper)}</div>*/}

                <DialogContent>
                    <div className={tw_col_left+' gap-[15px] '}
                    >
                    <div className={tw_row_left}>
                        <DialogContentText>{props.progress?.progress_linear?.progress_title} {Math.round(props.progress_linear)}%</DialogContentText>
                    </div>

                            <Box sx={{ width: '100%',
                                // marginLeft: '20px',marginRight: '20px',
                            }}>
                                <LinearProgress variant="determinate" value={props.progress_linear} />
                            </Box>

                    <div className={tw_row_left}>
                        <DialogContentText>{props.state_upper.progress_circlular.progress_title}</DialogContentText>
                    </div>

                            <div className={tw_row_center}>
                                <CircularProgressBasic
                                    progress={props.progress_circlular}
                                />
                            </div>

                    </div>
                </DialogContent>
                <DialogActions>

                    <div className={tw_row_right}>

                        <Button variant="text"
                                onClick={() =>{

                                }}
                        >
                            Cancel
                        </Button>


                    </div>

                </DialogActions>

            </Dialog>
        </>
    )
}

export default ProgressDialogForButtonDelete
