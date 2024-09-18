
import React, {useState} from "react";


import VP_Player from "../../../../system_code/comp_video_player/VP_Player";
import {test_base64video} from "../../../../system_code/comp_video_player/atoms/test_base64video";
import {Breakpoint, Grid, Stack, TextField, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {Props1Tab, TabPanel} from "../../WooProductsAdminPage/MUITools";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import {makeStyles} from "@mui/styles";
import RT_CellTextField from "../cell/RT_CellTextField";
import {Theme, useTheme} from "@mui/material/styles";
import {mui_width_in, muiWidth} from "../../../../system_code/code_global/GlobalFunctions";


const tabHeight = '32px' // default: '48px'

const useStyles = makeStyles(theme => ({
    tabsRoot: {
        minHeight: tabHeight,
        height: tabHeight
    },
    tabRoot: {
        minHeight: tabHeight,
        height: tabHeight
    }
}));

const ProductsTableRowSubNode = (props:any) => {

    // console.log('=== props ProductsTableRowSubNode',props)
    // console.log('=== props.row',props.row)
    const product = props.row?.original

    // console.log('=== props.row?.original',props.row?.original)

    const [tab_value, set_tab_value] = React.useState(0);
    const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        set_tab_value(newValue);
    };

    const classes = useStyles();

    const theme = useTheme();

    // console.log('=== props.table ',props.table)
    // console.log('=== theme.palette ',theme.palette)
    // console.log('=== hexToRgbA ',hexToRgbA(theme.palette.primary.light))


    const mui_width = muiWidth({theme:useTheme(),useMediaQuery:useMediaQuery})
    // console.log('=== mui_width',mui_width)

    // console.log('=== props.row?.original?.main_image_url ',props.row?.original?.main_image_url)

    return(<>
        <Grid container id={'r1'}
              direction="column"
              justifyContent={'start'}
              // alignItems={{lg: "center",md: "start"}}
              alignItems={(!mui_width_in('lg,xl',mui_width))?"start":'center'}
             // className={tw_row_center_basic+ ' flex-wrap h-auto  '} //yellow
             // sx={{width:'100%',pt:'8px', backgroundColor:'rgba(131,249,93,0.1)'}}
             // glwidth
              sx={{
                  backgroundColor:'rgba(131,249,93,0.1)',
                  maxWidth:{xs: '355px', sm: '655px', md: '760px', lg: '100%', xl: '100%',}
              }}
            // pl-[30px] pr-[30px] max-w-[960px]

        >

            <Tabs id={'div_tabs_products_subnode'}
                  value={tab_value}
                  onChange={onChangeTab}
                  aria-label="icon label tabs"
                  classes={{ root: classes.tabsRoot,}}
                  // glwidth
                  sx={{
                      maxWidth:{xs: '355px', sm: '655px', md: '760px', lg: '100%', xl: '100%',}
                  }}

            >
                <Tab  icon={<WallpaperOutlinedIcon />}  iconPosition="start" label="Image"  {...Props1Tab(0)} classes={{ root: classes.tabRoot,}} />
                <Tab  icon={<OndemandVideoOutlinedIcon />} iconPosition="start"  label="Video" {...Props1Tab(1)} classes={{ root: classes.tabRoot,}} />
                <Tab  icon={<ListAltOutlinedIcon />} iconPosition="start"  label="Orders" {...Props1Tab(1)} classes={{ root: classes.tabRoot,}} />
            </Tabs>

            <TabPanel value={tab_value} index={0} >

                <Grid container direction='column'
                    justifyContent={'center'}
                    alignItems={'center'}
                    spacing={2}
                >
                    <Grid item
                          sx={{mt:'12px'}}
                    >
                        <RT_CellTextField
                            {...{
                                variant:'outlined',
                                // sx:{width:'100%'},
                                // ...props,
                                table: props.table,
                                row: props.row,
                                getValue:()=>props.row?.original.main_image_url,
                                column: props.table.getColumn('main_image_url'),
                            }}
                        />

                    </Grid>

                    {(''===props.row?.original?.main_image_url)
                        ?
                        <Grid item>
                            <WallpaperOutlinedIcon sx={{
                                fontSize:64,
                                color:'gray',
                            }}/>
                        </Grid>
                        :
                        <Box
                            component="img"
                            sx={{
                                height: '110px',
                                width: 'auto',
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="main image"
                            src={props.row?.original?.main_image_url}
                            // src={`data:image/jpeg;base64,${props.row?.original?.main_image_url}`}
                        />
                        // <img src={props.row?.original?.main_image_url} />
                        // <img src={`data:image/jpeg;base64,${props.row?.original?.main_image_url}`} />
                    }
                </Grid>

            </TabPanel>

            <TabPanel value={tab_value} index={1} >


                <Grid container
                      direction='column'
                      justifyContent={'center'}
                      alignItems={'center'}
                      spacing={2}
                >

                    <Grid item
                        sx={{mt:'12px',
                        }}
                    >

                        <RT_CellTextField
                            {...{
                                variant:'outlined',
                                // sx:{width:'100%'},
                                // ...props,
                                table: props.table,
                                row: props.row,
                                getValue:()=>props.row?.original.main_video_url,
                                column: props.table.getColumn('main_video_url'),
                            }}
                        />

                    </Grid>

                    <Grid item sx={{mt:'8px'}}>
                        <VP_Player

                            // show_width={900}
                            show_width={300}
                            // show_width={200}

                            // auto_hide_controls={false}
                            auto_hide_controls={true}
                            // show_width={360}

                            // window.innerWidth;
                            // window.innerHeight;

                            // show_height={window.innerHeight}
                            // show_height={'auto'}
                            // show_height={'100%'}
                            // show_height={200}
                            // controls_mode_position={'bottom_under'}
                            controls_mode_position={'bottom_over'} //bottom_over top_over top_highe options_

                            is_playing={true}
                            // muted={false}
                            volume={0.5}
                            muted={true}

                            playsinline={true}

                            //video_param_step1
                            step_seek_seconds={50}
                            // stop_playing_when_seek={false}
                            stop_playing_when_seek={true}

                            show_controls_on_mouse_move={true}

                            loop={true}

                            controls_mode_backgroundColor={'#6cd04c'}
                            controls_mode_background_opacty={'80%'}
                            // controls_mode_backgroundColor={'black'}
                            // controls_mode_backgroundColor={'transparent'}
                            // controls_mode_backgroundColor={'lightgray'}

                            url={(props.row?.original?.main_video_url)?props.row?.original?.main_video_url:test_base64video}

                            // url={'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'}

                            // url={'https://www.shutterstock.com/shutterstock/videos/1060516912/preview/stock-footage-beautiful-sunlight-in-the-forest.webm'}
                            // url={'https://youtu.be/rhF80XoaaFo'}

                            light={
                                'https://images.unsplash.com/photo-1655601597743-7ddd6fdc2903?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80'
                            }


                        /> {/*VP_Player*/}
                    </Grid>
                </Grid>

            </TabPanel>

            <TabPanel value={tab_value} index={2} >

                <Box  sx={{marginLeft:'24px' , marginTop:'24px' }} >
                    Orders
                </Box>

            </TabPanel>

        </Grid>

    </>)

}

export default ProductsTableRowSubNode
