import React, {useRef, useState} from "react";
import InputManager from "./inner/InputManager";
import InputFileBasic from "./inner/InputFileBasic";

// npm install react-icons --save
import { MdOutlineAttachFile } from "react-icons/md";

const InputFileFilled = (props:any) => {

  const [state, set_state] = useState({
    file_name:'',
  });

  let ref_local_select_file = useRef<HTMLInputElement>(null)

  return(<>
    <InputManager

        variant={'filled'}

        label_text={'CSV file is possible'}
        disabled={true}

        value={(''!==state.file_name)?(state.file_name):'Choose file'}

        on_click_if_disabled={(p:any)=>{
          console.log("=== on_click_if_disabled ",ref_local_select_file.current)
          ref_local_select_file.current?.click()
        }}

        node_left_show = {()=>{return true}}

        node_left = {()=>{
            return <MdOutlineAttachFile
                    style={{cursor:'pointer'}}
                    color={'black'}
                    size={'24px'}
                    onClick={(e)=> {
                        console.log('=== AttachFileIcon' + Date.now())
                    }}
                />
            }}

    />


      <InputFileBasic
          ref={ref_local_select_file}
          id={'input_file_csv'}
          hidden
          style={{display:'none'}}
          // title={'Select CSV file'}
          // do_base64={false}
          // do_csv={true}
          {...props}
          do_after={(p)=>{

              console.log('=== do_after p ', p)
              console.log('=== do_after p ', p.file_input.name)

              set_state( (prev_state:any)=> {
                  return {
                      ...prev_state,
                      file_name: p.file_input.name,
                  }
              })

              if(props.do_after) props.do_after(p)

          }}
      />

  </>)
}

export default InputFileFilled
