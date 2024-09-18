

// https://codesandbox.io/s/react-layout-withrouter-cns34?file=/src/components/common/Layout.js

import {Stack} from "@mui/material";

const LayoutEntrance = (props:any) =>{

    return(
        <Stack id={'stack_layout_entrance'}
               direction='column'
               justifyContent={'center'}
               bgcolor={"pink"}
               // bgcolor={"background.default"}
               color={"text.primary"}
               width={'368px'}
               height={'416px'}
               borderRadius={'3px'}
               borderColor={'rgb(32,33,36)'}
        >
            <Stack
                   id={'stack_chield'}
                   direction='column'
                   justifyContent={'center'}
                   alignItems={'center'}
                   bgcolor={"background.default"}
                   color={"text.primary"}
                   overflow='auto'
            >
                {props.children}
            </Stack>
        </Stack>
    )
}

export default LayoutEntrance
