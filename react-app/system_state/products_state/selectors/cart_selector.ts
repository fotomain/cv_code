

import { TStoreState } from '../reducers';


import {ICartState} from "../models/cart_model";

//CART_ACTION_STEP_6
export const SEL_CART_DATA = (state: TStoreState): ICartState =>
{
    // console.log('=== state.cart_state ',state.cart_state)
    return ((undefined===state.cart_state)?({} as ICartState):state.cart_state)
}



