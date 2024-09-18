

import React, {useState} from 'react';

import styled from "styled-components";
import PostCardField from "./PostCardField";

const styled_div = styled.div``

const PostCardBasic = (props:any) => {

    //=== item_calc step1.2
    let item_json = JSON.parse(props.item_handle.item_data['content_post_json'])
    if(null===item_json) {
        item_json = {}
    }

    // console.log("=== PostCardBasic props.item",props)
    // console.log("=== PostCardBasic props.item_handle",props.item_handle)

    const WrapperCard = props.wrapper_card?props.wrapper_card:styled_div
    const WrapperPartUp = props.wrapper_part_up?props.wrapper_part_up:styled_div
    const WrapperTexts = props.wrapper_texts?props.wrapper_texts:styled_div
    const WrapperPartTitle = props.part_title?props.part_title:styled_div

    const DragSpace = props.drag_space?props.drag_space:styled_div

    // const wrapper_card_props = props.wrapper_card_props?props.wrapper_card_props:{}

    // console.log("=== card wrapper_card_props",wrapper_card_props)

    const [mouse_is_over_card, set_mouse_is_over_card] = useState(false);

    return(

        <WrapperCard {...props} id={'wrapper_card'}
                     onMouseEnter={()=>{set_mouse_is_over_card(true)}}
                     onMouseLeave={()=>{set_mouse_is_over_card(false)}}
        >
            <WrapperPartUp {...props}  id={'part_up'} src={props.card_image} />
            <WrapperTexts id={'wrapper_texts'}>
                <WrapperPartTitle id={'part_title'} >

                        <PostCardField {...{
                            ...props,
                            field_destination:'post',
                            field_name: 'content_post_title',
                            field_value: props.item_handle.item_data['content_post_title']
                        }}/>

                        <PostCardField {...{
                            ...props,
                            field_destination:'post',
                            field_name: 'content_post_description',
                            field_value: props.item_handle.item_data['content_post_description']
                        }}/>

                                {/*item_calc step1.1*/}
                                {/*<p>Quantity</p>*/}
                                <PostCardField {...{
                                    ...props,
                                    field_destination:'json',
                                    field_name: 'quantity',
                                    field_value: item_json.quantity,
                                }}/>

                                {/*<p>Price</p>*/}
                                <PostCardField {...{
                                    ...props,
                                    field_destination:'json',
                                    field_name: 'unitprice',
                                    field_value: item_json.unitprice,
                                }}/>

                                {/*<p>Amount</p>*/}
                                <PostCardField {...{
                                    ...props,
                                    field_destination:'json',
                                    field_name: 'amount',
                                    field_value: item_json.amount,
                                }}/>

                </WrapperPartTitle>

                {/*<TODO WrapperPartParagraph id={'part_description'} >{props.item_handle.item_data.content_post_description}</WrapperPartParagraph>*/}
                <div id={'part_description'} style={{overflowY: 'scroll', overflowX: 'scroll'}}>
                    <p style={{width:'90px',height:'40px',}}>
                        {props.item_handle?props.item_handle.item_data?.content_post_json:'...'}
                    </p>
                </div>

            </WrapperTexts>
            {(!mouse_is_over_card)?'':<DragSpace/>}
        </WrapperCard>
    )
};

export default PostCardBasic
