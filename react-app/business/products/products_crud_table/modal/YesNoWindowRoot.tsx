import React from "react";
import {TJSONAny} from "../../../../system_state/products_state/models/global_types";
import YesNoWindowOK from "./YesNoWindowOK";
import YesNoDeleteProducts from "./YesNoDeleteProducts";

const YesNoWindowRoot = (props:any) => {

    // console.log('=== YesNoWindowRoot0',props.window_name)

    let componenets:TJSONAny
    componenets = {
        YesNoWindowOK:YesNoWindowOK,
    }

    let WorkComponenet = componenets['YesNoWindowOK']
    if(props.work_component)
        WorkComponenet = componenets[props.work_component as string]

            return(<>

                <WorkComponenet {...props}/>

            </>)

}

export default YesNoWindowRoot
