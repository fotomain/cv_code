

import {tw_col_center} from "../../../../system_code/tw/tw_tools";
import {Button} from "@mui/material";
import React, {Ref, useEffect, useRef, useState} from "react";
import Papa from "papaparse";
import fi_job_queue_crud_create from "../../../../system_code/firebase_stack/fi_job_queue/fi_job_queue_crud_create";
import fi_do_refresh_dispatcher from "../../../../system_code/firebase_stack/fi_job_queue/fi_do_refresh_dispatcher";

import {DividerH} from "../MUITools";
import InputFileFilled from "../../../../system_code/input_material5/InputFileFilled";

const WooProductsCRUDVideosCREATEPage = () => {


    const [state, set_state] = useState({
        upload_guid:'upload_guid111',
        products_goog_data:[],
        products_file_parsed:[],
        auto_udate_if_product_exist:true,
        errors:'',
    });

    let ref_local = useRef<HTMLInputElement>(null)

    //refresh_
    useEffect(() => {
        console.log('=== ref_local',ref_local)
        console.log('=== state.products_goog_data',state.products_goog_data)
        return () => {

        };
    }, [ref_local,state.products_goog_data]);


    const [tab_value, set_tab_value] = React.useState(0);
    const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        set_tab_value(newValue);
    };

    return(

        <div className={tw_col_center} id={'div_WooVideosCreate'} >

            <InputFileFilled

                do_after={(p:any)=>{

                    // alert('=== p.file_input + '+JSON.stringify(p.file_input))
                    console.log('=== p.file_input  ',p.file_input)
                    console.log('=== p.file_input.type  ',p.file_input.type)
                    const do_parse_csv = (
                        'application/vnd.ms-excel'===p.file_input.type
                        ||
                        'text/csv'===p.file_input.type
                    )
                    if(!do_parse_csv) {alert('error - file is not CSV format'); return}

                    Papa.parse(p.file_input, {
                        header: true,
                        skipEmptyLines: true,
                        complete: function (results) {

                            console.log('=== results ',results)
                            console.log('=== results S',results.data)

                            const work_array = results.data
                            const goog_data:any = []
                            for (let i = 0; i < work_array.length  ; i++) {
                                const el:any=work_array[i]
                                const line_is_good_product = (el.name && el.type && el.regular_price && el.description)
                                const line_is_good_video = (el.you_url && el.entity_guid )
                                if(
                                    (line_is_good_product || line_is_good_video)
                                ) {
                                    goog_data.push(el)
                                }
                                else {
                                    console.error('=== read file incorect data line # ',i, el)
                                }
                            }

                            console.log('=== goog_data ',goog_data)

                            set_state( (prev_state:any)=> {
                                return {
                                    ...prev_state,
                                    products_goog_data:goog_data,
                                    products_file_parsed:results.data,
                                }
                            })



                        },
                    });


                }}
            />

            <DividerH/>

            <Button
                variant="contained"

                onClick={()=> {

                    // woo_crud_create_main_video
                    const work_array = state.products_goog_data

                    if(!work_array || (0===work_array.length)) {
                        alert('=== no data in file work_array ')
                        return
                    }


                    for (let i = 0; i <work_array.length ; i++) {

                        const line_:any = work_array[i]
                        console.log('=== line_',line_)

                        const moment_=Date.now()
                        let job_data1 = {
                            job_type:'you_url_to_mysql',
                            job_guid:     line_.entity_guid+'__'+moment_,
                            entity_guid:  line_.entity_guid,
                            upload_guid: state.upload_guid,
                            entity_sense:'product_video_main',
                            // TODO job_you_url
                            url:          line_.you_url,
                            user_guid:'uwieortwieputtiweporitwer',
                        }

                        fi_job_queue_crud_create(job_data1)

                    }}
                }
                disabled={(state.products_goog_data.length===0)}

                //local style={{color:'white', backgroundColor:'green', padding:'10px'}}

            >
                CREATE Videos FROM FILE
            </Button>

            {/*<div>state.products_goog_data.length {state.products_goog_data.length}</div>*/}

            <DividerH/>

            <Button
                variant="outlined"
                onClick={()=> {
                    fi_do_refresh_dispatcher()
                }}

            >

                fi_do_refresh_dispatcher
            </Button>

        </div>

            )

}

export default WooProductsCRUDVideosCREATEPage
