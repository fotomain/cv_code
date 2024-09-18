

import {IDeleteProductResponse,  WooDeleteParams} from '../models';
import { isSuccessfulResponse } from '../utils';
import CWooEntity from "../../../business/products/WooProductsAdminPage/woo_api/WooEntityRoot";
import axios from 'axios';

class woo_metadata  {
  woo_products = new CWooEntity('products')
}
const md = new woo_metadata()



export const PRODUCTS_DELETE_DO = async (
    delete_params: WooDeleteParams,
): Promise<IDeleteProductResponse> => {

  let error_text = ''
  try {

    console.log('=== delete_params 1 ',delete_params)

      // const source = delete_params?.delete_json_data?.CancelToken;
    let controller_cancel = new AbortController();
    if(delete_params?.delete_json_data?.controller_cancel)
       controller_cancel = delete_params?.delete_json_data?.controller_cancel

      // const controller = new AbortController();

      let res_delete:any = delete_params.entity_guid
      let deleted_data:any = {}
      if(delete_params.entity_guid) {

        // =========== axios cancel test
        // for (let i = 0; i < 10000; i++) {
        //   const res1 = await axios.get('https://fakestoreapi.com/products',
        //       {
        //         signal: controller_cancel.signal,
        //       }
        //   )
        //   console.log('=== delete_params controller_cancel res1 ',res1.data.length, Date.now())
        // }

        // TODO BATCH MODE https://woocommerce.github.io/woocommerce-rest-api-docs/#batch-update-products

          const res = await md.woo_products.read({
            'entity_guid': delete_params.entity_guid,
            // signal: controller_cancel.signal,
          })

          console.log('=== delete_params read res ',res)

              //   if (1 !== res.data.length) {
              //
              //     console.log('=== error3 delete_params - no 1 but many products found  - ', res.data)
              //
              //     let err_text = ''
              //     if (1 < res.data.length) {
              //       err_text = '=== error3 delete_params - no 1 but many products found - ' + res.data.length
              //     }
              //     if (0 === res.data.length) {
              //       err_text = '=== error4 delete_params - no products found - ' + res.data.length
              //     }
              //
              //     alert(err_text)
              //
              //     return {
              //       response_data: {delete_params: delete_params},
              //       isSuccessful: false,
              //       error: axios.isAxiosError(err_text)
              //           ? err_text
              //           : new Error('An error has occured'),
              //     };
              // }

        console.log('=== delete_params res ', res)
        console.log('=== delete_params products ▄▄▄▄▄▄▄▄▄▄▄▄▄ id', res.data[0].id)
        console.log('=== delete_params products meta_data ', res.data[0]?.meta_data)

          res_delete = await md.woo_products.delete({}, {
            id: res.data[0].id,
            force: true,
            // signal: controller_cancel.signal,
          })

        const deleted_data = res_delete.data
        console.log('=== delete_params products res_delete ', res_delete)
        console.log('=== delete_params products deleted_data ', deleted_data)

      }else if(delete_params.id) {

        res_delete = await md.woo_products.delete({}, {
          id: delete_params.id,
          force: true,
        })

      }else {
        error_text += 'No parameters to delete - no id , no entity_guid exist'
      }

      if (isSuccessfulResponse(res_delete)) {
        console.log('=== delete_params -> delete data OK ',deleted_data)
        delete_params.delete_json_data.do_after_delete_finished?.()
          return {
            response_data:deleted_data,
            isSuccessful: true,
          };
      }

    return {
      response_data: {delete_params: delete_params},
      isSuccessful: false,
      error: new Error('An error has occured! '+error_text),
    };
  } catch (error) {
    return {
      response_data:{delete_params: delete_params},
      isSuccessful: false,
      error: axios.isAxiosError(error)
          ? error
          : new Error('An error has occured. params '+JSON.stringify(delete_params)),
    };
  }
};
