
const get_field_options = (p:any) => {
    let ret = {
        label: ' ',
        inputProps:{min: 0, style: { textAlign: 'left'  }},
        do_clear_button: false,
        do_copy_to_clipboard_button: false,
        do_delete_row_button: false,
        read_only: false,
        numbers_only: false,
        width: 100,
    }

    // console.log('=== p.id ',p.id,p.id==='table_entity_name')
    switch (p.id) {
        case 'entity_guid':{
            return {...ret,...{
                    read_only: true,
                    do_copy_to_clipboard_button: true,
                    width: '30px',
                }};
            break
        };
        case 'name':{
            return {...ret,...{
                    label: 'title in gallery',
                    do_clear_button: true,
                    do_copy_to_clipboard_button: true,
                    width: '200px',
                }};
            break
        };
        case 'regular_price':{
            return {...ret,...{
                    numbers_only:true,
                    label: 'regular price',
                    inputProps:{min: 0, style: { textAlign: 'right'  }}
                }};
            break
        };
        case 'sale_price':{
            return {...ret,...{
                    numbers_only:true,
                    label: 'sale price',
                    inputProps:{min: 0, style: { textAlign: 'right'  }}
                }};
            break
        };
        case 'status':{
            return {...ret,...{
                    label: 'Status',
                    do_delete_row_button: true,
                }};
            break
        };

        case 'main_image_url':{
            return {...ret,...{
                    label: 'main image URL',
                    do_copy_to_clipboard_button: true,
                    width: '300px',
                }};
            break
        };

        case 'main_video_url':{
            return {...ret,...{
                    label: 'main video URL',
                    do_copy_to_clipboard_button: true,
                    width: '200px',
                }};
            break
        };

    }
    return ret
}

export default get_field_options