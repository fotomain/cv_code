
import CWooEntity from "./woo_api/WooEntityRoot";

class woo_metadata  {
    woo_products = new CWooEntity('products')
}
const md = new woo_metadata()


const woo_create_product_empty = (p:any) =>{

    const {upload_guid_obj}=p

    // if(!)

    return md.woo_products.create({
        'name':'woo_create_product_empty',
        "meta_data": [
            ...upload_guid_obj,
            {
                "key": "entity_guid",
                "value": 'woo_create_product_empty'+Math.random()
            },
        ]
    })


}

export default woo_create_product_empty
