
import * as ReactDOM from "react-dom/client";

import React, {useEffect, useRef} from "react";
import {GlobalsContext} from "../../../../system_code/context_globals/globals_context";
import {Alert, Fade, Snackbar} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const styles = (theme:any) => ({
    anchorOriginTopCenter: {
        [theme.breakpoints.down('md')]: {
            top: "your value/function here",
            justifyContent: 'center',
        },
    },
    root: {
        [theme.breakpoints.down('md')]: {
            borderRadius: 4,
            minWidth: "your value / function here",
        },
    },
});

const theme = createTheme({
    components: {
        MuiSnackbar: {
            variants: [
                {
                    props: { variant: "standard" },

                    style: {
                        "& .MuiSnackbarContent-root": {
                            background: "rgba(0, 0, 0, 0.7);",
                            borderRadius:'5%',
                            // color:'red', //works
                        }
                    }
                },
                {
                    props: { variant: "red_trouble" },
                    style: {
                        "& .MuiSnackbarContent-root": {
                            background: "rgba(255, 0, 0, 0.7);",
                        }
                    }
                }
                ,
                {
                    props: { variant: "yellow_trouble" },
                    style: {
                        "& .MuiSnackbarContent-root": {
                            background: "rgba(255, 255, 0, 0.8);",
                        }
                    }
                }
                ,
                {
                    props: { variant: "orange_trouble" },
                    style: {
                        "& .MuiSnackbarContent-root": {
                            background: "rgba(255, 165, 0, 0.8);",
                        }
                    }
                }
            ]
        }
    }
});

declare module "@mui/material/Snackbar" {
    interface SnackbarProps {
        variant: "standard"
            | "red_trouble"
            | "yellow_trouble"
            | "orange_trouble"
        ;
    }
}

const GlobalShowContent = (props:any) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    // console.log('=== GlobalShowContent props.show_form ',props.show_form)

    const containerRef = useRef<HTMLDivElement | null>(null);
    const rootRef = useRef<ReactDOM.Root>();

    useEffect(() => {
        const renderTimeout = setTimeout(() => {
            if (containerRef.current) {
                console.log("create root");
                rootRef.current =
                    rootRef.current ?? ReactDOM.createRoot(containerRef.current);
            }

            if (containerRef.current && rootRef.current) {
                console.log("component render");
                // rootRef.current.render(<div>GlobalShowContent mounted component</div>);
                rootRef.current.render(
                    <>
                        {('snackbar'!==global_props.current_application.show_global.show_form)?<></>:
                            <ThemeProvider theme={theme}>
                                {/*===DOC /!*https://codesandbox.io/p/sandbox/39915923-set-color-of-a-snackbar-element-from-material-ui-dvsul?file=%2Fdemo.tsx%3A56%2C5-56%2C34*!/*/}
                                <Snackbar
                                    variant="standard"
                                    // variant="yellow_trouble"
                                    // variant="red_trouble"
                                    // variant="standard"
                                    //===DOC https://codesandbox.io/p/sandbox/react-copy-to-clipboard-button-with-material-ui-c8sly3
                                    message={global_props.current_application.show_global.show_title}

                                    anchorOrigin={(props.anchorOrigin)?props.anchorOrigin:{ vertical: "top", horizontal: "center" }}

                                    // anchorOrigin={{ vertical: "top", horizontal: "center" }}

                                    autoHideDuration={(global_props.current_application.show_global.show_timeout)?
                                        global_props.current_application.show_global.show_timeout:1500
                                    }
                                    // autoHideDuration={2000}
                                    // onClose={() => setOpen(false)}
                                    // open={open}
                                    open={true}
                                    TransitionComponent={Fade}
                                />
                            </ThemeProvider>
                        }

                        {('alert'!==global_props.current_application.show_global.show_form)?<></>:
                            <Alert
                                // sx={{display:'flex', justifyContent:'center',
                                //     position:'absolute',
                                //     top:'100px',
                                //     left:'100px'
                                // }}
                                severity={(global_props.current_application.show_global.show_severity)
                                    ?global_props.current_application.show_global.show_severity
                                    :'success'
                                    // :'warning'
                                    // :'info'
                                    // :'error'
                                }
                                variant={(global_props.current_application.show_global.show_variant)
                                    ?global_props.current_application.show_global.show_variant
                                    :'filled'
                                }

                            >
                                {global_props.current_application.show_global.show_title}
                            </Alert>
                        }
                        </>


                    // TODO ALERT


                );
            }
        });

        return () => {
            clearTimeout(renderTimeout);
        };
    }, [rootRef]);

    useEffect(() => {
        return () => {
            console.log("unmount");
            const root = rootRef.current;
            rootRef.current = undefined;

            setTimeout(() => {
                console.log("component unmount");
                root?.unmount();
            });
        };
    }, []);

    useEffect(() => {

        props.do_after()

        return () => {

        };
    }, []);


    // TODO ALERT
    return <div

        style={{
            display:'flex', flexDirection:'row',
            position:'fixed',
            // position:'absolute',
            top:'20%', //'100px'
            left:'50%', //'100px'
            justifyContent:'center',
            zIndex:9999999,
        }}

        ref={containerRef}>

    </div>;

    // TODO snackbar
    // return <div
    //     ref={containerRef}>
    // </div>;

}

export default GlobalShowContent
