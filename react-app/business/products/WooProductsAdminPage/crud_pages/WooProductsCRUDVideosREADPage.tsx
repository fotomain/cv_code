import React, {useState} from "react";
import {Button} from "@mui/material";

import CWooEntity from "../woo_api/WooEntityRoot.js";
import {useHistory} from "react-router-dom";
import H16 from "../../../entrance/steps/H16";
import {tw_col_center} from "../../../../system_code/tw/tw_tools";

class woo_metadata  {

    woo_users = new CWooEntity('users')

    woo_products = new CWooEntity('products')
    woo_attributes = new CWooEntity('products/attributes')
    woo_attributes_terms = new CWooEntity('products/attributes/11/terms')
    woo_categories = new CWooEntity('products/categories')

}

const md = new woo_metadata()

const WooProductsCRUDVideosREADPage = (props:any) => {

    const [state, set_state] = useState(
        {
            open: true,
        }
    );

    const history = useHistory();

    return(<div className={tw_col_center}>
        <H16>You can read video URL</H16>
        <H16>in Products dashboard</H16>
        <Button
            variant={'contained'}
            onClick={() =>{
                history.push('/products')
            }}
        >Continue with Products</Button>

        {/*<Button*/}
        {/*    onClick={() =>{*/}
        {/*        set_state((prev_state:any)=>{return  {...prev_state,*/}
        {/*            open: false*/}
        {/*        }});*/}

        {/*        md.woo_products.read({*/}
        {/*        }).then((res:any) => {*/}
        {/*            console.log('=== woo_api  ',res)*/}
        {/*            console.log('=== woo_api ▄▄▄▄▄▄▄▄▄▄▄▄▄ WooProductsCRUDVideosREADPage ',res.data)*/}
        {/*        })*/}


        {/*    }}*/}
        {/*>*/}
        {/*    WooProductsCRUDVideosREAD*/}
        {/*</Button>*/}

        {/*<div>state {JSON.stringify(state)}</div>*/}
    </div>)

}

export default WooProductsCRUDVideosREADPage
