
const get_style_header=(p:any)=>{
    const border_style='solid 2px lightgray'
    const  border_none =[
        '2_name_name-1', '2_entity_guid_entity_guid-1',
        '',
    ]
    const  border_left =[
        '2_select_select-1',
        '2_regular_price_regular_price-1',
        '2_main_image_url_main_image_url-1',
    ]
    const  border_left_right =[
        ''
    ]
    const  border_right =[
        '2_row_expand_subnode_toggler_row_expand_subnode_toggler-1',
        '2_main_video_url_main_video_url-1',
    ]
    const  border_top =[
        '1_row_expand_subnode_toggler_2_row_expand_subnode_toggler_row_expand_subnode_toggler-1',
    ]
    const  border_top_left =[
        '1_select_2_select_select-1',
        '2_main_image_url_main_image_url-1',
    ]
    const  border_top_left_right =[
        '1_titles_2_name_name-2',
        '1_prices_2_regular_price_regular_price-3',
        '1_main_image_url_2_main_image_url_main_image_url-1',
        '1_main_video_url_2_main_video_url_main_video_url-1',
        '1_media_2_main_image_url_main_image_url-2',
   ]

    let border_={}
    switch (true) {
        //none
        case -1!==border_left.indexOf(p.id):{
            border_= {borderLeft:border_style}
            break
        }
        case -1!==border_left_right.indexOf(p.id):{
            border_= {borderLeft:border_style,borderRight:border_style}
            break
        }
        case -1!==border_right.indexOf(p.id):{
            border_={borderRight:border_style}
            break
        }
        case -1!==border_top.indexOf(p.id):{
            border_={borderTop:border_style}
            break
        }
        case -1!==border_top_left.indexOf(p.id):{
            border_={
                borderTop:border_style,
                borderLeft:border_style,
            }
            break
        }
        case -1!==border_top_left_right.indexOf(p.id):{
            border_={
                borderTop:border_style,
                borderLeft:border_style,
                borderRight:border_style,
                // borderBottom:'none',
            }

            console.log('=== border_top_left_right',p.id)

            return border_
            break
        }
        case -1!==border_none.indexOf(p.id):{
            border_={}
            break
        }
        default:{
            border_={
                // backgroundColor:'red',
                border:border_style,
            }
        }

    }//switch

    return {...border_}

}

export default get_style_header

