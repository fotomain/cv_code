

import {collection, deleteDoc, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {fidb} from "./fi_firebase-config";
import {is_empty} from "../code_global/GlobalFunctions";
import {work_place_detail_txt} from "../../business/entrance/work_place_detail_txt";

const one_row_login_places = (params:any) => {

    const tdata = params.doc.data
    const doc = params.doc

    console.log('=== one_row_login_places params ',params)
    console.log('=== one_row_login_places tdata.cloud_props?.current_application?.visibility?.is_focused ',tdata.cloud_props?.current_application?.visibility?.is_focused)

    return {
        device_guid: doc.id, data: tdata,
        is_focused:(tdata.cloud_props?.current_application?.visibility?.is_focused)?'focused':'blur',
        // is_focused:String(tdata.cloud_props?.current_application?.visibility?.is_focused),
        os:work_place_detail_txt('os',tdata),
        email:work_place_detail_txt('email',tdata),
        visibility:work_place_detail_txt('visibility',tdata),
        userAgent:work_place_detail_txt('userAgent',tdata),
    }
}


const fi_login_places_crud_create = (params:any) => {

    console.log('=== fi_login_places_crud_create params ',params)

    const doc_ref= doc(fidb,'port_logged_in_users',params.user_guid, 'login_places', params.device_guid )
    setDoc(
        doc_ref
        , {...params.data},
         { merge: true }

    ).then((res:any) => {
        console.log('=== fi_login_places_crud_create OK')
        if(params.do_after) params.do_after(res)
    })

}


const fi_login_places_crud_delete = (params:any) => {
    const doc_ref= doc(fidb,'port_logged_in_users',params.user_guid, 'login_places', params.device_guid )
    deleteDoc(
        doc_ref
    ).then((res) => {
        console.log('=== port_logged_in_users delete OK el_logged_in.device_guid')
        // in_state('refresh_time_stamp',Date.now())
        params.do_after(res)
        // get_connections()
    })

}

const fi_login_places_crud_read = async (params:any) => {

    var tConnections:any =[]

    if(!is_empty(params.user_guid)) {
        //login_places_crud_read
        let querySnapshot = null
        if(params.device_guid){
            const one_doc_ref = doc(fidb, 'port_logged_in_users', params.user_guid, 'login_places',params.device_guid)
            const one_doc = await getDoc(one_doc_ref);
            if(one_doc.exists()){
                const one_doc_data=one_doc.data()
                tConnections.push({device_guid: one_doc.id, data: one_doc_data})

            }
            else{
                //TODO ERROR
            }
        }
        else{
            querySnapshot = await getDocs(collection(fidb, 'port_logged_in_users', params.user_guid, 'login_places'))
            console.log('=== querySnapshot ',querySnapshot)
            querySnapshot.forEach((doc: any) => {
                tConnections.push({device_guid: doc.id, data: doc.data()})
            });

        }
    }


    if(params.do_after){
        params.do_after({login_places: tConnections})
    }
    else{
        //TODO ERROR
    }

}


const fi_login_places_crud_disconnect_start = (params:any) => {

    fi_login_places_crud_update({
        ...params,
        data:{
            do_disconect:true
        }
    })
}

const fi_login_places_crud_disconnect_finish = (params:any) => {

    fi_login_places_crud_update({
        ...params,
        data:{
            do_disconect:false
        }
    })
}

const fi_login_places_crud_update = (params:any) => {

    console.log('=== params fi_login_places_crud_update ',params)
    const doc_ref= doc(fidb,'port_logged_in_users',params.user_guid, 'login_places', params.device_guid )
    setDoc(
        doc_ref
        , {...params.data},
         { merge: true }
    ).then(async (res)=>{

        console.log('=== fi_login_places_crud_update OK ')
        if(params.do_after) params.do_after(res)

    })
}

export {
    fi_login_places_crud_create,
    fi_login_places_crud_read,
    fi_login_places_crud_update,
    fi_login_places_crud_delete,

    fi_login_places_crud_disconnect_start,
    fi_login_places_crud_disconnect_finish,

    one_row_login_places,

}



