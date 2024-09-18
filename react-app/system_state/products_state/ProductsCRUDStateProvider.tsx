import React from "react";

// npm install @reduxjs/toolkit

import { Provider } from 'react-redux';
import store_main from './store/store_main';
import ProductsTableCRUD from "../../business/products/products_crud_table/ProductsTableCRUD";

const ProductsCRUDStateProvider = (props:any) => {

    return(
        <Provider store={store_main} >
            {/*<DemoProductsApp/>*/}
            {props.children}
            {/*<ProductsTableCRUD />*/}
        </Provider>
)

}

export default ProductsCRUDStateProvider
