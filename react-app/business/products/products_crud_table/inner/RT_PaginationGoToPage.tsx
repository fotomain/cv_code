
import React from "react";
import {Stack, TextField} from "@mui/material";

import H16 from "../../../entrance/steps/H16";
import {DividerH} from "../../WooProductsAdminPage/MUITools";

const RT_PaginationGoToPage = (props:any) => {

    return(<Stack direction="row" justifyContent={'center'} alignItems={'center'}>
            <span className="flex items-center gap-1">

                <H16>{'Page'}</H16>
                  <H16>
                    {props.table.getState().pagination.pageIndex + 1} of{' '}
                      {props.table.getPageCount()}
                  </H16>

            </span>

                <span className="flex items-center gap-1">
                        <DividerH/>
                        <H16>|</H16>

                        <H16
                            onClick={()=>{
                                // console.log('=== Go to page ')
                                props.table.setPageIndex(props.table.getState().pagination.pageIndex + 1 +1 +1)
                            }}
                        >Go to page:</H16>
                          <TextField
                              variant={'standard'}
                              type="number"
                              value={props.state.pageNumberToGo}
                              onChange={e => {
                                  // const page = e.target.value ? Number(e.target.value) - 1 : 0
                                  props.table.setPageIndex(Number(e.target.value)-1)
                                  props.set_state((prev_state:any)=>{return  {...prev_state,
                                      pageNumberToGo:e.target.value,
                                  }})

                              }}
                              className="border p-1 rounded w-16"
                          />
                </span>


    </Stack>)

}

export default RT_PaginationGoToPage

