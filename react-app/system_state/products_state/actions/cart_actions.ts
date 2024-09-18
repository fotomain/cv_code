

import { createAction } from '@reduxjs/toolkit';
import {TJSONValue} from "../models/global_types";

const CART_PREFIX = 'CART';

//CART_ACTION_STEP_1
export const CART_ADD_1UNIT_ACTION = createAction<TJSONValue>(
    `APP_${CART_PREFIX}CART_ADD_1UNIT_ACTION`,
);

export const CART_REMOVE_1UNIT_ACTION = createAction<TJSONValue>(
    `APP_${CART_PREFIX}CART_REMOVE_1UNIT_ACTION`,
);

