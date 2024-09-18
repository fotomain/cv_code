
import React, {useEffect, useRef, useState} from "react";
import {Button} from "@mui/material";

import DialogOk from "./YesNoDialog";

import YesNoDelete from "./YesNoDialog";
import {
    PRODUCTS_DELETE_RUN_ACTION,
    PRODUCTS_SET_SELECTED_ACTION,
    PROGRESS_DIALOG_OPEN_ACTION,
    YESNO_DIALOG_OPEN_ACTION
} from "../../../../system_state/products_state/actions";
import {SEL_PRODUCTS_SET_SELECTED, SEL_PROGRESS_DIALOG_OPEN, SEL_YESNO_DIALOG_OPENED} from "../../../../system_state/products_state/selectors";
import {useSelector} from "react-redux";
import ProgressDialogDouble from "./ProgressDialogDouble";
import {WooDeleteParams} from "../../../../system_state/products_state/models";

const YesNoDeleteProducts = (props:any) => {

    let controller_cancel = new AbortController();

    const [state, set_state] = useState(
        {
            state_refresh: Date.now(),

            dialog_ok_open: false,

            //alerts_step3
            allXY:{},

            progress_linear:
                {
                    title: 'Prepared',
                    percent: Math.round(100*0 / 120),
                    finished: 0,
                    total: 0,
                }
            ,
            progress_circlular:
                {
                    title: 'Finished',
                    percent: Math.round(100*0 / 120),
                    finished: 0,
                    total: 0,
                }

        }
    );

    //=== PS_STEP6
    const rows_selected = useSelector(SEL_PRODUCTS_SET_SELECTED)

    const yesno_dialog_opened = useSelector(SEL_YESNO_DIALOG_OPENED);

    //APP_ACTION_STEP_7
    const progress_dialog_opened = useSelector(SEL_PROGRESS_DIALOG_OPEN);



    useEffect(() => {
        console.log('=== rows_selected 222',rows_selected)
        return () => {

        };
    }, [rows_selected]);


    useEffect(() => {

        // delete_many
        if(100<=state.progress_circlular.percent){
            props.dispatch(PROGRESS_DIALOG_OPEN_ACTION({new_value:false}))
            // alert('Delete completed!')
            set_state((prev_state:any)=>{return  {...prev_state,
                dialog_ok_open:true,
                state_refresh: Date.now(),
            }})

        }

        return () => {

        };
    }, [state.progress_circlular]);

    const refYesDelete = useRef<HTMLButtonElement>(null)
    const refYesOk = useRef<HTMLButtonElement>(null)



    return(<>

        {/*============== DialogOk*/}
        {/*============== DialogOk*/}
        {/*============== DialogOk*/}

        <DialogOk
            open={state.dialog_ok_open}
            title={'Delete completed!'}
            text={state.progress_circlular.finished+' items deleted.'}
            btnPressCtrlEnterRef={refYesOk}
            onBackdropClick={()=>{
                set_state((prev_state:any)=>{return  {...prev_state,
                    dialog_ok_open:false
                }});

            }}

        >
            <Button
                ref={refYesOk}
                variant={'contained'}
                onClick={() =>{
                    set_state((prev_state:any)=>{return  {...prev_state,
                        dialog_ok_open:false
                    }});
                }}
            >
                Ok
            </Button>

        </DialogOk>


        <ProgressDialogDouble

            progress_linear={state.progress_linear}

            progress_circlular={state.progress_circlular}

            open={progress_dialog_opened}
            title={'Progress'}

            disableEscapeKeyDown={true}
            onBackdropClick={()=>{
                // dispatch(PRODUCTS_DELETE_FINISHED_CLEAR_ACTION({new_value:false}))
            }}

            // onCancel={()=>{
            //     dispatch(PRODUCTS_DELETE_FINISHED_CLEAR_ACTION({new_value:false}))
            // }}

            onCloseByKey={()=>{
                // dispatch(PRODUCTS_DELETE_FINISHED_CLEAR_ACTION({new_value:false}))
            }}


        >

            <Button
                variant={'text'}
                onClick={() =>{

                    //=== DOC https://stackoverflow.com/questions/66970502/cancel-async-axios-get-request-react-hooks
                    controller_cancel.abort();
                    props.dispatch(PROGRESS_DIALOG_OPEN_ACTION({new_value:false}))

                }}
            >
                Cancel
            </Button>


        </ProgressDialogDouble>


        <YesNoDelete

            open={yesno_dialog_opened}

            btnPressCtrlEnterRef={refYesDelete}
            title={'Are you shure you want to delete?'}
            text={rows_selected.length+' products will be deleted.'}
            // text={JSON.stringify(rows_selected)}
            disableEscapeKeyDown={false}
            onBackdropClick={()=>{
                props.dispatch(YESNO_DIALOG_OPEN_ACTION({new_value:false}))
            }}

            // onCancel={()=>{
            //     props.dispatch(YESNO_DIALOG_OPEN_ACTION({new_value:false}))
            // }}

            onCloseByKey={()=>{
                props.dispatch(YESNO_DIALOG_OPEN_ACTION({new_value:false}))
            }}


        >

            <Button
                variant={'outlined'}
                onClick={() =>{
                    props.dispatch(YESNO_DIALOG_OPEN_ACTION({new_value:false}))
                }}
            >
                No
            </Button>

            <Button
                ref={refYesDelete}
                variant={'contained'}
                onClick={() =>{
                    props.dispatch(YESNO_DIALOG_OPEN_ACTION({new_value:false}))
                    props.dispatch(PROGRESS_DIALOG_OPEN_ACTION({new_value:true}))


                    console.log("=== rows_selected  111 ",rows_selected)

                    const do_delete1product = async (p:any) => {

                        // let timeout_=p.i * 500 + 500
                        // let timeout_=100
                        let timeout_=p.i * 100

                        setTimeout(()=>{
                            console.log('=== d1 111 do_delete1product ',p)

                            const params_= {percent: Math.round(100 * (p.i + 1) / p.total)}
                            console.log('=== d1 do_delete1product params_ ',params_)
                            set_state((prev_state:any)=>{return  {...prev_state,
                                progress_linear: {
                                    title:'Delete started',
                                    // title:'Prepare: check in Orders',
                                    finished:0,
                                    total:p.total,
                                    percent:params_.percent,
                                }
                            }});

                            props.dispatch(PRODUCTS_DELETE_RUN_ACTION(
                                {
                                    entity_guid:p.entity_guid,
                                    delete_json_data:{
                                        controller_cancel:p.controller_cancel,
                                        do_after_delete_finished:async ()=>{
                                            set_state((prev_state:any)=>{
                                                console.log('=== prev_state ',prev_state)
                                                return  {...prev_state,
                                                    progress_circlular: {
                                                        title:'Finished',
                                                        // title:'Prepare: check in Orders',
                                                        finished:prev_state.progress_circlular.finished+1,
                                                        total:p.total,
                                                        percent: Math.round(100 * (prev_state.progress_circlular.finished+1) / p.total),
                                                    }
                                                }});
                                        }
                                    }
                                } as WooDeleteParams
                            ))

                            return {ret_code:'OK',p}

                        },timeout_)

                    }

                    // delete_many
                    const work_array = rows_selected

                    Promise.all(work_array.map((el:any,ii:number)=>
                        do_delete1product({i:ii, total:work_array.length, id: el.original.id, entity_guid:el.original.entity_guid})
                    )).then((res:any)=>{
                        console.log('=== d1 Promise.all ',res)
                        console.log('=== d1 Promise.all state ',state)
                        // props.dispatch(PROGRESS_DIALOG_OPEN_ACTION({new_value:false}))
                    })

                }}
            >
                Yes
            </Button>


        </YesNoDelete>
    </>)

}

export default YesNoDeleteProducts
