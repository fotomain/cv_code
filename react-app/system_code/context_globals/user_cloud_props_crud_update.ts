
import {doc, setDoc} from "firebase/firestore";
import {fidb} from "../firebase_stack/fi_firebase-config";
import {is_empty, JSON_stringify} from "../code_global/GlobalFunctions";



const user_cloud_props_crud_update =  async (params:any) => {
    // console.log('=== user_settings_crud_update ',params.global_props.current_user.user_guid)
    // console.log('=== user_settings_crud_update ',params.global_props.navigation)
    // console.log('=== user_settings_crud_update isCyclic ',isCyclic(params))


    if (!params.global_props.current_user.step_logged_in)
            return

    const data_ =JSON.parse(JSON_stringify(params.global_props))

        //============ GLOBAL port_user_settings
        if( "use_the_same_settings_for_all_devices"===params.global_props.current_user.system_options.settings_usage_mode ){

        const doc_ref
            = doc(fidb,'port_user_settings',params.global_props.current_user.user_guid)

            console.log('=== user_settings_crud_update doc_ref ',doc_ref)

                const res1 =  setDoc(doc_ref,
                    {
                        cloud_props:data_,
                        system_options:data_.current_user.system_options,
                    }
                    , {merge: true}
                )

                console.log('=== user_settings_crud_update res1 ',res1)
        }

}

export default user_cloud_props_crud_update
