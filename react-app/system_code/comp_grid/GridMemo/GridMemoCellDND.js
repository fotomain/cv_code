
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import React, {useState} from "react";
import * as PropTypes from "prop-types";

import {GridMemoCellDisplay} from "./GridMemoCellDisplay";


GridMemoCellDisplay.propTypes = {
    item_index: PropTypes.any,
    // ref: PropTypes.func,
    style: PropTypes.shape({transform: PropTypes.string, transition: PropTypes.string})
};

//=== grid_cell_data = createItemData memoize((list_data, toggleItemActive, change_item_data )
export const GridMemoCellDND = (props) => {

    const { columnIndex, rowIndex, style, data } = props

    const cell_is_empty = false

    // console.log("=== GridMemoCellDND props",props)
    // console.log("=== GridMemoCellDND data",data)
    const tindex =  rowIndex * data.list_data[0].number_of_columns + columnIndex

    //=== dnd+
    const [dnd_disabled, set_dnd_disabled] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable(
        {
            // index: props.index,
            id: data.list_data[tindex],
            disabled:dnd_disabled,
            // data:props.data1,

        }
    );

    const itemStyle = {
        ...(props.style ?? {}),
        //=== see class_style_cell
        // backgroundColor: props.index % 2 === 0 ? "white" : "lightgrey",
        transform: CSS.Transform.toString(transform),
        transition,
        // width:'50px',
        // height:'100px'
    };

    //=== dnd-

    const props_out={...props}
    console.log('=== props_out',props_out)

    if(cell_is_empty) return <div>000</div>

    return(
        <div style={{display:'flex',flexDirection:'column',
            justifyContent: 'space-between', flexWrap:'wrap'}}
             {...attributes}
             {...listeners}
        >
            <GridMemoCellDisplay
                ref={setNodeRef}
                style={itemStyle}

                // cell_data = createItemData(  memoize((list_data, toggleItemActive, change_item_data )
                cell_data={props.data}

                item_index={tindex}

                set_dnd_disabled={set_dnd_disabled}

            />
        </div>
    )
}
