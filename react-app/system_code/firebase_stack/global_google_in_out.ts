
import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {fiauth} from "./fi_firebase-config";

export const sign_in_with_google = async () => {

    const debug=true

    if (debug) alert('sign_in_with_google 01')
    const googleProvider = new GoogleAuthProvider();
    try {
        //=== new key const newPostKey = push(child(ref(db), 'posts')).key;
        if (debug) alert('sign_in_with_google 02')
        // const result =
            await signInWithPopup(fiauth, googleProvider).then((res)=>{
                alert("==== signInWithPopup !!! OK"+JSON.stringify(res))
            }).catch((err)=>{
                alert("==== signInWithPopup ERR " + err.code +' --- ' + err.message)
            });
        if (debug) alert('sign_in_with_google 03')
        //=== NOT NEED BECAUSE see console.log("=== tu.step_l auth ",auth)
        // const user_result = global_props.current_user
        // const tu = global_props.current_user
        // //CHANGE STEPS 1 signIn sign_in_with_google
        // tu.logged_in_auth_info = result
        // tu.step_logged_in = false
        // console.log("=== tu.step_ logged_in_auth_info = result",Date.now())
        //
        // global_dispatch({type: "SETTER_USER", global_new_data: {user: tu}})

        // const user_result = result.user;
        // logged_in_auth_info
        // tu.logged_in_auth_info=user_result

        // console.log("=== sign_in_with_google user_result "+Date.now(), user_result)
        // console.log("=== sign_in_with_google metadata.createdAt "+Date.now(), user_result.metadata)
        // console.log("=== sign_in_with_google metadata.lastLoginAt "+Date.now(), user_result.metadata)

        // console.log("=== sign_in_with_google user_result.uid "+Date.now(), user_result.uid)

    } catch (err:any) {
        if (debug) alert('sign_in_with_google 04')
        console.error('=== ERR sign_in_with_google',err);
        alert(' === ERR sign_in_with_google '+err?.message);
    }
};



export const sign_out_with_google = async (params:any) => {

    await signOut(fiauth).then((res:any)=>{
        console.log("=== onAuthStateChanged user_result 111 ")
        if(params.do_after) params.do_after()
    })

};
