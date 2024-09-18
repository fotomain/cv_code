
import {doc, setDoc} from "firebase/firestore";
import fi_do_refresh_dispatcher from "./fi_do_refresh_dispatcher";
import {fidb} from "../fi_firebase-config";

const fi_job_queue_crud_create = async (job_data:any) => {

    const doc_ref=
        doc(fidb,'job_queue_idle',job_data.job_guid)

    setDoc(
        doc_ref
        , {job_data:job_data}
        , { merge: true }

    ).then( (res:any) => {
        console.log('=== fi_job_queue_create')
//                           if(params.do_after) params.do_after(res)
        //
        // do_refresh_dispatcher

        // const delayms = (milliseconds:number) => {
        //
        //     return new Promise(resolve => {
        //         setTimeout(resolve, milliseconds);
        //     });
        //
        // }

        // await delayms(1000)

        for (let i = 0; i < 50000; i++) {
            console.log('=== waiting for ',i)
        }

        fi_do_refresh_dispatcher()

    })


}
export default fi_job_queue_crud_create
