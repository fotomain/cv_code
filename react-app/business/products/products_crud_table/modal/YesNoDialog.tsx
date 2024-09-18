import React, {useEffect, useState} from "react";
import {Button, Stack} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {tw_row_between, tw_row_right} from "../../../../system_code/tw/tw_tools";
import {DividerV} from "../../WooProductsAdminPage/MUITools";
import {JSON_stringify} from "../../../../system_code/code_global/GlobalFunctions";

const YesNoDialog = (props:any) => {

    // console.log('=== YesNoDialog props',props)
    let children = React.Children.toArray(props.children)
    // console.log('=== children ',children)
    // console.log('=== children.length ',children.length)

    const {btnPressCtrlEnterRef,innerComponent,onClose,onCloseByKey,...other} = props

    const handleClose = (p:any) => {
        props.onCloseByKey?.()
    }
    const handleKeyDown = (event:any) => {

        // Check if CTRL + S is pressed (event.ctrlKey) and the 's' key (event.key)

        console.log("=== handleKeyDown event.ctrlKey && event.key ", event.ctrlKey, event.key)

        if(
            (event.ctrlKey && event.key === 's')
            ||
            ((event.key === "Enter" && (event.metaKey || event.ctrlKey)))
        )
        {

            // console.log('=== YesNoDialog handleKeyDown ',props?.btnPressCtrlEnterRef)
            props?.btnPressCtrlEnterRef?.current?.click()
            handleClose({close_from:'key_s'});

        }

    };

    React.useEffect(() => {

        console.log('=== props.open ',props.open)
        if (props.open) {

            console.log('=== addEventListener ')
            document.addEventListener('keydown', handleKeyDown);

            if(props.open){

                if(props.do_after_open) {
                    setTimeout(()=>{
                        props.do_after_open()
                    },2000)

                }

            }

        } else {

            document.removeEventListener('keydown', handleKeyDown);

        }

    }, [props.open]);

    // useEffect(() => {
    //
    //
    //     return () => {
    //
    //     };
    // }, []);


    const show_content_node = (
        (props?.text) || ((props?.innerComponent && (children.length>0)))
    )

    useEffect(() => {
        return () => {

        };
    }, [(props.pdf_output_finished), props.text]);
    // }, [JSON_stringify(props.state_upper), props.text]);

    return(<>
        <Dialog

            {...other}

            // open={props.open}
            PaperProps={{
                sx: {
                    width: "25%",
                    minWidth: "300px",
                    minHeight: 150,
                    maxHeight: 500,
                    borderRadius:'20px',
                }
            }}

        >
            <DialogTitle>{props.title}</DialogTitle>

            {(!show_content_node)?<></>:
            <DialogContent>
            {(!props?.text)?<></>:
                    <DialogContentText>
                        {props.text}
                    </DialogContentText>
            }


                {!((props?.innerComponent && (children.length>0)))?<></>:
                    props?.innerComponent()
                }

            </DialogContent>
            }

                {!((props?.innerComponent && (children.length===0)))?<></>:
                    <Stack direction="row" alignItems="center"
                        sx={{
                            marginLeft:'20px',
                            marginRight:'20px',
                            marginBottom:'20px',
                        }}
                    >
                        {props?.innerComponent()}
                    </Stack>

                }

            {(children.length===0)?<></>:
            <DialogActions sx={{marginLeft:'15px', marginRight:'10px', marginBottom:'7px',  }}>

                {(!props.onCancel)?<></>:
                <Button
                    variant={'text'}
                    onClick={() =>{
                        props.onCancel?.()
                    }}
                >
                    Cancel
                </Button>
                }

                <DividerV/>

                <Stack direction="row" justifyContent="end" >
                    {/*=== all childrens>0*/}
                    {children.map((child:any, index:number) => {
                        return <div key={index}>
                                {child}
                            </div>
                    })//map
                    }
                </Stack>


            </DialogActions>
            }
        </Dialog>
    </>)

}

export default YesNoDialog
