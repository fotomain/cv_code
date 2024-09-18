
import {signInWithEmailAndPassword} from "firebase/auth";
import {fiauth} from "../../../system_code/firebase_stack/fi_firebase-config";

const fi_sign_in_user_email_password = async (params:any) => {
    try {


        const here_user = await signInWithEmailAndPassword(
            fiauth,
            params.email,
            params.password,
        );

        console.log('=== fi_sign_in_user_email_password here_user ', here_user);

        params?.do_after()

    } catch (error:any) {
        console.log('=== fi_sign_in_user_email_password ', params.email, params.password);
        console.log('=== fi_sign_in_user_email_password ',error.message);
    }
};

export default fi_sign_in_user_email_password
