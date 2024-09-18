import {
  IFetchProductResponse,
  IDeleteProductResponse,
  IProductResponse,
  ProductListItem,
} from '../models';
import {
  PRODUCTS_READ_STARTED_ACTION,
  // isLoadingAction,
  PRODUCTS_CREATE_STARTED_ACTION,
  PRODUCTS_DELETE_STARTED_ACTION,
  setDeleteModalOpenAction,
  setSelectedProductsAction,
  PRODUCTS_READ_FINISHED_ACTION,
  PRODUCTS_CREATE_FINISHED_ACTION,
  PRODUCTS_DELETE_FINISHED_ACTION, PRODUCTS_DATA_TO_STORE_ACTION,
} from '../actions';
import reducer, { product_state_initial } from './product_reducer';

describe(`[reducers] product reducer`, () => {
  it(`reduces ${PRODUCTS_READ_STARTED_ACTION.name} correctly when set to true`, () => {
  // it(`reduces ${isLoadingAction.name} correctly when set to true`, () => {
    const state = reducer(
        product_state_initial,
        PRODUCTS_READ_STARTED_ACTION(true)
        // isLoadingAction(true)
    );
    expect(state.products_read_started).toEqual(true);
    // expect(state.isLoading).toEqual(true);
  });

  it(`reduces ${PRODUCTS_READ_STARTED_ACTION.name} correctly when set to false`, () => {
  // it(`reduces ${isLoadingAction.name} correctly when set to false`, () => {
    const state = reducer(
        product_state_initial,
        PRODUCTS_READ_STARTED_ACTION(false)
        // isLoadingAction(false)
    );
    expect(state.products_read_started).toEqual(false);
    // expect(state.isLoading).toEqual(false);
  });

  it(`reduces ${PRODUCTS_CREATE_STARTED_ACTION.name} correctly when set to true`, () => {
    const state = reducer(product_state_initial, PRODUCTS_CREATE_STARTED_ACTION(true));
    expect(state.products_create_started).toEqual(true);
  });

  it(`reduces ${PRODUCTS_CREATE_STARTED_ACTION.name} correctly when set to false`, () => {
    const state = reducer(product_state_initial, PRODUCTS_CREATE_STARTED_ACTION(false));
    expect(state.products_create_started).toEqual(false);
  });

  it(`reduces ${PRODUCTS_DELETE_STARTED_ACTION.name} correctly when set to true`, () => {
    const state = reducer(product_state_initial, PRODUCTS_DELETE_STARTED_ACTION(true));
    expect(state.products_delete_started).toEqual(true);
  });

  it(`reduces ${PRODUCTS_DELETE_STARTED_ACTION.name} correctly when set to false`, () => {
    const state = reducer(product_state_initial, PRODUCTS_DELETE_STARTED_ACTION(false));
    expect(state.products_delete_started).toEqual(false);
  });

  it(`reduces ${setDeleteModalOpenAction.name} correctly when set to true`, () => {
    const state = reducer(product_state_initial, setDeleteModalOpenAction(true));
    expect(state.deleteModalOpen).toEqual(true);
  });

  it(`reduces ${setDeleteModalOpenAction.name} correctly when set to false`, () => {
    const state = reducer(product_state_initial, setDeleteModalOpenAction(false));
    expect(state.deleteModalOpen).toEqual(false);
  });

  it(`reduces ${setSelectedProductsAction.name} correctly when setting a list of items`, () => {
    const selectedItems = [
      {
        id: '12345',
        entity_guid: 'entity_guid12345',
        name: 'Item 1',
        category: 'Category 1',
        regular_price: '100',
        product_json_data: {},

        total_rows:0,
        total_pages:0,

      },
      {
        id: '123456',
        entity_guid: 'entity_guid123456',
        name: 'Item 2',
        category: 'Category 2',
        regular_price: '100',
        product_json_data: {},
        total_rows:0,
        total_pages:0,

      },
    ];

    const state = reducer(
      product_state_initial,
      setSelectedProductsAction(selectedItems),
    );
    expect(state.selectedProducts).toHaveLength(2);
    expect(state.selectedProducts[0]).toMatchObject(selectedItems[0]);
    expect(state.selectedProducts[1]).toMatchObject(selectedItems[1]);
  });

  it(`reduces ${setSelectedProductsAction.name} correctly when setting a empty list of items`, () => {
    const selectedItems: ProductListItem[] = [];

    const state = reducer(
      product_state_initial,
      setSelectedProductsAction(selectedItems),
    );
    expect(state.selectedProducts).toHaveLength(0);
  });

  it(`reduces ${PRODUCTS_READ_FINISHED_ACTION.name} correctly`, () => {
    const response: IFetchProductResponse = {
      isSuccessful: true,
      products: [
        {
          id: '12345',
          entity_guid: 'entity_guid12345',
          name: 'Item 1',
          category: 'Category 1',
          regular_price: '100',
          product_json_data: {},
          total_rows:0,
          total_pages:0,
        },

      ],
    };

    const state = reducer(
      product_state_initial,
      PRODUCTS_DATA_TO_STORE_ACTION(response),
    );
    expect(state.products_read_response).toMatchObject(response);
  });

  it(`reduces ${PRODUCTS_CREATE_FINISHED_ACTION.name} correctly`, () => {
    const response: IProductResponse = {
      isSuccessful: true,
      product: {
        id: '12345',
        entity_guid: 'entity_guid888',
        name: 'Item 1',
        category: 'Category 1',
        regular_price: '100',
        product_json_data: {},

        total_rows:0,
        total_pages:0,

      },
    };

    const state = reducer(
      product_state_initial,
      PRODUCTS_CREATE_FINISHED_ACTION(response),
    );
    expect(state.products_create_response).toMatchObject(response);
  });

  it(`reduces ${PRODUCTS_DELETE_FINISHED_ACTION.name} correctly`, () => {
    const response: IDeleteProductResponse = {
      isSuccessful: true,
      response_data: {id:'12345'},
    };

    const state = reducer(
      product_state_initial,
      PRODUCTS_DELETE_FINISHED_ACTION(response),
    );
    expect(state.products_delelete_response).toMatchObject(response);
  });
});

