
import React from "react";
import {GlobalsContext} from "../context_globals/globals_context";
import NavbarFireSide from "../../business/entrance/steps/user_navigation/NavbarFireSide";
import GlobalShowContent from "../../ui/pages/user_dasboard_page/show_global/GlobalShowContent";


const LayoutAdminSpace = (props:any) =>{

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    const ml_=(global_props.navigation.do_open_drawer_left)?global_props.navigation.drawer_left_width:'0px'

    var className1_='bg-["pink"] relative  w-full h-full overflow-auto flex flex-col justify-top items-center'
    // var className1_='bg-["pink"] relative  w-full h-full overflow-auto flex flex-row justify-start items-top'
    var className2_='bg-[#1da1f2] relative  w-full h-full overflow-auto flex flex-col justify-top items-center'

    if(global_props.navigation.do_open_drawer_left)
        className2_=className2_+' ml-[256px]'

    console.log('=== className1_ ',className1_)

    return(

        <div
            className={className1_}
         >



            <div className={' self-start '} >
                <NavbarFireSide />
            </div>
                    <div
                        // marginLeft={(global_props.navigation.do_open_drawer_left)?global_props.navigation.drawer_left_width:'0px'}
                        className={className2_}
                    >

                        <div>NavbarFireSide</div>

                        <div>drawer_left_width {global_props.navigation.drawer_left_width}</div>
                        <div>visibility.hamburger_left      {(global_props.navigation.visibility.hamburger_left)?'true':'false'}</div>
                        <div>visibility.do_open_drawer_left {(global_props.navigation.do_open_drawer_left)?'true':'false'}</div>
                        <div>current_user.step_logged_in {(global_props.current_user.step_logged_in)?'true':'false'}</div>

                        {props.children}

                    </div>
                         {/*{props.children}*/}

            </div>

)

}

export default LayoutAdminSpace


// <Stack id={'stack_layout_main'}
//        direction='row'
//        // justifyContent={'left'}
//        justifyContent={'start'}
//        alignItems={'top'}
//        bgcolor={"transparent"}
//     // bgcolor={"background.default"}
//        color={"text.primary"}
//     // height='100%'
//        height='auto'
// >
//     <Navbar />
//     <Stack
//         id={'stack_layout_chield'}
//         direction='column'
//         justifyContent={'top '}
//         alignItems={'left'}
//         // bgcolor={"magenta"}
//         // bgcolor={"background.default"}
//         // bgcolor={global_props.theme.colors.background_color} //TODO globals color
//         bgcolor={"transparent"}
//         color={"text.primary"}
//         overflow={'auto'}
//         // height='100%'
//
//         height='800px'
//         // marginTop={'50px'}
//         marginLeft={(global_props.navigation.do_open_drawer_left)?global_props.navigation.drawer_left_width:'0px'}
//         // overflow={'scroll'}
//     >
//         Page1
//
//         <div>drawer_left_width {global_props.navigation.drawer_left_width}</div>
//         <div>visibility.hamburger_left      {(global_props.navigation.visibility.hamburger_left)?'true':'false'}</div>
//         <div>visibility.do_open_drawer_left {(global_props.navigation.do_open_drawer_left)?'true':'false'}</div>
//         <div>current_user.step_logged_in {(global_props.current_user.step_logged_in)?'true':'false'}</div>            </Stack>
//
// </Stack>
