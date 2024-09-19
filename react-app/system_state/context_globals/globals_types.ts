


export const not_defined = 'not_defined'

export const page_orientation = {
    lanscape : 'lanscape',
    portrait : 'portrait',
}
export const drawer_left_width = {
    wide : '256px',
    // fold : '68px',
    fold : '102px',
    invisible : '0px',
}

export interface ILogrecsActions {
    type:     "SETTER_USER"
            | "SETTER_PAGES_NAVIGATION"
            | "SETTER_ENTRANCE"
            | "SETTER_GLOBALPROPS"
            | "SETTER_NAVIGATION"
            | "SETTER_APPLICATION"
            | "SETTER_DEVICE"

            | "TOGGLE_TODO"
            | "DELETE_TODO"
            | "ADD_TODO";
    global_new_data: T1_logrec | any;
}

export interface TGloabal_context {
    global_props: TGloabal_props;
    global_dispatch: React.Dispatch<ILogrecsActions>;
}

// export class C1_current_user {
//
//     email:string='';
//     is_signed_in:boolean=false;
//
// }

export interface TGloabal_props {

    //global_props STEP 2

    loading:any;
    cart:any;
    logrecs: Array<T1_logrec>;
    debug_mode_global:any;
    is_ready:any;
    default_settings:any;
    info_for_login:any;
    theme:any;
    entrance:any;
    pages_navigation:any;
    navigation:any;
    current_user: any; //C1_current_user;
    current_application: any;
    current_device: any;
    show_timestamp: ()=>void;
    entrance_step?: any;
    set_entrance_step: (p:any)=>void;
    input_data: any;
    system: any;

}

export interface T1_logrec {
    id?: string;
    text?: string;
    completed?: boolean;
    is_active: boolean;
}
