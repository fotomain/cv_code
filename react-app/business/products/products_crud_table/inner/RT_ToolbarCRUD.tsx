

import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    CircularProgress,
    IconButton,
    MenuItem,
    Select,
    useMediaQuery
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import {PrintOutlined} from "@mui/icons-material";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";

import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import AlertBasic, {alert_clear_data} from "../alerts/AlertBasic";
import SnackbarBasic from "../alerts/SnackbarBasic";

import {mui_width_in, muiWidth} from "../../../../system_code/code_global/GlobalFunctions";
import {useTheme} from "@mui/material/styles";
import RT_GlobalFilter from "./RT_GlobalFilter";

import RT_TooltipIconCRUD from "./RT_TooltipIconCRUD";

const keyvalBasic:{[index:string]:any} = {}

export const snackbar_clear_data = (p:any) => {

    console.log('=== p.set_state ',p.set_state)

    if(!p.set_state) return //element deleted before this run

    p.set_state((prev_state: any) => {
        return {
            ...prev_state,
            do_mount_snackbar:false,
            snackbar_message_title:'',
        }
    })
}


const RT_ToolbarCRUD = (props:any) => {

    const {
        table,
        ...other
    } = props

    const rows_selected = table.getSelectedRowModel().rows
    let row_focused = table.options.meta?.getFocusedRow()?.memoFocusedRow
    // const rows_selected = table.getIsSomeRowsSelected()
    // console.log('=== r8 rows_selected ',rows_selected)
    // console.log('=== r1 row_focused ',row_focused)

    // 1. arrayRef
    // 2. set ref on Element id='create_one_button'
    // 3. calc xy of ref -> arrayXY{'create_one_button': }
    // 4. show from arrayXY

    let allRefs = useRef(keyvalBasic);

    const [state, set_state] = useState(
        {
            allXY:keyvalBasic,

            toolbar_variant:'search_left',

            snackbar_message_timeout: 1000,
            do_mount_snackbar:false,
            snackbar_message_title:'',

            do_mount_alert: '',
            alert_message_timeout: 1000,
            alert_message_title: '',
            alert_message_props: {},
            alert_message_over_element_name: '',
        }
    );

    // ============== create_finished
    // ============== create_finished
    // ============== create_finished
    useEffect(() => {
        if(props.create_finished) {
            console.log('=== state.create_finished ')

            set_state((prev_state: any) => {
                return {
                    ...prev_state,
                    alert_message_title: 'Create Product finished!',
                    // do_mount_alert: 'center_display',
                    do_mount_alert: 'over_element',
                    alert_message_over_element_name: 'create_one_button',
                    // do_mount_alert: 'shift_element',
                    // do_mount_alert: 'shift_element',
                }
            })

            setTimeout(()=>{
                alert_clear_data({set_state:set_state})
            },state.alert_message_timeout)
        }
        return () => {
        };
    }, [props.create_finished]);

    // ============== read_finished
    // ============== read_finished
    // ============== read_finished
    useEffect(() => {
        // console.log('=== f1 props.first_access ',props.first_access)
        // console.log('=== f1 props.read_finished ',props.read_finished)
        //==== first_access_step5 use
        if('refresh_data_finished'===props.state_upper.do_mount_snackbar_about && props.read_finished) {
            console.log('=== props.read_finished ',props.read_finished)

            set_state((prev_state: any) => {
                return {
                    ...prev_state,

                    // alert_message_title: (props.state_upper.snackbar_message_title)?props.state_upper.alert_message_title:'Refresh finished',
                    // do_mount_alert: 'over_element',
                    // alert_message_over_element_name: 'refresh_button',

                    do_mount_snackbar:true,
                    snackbar_message_title: (props.state_upper.snackbar_message_title)?props.state_upper.snackbar_message_title:'Refresh finished',

                }
            })

            setTimeout(()=>{
                alert_clear_data({set_state:set_state})
                snackbar_clear_data({set_state:set_state})

                props.set_state_upper((prev_state: any) => {
                        return {
                            ...prev_state,

                            alert_message_title: '',
                            do_mount_alert_about: '',
                            alert_message_over_element_name: '',

                            do_mount_snackbar_about:'',
                            snackbar_message_title:'',
                            do_after_state_refresh: (()=>{}),

                        }
                    })

            },state.alert_message_timeout)
        }
        return () => {
        };
    }, [props.read_finished,props.state_upper.do_mount_snackbar_about]);

    // ============== delete_finished
    // ============== delete_finished
    // ============== delete_finished

    useEffect(() => {
        console.log('=== state.delete_finished 1')
        if(props.delete_finished)
            console.log('=== props.delete_response',props.delete_response.response_data.payload.delete_json_data.fromWhere)

        //========== INIT SNACKBAR
        if(props.delete_finished && "crud_row"===props.delete_response.response_data.payload.delete_json_data.fromWhere) {

                set_state((prev_state: any) => {
                    return {
                        ...prev_state,
                        do_mount_snackbar:true,
                        snackbar_message_title:'Delete finished',
                    }
                })


            setTimeout(()=>{
                snackbar_clear_data({set_state:set_state})
                props.do_after_delete_alert?.()
            },state.snackbar_message_timeout)

        }

        //========== INIT ALERT
        if(props.delete_finished && "crud_toolbar"===props.delete_response.response_data.payload.delete_json_data.fromWhere) {
            console.log('=== state.delete_finished 2')

            set_state((prev_state: any) => {
                return {
                    ...prev_state,
                    alert_message_title: 'Delete Product finished!',
                    do_mount_alert: 'over_element',
                    alert_message_over_element_name: 'delete_one_button',
                }
            })

            setTimeout(()=>{
                alert_clear_data({set_state:set_state})
                props.do_after_delete_alert?.()
            },state.alert_message_timeout)
        }
        return () => {
        };
    }, [props.delete_finished]);

    // =============== allRefs
    // =============== allRefs
    // =============== allRefs

    useEffect(() => {
        // console.log('=== t5 allRefs ',allRefs)
        const allKeys = Object.keys(allRefs.current)
        // console.log('=== t5 allKeys ',allKeys)
        let cXY:any={}
        for (let i = 0; i <allKeys.length; i++) {

            const current_ = allRefs?.current[ allKeys[i] as string  ]
            console.log('=== t5 current_',current_)
            if(null!==current_) {
                let tdata = {...JSON.parse(JSON.stringify(current_?.getBoundingClientRect()))}
                tdata.xstart = tdata.x + window.scrollX
                tdata.ystart = tdata.y + window.scrollY
                tdata.xend = tdata.x + tdata.width + window.scrollX
                tdata.yend = tdata.y + tdata.height + window.scrollY
                // console.log('=== t5 tdata2 ',tdata)
                cXY[allKeys[i] as string] = tdata
            }
        }
        //
        set_state((prev_state:any)=>{return  {...prev_state,
            allXY: cXY
        }})

        return () => {

        };
    }, [allRefs]);


    const ProgressorLocal = () => {
      return(

          <IconButton>
              <CircularProgress size='24px' color="secondary" title={'Createing...'}/>
          </IconButton>

      )
    }

    let ref_input_global_filter = useRef<HTMLInputElement>(null)

    const mui_width = muiWidth({theme:useTheme(),useMediaQuery:useMediaQuery})

    // 000 sss1
    return(<>

        {/*<div>state {JSON.stringify(state.do_mount_alert)}</div>*/}
        {/*<div>state.do_mount_alert {(state.do_mount_alert)?'true':'false'}</div>*/}
        {/*<div>state.do_mount_snackbar {(state.do_mount_snackbar)?'true':'false'}</div>*/}
        {/*<div>props.create_finished {(props.create_finished)?'true':'false'}</div>*/}
        {/*<div>props.delete_finished {(props.delete_finished)?'true':'false'}</div>*/}

        {(state.do_mount_snackbar) ?
            <SnackbarBasic {...state} />:<></>
        }{/*alert*/}

        {(state.do_mount_alert && ('center_display' === state.do_mount_alert))?
            <AlertBasic {...state}
                        // clear_alert={
                        //     alert_clear_data({set_state})
                        // }
            />:<></>
        }{/*alert*/}


        <Box id={'div_crud_toolbar_with_search'}
             sx={{
                 display: 'flex',
                 flexDirection:(mui_width_in('lg,xl,md',mui_width))?"row":'column',
                 justifyContent:(mui_width_in('lg,xl,md',mui_width))?"start":'left',
                 // flexDirection:'column',
                 // justifyContent:'start',
                 // flexDirection:'row',
                 // justifyContent:'left',

                 // gap: {xs:'4px', sm:'4px', md:'16px', },
                 padding: '4px'
             }}
        >

            {(!('search_left'===state.toolbar_variant))
                ?<></>
                :
                <Box sx={{width:{xs: '355px', sm: '655px', md: '760px', lg: '100%', xl: '100%'}}}>
                    {/*// glwidth */}
                    <RT_GlobalFilter
                        {...props}
                        id={'RT_GlobalFilter01'}
                        ref_input_global_filter={ref_input_global_filter}
                    />
                </Box>
            }

            <Box id={'div_crud_toolbar_buttons'}
                 sx={{
                     display: 'flex',
                     // flexDirection:'column',
                     flexDirection:'row',
                     justifyContent:'left',
                     gap: {xs:'4px', sm:'4px', md:'16px', },
                     padding: '4px' }}
            >

                {/*TableToolbarCRUD*/}
                {/*TableToolbarService*/}

                {/* optioms_ <>Createing...AS TEXT</>*/}

                {/*{(!state.createing_finished)?<></>:<>createing_finished</>}*/}

                {/*options_ alert near button*/}

                {(state.do_mount_alert &&
                    (
                        (
                            ('over_element' === state.do_mount_alert)
                            // &&
                            // ('create_one_button' === state.alert_message_over_element_name)
                        )
                        ||
                        ('shift_element' === state.do_mount_alert)

                    )
                )?
                    <AlertBasic {...state} />:<></>
                }{/*alert*/}

                {(props.create_started)
                    ?
                    <ProgressorLocal/>
                    :
                    <RT_TooltipIconCRUD title="Create new"
                    >
                            <IconButton
                                ref = {ref => allRefs.current['create_one_button'] = ref}
                                onClick={()=>{
                                    props.onCreate?.() // run create_started=true
                                }}
                            >
                                <AddCircleOutlineOutlinedIcon />
                            </IconButton>
                    </RT_TooltipIconCRUD>
                }

                <RT_TooltipIconCRUD title="Create as copy of Selected">

                            <IconButton
                                ref = {ref => allRefs.current['create_as_copy_button'] = ref}
                                disabled={!(
                                    (1===rows_selected.length)
                                    ||
                                    (undefined!==row_focused)
                                )}
                                onClick={()=>{
                                    // alert('Create on Based 1 Selected')
                                    props.onCopy?.() // run create_started=true
                                }}
                            >
                                <ControlPointDuplicateIcon />
                            </IconButton>

                </RT_TooltipIconCRUD>

                <RT_TooltipIconCRUD title="Copy Row Content of Selected">
                            <IconButton
                                ref = {ref => allRefs.current['copy_content_button'] = ref}
                                disabled={!(1===rows_selected.length)}
                                onClick={()=>{
                                    alert('Copy Selected Content')
                                }}
                            >
                                <ContentCopyIcon />
                            </IconButton>
                </RT_TooltipIconCRUD>


                <RT_TooltipIconCRUD title="Edit: Publish or Draft Selected">
                            <IconButton

                                disabled={!(rows_selected.length===1)}
                            >
                                <DriveFileRenameOutlineOutlinedIcon />
                            </IconButton>
                </RT_TooltipIconCRUD>

                <RT_TooltipIconCRUD title="Read and ShowVideo Card of Selected">
                            <IconButton

                                disabled={!(rows_selected.length===1)}
                            >
                                <ChromeReaderModeOutlinedIcon />
                            </IconButton>
                </RT_TooltipIconCRUD>

                {/*//c+*/}
                {/*optins_  buttons = F( icons / texts */}

                <RT_TooltipIconCRUD title="Delete Forever - if only 1 Selected">
                            {props.delete_started && (1<=rows_selected.length)
                                ?
                                <ProgressorLocal/>
                                :
                                <IconButton
                                    ref = {ref => allRefs.current['delete_one_button'] = ref}
                                    title="Delete Selected"
                                    disabled={
                                        props.delete_started
                                        || !(
                                            (1<=rows_selected.length)
                                            ||
                                            (undefined!==row_focused)
                                        )
                                    }
                                    onClick={() => {
                                        props.onDelete?.()
                                    }}

                                >
                                    <DeleteForeverOutlinedIcon/>
                                </IconButton>
                            }
                </RT_TooltipIconCRUD>

                <Box sx={{width:{xs: '0px', sm: '0px', md: '10px', lg: '250px', xl: '250px'}}}></Box>

                {(window.innerWidth<950)?null:
                    <Select
                        variant={'standard'}
                        // labelId="demo-simple-select-standard-label"
                        // id="demo-simple-select-standard"
                        value={state.toolbar_variant}
                        onChange={(e)=>{

                            set_state((prev_state:any)=>{return  {...prev_state,
                                toolbar_variant: e.target.value
                            }})

                        }}
                        // label="Age"
                    >
                        <MenuItem value={'search_left'} >search left side</MenuItem>
                        <MenuItem value={'search_right'}>search right side</MenuItem>
                    </Select>
                }


                <RT_TooltipIconCRUD
                    title="PDF to Print All or Selected"
                >
                    <IconButton
                        onClick={(e) => props.onPrint?.(e)}
                    >
                        <PrintOutlined />
                    </IconButton>
                </RT_TooltipIconCRUD>


                {(props.read_started)
                    ?
                    <ProgressorLocal/>
                    :
                    <IconButton
                        title="Refresh Data"
                        ref = {ref => allRefs.current['refresh_button'] = ref}
                        onClick={() =>{
                            props.onRefresh?.()
                            // set_state((prev_state:any)=>{return  {...prev_state,
                            //     state_refresh: Date.now()
                            // }})

                        }}
                    >
                        <SyncOutlinedIcon/>
                    </IconButton>
                }

            </Box> {/*=== div_crud_toolbar_buttons*/}
            {(!('search_right'===state.toolbar_variant))
                ?<></>
                :
                <>
                    {/*<Box sx={{width:{xs: '0px', sm: '0px', md: '100%', lg: '100%', xl: '100%'}}}></Box>*/}
                    <Box sx={{width:{xs: '355px', sm: '655px', md: '760px', lg: '100%', xl: '100%'}}}>
                        {/*// glwidth */}
                        <RT_GlobalFilter
                            id={'RT_GlobalFilter02'}
                            {...props}
                            ref_input_global_filter={ref_input_global_filter}
                        />
                    </Box>
                </>
            }

        </Box> {/*div_crud_toolbar_with_search*/}





    </>)

}

export default RT_ToolbarCRUD
