

import {
  IUpdateProductResponse,
  WooUpdateParams1,
  WooUpdateParams2
} from '../models';
import { isSuccessfulResponse } from '../utils';
import CWooEntity from "../../../business/products/WooProductsAdminPage/woo_api/WooEntityRoot";
import axios from 'axios';
class woo_metadata  {
  woo_products = new CWooEntity('products')
}
const md = new woo_metadata()
//
export const PRODUCTS_UPDATE_DO = async (
    update_params: (WooUpdateParams2 | WooUpdateParams1),
): Promise<IUpdateProductResponse> => {

  try {

    console.log('=== update_params ',update_params)

      let res_update:any = update_params.entity_guid
      let updated_data:any = {}
      if(update_params.entity_guid) {
          const res = await md.woo_products.read({
            'entity_guid': update_params?.entity_guid,
          })
          if (1 !== res.data.length) {

            console.log('=== error3 update_params - no 1 but many products found  - ', res.data)

            let err_text = ''
            if (1 < res.data.length) {
              err_text = '=== error3 update_params - no 1 but many products found - ' + res.data.length
            }
            if (0 === res.data.length) {
              err_text = '=== error4 update_params - no products found - ' + res.data.length
            }

            alert(err_text)

            return {
              response_data: {update_params: update_params},
              isSuccessful: false,
              error: axios.isAxiosError(err_text)
                  ? err_text
                  : new Error('An error has occured'),
            };
        }

        console.log('=== update_params read ', res)
        console.log('=== update_params products ▄▄▄▄▄▄▄▄▄▄▄▄▄ id', res.data[0].id)
        console.log('=== update_params products meta_data ', res.data[0]?.meta_data)

        res_update = await md.woo_products.update({...update_params.update_json_data}, {
          id: res.data[0].id
        })

        const updated_data = res_update.data
        console.log('=== update_params products res_update ', res_update)
        console.log('=== update_params products updated_data ', updated_data)

      }else if(update_params.id) {

        res_update = await md.woo_products.update({...update_params.update_json_data}, {
          id: update_params.id,
        })

      }

      if (isSuccessfulResponse(res_update)) {
        console.log('=== update_params -> OK updated_data ',updated_data)

          return {
            response_data:updated_data,
            isSuccessful: true,
          };
      }

    return {
      response_data: {update_params: update_params},
      isSuccessful: false,
      error: new Error('An error has occured'),
    };
  } catch (error) {
    return {
      response_data:{update_params: update_params},
      isSuccessful: false,
      error: axios.isAxiosError(error)
          ? error
          : new Error('An error has occured 29.04.2024 11:09'),
    };
  }
};
