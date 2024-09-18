
const hamburger_toggle = (params:any) =>{

    let tdata = params.global_props
    tdata.navigation.visibility.hamburger_open=!tdata.navigation.visibility.hamburger_open
    tdata.system.runtime=Date.now()

    if(params.debug_local) console.log("=== on_press HamburgerButton",tdata.navigation.visibility.hamburger_open)

    params.global_dispatch({
        type: 'SETTER_GLOBALPROPS',
        global_new_data:{global_props:tdata},
    })

}

export {hamburger_toggle}
