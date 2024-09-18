

/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

import {Button} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";


import C_PlusMinusQuantity from "./C_PlusMinusQuantity";
import {SEL_CART_DATA} from "../../../../system_state/products_state/selectors/cart_selector";
import {css_row_center} from "../../../../ui/pages/home_page/Section4_ChooseProgram/TargetFilterLevel4_Days";
import {TJSONValue} from "../../../../system_state/products_state/models/global_types";
import {CART_ADD_1UNIT_ACTION} from "../../../../system_state/products_state/actions";
import {is_empty} from "../../../../system_code/code_global/GlobalFunctions";


const C_AddToCartButton = (props:any) => {

    const dispatch = useDispatch();
    const cart_data = useSelector(SEL_CART_DATA)

    const here_product = cart_data.products.filter((el:any)=> el.entity_guid===props.data.entity_guid)
    console.log('=== here_product ',here_product)

    return(
        <div css={css` width:100%; ${css_row_center} `} >
            {/*<div>{props.data.entity_guid}</div>*/}

            {(here_product.length!==0)
                ?<C_PlusMinusQuantity {...props} start_quantity={here_product[0].cart_quantity}

                      onPlus={()=>{
                          const gotoAction:TJSONValue = {
                              action_mode:'plus_value',
                              entity_guid:props.data.entity_guid,
                              new_value:1,
                          }
                          dispatch(CART_ADD_1UNIT_ACTION(gotoAction as TJSONValue))
                      }}
                      onMinus={()=>{
                          const gotoAction:TJSONValue = {
                              action_mode:'plus_value',
                              entity_guid:props.data.entity_guid,
                              new_value:-1,
                          }
                          dispatch(CART_ADD_1UNIT_ACTION(gotoAction as TJSONValue))
                      }}

                    onChangeQuantity={(e:any)=>{
                        console.log('=== onChangeQuantity( ',e.target.value)

                        const value=e.target.value
                            let gotoAction:TJSONValue = {
                                entity_guid:props.data.entity_guid,
                            }

                        if( is_empty(value) || 0===value ){
                            gotoAction.action_mode = 'remove_value'
                        }else{
                            gotoAction.action_mode = 'set_value'
                            gotoAction.new_value = value
                        }

                            dispatch(CART_ADD_1UNIT_ACTION(gotoAction as TJSONValue))
                    }}
                />
                :
                <Button variant="outlined"
                        sx={{fontSize:'18px',fontWeight: 700,borderRadius:'30px', paddingLeft:'6px', paddingRight:'9px', }}
                    // style={{ fontSize: '63px' }}
                        title={'Add to Cart'}

                        onClick={()=>{

                                const gotoAction:TJSONValue = {
                                    action_mode:'set_value',
                                    entity_guid:props.data.entity_guid,
                                    new_value:1,
                                }
                                dispatch(CART_ADD_1UNIT_ACTION(gotoAction as TJSONValue))

                        }}
                >
                    <AddOutlinedIcon sx={{ mr: 1 }} />
                    Add
                    <ShoppingBagOutlinedIcon  sx={{ ml: 1 }}/>
                </Button>
            }

        </div>

    )

}

export default C_AddToCartButton
