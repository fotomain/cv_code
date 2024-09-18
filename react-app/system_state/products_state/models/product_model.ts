
import { AxiosError } from 'axios';
// npm i yup
import * as yup from 'yup';
import { object } from 'yup';
import {TJSONValue} from "./global_types";
import {TTableLine} from "../../../business/products/products_crud_table/inner/table_types";

export type TProduct = {
  id?: string;
  entity_guid: string;
  name: string;
  sku?: string;
  category?: string;
  regular_price?: string;
  sale_price?: string;
  on_sale?: boolean;
  status?: string;
  main_image_url?: string;
  main_image_alt?: string;
  main_video_url?: string;
  description?: string;

  row_expand_subnode?: boolean;
  total_rows?: number;
  total_pages?: number;

  product_json_data?:any;
};

export type ProductListItem = TProduct & {
  id: string;
};


export type WooReadParams = {
  sku?:string;
  id?:number;
  read_json_data?:any;
}

export type WooUpdateParams1 = {
  id: string;
  entity_guid?: string;
  update_json_data:any;
}
export type WooUpdateParams2 = {
  id?: string;
  entity_guid: string;
  update_json_data:any;
}
export interface IUpdateProductResponse {
  response_data: any;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export type WooDeleteParams = {
  id?: string;
  entity_guid?: string;
  name?: string;
  delete_json_data?:any;
};


export interface IFetchProductResponse {
  products?: ProductListItem[];
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export interface IProductResponse {
  product: TProduct | undefined;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export interface IDeleteProductResponse {
  response_data: any;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
  fromWhere?: string;
}



export interface IProductState {
  deleteModalOpen: boolean;

  products_create_started: boolean;
  products_create_response?: IProductResponse;

  //=== PS_STEP3
  products_selected?: TTableLine[];

  products_first_access: boolean;

  products_read_started: boolean;
  products_read_finished: boolean;

  products_update_started: boolean;
  products_update_finished: any;
  products_delete_started: boolean;

  products_read_response?: IFetchProductResponse;
  selectedProducts: ProductListItem[];
  products_delelete_response?: IDeleteProductResponse;

  yesno_dialog_opened?: boolean;
  yesno_dialog_closed?: boolean;

}

export const productSchema=
  // https://github.com/jquense/yup
  object()
  .shape({
    id: yup.string().notRequired().nullable(),
    name: yup.string().required('Name is required'),
    category: yup.string().required('Category is required'),
    regular_price: yup
      .number()
      .typeError('Price is required')
      .min(0, 'Price must be greater than 0')
      .required('Price is required'),
  })
  .required();
