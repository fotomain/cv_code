
import React, {useState} from "react";



function isEmpty(param:any) {
    // console.log("=== param Boolean ",param, Boolean(param))
    return !Boolean(param)
}

function fileType( value:any, file_type='' ) {

    console.log("=== value fileType ",typeof  value)
    console.log("=== value  ", value)

    let ret:any = {}
    ret.ret_code='OK'

    //===DOC https://gist.github.com/seunlanlege/401898b5ca8486bd6685390cd87b1db4

    if (value=='0001c' || value=='00018')
    {
        ret.file_type = "mp4";
    }

    if (value=='52494646')
    {
        ret.file_type = "avi"; // video/avi
    }

    // --CH700
    if (value=='25504446')
    {
        ret.file_type = "pdf";
    }
    if (value=='89504e47')
    {
        ret.file_type = "image/png";
    }
    if (value=='504b34') // MSWORD // EXCEL
    {
        ret.file_type = "application/octet-stream";
    }
    if (value=='ffd8ffe0' || value=='ffd8ffe1' || value=='ffd8ffe2' || value=='ffd8ffe3' || value=='ffd8ffe8'  )
    {
        ret.file_type = "image/jpeg";
    }

    if(!isEmpty(ret.file_type)) {
        return ret
    }

    if(["text/plain","application/vnd.ms-excel", "text/csv"].indexOf(file_type)!==-1)
    {
        ret.file_type = "txt";
        return ret
    }

    ret.ret_code='ERR'
    ret.file_type = "file content is not correct for this file format";

    console.log("=== ret ",ret)

    return ret
}

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    do_after?: (props_local:any)=>void;

}

const InputFileBasic = React.forwardRef<HTMLInputElement,IInputProps>((props, ref) => {



    const {do_after,...props_rest} = props
    const changeHandler = async (e:any) => {

        console.log('=== InputFileBasic props_rest ',props_rest)
        console.log('=== e.target.files ',e.target.files[0])

        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            console.log('=== not window.File && window.FileReader && window.FileList && window.Blob ')
            alert('=== not window.File && window.FileReader && window.FileList && window.Blob ')
            return
        }

        var file_input = e.target.files[0]
        console.log('=== file_input',file_input)
        var re = /(?:\.([^.]+))?$/;
        const fn = file_input.name.toString()

        var file_extension = fn.substr(fn.lastIndexOf('.') + 1);

        set_state( (prev_state:any)=> {
            return {
                ...prev_state,
                file_name:fn,
                file_extension:file_extension,
            }
        })

        const buffer = await file_input.arrayBuffer();

        function handleEvent(event:any) {
            console.log( `${event.type}: ${event.loaded} bytes transferred\n` );

            if (event.type === "load") {
                // preview.src = reader.result;
                console.log( `!!!!!!!!!!!!!! FINISH ` );
            }
        }
        function addListeners(reader:any) {
            reader.addEventListener("loadstart", handleEvent);
            reader.addEventListener("load", handleEvent);
            reader.addEventListener("loadend", handleEvent);
            reader.addEventListener("progress", handleEvent);
            reader.addEventListener("error", handleEvent);
            reader.addEventListener("abort", handleEvent);
        }
        var reader = new FileReader();

        addListeners(reader);

        reader.readAsDataURL(file_input); //base64

        // reader.onload = () => {
        //     const videoEl = document.createElement('video')
        //     videoEl.src = reader.result as string;
        //     videoEl.controls = true
        //     document.body.appendChild(videoEl)
        // }

        reader.onloadend = function (r) {

            if( r.target ) {


                const fsize =  file_input.size
                const ftype =  file_input.type
                // const fname =  file.name

                const index1 = ["video/avi","video/mp4","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.wordprocessingml.document","text/plain","application/vnd.ms-excel", "text/csv", "application/pdfTableOutput", "image/jpeg", "image/png", "image/gif", "image/tiff"].indexOf(ftype)
                console.log('index1',index1)
                console.log('ftype',ftype)
                if( index1 == -1) {
                    alert('=== TODO ERROR ftype '+ftype)
                    return
                }
                if(fsize > 1048576000) { // 1 GB
                    // if(fsize > 104857600) { // 100 MB
                    // if(fsize > 5242880) { // 50 MB
                    alert('=== TODO ERROR fsize '+fsize.toString())
                    return
                }

                console.log('=== reader.result ',buffer)
                var arr = new Uint8Array( buffer ).subarray(0, 4);
                let header = "";
                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
                console.log('=== header ',header)

                const ft = fileType(header,ftype)
                if ("ERR" === ft.ret_code){
                    alert('=== TODO ERROR fsize '+ft.file_type)
                    return false;
                }

                console.log('=== OK TO CONTINUE WITH Base64')

            }
            else{
                console.log('=== not e.target && e.target.result ')
                console.log('=== e.target ',e.target)
                console.log('=== e.target.result ',e.target.result)
                alert('=== not e.target && e.target.result ')
                return
            }

            console.log('=== reader.result Base64 ', reader.result);

            if(props.do_after)
                props.do_after({
                    file_input: file_input,
                    file_extension: file_extension,
                    file_data_base64:reader.result as string,
                })

        }; //================= onload

        reader.onerror = function (error) {
            console.log('Error: ', error);
        }; //================= onerror





    };

    const [state, set_state] = useState({
        file_name:'',
        file_extension:'',
        errors:'',
    });


    return (
        <div  id={'div_InputFileBasic'}
             style={
                 (props_rest.hidden)?{display:'none'}:{justifyContent:'center', flexDirection:'column', display: 'flex'}
             }
        >
            {/* File Uploader */}
            <h2>{props.title}</h2>
            {(props_rest.hidden)?<></>:
                <p>{(state.file_name)?state.file_name:'no file selected'}</p>
            }
            <input
                ref={ref}
                {...props_rest}
                type="file"
                name="file"
                // accept=".csv"
                accept="image/*,video/*,.pdfTableOutput,.csv,.xls,.xlsx,.doc,.docx,.txt"
                onChange={(e)=>changeHandler(e)}
                style={{ display: "block", margin: "10px auto" }}
            />
        </div>
    );
})

export default InputFileBasic

//
// function complete(event) {
//     var pdfViewerElement = document.getElementById("PdfViewer");
//     pdfViewerElement.style.height = "600px";
//     var upoadedFiles = event.files;
//     var uploadedFile = upoadedFiles.rawFile;
//     var reader = new FileReader();
//     reader.readAsDataURL(uploadedFile);
//     reader.onload = function () {
//         //Initialize PDF Viewer control.
//         $("#PdfViewer").ejPdfViewer({ serviceUrl: "../api/PdfViewer" });
//         var pdfViewer = $("#PdfViewer").data("ejPdfViewer");
//         var uploadedFileUrl = this.result;
//         //Load the uploaded PDF document to the PDF Viewer control.
//         pdfViewer.load(uploadedFileUrl);
//     }
// }
//

// document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'"/>';



