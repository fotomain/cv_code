


import { ILogrecsActions, TGloabal_props } from "./globals_types";
import user_cloud_props_crud_update from "./user_cloud_props_crud_update";
export default function logrecsReducer(
    now_props: TGloabal_props,
    activity: ILogrecsActions
): TGloabal_props {
    switch (activity.type) {

        //global_props STEP 4
        case "SETTER_PAGES_NAVIGATION": {
            console.log("=== SETTER_PAGES_NAVIGATION reducer start")
            console.log(activity.global_new_data)
            return {
                ...now_props,
                pages_navigation: activity.global_new_data.pages_navigation,
            };
        }
        case "SETTER_ENTRANCE": {
            console.log("=== SETTER_ENTRANCE reducer start")
            console.log(activity.global_new_data)
            return {
                ...now_props,
                entrance: activity.global_new_data.entrance,
            };
        }
        case "SETTER_GLOBALPROPS": {
            console.log("=== SETTER_GLOBALPROPS reducer start ",activity.global_new_data)
            console.log("=== SETTER_GLOBALPROPS reducer start runtime ",activity.global_new_data.global_props.system.runtime)
            console.log(activity.global_new_data)
            return {
                ...now_props,
                ...activity.global_new_data.global_props,
            };
        }
        case "SETTER_NAVIGATION": {
            console.log("=== SETTER_NAVIGATION reducer start")
            console.log(activity.global_new_data)
            const ret_props={
                ...now_props,
                navigation: activity.global_new_data.navigation,
            };
            user_cloud_props_crud_update({global_props:ret_props})
            return ret_props

        }

        case "SETTER_DEVICE": {
            console.log("=== SETTER_DEVICE reducer start")
            console.log(activity.global_new_data)
                return {
                    ...now_props,
                    current_device: activity.global_new_data.current_device,
                };
        }
        case "SETTER_APPLICATION": {
            console.log("=== SETTER_APPLICATION reducer start")
            console.log(activity.global_new_data)
                return {
                    ...now_props,
                    current_application: activity.global_new_data.current_application,
                };
        }
        case "SETTER_USER": {
            console.log("=== SETTER_USER ",activity.global_new_data)
            console.log(activity.global_new_data)
            return {
                ...now_props,
                current_user: activity.global_new_data.user
            };
        }

        case "TOGGLE_TODO": {
            const toggledLogrec = now_props.logrecs.map(item => {
                return item.id === activity.global_new_data.id
                    ? { ...activity.global_new_data,
                        completed: !activity.global_new_data.completed,
                        is_active: !activity.global_new_data.is_active,
                        }
                    : item;
            });
            return {
                ...now_props,
                logrecs: toggledLogrec,
            };
        }
        case "DELETE_TODO": {
            const deletedLogrec = now_props.logrecs.filter(item => {
                return item.id !== activity.global_new_data.id;
            });
            return {
                ...now_props,
                logrecs: deletedLogrec
            };
        }
        case "ADD_TODO": {
            const newLogrec = {
                id: activity.global_new_data.id,
                text: activity.global_new_data.text,
                completed: activity.global_new_data.completed,
                is_active: activity.global_new_data.is_active,
            };

            console.log('=== newLogrec',newLogrec)

            return {
                ...now_props,
                logrecs: [...now_props.logrecs, newLogrec]
            };
        }
        default: {
            return now_props;
        }
    }
}
