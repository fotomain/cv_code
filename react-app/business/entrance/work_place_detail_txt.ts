
import {is_empty} from "../../system_code/code_global/GlobalFunctions";

const work_place_detail_txt = (t:string,d:any) => {

    // console.log('=== work_place_detail_txt',d)

    switch (t) {
        case 'visibility': {
            let tvisibility=''
            const tjson = d?.cloud_props?.current_application?.visibility
            if(!is_empty(tjson)) {
                return  JSON.stringify(tjson)
            }
            return tvisibility
        }

        case 'userAgent': {
            return d?.info?.userAgent
        }

        case 'email': {
            if(d?.logged_in_auth_info?.currentUser)
                return d?.logged_in_auth_info.currentUser.email
            else    return ''
        }

        case 'os': {

            let tOS=''

            if(!is_empty(d?.current_device?.info)) {
                Object.entries(d?.current_device?.info?.os).map((el: any, ii: number) => {
                    // console.log('=== el tOS ',el)
                    if (el[1]) {
                        tOS = el[0]
                    }
                })
            }
            return tOS

        }

    }


    return t+' - not defined'

}

export {work_place_detail_txt}
