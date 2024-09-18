import {Box, Card, Button} from "@mui/material";
import React, {useEffect} from "react";


const FileUploadInputImage: React.FC = () =>{

    const [state, setState] = React.useState({
        header1:'',
        file1_data:'',
        //TODO FROM GLOBALS 'background_data_color_value_source_type':  global_props.current_application.background_data_color_value_source_type,
        display_box_image:false,
        display_box_video:false,
        display_box_color:false,
    });

    const file_type = (value:any) => {
        switch (value) {
            case "89504e47":
                return "image/png";
            case "47494638":
                return "image/gif";
            case "ffd8ffe0":
            case "ffd8ffe1":
            case "ffd8ffe2":
            case "ffd8ffe3":
            case "ffd8ffe8":
                return "image/jpeg";
            case "25504446":
                return "pdf";
            default:
                return "formato de archivo no reconocido";
        }
    };

    const file_get_from_input_target = (file:any) => {
        const headerReader = new FileReader();
        headerReader.onloadend = function (e:any) {
            if(e.target && e.target.result) {
                const arr = new Uint8Array(e.target.result).subarray(0, 4);
                let header = "";
                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
                setState({
                    ...state,
                    'header1': header
                });
                const ft = file_type(header)
                console.log('=== header ', header)
                console.log("=== ft ",ft)
            }
        };
        headerReader.onerror = function (error) {
            console.log('=== Error headerReader: ', error);
        };
        // const hh =
            headerReader.readAsArrayBuffer(file);
        // console.log(window.btoa(unescape(encodeURIComponent(file))))

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (event:any) {
            const file_data = event.target.result
            console.log("=== base64 ",file_data)

            if(file_data) {

                // let image = document.createElement('img');
                // image.src = file_data;
                // image.id='image_test';

                setState({
                    ...state,
                    'file1_data': JSON.stringify(file_data)
                });

                //TODO
                // const tdata = global_props.current_application
                // tdata.background.background_media_image_show = true
                // tdata.background.background_data_image_value_source_type = 'file'
                // tdata.background.background_data_image_value = file_data
                // console.log("=== tdata",tdata)
                // global_dispatch({
                //     type: 'SETTER_APPLICATION',
                //     global_new_data:{current_application:tdata},
                // })


            }
        };
        fileReader.onerror = function (error) {
            console.log('=== Error fileReader: ', error);
        };

    };

    const file_get_from_input = (e:any) => {
        console.log("=== getFile ",e)
        if(e.target && e.target.files) {
            const file1 = e.target.files[0];
            const t_size = ((e.target.files[0].size/1024)/1024).toFixed(4); // MB
            //=== DOC https://stackoverflow.com/questions/5697605/limit-the-size-of-a-file-upload-html-input-element
            console.log('=== t_size MB ',t_size)
            file_get_from_input_target(file1);
        }
    };

    useEffect(() => {
        if(state.file1_data!=='') {
            // .substr(0, 40)
            alert('=== state.file1 ' + state.file1_data )
        }
        return () => {

        };
    }, [state.file1_data]);

    return (

    <Card id={'div_main_file_upload_input_'+Date.now().toString()}>
        <Box>

            <input
                color="primary"
                accept="image/*"
                type="file"
                onChange={(e)=> {
                    file_get_from_input(e)
                }}
                id="file1input"
                style={{ zIndex:'99', display: 'none', }}
            />


            <label htmlFor="file1input">

                <Button
                    component="span"
                    variant="contained"
                >
                    Upload
                    <input
                        type="file"
                        hidden
                    />
                </Button>

            </label>

        </Box>
    </Card>
    )
 }

export default FileUploadInputImage;

