

import React from "react";
import H16 from "../../../entrance/steps/H16";

const RT_PaginationTotalRows = (props:any) => {

    return(<>
        <H16>Total {props.table.getFilteredRowModel().rows.length} rows active</H16>
    </>)

}

export default RT_PaginationTotalRows
