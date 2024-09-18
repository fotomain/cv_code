import {
    AT_DISPLAY_ACTION,
} from '../state_redux/actions_types';

import {initialState} from '../state_redux/initial_state';
import {interface_state} from "./global_var";

const thisFile = "FILE_display_reducer"

export default (state = initialState, action:any) => {
    const debug1 = 0;
    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log("=== REDUCER "+ thisFile + Date.now())


    let initVal=0;
    let tState : interface_state = {}
    console.log( "=== state display_reducer ", state)
        Object.entries( state ).reduce((ind:any, el)=>{

                if(-1==["1","2","3","4","5","6","7","8","9","0"].indexOf(el[0].toString().substring(0,1))){
                    // console.log("=== ret1 " + cEl[0] )
                    //console.log("=== display el state", el)

                    if(-1==[
                        "mode_redraw_tab4_name",
                        "mode_open_form_reg_lexemas_crud_create",
                    ].indexOf(el[0])){
                        //contunue
                    }else {
                        tState[el[0]] = el[1]
                    }

                }

            },
            initVal
        )

    console.log("=== tState ", tState)

    if(AT_DISPLAY_ACTION == action.type ) {

        let ret = {}

        console.log("=== DISPLAY_ACTION ")
        // console.log(action)
        console.log("=== p_data_items ", action.p_data.p_data_items)
        console.log("=== length ", action.p_data.p_data_items.length)
        // console.log(action.p_data.p_data_items[0].key)
        // console.log(action.p_data.p_data_items[0].value)

        for ( let i = 0; i < action.p_data.p_data_items.length; i++) {

            let el = action.p_data.p_data_items[i]
            ret =  {
                ...ret,
                [el.key]: el.value,
            }

        }

        console.log("=== ret ",ret)

        ret =  {
            ...tState,
            ...ret
        }

        return ret;

    }


    return state;
}
