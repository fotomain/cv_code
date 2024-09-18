
import React, {forwardRef, memo} from "react";
import {areEqual} from "react-window";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import PostCardBasic from "./PostCardBasic";

export const GridMemoCellDisplay = memo(forwardRef(({
                                                        // state_grid, set_state_grid,
                                                        cell_data, item_index,  ...props }, ref) =>
{

    console.log("===  GridMemoCellDisplay ===========",props)
    console.log("===  GridMemoCellDisplay props.ref ===========",ref)
    console.log("==========================================")
    console.log("==========================================")
    console.log("==========================================")
    console.log("==========================================")

    const tindex =  item_index
    const data =  cell_data
    const style =  props.style
    const toggleItemActive =  cell_data.toggleItemActive

    console.log("=== GridMemoCellDisplay tindex",tindex)
    const item_is_empty = data.list_data[tindex].item_is_empty
    const item_handle = (item_is_empty)?{label:''}:data.list_data[tindex];

    // console.log("=== GridMemoCellDisplay item_is_empty",item_is_empty)
    console.log("=== GridMemoCellDisplay item_handle",item_handle)

    // console.log('=== GridMemoCellDisplay data',data)
    // console.log('=== GridMemoCellDisplay item',item)

    return (

        // HTML
        (item_is_empty)?<div></div>:
        <div ref={ref}

             style={{...style,...{
                     border:'1px solid green', display:'flex', flexDirection:'column',alignContent:'space-between', flexWrap:'nowrap',
                     // padding:'5px'
                 }}}
             id={'cell_main'} >
            <div style={{ padding:'25px'}}>

                <PostCardBasic {...{...{item_index,cell_data,item_handle},...{props_upper:props}}} />

            </div>
        </div>

    );
}, areEqual));
//
//
// <div>
//     <input
//         style={{ width:'80px'}}
//         id={'edit_id_'+'title_'}
//         type="text"
//         name={'test1_field'}
//         onChange={(e)=> {
//
//             change_item_data(tindex,e.target.value)
//
//             set_state({
//                 ...state,
//                 ...{
//                     text1: e.target.value,
//                 }
//             })
//
//
//         }} value={state.text1} />
// </div>
//
// <br/>
//
// <div
//     onClick={() => toggleItemActive(tindex)}
// >
//     <p>{tindex} is {item.isActive ? 'active' : 'inactive'}</p>
// </div>
// </div>
