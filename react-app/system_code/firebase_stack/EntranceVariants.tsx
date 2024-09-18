
//rsi

import { Stack } from '@mui/material';
import React, {useState} from 'react';
import {StackColumn, StackRow} from '../code_global/GlobalAtoms';
// import {StackColumn, StackRow} from '../code_global/global_atoms';
import {GlobalsContext} from "../context_globals/globals_context";
import EntranceWithGoogle from "./EntranceWithGoogle";
// import {StackColumn, StackRow} from "../code_global/global_atoms";


const EntranceVariants = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const [variant_pressed, set_variant_pressed] = useState('');


    return(
        <StackColumn alignItems={'left'}>
            <>

            <h1>{('REGISTER'==global_props.entrance.mode_name)?'Register':'Sign In'}</h1>

                <EntranceWithGoogle />


                <StackRow alignContent={'left'} onClick={()=>{
                    console.log(Date.now())
                    set_variant_pressed('facebook')
                }}>
                <>
                <svg style={{color:'#1877f2'}} fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 12.058c0-5.28-4.253-9.558-9.5-9.558s-9.5 4.279-9.5 9.558c0 4.771 3.473 8.725 8.016 9.442v-6.68H8.104v-2.762h2.412V9.952c0-2.395 1.417-3.718 3.588-3.718 1.04 0 2.126.186 2.126.186v2.352h-1.198c-1.18 0-1.548.738-1.548 1.494v1.792h2.635l-.421 2.763h-2.214V21.5c4.543-.717 8.016-4.67 8.016-9.442z" fill="currentColor"></path></svg>
                <div>Continue with Facebook</div>
                </>
            </StackRow>
            <StackRow alignContent={'left'}>
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.37 5.03A2 2 0 0 1 22 7v10a2 2 0 0 1-1.96 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16.1H4zm.13 2.07-4.53 5.31 4.53 4.63a.5.5 0 0 0 0-.04V7.1zm-17-.14a.5.5 0 0 0 0 .04v10a.5.5 0 0 0 0 .04l4.59-4.7L3.5 6.97zm5.57 6.53-3.92 4 13.7.01L15 13.56a4 4 0 0 1-5.93-.07zm9.88-6.99H5l5.07 5.96a2.5 2.5 0 0 0 3.81 0l5.07-5.96z"></path></svg>
                <div>Continue with email</div>
                </>
            </StackRow>
            <StackRow alignContent={'left'}>
                <>
                <div>Continue another way</div>
                </>
            </StackRow>
            </>

            {"goolge"===variant_pressed?<EntranceWithGoogle call_back={()=>{
                set_variant_pressed('')
            }} />:''}

        </StackColumn>
    )
};


export default EntranceVariants
