

import React, {useState} from "react";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import {kvapi} from "../keyvalue_api/keyvalue_tools";
import ProgressDialogForButtonDelete from "./ProgressDialogForButtonDelete";
import ButtonExtendedDelete from "./ButtonExtendedDelete";
import {delayms, JSON_stringify} from "../../../../system_code/code_global/GlobalFunctions";


const ButtonWorkDeleteVideos = (props:any) => {

    const [state, set_state] = useState({
        open_progress_dialog:false,
        open_ok_dialog:false,
        progress_percent:0,
    });


    const [progress_linear, set_progress_linear]
        = React.useState({
        progress_title:'',
        total:0,
        num_started:0,
        percent:0,
    });

    React.useEffect(() => {
        // const timer = setInterval(() => {
        //     set_progress_linear((oldProgress:any) => {
        //         if (oldProgress === 100) {
        //             return 0;
        //         }
        //         const diff = Math.random() * 10;
        //         return Math.min(oldProgress + diff, 100);
        //     });
        // }, 500);

        return () => {
            // clearInterval(timer);
        };
    }, []);

    const [progress_circlular, set_progress_circlular] = React.useState({
        progress_title:'Finished',
        total:0,
        percent:0,
        num_started:0,
    });
    // React.useEffect(() => {
    //     const timer = setInterval(() => {
    //         set_progress_circlular((prevProgress:any) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    //     }, 800);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    const handleCloseOK = (p:any) => {
        //route
    }

    return(<>
        {(!state.open_ok_dialog)?<></>:
            <Dialog

                PaperProps={{
                    sx: {
                        width: "15%",
                        minHeight: 150,
                        maxHeight: 500,
                        borderRadius:'5%',
                    }
                }}

                open={state.open_ok_dialog}

                onClose={()=> {
                    handleCloseOK({close_from: 'state.open_ok_dialog'})
                }}
            >
                <DialogTitle>Deleted Successfull!</DialogTitle>
                <DialogContent>

                    <DialogContentText>
                        You can contunue
                    </DialogContentText>
                    <DialogContentText>
                        with CRUD operationa...
                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button
                        variant="contained"
                        color="primary"

                        onClick={() =>{
                            set_state((prevState)=>{
                                return({
                                    ...prevState,
                                    open_ok_dialog:false,
                                })
                            })

                        }}
                    >
                        Ok
                    </Button>

                </DialogActions>

            </Dialog>
        }

        {(!state.open_progress_dialog)?<></>:

            <ProgressDialogForButtonDelete

                state_upper={{progress_linear, progress_circlular}}
                progress_linear={progress_linear.percent}
                progress_circlular={progress_circlular.percent}

                progress_cancel_action={async ()=>{
                    console.log('=== t0 progress_cancel_action ')
                    set_state((prevState)=>{
                        return({
                            ...prevState,
                            open_progress_dialog:false,
                        })
                    })
                }}

            />

        }

        <ButtonExtendedDelete

            use_confirm_dialog={true}
            // use_confirm_dialog={false}

            button_title="Delete all"
            item1_title="Cancel"
            item2_title="Delete"

            use_mount_alert={true}
            title_message_alert={'Deleted successfully ...'}

            use_mount_snackbar={true}
            title_message_snackbar={'Deleted successfully ...'}

            main_element={DeleteForeverOutlinedIcon}
            // main_element={Button}
            variant="contained"

            main_action={async (params_main_action:any)=>{
                console.log('=== d0 main_action ')
                set_state((prevState)=>{
                    return({
                        ...prevState,
                        open_progress_dialog:true
                    })
                })

                const _do = async () => {
                    // progress_circular
                    await kvapi.read({
                        params:{
//                              per_page: 55,
//                              search:'0',
                            status:'draft,publish',
                            _fields:'id'
                            // _fields:'id,title'
                        }
                        ,do_after:(res:any)=>{
                            console.log('=== d0 keyval do_after res ',res)
                            if(undefined!==res){
                                let work_array=res
                                set_progress_circlular((prevState)=>{
                                    return {
                                        ...prevState,
                                        total:work_array.length,
                                        num_started:0,
                                        percent: 0,
                                    }
                                })

                                const do_i = async (p:any) => {
                                    console.log('=== d0 do_i ',p.i)

                                    delayms(p.i * 10 + 2000)

                                    const p_= Math.round(100*p.i/work_array.length)
                                    set_progress_linear((prevState)=>{
                                        return {
                                            progress_title:'Started',
                                            total:work_array.length,
                                            num_started:prevState.num_started+1,
                                            percent: p_,
                                        }
                                    })

                                    console.log('=== d11 do_i p_ ',p_)

                                    set_progress_circlular((prevState)=>{
                                        return {
                                            progress_title:'Finished',
                                            total:work_array.length,
                                            num_started:prevState.num_started+1,
                                            percent: Math.round(100*(prevState.num_started+1)/prevState.total),
                                        }
                                    })

                                    console.log('=== d12 do_i ',p.i)

                                    return {ret_code:200,...p}


                                }//do_i

                                Promise.all(work_array.map((el:any,ii:number)=>
                                    do_i({i: ii})
                                )).then((res:any)=>{
                                    console.log('=== Promise.all ',res)
                                    setTimeout(()=>{
                                        set_state((prevState)=>{
                                            return({
                                                ...prevState,
                                                open_progress_dialog:false,
                                                open_ok_dialog:true, // TODO NOW!!!
                                            })
                                        })


                                        /*=== MESSAGES AFTER BUTTON FINISHED*/
                                        params_main_action?.do_after_main_action()

                                    },2000)
                                })

                            }

                        }
                        ,do_on_pregress:(res:any)=>{
                            console.log('=== d0 keyval progressEvent read ',res)
                            // const percentage = Math.round((res.loaded * 100) / res.total);
                            // console.log('=== d0 keyval percentage read% ',percentage)
                            // set_progress_linear(percentage)
                            // console.log('=== d0 keyval progressEvent read ',res.loaded)
                            console.log('=== d0 response total_data ',res.total_data)
                            console.log('=== d0 response total_data progressEvent.event ',res.progressEvent.event)
                            // console.log('=== d0 response total_data rows originalTarget ',JSON.parse(res.progressEvent.event.originalTarget.response))
                            // console.log('=== d0 response total_data rows explicitOriginalTarget ',JSON.parse(res.progressEvent.event.explicitOriginalTarget.response))

                            let current_num:any=0
                            try {

                                current_num = JSON.parse(JSON_stringify(res.progressEvent.event.originalTarget.response))
                                console.log('=== d0 response current_num1',current_num)
                                current_num = current_num.trim()
                                current_num = JSON.parse(current_num)
                                console.log('=== d0 response current_num2',current_num)
                                current_num = current_num.length
                                console.log('=== d0 response current_num3',current_num)
                                // const percent_ = Math.round(100 * (progress_linear.total + current_num) / res.total_data.total_rows )
                                // console.log('=== d0 response percent_',percent_)

                            }catch (e) {
                                console.log('=== d0 ERROR NON CRITICAL current_num777')
                                return
                            }

                            set_progress_linear((prevState)=>{
                                return {
                                    ...prevState,
                                    progress_title:'Prepared',
                                    total: prevState.total + current_num,
                                    percent: Math.round(100 * (prevState.total + current_num) / res.total_data.total_rows )
                                }
                            })


                        }//do_on_pregress
                    })



                }
                _do()

            }}
        />
    </>)//return
}

export default ButtonWorkDeleteVideos
