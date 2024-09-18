
const hamburger_menu_hide = (params:any) =>{

    let tdata = params.global_props
    tdata.navigation.visibility.hamburger_open=false
    tdata.system.runtime=Date.now()

    if(params.debug_local) console.log("=== on_press HamburgerButton",tdata.navigation.visibility.hamburger_open)

    params.global_dispatch({
        type: 'SETTER_GLOBALPROPS',
        global_new_data:{global_props:tdata},
    })

}

export {hamburger_menu_hide}
