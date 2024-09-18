import { root_reducer_initial_state, TStoreState } from '../reducers';
import {
  getDeleteModalOpen,
  getDeleteProductResponse,
  getEditProduct,
  getProductSaveResponse,
  SEL_PRODUCTS_READ_STARTED,
  getSelectedProducts,
  SEL_PRODUCTS_READ,
  SEL_PRODUCTS_CREATE_STARTED,
} from './product_selector';

const product = {
  id: '1111',
  entity_guid: 'entity_guid1111',
  name: 'name',
  category: 'category',
  regular_price: '100',
  product_json_data: {},

  total_rows:0,
  total_pages:0,

};

const allProducts = [
  product,
  {
    id: '2222',
    entity_guid: 'entity_guid2222',
    name: 'name 1',
    category: 'category 1',
    regular_price: '100',
    product_json_data: {},

    total_rows:0,
    total_pages:0,


  },
  {
    id: '3333',
    entity_guid: 'entity_guid3333',
    name: 'name 2',
    category: 'category 2',
    regular_price: '100',
    product_json_data: {},

    total_rows:0,
    total_pages:0,


  },
];

const products_delelete_response = {
  response_data: {entity_guid: '3333'},
  error: new Error('its failed'),
  isSuccessful: false,
};

const products_create_response = {
  product,
  error: undefined,
  isSuccessful: true,
};

const state: TStoreState = {
  ...root_reducer_initial_state,
  app: {

    title: 'React Hellow Starter!',
    //APP_ACTION_STEP_5
    memo_data:{},
    yesno_window_data:{},
    yesno_dialog_opened:false,
    progress_dialog_opened:false,
    progress_dialog_closed:false,

  },
  product_state: {
    deleteModalOpen: true,

    products_first_access: false,

    products_read_started: true,
    products_read_finished: false,

    products_create_started: true,
    products_update_started: true,
    products_update_finished: {},
    products_delete_started: true,

    selectedProducts: [product],

    products_read_response: {
      products: allProducts,
      error: undefined,
      isSuccessful: true,
    },

    products_create_response,
    products_delelete_response,
  },
};

describe(`[selectors] Product`, () => {
  test(`${SEL_PRODUCTS_READ_STARTED.name} should return the loading state`, () => {
    expect(SEL_PRODUCTS_READ_STARTED(state)).toEqual(true);
  });

  test(`${SEL_PRODUCTS_READ.name} should return the fetched products state`, () => {
    expect(SEL_PRODUCTS_READ(state)).toEqual(allProducts);
  });

  test(`${getEditProduct.name} should return the first selected product for edit products state`, () => {
    expect(getEditProduct(state)).toEqual(product);
  });

  test(`${getSelectedProducts.name} should return the selected products state`, () => {
    expect(getSelectedProducts(state)).toEqual([product]);
  });

  test(`${SEL_PRODUCTS_CREATE_STARTED.name} should return the is saving state`, () => {
    expect(SEL_PRODUCTS_CREATE_STARTED(state)).toEqual(true);
  });

  test(`${getProductSaveResponse.name} should return save response state`, () => {
    expect(getProductSaveResponse(state)).toEqual(products_create_response);
  });

  test(`${getDeleteModalOpen.name} should return delete modal open state`, () => {
    expect(getDeleteModalOpen(state)).toEqual(true);
  });

  test(`${getDeleteProductResponse.name} should return delete modal open state`, () => {
    expect(getDeleteProductResponse(state)).toEqual(products_delelete_response);
  });
});
