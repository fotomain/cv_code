
import {styled} from "@mui/styles";
import Box from "@mui/material/Box";
import {Avatar, Divider, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {useHistory} from "react-router";
import React, {useEffect} from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import {DashboardCustomizeOutlined, Logout, PersonAdd, Settings} from "@mui/icons-material";
import {sign_out_with_google} from "../firebase_stack/global_google_in_out";
import {hamburger_toggle} from "./hamburger_toggle";
import {GlobalsContext} from "../context_globals/globals_context";
import {close_hamburger_menu} from "./close_hamburger_menu";

//===DOC  https://codesandbox.io/s/pdw9v8?file=/src/Demo.tsx
//===DOC  https://codesandbox.io/p/sandbox/charming-field-pdw9v8?file=%2Fsrc%2FDemo.tsx%3A19%2C3-19%2C38

const AppUserBox = styled(Box)(({theme})=>({
    display:'flex',
    alignItems: 'center',
    gop:'10px',
    // [theme.breakpoints.up('sm')]:{
    //     display:'none',
    // }
}))


// class Avatar extends Component<{ onClick: (e:any) => any, sx: { width: number; height: number }, src: string }> {
//     render() {
//         return null;
//     }
// }

const AppUserAvatar = (params:any) =>{

    const history = useHistory();

    const init_state={
        do_open_account_menu: false,
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [state, set_state] = React.useState(init_state);

    const in_state = (name:string, data:any) => {

        set_state({
            ...state,
            ...{
                [name]: data,
            }
        })

    }

    useEffect(() => {

        if(Boolean(anchorEl)) {
            set_state({
                ...state,
                ...{
                    do_open_account_menu: true,
                }
            })
        }
        else{
            set_state({
                ...state,
                ...{
                    do_open_account_menu: false,
                }
            })
        }

        return () => {

        };
    }, [anchorEl]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    return(
        <AppUserBox id={'user_avatar_box'}>
        <Stack flexWrap={'nowrap'} direction={'row'} spacing={2} justifyContent={'end'} alignItems={'center'}>
            <Avatar
                sx={{width:30, height:30}}
                src={'https://www.shutterstock.com/image-photo/smiling-young-middle-eastern-man-600w-2063524544.jpg'}
                onClick={(e)=>{

                    if (params.do_close_hamburger_menu) {
                        close_hamburger_menu({global_props, global_dispatch})
                    }
                    history.push('/user_space', 'params')
                }}
                onContextMenu={(e:React.MouseEvent<HTMLElement>)=> {
                    // params.onClick(e,params.set_to_open)
                    //history.push('/user_space', 'params')

                    e.preventDefault()
                    setAnchorEl(e.currentTarget);

                }}

            />

            {!(anchorEl!=null && state.do_open_account_menu)?<></>:
                <>
                    <Menu
                        keepMounted
                        id={'menu_user_avatar'}
                        anchorEl={anchorEl}
                        // aria-labelledby={'menu_button'}
                        open={anchorEl!=null && state.do_open_account_menu}

                        onClose={handleClose}
                        onClick={handleClose}

                        anchorOrigin={{
                            vertical:'top',
                            horizontal:'right',
                        }}
                        transformOrigin={{
                            vertical:'top',
                            horizontal:'right',
                        }}

                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                    >

                        <MenuItem onClick={()=> {
                            handleClose()
                            history.push('/user_space', 'params')
                        } }>
                            <Avatar
                                src={'https://www.shutterstock.com/image-photo/smiling-young-middle-eastern-man-600w-2063524544.jpg'}
                            /> Profile
                        </MenuItem>

                        <MenuItem onClick={()=> {
                            handleClose()
                            history.push('/user_space', 'params')
                        } }>
                            <ListItemIcon>
                                <DashboardCustomizeOutlined fontSize="small" />
                            </ListItemIcon>
                            Dashboard
                        </MenuItem>

                        <Divider />

                        <MenuItem onClick={()=> {
                            handleClose()
                            sign_out_with_google({do_after:()=>{
                                    history.push('/home', 'params')
                                }})
                            history.push('/entrancemain', 'params')
                        } }>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>


                        <MenuItem onClick={()=> {
                            handleClose()
                            history.push('/user_space', 'params')
                        } }>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>


                        <MenuItem onClick={()=> {
                            handleClose()
                            sign_out_with_google({do_after:()=>{
                                    history.push('/home', 'params')
                                }})

                        } }>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Sign Out
                        </MenuItem>

                    </Menu>
                </>
            }

            {/*{(!params.show_name)?'':*/}
            {/*    <Typography variant='body2'>Mark</Typography>*/}
            {/*}*/}

        </Stack>
        </AppUserBox>
    )
}

export default AppUserAvatar

