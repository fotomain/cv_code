
import {doc, setDoc} from "firebase/firestore";
import {fidb} from "../fi_firebase-config";

const fi_do_refresh_dispatcher = () => {
    const doc_ref_start_dispatch
        = doc(fidb,'job_queue','idle')
    setDoc(doc_ref_start_dispatch,
        {last_job_create_timestamp:Date.now()}
        ,{ merge: true }
    )

}

export default fi_do_refresh_dispatcher
