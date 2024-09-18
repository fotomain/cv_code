
const close_hamburger_menu = (params:any) => {
    if(params.global_props.navigation.visibility.hamburger_open) {//

        if(params.debug_local) console.log("=== close menu")
        let tdata = params.global_props
        tdata.navigation.visibility.hamburger_open = false
        tdata.system.runtime='777'
        params.global_dispatch({
            type: 'SETTER_GLOBALPROPS',
            global_new_data: {global_props: tdata},
        })
    }
}

export {close_hamburger_menu}
