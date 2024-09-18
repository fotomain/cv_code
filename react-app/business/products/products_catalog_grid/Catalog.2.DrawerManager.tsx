
import {free_space_if_no_largest_width, largest_width} from "../../../AppInitTheme";
import {Box} from "@mui/material";

import React, {useContext, useEffect, useRef} from "react";

import CatalogItemsState from "./Catalog.3.ItemsState";
import FabMainProducts from "./FabMainProducts";
import {get_user_device_info} from "../../../system_code/code_global/get_user_device_info";
import {
    CatalogContext,
    drawers_mode_change_width,
    m1_portrait,
    m2_landscape,
    m3_monitor,
    notCorrectY
} from "./Catalog.1.Shop";
import FiltersInputSearch from "./filters/inner/FiltersInputSearch";
import PT_FiltersBar_v1_no_form from "./filters/PT_FiltersBar_v1_no_form";

import DrawerOver from "./drawer/DrawerOver";
import RefreshFrom1StPageButton from "./drawer/buttons/RefreshFrom1StPageButton";
import SetDefaultsButton from "./drawer/buttons/SetDefaultsButton";
import DrawerMinMaxManager from "./DrawerMinMaxManager";

const CatalogDrawerManager = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

                let co1W:number=0
                if(drawer_state.co1Wide)
                    co1W = drawer_state.widthWIDE
                else co1W = drawer_state.widthNARROW

                const handleDoExpand = (props:any) => {
                    drawer_set_state((prev_state: any) => {return {...prev_state,
                        co1Wide: true,
                    }})
                }
                const handleDoNarrow = (props:any) => {
                    drawer_set_state((prev_state: any) => {return {...prev_state,
                        co1Wide: false,
                    }})
                }
                const handleDoClose = (props:any) => {
                    drawer_set_state((prev_state: any) => {return {...prev_state,
                        co1Visible: false,
                    }})
                }

                const setDrawerOverClose = () =>{
                    localStorage.setItem('drawerOverOpen',JSON.stringify(!drawer_state.drawerOverOpen))
                        drawer_set_state((prev_state:any)=>{return  {...prev_state,
                            drawerOverOpen: false,
                        }})
                }



                const firstRender = useRef(true); //???
                useEffect(() => {
                    // if (firstRender.current) {
                    firstRender.current = false;
                    return;
                    // }
                },[]);

                const xy_data_actualise = (p:any) => {

                    let tdata:any = {}

                    const device_info = get_user_device_info(window, document)
                    tdata.device_info=device_info
                    console.log('=== device_info',device_info)

                    let display_mode=-1
                    switch (true) {
                        case largest_width <= window.innerWidth:
                            display_mode=m3_monitor
                            break;
                        case (800 <= window.innerWidth) && (window.innerWidth<largest_width):
                            display_mode=m2_landscape
                            break;
                        case window.innerWidth < 800 :
                            display_mode=m1_portrait
                            break;
                    }

                    const new_drawerMode = (window.innerWidth>=drawers_mode_change_width)?'drawer_mode_minmax':'drawer_mode_over'
                    console.log('=== new_drawerMode ',new_drawerMode)

                    tdata.display_mode=display_mode
                    tdata.show_fab_filters = device_info.is_native
                    tdata.show_close_drawer_button=(device_info.is_native) && ('drawer_mode_over'!==new_drawerMode)

                    tdata = {...tdata,
                        drawerMode:new_drawerMode,
                        ...(('drawer_mode_minmax'===new_drawerMode))?{
                            drawerOverOpen:false,
                            drawerMinMaxVisible:true,
                            show_toggle_width_drawer_button:true,
                            co1Visible: true,
                        }:{},
                        ...(('drawer_mode_over'===new_drawerMode))?{
                            drawerMinMaxVisible:false,
                            // ...(firstRender.current)? {drawerOverOpen: false}:{}, //NO AUTO OPEN - ON FAB ONLY
                            show_toggle_width_drawer_button:false,
                            co1Wide:true,
                            co1Visible: false,
                        }:{},}

                    const {do_actualise} = p
                    const co1_current=props.ref_co1?.current
                    const co2_current=props.ref_co2?.current

                    tdata.scroll_target = p?.scroll_target
                    tdata.scrollTop = p?.scroll_target?.scrollTop
                    tdata.innerWidth_greater_largest_width=(window.innerWidth>largest_width)

                    if(co1_current) {
                        tdata = {...tdata, ...{...JSON.parse(JSON.stringify(co1_current?.getBoundingClientRect()))}}
                        console.log('=== tdata1',tdata,props.ref_co1)
                        tdata.co1x1 = tdata.x + window.scrollX
                        console.log('=== tdata.co1x1 ',tdata.co1x1)
                        tdata.co1y1 = tdata.y + window.scrollY
                    } else {
                        console.log('=== no co1_current')
                    }
                    if(co2_current) {
                        tdata = {...tdata, ...{...JSON.parse(JSON.stringify(co2_current?.getBoundingClientRect()))}}
                        tdata.co2x1 = tdata.x + window.scrollX
                        tdata.co2y1 = tdata.y + window.scrollY
                        tdata.co2width = tdata.width
                        tdata.fab_main_top = window.innerHeight - 10/100*window.innerHeight - 30
                        tdata.fab_main_left = tdata.co2x1 + tdata.co2width - 80
                    } else {
                        console.log('=== no co2_current')
                    }

                    if(do_actualise) {
                        console.log('=== xy_data_actualise handleResize tdata 1', tdata)
                        do_actualise(tdata)
                    }

                }

                const xy_data_actualise_local = (p?:any) => {
                    console.log('=== from_where',p?.from_where)
                    xy_data_actualise({...p, do_actualise:(xy_data:any)=>{
                            console.log('=== xy_data xy_data_actualise',xy_data)
                            drawer_set_state((prev_state:any)=>{return  {...prev_state,
                                ...xy_data
                            }})

                        }})

                }

                const handleResize = () => {
                    console.log("=== handleResize")
                    xy_data_actualise_local({from_where:'from_where111'})
                }

                const handleScroll=(e:any)=>{

                    console.log("=== handleResize")
                    xy_data_actualise_local({scroll_target:e.target, from_where:'from_where222'})
                }

                useEffect(() => {
                    window.addEventListener('resize',handleResize)
                    window.addEventListener('scroll', handleScroll,true);

                    // const body = window.document.querySelector('body')
                    // console.log('=== body',body)
                    // if(body) body.classList.add('dark');

                    return () => {
                        window.removeEventListener('resize',handleResize)
                        window.removeEventListener('scroll', handleScroll);
                    };
                }, []);


                useEffect(() => { //ref_main_container
                    console.log('== ref_all xy_data ▄▄▄▄▄▄▄▄▄▄▄▄▄ refs ',props.ref_co1.current,props.ref_co2.current)
                    console.log('== ref_all xy_data ▄▄▄▄▄▄▄▄▄▄▄▄▄ drawer_state ',drawer_state)
                    xy_data_actualise_local({from_where: 'from_where000'})
                    return () => {};
                }, [JSON.stringify(props.ref_co1?.current?.getBoundingClientRect()), JSON.stringify(props.ref_co2?.current?.getBoundingClientRect())]);

                //=================== TAGS
                //=================== TAGS
                //=================== TAGS

                const handleChangeTags = (st:any) => {
                    console.log('=== filters_tag_selected_items onSelectChange ',st)
                    if(st.selectedTags) {
                        let filters_tag1 = st.selectedTags.join(',')
                        localStorage.setItem('filters_tag_selected_items', JSON.stringify(st.selectedTags))

                        console.log('=== filters_tag1 ', filters_tag1)

                        drawer_set_state((prev_state: any) => {
                            return {
                                ...prev_state,
                                filters_tag_string: filters_tag1,
                                filters_tag_selected_items: st.selectedTags,
                                current_page: 1,
                                state_refresh: Date.now(),
                            }
                        })
                    }
                }//handleChangeTags

                useEffect(() => {
                    handleChangeTags({selectedTags:drawer_state.selectedTags})
                    return () => {};
                }, [drawer_state.selectedTags]);

    useEffect(() => {
        console.log('=== t11 drawer_state.show_fab_filters ',drawer_state.show_fab_filters)
        return () => {

        };
    }, [drawer_state.show_fab_filters]);

    // sss1
    return(<>

        <Box id='div_co1_co2' sx={{backgroundColor:'-+red', width:'100%', flex:1, display:'flex',flexDirection:'row',
            ...(drawer_state.co1Visible && (!drawer_state.innerWidth_greater_largest_width))?{paddingLeft:free_space_if_no_largest_width+'px',}:{},
        }}>

            {('drawer_mode_over'!==drawer_state.drawerMode)?null:
                <DrawerOver {...props}
                                     {...{
                                         handleDoExpand,
                                         handleDoNarrow,
                                         handleDoClose,
                                         setDrawerOverClose,
                                     }}
                            // drawer_content_header={
                            //     <>
                            //         {(!drawer_state.co1Wide)?null:<RefreshFrom1StPageButton {...props}  />}
                            //         {(!drawer_state.co1Wide)?null:<SetDefaultsButton {...props}  />}
                            //     </>
                            // }
                />
            }

            <Box id='div_co1'
                 ref={props?.ref_co1}
                 sx={{backgroundColor:'-+lightcoral', width:'100%', flex:1, display:'flex',flexDirection:'column',
                     maxWidth:co1W+'px',
                     ...(drawer_state.co1Visible)?{}:{display:'none'},
                     // ...(!drawer_state.innerWidth_greater_largest_width)?{marginLeft: free_space_if_no_largest_width+'px'}:{},
                 }}
            >

                {/*       drawer_state.co1y1!==notCorrectY*/}
                {(  !(((drawer_state.co1y1!==0 && drawer_state.co1y1!==notCorrectY  ) && (window.scrollbars.visible || window.scrollbars.visible)))  )?null:

                    // <PT_FiltersBar_v1_no_form {...props} />

                    <DrawerMinMaxManager {...props}
                        {...{
                            handleDoExpand,
                            handleDoNarrow,
                            handleDoClose,
                        }}
                         // drawer_content_header={
                         //     <>
                         //         {(!drawer_state.co1Wide)?null:<RefreshFrom1StPageButton {...props}  />}
                         //         {(!drawer_state.co1Wide)?null:<SetDefaultsButton {...props}  />}
                         //     </>
                         // }
                    />

                }
                {/*<DividerV borderLeftWidth={co1W+'px'}/>*/}
            </Box>

            {/*==== css trick 101% is ok- to show scroll from the begin === no redraw page height:'101%'*/}
            <Box id='div_co2'
                 ref={props?.ref_co2}
                 sx={{backgroundColor:'+lightsalmon', width:'100%',  height:'101%', flex:1, display:'flex',flexDirection:'column'}}
            >
                {/*=== Catalog31ItemsState*/}
                <CatalogItemsState {...props} />
            </Box>

            <FabMainProducts {...props} />

        </Box>

    </>)
    }
export default CatalogDrawerManager
