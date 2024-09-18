
import React from "react";
import {Snackbar} from "@mui/material";
import Fade from "@mui/material/Fade";

const SnackbarBasic = (p:any) =>{

    return(
        <>

                <Snackbar
                    variant="standard"
                    //===DOC https://codesandbox.io/p/sandbox/react-copy-to-clipboard-button-with-material-ui-c8sly3
                    message={p.snackbar_message_title}
                    // mariginBottom:'30%'
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    // sx={{ bottom: { xs: 290, sm: 0 } }}
                    autoHideDuration={p.use_timeout}
                    // autoHideDuration={2000}
                    // onClose={() => setOpen(false)}
                    // open={open}
                    open={p.do_mount_snackbar}
                    TransitionComponent={Fade}
                />

        </>
    )
}


export default SnackbarBasic
