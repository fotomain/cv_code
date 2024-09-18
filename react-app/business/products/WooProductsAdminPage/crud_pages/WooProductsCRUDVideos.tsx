

import {tw_col_center} from "../../../../system_code/tw/tw_tools";
import React from "react";
import WooProductsCRUDVideosCREATEPage from "./WooProductsCRUDVideosCREATEPage";
import CRUDTabPanelBasic from "../CRUDTabPanelBasic";
import {GlobalsContext} from "../../../../system_code/context_globals/globals_context";
import {isCyclic} from "../../../../system_code/code_global/GlobalFunctions";
import WooProductsCRUDVideosDELETEPage from "./WooProductsCRUDVideosDELETEPage";
import WooProductsCRUDVideosREADPage from "./WooProductsCRUDVideosREADPage";
import H16 from "../../../entrance/steps/H16";
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";
const WooProductsCRUDVideos = () => {

    const history = useHistory();

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    return(

        <div className={tw_col_center} id={'div_WooVideos'} >

            {/*<div>global_props.navigation.tab_value_products_crud_videos {global_props.navigation.tab_value_products_crud_videos}</div>*/}

            <CRUDTabPanelBasic
                tab_value={global_props.navigation.tab_value_products_crud_videos}
                set_tab_value={(tab_val:any)=> {

                    const tdata = global_props.navigation
                    console.log('=== global_props.navigation',global_props.navigation)
                    console.log('=== global_props.navigation isCyclic ',isCyclic(global_props.navigation))
                    tdata.tab_value_products_crud_videos = tab_val
                    console.log("=== SETTER_NAVIGATION start ",tdata)
                    global_dispatch({
                        type: 'SETTER_NAVIGATION',
                        global_new_data:{navigation:tdata},
                    })


                }}
                title={'CRUD Videos'}
                create={<WooProductsCRUDVideosCREATEPage/>}
                read={<div>
                    <WooProductsCRUDVideosREADPage/>
                </div>}
                update={<div className={tw_col_center}>
                    <H16>You can update video URL</H16>
                    <H16>in Products dashboard</H16>
                    <Button
                        variant={'contained'}
                        onClick={() =>{
                            history.push('/products')
                        }}
                    >Continue with Products</Button>
                </div>}
                delete={<div>
                    <WooProductsCRUDVideosDELETEPage/>
                </div>}
            />


        </div>

            )

}

export default WooProductsCRUDVideos
