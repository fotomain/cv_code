import {useState} from "react";
import {Button} from "@mui/material";

const NewComponent = (props:any) => {

    const [state, set_state] = useState(
        {
            open: true,
        }
    );

    // set_state((prev_state: any) => {
    //     return {
    //         ...prev_state,
    //         price_min:e.target.value,
    //     }
    // })

    return(<>

        <div>state {JSON.stringify(state)}</div>
    </>)

}

export default NewComponent
