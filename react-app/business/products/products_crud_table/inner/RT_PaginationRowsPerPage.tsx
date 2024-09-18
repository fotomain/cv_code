
import React, {useEffect} from "react";
import {MenuItem, Select, Stack, TextField} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import H16 from "../../../entrance/steps/H16";

const RT_PaginationRowsPerPage = (props:any) => {

    return(<>
        <Select
            value={(props.table.getState().pagination.pageSize)?props.table.getState().pagination.pageSize:0}
            onChange={e => {
                //=== ORIGINAL table.setPageSize(Number(e.target.value))
                props.table.setPageIndex(0)
                props.setPagination((prev_state:any)=>{return  {...prev_state,
                    pageIndex: 0, //initial page index
                    pageSize:Number(e.target.value)
                }});

            }}
        >
            {[5, 10, 20, 30, 40, 50, 100].map(pageSize => (
                <MenuItem key={pageSize} value={pageSize}>
                    {pageSize} rows per page
                </MenuItem>
            ))}
        </Select>
    </>)

}

export default RT_PaginationRowsPerPage
