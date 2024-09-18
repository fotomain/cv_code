

import React, {useEffect} from 'react';

//{ field_name: 'content_post_title'}
const PostCardField = (props:any) => {

    const init_state={
        [props.field_name]:props.field_value //props.item_handle.item_data.content_post_title,
    }

    const [state, set_state] = React.useState({...init_state});

    // console.log("=== PostCardField props",props)
    // console.log("=== PostCardField props.props_upper",props.props_upper)

    const timeoutId = React.useRef(0);

    // field_change(e, timeoutId, debounce_interval, call_back_fast, call_back_slow )

    const debounce_interval = 700;
    const field_change = (e:any) =>{

        set_state({
            ...state,
            ...{
                [props.field_name]: e.target.value,
            }
        })

        if (timeoutId.current) {
            window.clearTimeout(timeoutId.current);
        }

        //=== debounce
        timeoutId.current = window.setTimeout(() => {

            console.log('=== window.setTimeout')

                props.item_handle.change_item_data(
                    {
                        ...props,
                        field_destination:props.field_destination,
                        index: props.item_index,
                        field_name: props.field_name,
                        field_new_value: e.target.value
                    }
                )




        }, debounce_interval);

    }

    useEffect(() => {

        set_state({...state,...{
                [props.field_name]:props.field_value
            }})

        return () => {

        };
    }, [props.field_value]);


    return(
        //===DOC https://github.com/clauderic/dnd-kit/issues/477#issuecomment-985194908
        //===DOC https://stackoverflow.com/questions/74963931/dnd-kit-not-allowing-to-prevent-dragging-items
        // ON blur set no DND on out set yes
        <div>

            <input
                    style={{ width:'80px'}}
                    type="text"

                    value={state[props.field_name]}

                    onChange={(e)=> {

                        field_change(e)

                    }}

                    onFocus ={(e)=> {
                        props.props_upper.set_dnd_disabled(true)
                    }}
                    onBlur={(e)=> {
                        props.props_upper.set_dnd_disabled(false)
                    }}

            />



        </div>
    )
};

export default PostCardField
