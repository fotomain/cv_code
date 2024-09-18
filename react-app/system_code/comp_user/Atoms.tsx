

import {Avatar, IconButton, Stack, Typography} from "@mui/material";
import {Login} from "@mui/icons-material";

const UserAvatar = (params:any) =>{

    return(
        <Stack flexWrap={'nowrap'} direction={'row'} spacing={2} justifyContent={'end'} alignItems={'center'}>
    <Avatar
        sx={{width:30, height:30}}
    src={'https://www.shutterstock.com/image-photo/smiling-young-middle-eastern-man-600w-2063524544.jpg'}
    onClick={(e)=>params.onClick(e,params.set_to_open)}
    />

    {/*globals.user_name*/}
    {(!params.show_name)?'':
        <Typography variant='body2'>Mark</Typography>
    }
    </Stack>

)
}

const BarItemSignIn = (params:any) =>{
    return(
        <Stack id={'App_Menu_big_SignIn'}

               direction={'row'} flexWrap={'nowrap'}
               alignItems={'center'}
        >

            <Stack id={'button_sign_in'}
                   direction={'row'} flexWrap={'nowrap'}
                   alignItems={'center'}
            >

                <IconButton
                    onClick={(e)=>
                    {}
                    }
                >
                    <Login/>
                </IconButton>

                {/*{(visibility_drawer_left)?'':*/}
                    <Typography noWrap variant='body2'>Sign In</Typography>
                {/*}*/}

            </Stack>

        </Stack>
    )
}

export {BarItemSignIn, UserAvatar}

