
import React from "react";
import {GlobalsContext} from "../../../system_state/context_globals/globals_context";

const SignInModeCheckUserForm = (props:any) => {

  const { global_props, global_dispatch } = React.useContext(GlobalsContext);

  return (
      <>
        <div>SignInMdeCheckUserForm</div>
        <div>entrance_step {global_props.entrance_step}</div>
      </>

  );
};

export default SignInModeCheckUserForm
