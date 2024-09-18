

const show_global_alert = (params:any) => {

    const td = params.global_props.current_application
    td.show_global.show_form = 'alert' //snackbar // alert
    td.show_global.show_title = params.show_title
    td.show_global.show_severity = params.show_severity
    td.show_global.show = true
    params.global_dispatch({type: "SETTER_APPLICATION", global_new_data: {current_application: td}})
    console.log("=== OK ")


}

export {show_global_alert}


