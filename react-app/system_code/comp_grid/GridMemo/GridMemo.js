

import React, {useCallback, useEffect, useRef, useState} from "react";
import { FixedSizeGrid } from "react-window";
import memoize from 'memoize-one';

import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    rectSortingStrategy,
    rectSwappingStrategy,
    SortableContext,
    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import {GridMemoCellDND} from "./GridMemoCellDND";

const createItemData = memoize((list_data, toggleItemActive ) => ({
    list_data,
    toggleItemActive,
}));

function GridMemo(props) {

    const { grid_list_data, toggleItemActive } = props

    const cell_data = createItemData(grid_list_data, toggleItemActive);
    const gridRef = useRef();

    console.log("=== tt GridMemo items",grid_list_data)

    const init_state={
        input_last_modified_guid:'',
        input_last_modified_name:'',
    }
    const [state, set_state] = React.useState({
            ...init_state,
            ...{
                list_data:props.grid_list_data,
                changes_type:props.changes_type,
            },
    });

    useEffect(() => {

        if(
            props.grid_number_of_columns!==state.number_of_columns
            ||
            props.grid_number_of_rows!==state.number_of_rows

        ) {
            console.log("=== changeOrder props useEffect",props)
            set_state({
                ...state,
                ...{
                    number_of_columns: props.grid_number_of_columns,
                    number_of_rows: props.grid_number_of_rows,
                }
            })

        }

        return () => {

        };
    }, [props]);


    //=============================
    //================ DND =============
    //=============================

    //=== dnd+


    const [draggable_data, set_draggable_data] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [items, setItems] = React.useState([])

    //!!! on_MOBILE SSS

            const sensors_for_dnd = useSensors(
                useSensor(TouchSensor),
                useSensor(KeyboardSensor, {
                    coordinateGetter: sortableKeyboardCoordinates
                })
            )

    //!!! on_DESKTOP SSS

                    // const sensors_for_dnd = useSensors(
                    //     useSensor(PointerSensor
                    //         , {
                    //             activationConstraint: {
                    //                 distance: 8,
                    //             },
                    //         }
                    //     ),
                    //     // useSensor(KeyboardSensor, {
                    //     //     coordinateGetter: sortableKeyboardCoordinates
                    //     // })
                    // )

    const handleDragStart = (event) => {
        console.log('=== event.active',event.active)
        set_draggable_data(event.active);
        setIsDragging(true);
    };

    const handleDragEnd = (event, changes_type ) => {
        set_draggable_data(null);
        const { active, over } = event;
        if(null!=over && over.id) {

            console.log('=== changeOrder state.list_data',state.list_data)
            console.log('=== changeOrder active.id',active.id)
            console.log('=== changeOrder over.id',over.id)
            const active_guid = active.id.item_data.content_post_guid
            const over_guid = over.id.item_data.content_post_guid
            console.log('=== changeOrder active_guid',active_guid)
            console.log('=== changeOrder over_guid',over_guid)

            if (active_guid !== over_guid) {
                let new_list_data

                const v1 = state.list_data.filter((el)=>{
                    if(el.item_data) {
                        return active_guid === el.item_data.content_post_guid
                    }
                    else {
                        return false
                    }
                })[0];
                const v2 = state.list_data.filter((el)=>{
                    if(el.item_data) {
                        return over_guid === el.item_data.content_post_guid
                    }
                    else {
                        return false
                    }
                })[0];
                console.log('=== changeOrder v1',v1)
                console.log('=== changeOrder v2',v2)

                const oldIndex = state.list_data.indexOf(v1)
                const newIndex = state.list_data.indexOf(v2)

                if(!changes_type || 'shift' === changes_type || changes_type!=='swap' ) {
                    new_list_data = arrayMove(state.list_data, oldIndex, newIndex);
                }
                else
                {
                    new_list_data = state.list_data
                    new_list_data[oldIndex] = v2
                    new_list_data[newIndex] = v1
                }

                console.log("=== tt changeOrder new_list_data",new_list_data)

                //TODO component with static data only !!!  grid_posts_redraw_mode = 'optimistic' = no page re-draw. smooth mode
                set_state({
                    ...state,
                    ...{
                        list_data: new_list_data,
                    }
                })

                // setItems((items) => {
                //     return new_list_data
                // });

                // //TODO grid_posts_redraw_mode = 'pesimistic' = with data refresh and page re-draw. no smooth
                if(v1) v1.dnd_change_order({active_guid, over_guid, new_list_data})
                else {
                    console.error('=== v1 not exist ',v1)
                }

            }
            setIsDragging(false);
        }
    };


    const handleDragCancel = useCallback(() => {
        set_draggable_data(null);
    }, []);


    useEffect(() => {

        console.log('=== WORK react-window state grid ')
        console.log('=== state grid',state)
        console.log('=== state grid list_data',state.list_data)
        console.log('=== state grid input_last_modified_guid',state.input_last_modified_guid)

        setItems(
            state.list_data
        )

        return () => {
        };
    }, [state]);

    //=== dnd-

    //=============================
    //=============================
    //=============================

    return (
        ((!items) || (!items?.length))?<div>data not defined...</div>:
            <div name={'grid_memo'}>

                <DndContext
                    sensors={sensors_for_dnd}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={(e)=>handleDragEnd(e,state.changes_type)}
                    onDragCancel={handleDragCancel}
                >
                    <SortableContext
                        items={items}
                        strategy={
                            (!state.changes_type || 'shift' === state.changes_type || state.changes_type!=='swap' )
                                ?rectSortingStrategy
                                :rectSwappingStrategy
                        }
                    >

                        <FixedSizeGrid
                            className="class_style_grid"

                            ref={gridRef}

                            columnCount={state.number_of_columns} //number_of_columns
                            rowCount={state.number_of_rows} //number_of_rows

                            // W1
                            columnWidth={150}
                            rowHeight={200}

                            width={500} // grid area
                            height={300} // grid area

                            style={
                                {display:'flex', flexDirection:'column',alignContent:'space-between'}
                            }

                            itemData={cell_data}

                            // itemKey={(index, data4keys) => {
                            //     if(!data4keys) return (Math.random()*100000).toString()
                            //     const item = data4keys[index];
                            //     return item.item_guid;
                            // }}

                        >

                            {GridMemoCellDND}

                        </FixedSizeGrid>

                    </SortableContext>

                    <DragOverlay>
                        {isDragging ? (
                            <div>-- move it --</div>
                        ): null}
                    </DragOverlay>

                </DndContext>

            </div>



    );
}

export default GridMemo
