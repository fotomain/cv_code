
import axios from 'axios';
import {IFetchProductResponse, ProductListItem, WooReadParams, WooUpdateParams1, WooUpdateParams2} from '../models';
import { isSuccessfulResponse } from '../utils';
import CWooEntity from "../../../business/products/WooProductsAdminPage/woo_api/WooEntityRoot";
import {stringify_clear} from "../../../system_code/code_global/GlobalFunctions";

class woo_metadata  {
  woo_products = new CWooEntity('products')
}
const md = new woo_metadata()

const debug_local=true
export const PRODUCTS_READ_DO = async (
    read_params: (WooReadParams | null),
): Promise<IFetchProductResponse> => {

  if (debug_local) console.log('=== read_params',read_params)

  try {

    let par_ ={}
    if(read_params && read_params.read_json_data) par_= read_params?.read_json_data

    if (debug_local) console.log('=== work_array par_ ',par_)

    const ret = await md.woo_products.read({
      ...par_
    })

    if (debug_local) console.log('=== work_array par_ ret data0',ret)

    if (isSuccessfulResponse(ret)) {

      let response:{data:ProductListItem[]} = {data:[]}

      try {

        let data = ret.data
        if (debug_local) console.log('=== data ret ',ret)
        if (debug_local) console.log('=== data ret read_params ',read_params)
        const params_=JSON.parse(stringify_clear(read_params))
        const total_rows = ret?.headers['x-wp-total']
        let total_pages = ret?.headers['x-wp-totalpages']
        total_pages = Math.floor(total_pages )
        if (debug_local) console.log('=== data total_rows',total_rows)
        if (debug_local) console.log('=== data total_pages a1',total_pages)
        if (debug_local) console.log('=== data ',data)
        let work_array: ProductListItem[]=[]
        if (debug_local) console.log('=== work_array ',work_array)

        if( read_params?.read_json_data?.read_all && total_pages > 1){

          const array_run:any[]=[]
          for (let pp = 1; pp < (total_pages+1); pp++) {
            par_={
              ...par_,
              'per_page':100,
              'page':pp,
            }
            if (debug_local) console.log('=== par_ ',par_,pp)
            const part = md.woo_products.read({
              ...par_
            })
            array_run.push(part)
          }
          if (debug_local) console.log('=== a1 array_run ',array_run.length, array_run)
          let all_data:any = []

          await axios.all(array_run).then((response) => {
            response.map(res =>
                all_data = [...all_data, ...res.data ]
            )
            if (debug_local) console.log('=== a1 all_data ',all_data)
            data=all_data
            console.log('=== data1 ',data)
          }).catch(e => {
            console.log('=== error all_data fetching posts: ', e)
            console.log('=== error all_data fetching posts: JSON ', read_params?.read_json_data)
          })

        }else{
          const ret = await md.woo_products.read({
            ...read_params?.read_json_data
          })
          data = ret.data
          console.log('=== data2 ',data)
        }

        // TODO NOW !!!
        // push_current_data( current_page, current_data, work_array )

        for (let i = 0; i < data.length; i++) {

          if (debug_local) console.log('=== data[i] ',data[i])

          let current_guid=''
          let current_main_image_url=''
          let current_main_video_url=''
          for (let m = 0; m < data[i]?.meta_data.length; m++) {
            let md_key = data[i]?.meta_data[m]
            if( 'entity_guid'===md_key.key ){
              current_guid= md_key.value
            }
            if( 'main_image_url'===md_key.key ){
              current_main_image_url= md_key.value
            }
            if( 'main_video_url'===md_key.key ){
              current_main_video_url= md_key.value
            }
          }

          if(''===current_guid) continue //no empty guid TODO OPTION_

          let json_= JSON.parse(stringify_clear(data[i]))
          // console.log('=== json_',params_, json_)
          if(params_.read_json_data?.page)
            json_.current_page = params_.read_json_data.page
          else
            json_.current_page = 1
          // console.log('=== json_',json_)
          // console.log('=== json_ params_.product_json_data.page ',)

          work_array.push({
            current_page:json_.current_page,
            id:data[i].id as string, //data[i].id
            name:data[i].name as string,
            regular_price:data[i].regular_price ,
            sale_price:data[i].sale_price ,
            on_sale:data[i].on_sale ,
            sku:data[i].sku ,
            status:data[i].status as string,
            entity_guid:current_guid as string,
            main_video_url:current_main_video_url,
            // main_video_url:'https://videos.pexels.com/video-files/15921892/15921892-uhd_3840_2160_50fps.mp4',
            main_image_url:current_main_image_url,
            // main_image_url:'https://img.freepik.com/premium-photo/tranquil-garden-pond-with-stone-statue-generative-ai_547471-6812.jpg?w=900',
            main_image_alt:'Picture Main',
            // main_image_url:'https://img.freepik.com/free-photo/buddha-statue-with-natural-water-landscape_23-2150774085.jpg?t=st=1715874475~exp=1715878075~hmac=10a2611ce96cdfae864f733fea1468750a912ce9cf0d93958b7e3fbd9915827a&w=360',


            // table_entity_id:data[i].id as string, //data[i].id
            // table_entity_name:data[i].name as string,
            // table_entity_regular_price:data[i].regular_price as number,
            // table_entity_status:data[i].status as string,
            // table_entity_guid:current_guid as string,

            row_expand_subnode:false,
            total_rows:total_rows,
            total_pages:total_pages,
            product_json_data:json_,
          } as ProductListItem)
        }
        if (debug_local)  console.log('=== work_array ',work_array)

        response = {data:work_array as ProductListItem[]}

        if (debug_local)  console.log('=== work_array response ',response)

      }catch (e) {

        console.log('=== work_array ERROR1',e)

      }

      // read_params?.read_json_data.do_after_read?.()

      console.log('=== work_array OK response.data',response.data)

      return {
        products: response.data as ProductListItem[],
        isSuccessful: true,
      };
    }
    return {
      isSuccessful: false,
      error: new Error('An error has occured'),
    };
  } catch (error) {
    // console.log('=== response.data ',response.data)
    return {
      isSuccessful: false,
      error: axios.isAxiosError(error)
          ? error
          : new Error('An error has occured'),
    };
  }
};
