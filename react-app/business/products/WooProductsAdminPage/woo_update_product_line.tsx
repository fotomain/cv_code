import CWooEntity from "./woo_api/WooEntityRoot";

class woo_metadata  {
    woo_products = new CWooEntity('products')
}
const md = new woo_metadata()


const woo_update_product_line = (p:any) =>{

    const {
        old_data,
        new_data,
        upload_guid_obj,
        tags_obj,
        categories_obj,
        do_after,
    } = p


    return md.woo_products.update({
            ...(tags_obj)?tags_obj:{},
            ...(categories_obj)?categories_obj:{},
            name:                 new_data['name'],
            // type:                 'variable',
            type:                 new_data['type'], //simple
            description:          new_data['description'],
            short_description:    new_data['description'],
            sku:                  new_data['sku'], //'99'
            price:                new_data['price'], //'99'
            regular_price:        new_data['regular_price'], //'99'
            sale_price:           new_data['sale_price'],
            on_sale:              (new_data['sale_price']!==new_data['sale_price']),
            catalog_visibility:   "visible",
            status:               "publish",
            attributes: [
                {
                    id: 11,
                    "name": "Package",
                    "visible": true,
                    "variation": false,
                    "options": [
                        "Eco",
                        "Standardt",
                    ]
                }
            ],

            // tags:[{id:58},{id:59},],
            // categories: [
            //     {
            //         "id": 80,
            //     },
            // ],
            "meta_data": [
                {
                    "key": "entity_guid",
                    "value": new_data['entity_guid'],
                },
                ...(upload_guid_obj)?upload_guid_obj:[{}],
                {
                    "key": "entity_title",
                    "value": "product_guid__"+new_data['entity_guid'],
                },
                {
                    "key": "main_image_url",
                    "value":new_data.main_image_url
                },
                {
                    "key": "main_video_url",
                    "value":new_data.main_video_url
                },
            ]
        },
        {id: old_data.id}
    )

} //update_1product

export default woo_update_product_line
