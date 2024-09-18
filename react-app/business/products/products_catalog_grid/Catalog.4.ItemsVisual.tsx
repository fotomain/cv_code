

/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

import React, {CSSProperties, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {Box, Button, CircularProgress} from "@mui/material";
import Draw1Point from "./inner/Draw1Point";
import {useTheme} from "@mui/styles";
import FiltersInputSearch from "./filters/inner/FiltersInputSearch";
import PT_TagsPanel from "./atoms/PT_TagsPanel";


import {CatalogContext, m1_portrait} from "./Catalog.1.Shop";

import SpinnerFast from "./SpinnerFast";
import {free_space_if_no_largest_width, largest_width} from "../../../AppInitTheme";

let fake_array:any[]=[]
for (let i = 0; i < 20; i++) {
    fake_array.push(i)
}

const CatalogItemsVisual = (props:any) => {

    const {drawer_state} = useContext(CatalogContext)

    console.log('=== drawer_state.items 1',drawer_state.items)

    const fetchMoreData = () => {

        let current_page = 0
        let total_pages = 0

        if(drawer_state.items.length>0) {
            current_page = drawer_state.items[drawer_state.items?.length - 1]['current_page']
            total_pages = drawer_state.items[0]['total_pages']
        }

        if (current_page===total_pages){
            // alert('this_is_last_page This is the last page...')
            props.drawer_set_state((prev_state: any) => {
                return {
                    ...prev_state,
                    this_is_last_page: true,
                }
            })

        } else {
            console.log('=== p1 fetchMoreData', drawer_state.current_page)
            props.drawer_set_state((prev_state: any) => {
                return {
                    ...prev_state,
                    current_page: drawer_state.items[drawer_state.items?.length - 1]['current_page'] + 1,
                    this_is_last_page: false,
                    state_refresh: Date.now(),
                }
            })
        }

    };

    function useOnScreen1<Element extends HTMLElement>(): [
        boolean,
        React.RefCallback<Element>,
    ] {
        const [intersecting, setIntersecting] = useState(false);
        const observer = useMemo(
            () => new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting)),
            [setIntersecting],
        );

        const currentElement = useCallback(
            (ele: Element | null) => {
                if (ele) {
                    observer.observe(ele);
                } else {
                    observer.disconnect();
                    setIntersecting(false);
                }
            },
            [observer, setIntersecting],
        );

        return [intersecting, currentElement];
    }

    const [end_of_list, ref_end_of_list] = useOnScreen1();

    useEffect(() => {
        console.log('=== end_of_list ',end_of_list)


        if(end_of_list && (drawer_state.items.length!==0) && (!drawer_state.this_is_last_page)) {
            // alert('=== end_of_list fetchMoreData')

            fetchMoreData()
        }

        return () => {

        };
    }, [end_of_list]);

    const theme = useTheme();

    const firstRender = useRef(true); //???
    useEffect(() => {
        // if (firstRender.current) {
        firstRender.current = false;
        return;
        // }
    },[]);

    useEffect(() => {

        if(drawer_state.state_scroll_top) {
            console.log('=== drawer_state.state_refresh ', drawer_state.state_refresh)
            // window.scroll(0, 0);
            window.document.getElementById("top_bar_wrapper")?.scrollIntoView();
        }

        return;
    },[drawer_state.state_scroll_top,drawer_state.state_refresh]);

    const is_native = drawer_state?.device_info?.is_native
    let spinner_left = drawer_state.co2x1 + (drawer_state.co2width / 2)
    // if(spinner_left<=0) spinner_left = window.innerWidth/2

    const m1_mode = m1_portrait===drawer_state.display_mode
    const style_row:CSSProperties={
        flexDirection:'row',
        justifyContent:'center', alignItems:'center',
    }
    const style_column:CSSProperties={
        flexDirection:'column',
        justifyContent:'center', alignItems:'center',
        height:'max-content',
    }

    // console.log('=== m1_portrait===drawer_state.display_mode ',m1_portrait===drawer_state.display_mode)

    let free_space={}
    if(window.innerWidth<largest_width) {
        free_space={paddingLeft:free_space_if_no_largest_width+'px',paddingRight:free_space_if_no_largest_width+'px'}
    }

    // sss1
    return(<>
        {/*{((firstRender) && (!drawer_state.load_page_finished))?<></>:*/}
        {/*<Box id={'div_search_over_cards'} sx={{height:'70px',width:'100%',justifyContent:'center', alignItems:'center', flexWrap:'wrap', flex:1, display:'flex',flexDirection:'row'}}>*/}
        {/*<div style={{display:'inline-block', height:(is_native && 'over_grid'===drawer_state.filters_tags_place )?'70px':'max-content' }} >*/}
        <div style={{display:'inline-block', height:'max-content' }} >
            {/*<div>{JSON.stringify(drawer_state.filters_tags_place)}</div>*/}
        <div id={'div_tools_over_grid'}
             style={{gap:'4px', width:'100%',flexWrap:'wrap', display:'flex',
             ...(m1_mode)?style_column:style_row,
        }}>
                <div style={{width: (m1_mode)?'100%':'320px', ...free_space }}>
                    <FiltersInputSearch
                        id='div_search1'
                        autoFocus={false}
                        data_state={drawer_state} drawer_set_state={props.drawer_set_state} ref_input_search={props.ref_input_search}/>
                </div>


                    {('over_grid'!==drawer_state.filters_tags_place)?null:
                        <Box sx={{paddingTop:(m1_mode)?'3px':'14px', ...(m1_mode)?{paddingBottom:'10px'}:{}, }} >
                            <PT_TagsPanel  {...props} noWrapMode={true}  selectedTags={drawer_state.selectedTags}  />
                        </Box>
                    }

        </div>
        </div>

        {/*</Box>*/}
        {/*}*/}
        {/*=== www gap:'20px' */}
        <Box id={'div_cards'} sx={{
            gap:'20px',
            justifyContent:'center', flexWrap:'wrap',backgroundColor:'-+lightcyan', width:'100%', flex:1, display:'flex',flexDirection:'row'}}>

            {((spinner_left!==0) && (!drawer_state.load_page_finished))?
                <>
                    <Box sx={{
                        position:'fixed',
                        top:'35%',
                        // left:'50%',
                        left:spinner_left+'px',
                        zIndex:999,
                        transform: 'translate(-50%, -50%)',
                        // backgroundColor:theme.palette.primary.light,
                        backgroundColor:'transparent',
                        opacity:0.9,
                        color:'white',
                        padding:'12px',
                        borderRadius:'50%',
                    }}
                    >
                        {/*=== spinner */}
                        {/*<SpinnerMain size={(is_native)?30:45} sx={{color:'white'}} />*/}
                        <SpinnerFast no_bottom_space={'true'} />
                    </Box>
                </>
                :<></>
            }
                    {/*============= NO ITEMS */}
                    {/*============= NO ITEMS */}
                    {/*============= NO ITEMS */}
                    {(
                        (0===drawer_state.items.length) && (drawer_state.load_page_finished)
                    )?

                        <Box id='div_no_items' sx={{
                            position:'fixed',
                            // top:'40%', left:'50%',
                            left:drawer_state.co2x1 + (drawer_state.co2width / 2)+'px',
                            // top:(drawer_state.co2y1+150)+'px',
                            top:'45%',
                            zIndex:999,
                            transform: 'translate(-50%, -50%)',
                            backgroundColor:theme.palette.primary.light,
                            opacity:0.9,
                            color:'white',
                            padding:'12px',
                            borderRadius:'50%',
                            fontFamily:'roboto-regular',
                            fontSize:'16px',
                        }}
                        >
                            <p>no items...</p>
                        </Box>
                        :<></>}

            {/*<div css={css` height:50%; color:transparent; background-color: red; `}>fake space</div>*/}
            {/*<div>_ProductsGridFlex_ {JSON.stringify(drawer_state)}</div>*/}
            {(0===drawer_state.items.length)?
                <div css={css` color:transparent; `} >
                    {fake_array.map((el:any,index:number) => <div key={index} >fake space</div>)}
                </div>
                :drawer_state.items.map((el:any,index:number)=> {
                return <React.Fragment key={index}>
                    <props.CatalogItemCard
                        {...props}
                        index={index}
                        data={drawer_state.items[index]}
                    />

                        {/*========== DrawLastItem*/}
                        {!((drawer_state.load_page_started && (index===(drawer_state.items.length-1))))?null:
                            <Draw1Point
                                onLoad={()=>{
                                    console.log("=== load_page_finished zero_data")
                                    props.drawer_set_state((prev_state: any) => {return {...prev_state,
                                        load_page_started: false,
                                        load_page_finished: true,
                                    }})
                                }}
                            />
                        }

                </React.Fragment>
            })}

            {/*========== DrawNoData*/}
            {!( (0===drawer_state.items.length) && drawer_state.load_page_finished )?null:
                <Draw1Point
                    onLoad={()=>{
                        const maxWaitPageBuilding=3000
                        setTimeout(function () {
                            console.log("=== load_page_finished zero_data")
                            props.drawer_set_state((prev_state: any) => {return {...prev_state,
                                load_page_started: false,
                                load_page_finished: true,
                            }})
                        }, maxWaitPageBuilding);
                    }}
                />
            } {/*========== DrawNoData*/}

            {( !((drawer_state.items.length>0) && (drawer_state.load_page_finished)) )?<></>: //Final
                <div ref={ref_end_of_list} id={'div_ref_bottom'}>
                    {/*go to [isVisibleBottom]*/}
                </div>
            }


            {( !drawer_state.this_is_last_page )?<></>: //Final
                <Box sx={{display:'flex',flexDirection:"row", justifyContent:'center'}} >
                    <div id={'div_this_is_last_page'} style={{width:'100%'}}>
                        {/*This is the last page...*/}
                    </div>
                </Box>
            }


        </Box>
    </>)

}

export default CatalogItemsVisual
