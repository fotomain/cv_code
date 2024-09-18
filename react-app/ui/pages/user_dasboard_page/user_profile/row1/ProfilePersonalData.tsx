



import LogoutIcon from '@mui/icons-material/Logout';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Button, IconButton, Link} from "@mui/material";
import {tw_row_left} from "../../../../../system_code/tw/tw_tools";
import {sign_out_with_google} from "../../../../../system_code/firebase_stack/global_google_in_out";
import React from "react";
import {useHistory} from "react-router-dom";

const ProfilePersonalData = () => {

    const history = useHistory();

    return (
        <>
            <div id={'line1'} className="shrink-0 flex flex-row items-end justify-start gap-[10px]

                mt-[15px]
                md:mt-[0px]

                text-profile_name
                md:text-xl
            "
            >
                <b className="font-inter_regular leading-none relative flex items-center w-auto h-auto shrink-0">
                    Sarah Finest
                </b>
                <div className={tw_row_left+' mb-[1px] gap-[10px] '}>
                <img
                    className="relative w-3 h-3 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src="/user_dashboard/icon-superpowers@2x.png"
                />
                <div className="relative leading-none text-[15px] font-inter_light flex items-center w-auto h-auto shrink-0">
                    London
                </div>
                </div>

                {/*<BorderColorOutlinedIcon*/}
                <div
                    style={{
                        borderBottom:'solid',
                        borderBottomColor:'#6cd04c',
                        margin:'0px',
                    }}
                >
                    <ModeEditIcon

                        id={'edit_profile_data_icon'}
                        sx={{
                            marginBottom:'-4px',
                                color:"#6cd04c", width:'20px', height:'20px',
                                    // border:'solid 1px', borderRadius:'50%',
                                '&:hover, &:focus':{ cursor: "pointer", width:'24px', height:'24px',
                                    borderRadius:'50%',
                                    // border:'solid 1px',
                                    color:"white", bgcolor:"#6cd04c"
                                }
                        }}
                    />

                </div>

                <div
                    style={{
                        borderBottom:'solid',
                        borderBottomColor:'#6cd04c',
                        margin:'0px',
                    }}
                >

                    {/*<IconButton color={'primary'}*/}
                    {/*>*/}
                        <LogoutIcon

                            onClick={() => {
                                sign_out_with_google({
                                    do_after: () => {
                                        history.push('/home', 'params')
                                    }
                                })
                            }}

                            sx={{
                                marginBottom:'-4px',
                                color:"#6cd04c", width:'20px', height:'20px',
                                // border:'solid 1px', borderRadius:'50%',
                                '&:hover, &:focus':{ cursor: "pointer", width:'24px', height:'24px',
                                    borderRadius:'50%',
                                    // border:'solid 1px',
                                    color:"white", bgcolor:"#6cd04c"
                                }
                            }}
                        />
                    {/*</IconButton>*/}

                </div>

            </div>


            <div className="shrink-0 flex flex-row items-start justify-start text-hero-green">
                <div className="relative font-medium inline-block
                    md:w-[129px] shrink-0">
                    <b>Product Designer</b>
                </div>
            </div>
            <div className="shrink-0 flex flex-row items-start justify-start text-hero-green"
            >
                <div className="relative font-medium inline-block
                md:w-[129px] shrink-0">

                    {/*<a href="mailto:myemail@email.com?subject=I gave a question...&body=Hi,I found this website and thought you might like it http://www.geocities.com/wowhtml/"><u>myemail@email.com</u></a>*/}

                    <Link id='link_mail_to' href="mailto:myemail@email.com?subject=I gave a question...&body=Hi,I found this website and thought you might like it http://www.geocities.com/wowhtml/"
                        sx={{
                          color:"#6cd04c",
                            '&:hover, &:focus':{color:"blue"}
                        }}
                          underline="always"
                    >
                        myemail@email.com
                    </Link>


                </div>
            </div>
            <div className="shrink-0 flex flex-row items-center justify-start pt-2.5 px-0 pb-0 text-hero-green">
                <div className="relative inline-block
                md:w-[129px] shrink-0">RANKING</div>
            </div>
            <div className="shrink-0 flex flex-row items-start justify-start gap-[10px] text-base">
                <b className="relative">8,6</b>
                <div className="shrink-0 flex flex-row items-start justify-start gap-[4px]">
                    <img
                        className="relative w-3 h-3 overflow-hidden shrink-0 object-cover"
                        alt=""
                        src="/user_dashboard/star@2x.png"
                    />
                    <img
                        className="relative w-3 h-3 overflow-hidden shrink-0 object-cover"
                        alt=""
                        src="/user_dashboard/star@2x.png"
                    />

                    <img
                        className="relative w-3 h-3 overflow-hidden shrink-0 object-cover"
                        alt=""
                        src="/user_dashboard/star@2x.png"
                    />
                    <img
                        className="relative w-3 h-3 overflow-hidden shrink-0 object-cover"
                        alt=""
                        src="/user_dashboard/star@2x.png"
                    />
                    <img
                        className="relative w-3 h-3 overflow-hidden shrink-0 object-cover"
                        alt=""
                        src="/user_dashboard/star@2x.png"
                    />
                </div>

            </div>
            <Button id={'user_dashboard_sign_out_with_google'}
                    variant="contained"
                    onClick={()=> {
                        sign_out_with_google({do_after:()=>{
                                history.push('/home', 'params')
                            }})
                    }}
            >
                Sign Out
            </Button>

        </>
    )



}

export default ProfilePersonalData


// /* unvisited link */
// a:link {
//     color: red;
// }
//
// /* visited link */
// a:visited {
//     color: green;
// }
//
// /* mouse over link */
// a:hover {
//     color: hotpink;
// }
//
// /* selected link */
// a:active {
//     color: blue;
// }
