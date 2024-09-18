
import React from "react";
import {Link} from "@mui/material";


const RT_CellLink = (p:any) => {

    const { row, column, table } = p

    return(<>
        <Link
            ref = {ref => {
                table.options.meta.updateRef(row, column.id, p.getValue(), ref);
            }}
            sx={{
                display: 'inline-block',
                width:'200px',
                // maxWidth:'300px',
                //c+ o+ wordWrap:'break-word'
            }}
            // href={value.value_data}>
            // {value.value_data}
            href={row.original?.[p.column.id]}
            target="_blank"
        >

            {row.original?.[p.column.id]}
        </Link>
    </>)

}

export default RT_CellLink
