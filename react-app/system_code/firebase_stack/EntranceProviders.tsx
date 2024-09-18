
//rsi

import React from 'react';
import {GlobalsContext} from "../context_globals/globals_context";
import EntranceVariants from './EntranceVariants';

const EntranceProviders = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    return(
        <>
        <div>EntranceProviders</div>
        {/*<div>{JSON.stringify(global_props.entrance)}</div>*/}
            <EntranceVariants/>
        </>
    )
};


export default EntranceProviders
