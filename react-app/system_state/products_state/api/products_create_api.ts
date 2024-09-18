
import axios from 'axios';
import { IProductResponse, TProduct } from '../models';
import { isSuccessfulResponse, axiosApi } from '../utils';
import CWooEntity from "../../../business/products/WooProductsAdminPage/woo_api/WooEntityRoot";

class woo_metadata  {
  woo_products = new CWooEntity('products')
}
const md = new woo_metadata()
//
export const PRODUCTS_CREATE_DO = async (
    create_params: TProduct,
): Promise<IProductResponse> => {
  // const url = process.env.REACT_APP_API_END_POINT ?? '';
  try {

    console.log('=== product create ',create_params)

    const {do_after_create_finished,...work_product_json_data} = create_params.product_json_data

    // TODO NOW if (!entity_guid)
    const ret = await md.woo_products.create({
      ...work_product_json_data
      // name: product.name,
      // type: 'simple',
      // description: 'description ',
    })

    console.log('=== product create woo_products.create',ret)

    if (isSuccessfulResponse(ret)) {
      const data = ret.data
      console.log('=== create data isSuccessfulResponse ',data)
      const response_data = {id:data.id, name: data.name}

        console.log('=== response_data ',response_data)

        create_params.product_json_data.do_after_create_finished?.()

        return {
          product: response_data as TProduct,
          isSuccessful: true,
        };

    }

    return {
      product: create_params,
      isSuccessful: false,
      error: new Error('An error has occured'),
    };
  } catch (error) {
    return {
      product: create_params,
      isSuccessful: false,
      error: axios.isAxiosError(error)
        ? error
        : new Error('An error has occured'),
    };
  }
};
