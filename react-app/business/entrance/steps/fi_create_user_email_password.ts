import {createUserWithEmailAndPassword} from "firebase/auth";
import {fiauth} from "../../../system_code/firebase_stack/fi_firebase-config";

const fi_create_user_email_password = async (params: any) => {
    //bp_create_user_in_fi
    console.log('=== global_props.input_data.new_email ', params.new_email)
    console.log('=== global_props.input_data.new_password ', params.new_password)
    try {
        const here_user = await createUserWithEmailAndPassword(
            fiauth,
            params.new_email,
            params.new_password
        );
        console.log("=== createUserWithEmailAndPassword here_user ", here_user);

        params?.do_after()

    } catch (error: any) {
        console.log("=== createUserWithEmailAndPassword error.message ", error.message);
        console.log(error.message);
    }
};




export default fi_create_user_email_password

