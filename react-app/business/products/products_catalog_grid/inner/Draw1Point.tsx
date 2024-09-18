import React from "react";

const Draw1Point = (props:any) => {

    return(<div id={'zero_data'}>
        <img   src={'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='} alt=""
               onLoad={()=>{
                   props.onLoad()
               }}
        />
    </div>)
}

export default Draw1Point
