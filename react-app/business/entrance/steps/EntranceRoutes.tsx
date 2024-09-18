

import React from "react";

import {Link, Route, Switch, useHistory, useParams, useRouteMatch} from "react-router-dom";
import EntranceForm from "../EntranceForm";
import LogoImage from "../../../system_code/comp_navigation/LogoImage";
import SignInModeCheckUserForm from "./SignInModeCheckUserForm";
import SignUpModeCheckOTPForm from "./SignUpModeCheckOTPForm";
import H16 from "./H16";
import EntranceSuccess from "./EntranceSuccess";
import LayoutBrand from "./LayoutBrand";


const EntranceRoutes = (props:any) => {

    let { path, url } = useRouteMatch();
    let {...params0} = useParams();

    return (

        <LayoutBrand main_message={'You are in the user entrance interface'}>

            <Switch>
                <Route path={path} exact  >
                    <EntranceForm/>
                </Route>
                <Route path={`/entrancemain/entrance_main_form`}  >
                    <EntranceForm/>
                </Route>
                <Route path={`/entrancemain/sign_up_mode_input_otp`}  >
                    <SignUpModeCheckOTPForm />
                </Route>
                <Route path={`/entrancemain/sign_in_mode_check_user`}  >
                    <SignInModeCheckUserForm />
                </Route>
                <Route path={`/entrancemain/entrance_success`}  >
                    <EntranceSuccess />
                </Route>
                <Route path={`/entrancemain/entrance_failure`}  >
                    <div>entrance_failure</div>
                </Route>
                {/*<Route path={`${path}/:topicId`}  >*/}
                {/*    <Topic />*/}
                {/*</Route>*/}
            </Switch>

        </LayoutBrand>

    );
};

export default EntranceRoutes
