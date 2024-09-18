
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import React, {useEffect, useState} from "react";
import {GlobalsContext} from "../../../system_code/context_globals/globals_context";
import TitleMain from "../../../ui/pages/home_page/inner/TitleMain";
import AppearIt from "../../../ui/pages/home_page/inner/AppearIt";
import {PRODUCTS_READ_RUN_ACTION} from "../../../system_state/products_state/actions";
import {useDispatch, useSelector} from "react-redux";
import {SEL_PRODUCTS_READ} from "../../../system_state/products_state/selectors";
import {PRODUCTS_READ_DO} from "../../../system_state/products_state/api";
import {is_empty, JSON_stringify} from "../../../system_code/code_global/GlobalFunctions";
import ProductCardForCart from "./ProductCardForCart";
import {css_column_center, css_column_left} from "../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";
import {SEL_CART_DATA} from "../../../system_state/products_state/selectors/cart_selector";

const CartPageTotal = () => {

    // sss1
    return(
      // background-color:aliceblue
      <div id='div_cart_main' css={css` width: max-content; ${css_column_left} ` }>

      </div>
  )
}

export default CartPageTotal
