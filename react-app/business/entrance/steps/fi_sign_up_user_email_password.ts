

import {fidb} from "../../../system_code/firebase_stack/fi_firebase-config";
import {doc, setDoc} from "firebase/firestore";

const sign_up_user_email_password = async (params:any) => {
    try {
        // bp_sign_up_with_email_start
        console.log('=== bp_sign_up_with_email_start')

        const key_=JSON.stringify({
            email: params.email,
            device_guid: params.global_props.current_device.settings.device_guid
        })
        console.log('=== bp_sign_up_with_email_start        key_ ',key_)

        setDoc(
            doc(fidb, 'port_otp_for_check', key_)
            , {
                bp: 'bp_sign_up_with_email',
                new_email: params.email,
                otp_plan: '',
                created: 0,
                expired: 0,
            }
        ).then((res) => {
            console.log('=== bp_sign_up_with_email_start        res setDoc ',res)
            params?.do_after()
        }).catch(error => {
            console.log('=== bp_sign_up_with_email_start        Error setDoc // TODO 10.09.2024 18:31 ',error)
        });

    } // try

    catch (error: any) {
        console.log('=== sign_in_user_email_password ', params.email, params.password);
        console.log('=== sign_in_user_email_password ', error.message);
    }
}

export default sign_up_user_email_password
