
import React, {useEffect} from "react";
import {Stack, useMediaQuery} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {mui_width_in, muiWidth} from "../../../../system_code/code_global/GlobalFunctions";
import {useTheme} from "@mui/material/styles";

const RT_PaginationButtons = (props:any) => {

    const mui_width = muiWidth({theme:useTheme(),useMediaQuery:useMediaQuery})
    useEffect(() => {

        console.log('=== props.table.getState().pagination.pageIndex ',props.table.getState().pagination.pageIndex)

        return () => {

        };
    }, [props.table.getState().pagination.pageIndex]);


    return(<>

        <Stack spacing={2}>
            <Pagination
                // size={'small'}
                size={mui_width_in('lg,xl,md',mui_width)?'large':'small'}
                // size={{xs: 'small', sm: 'small', md: 'medium', lg: 'large', xl: 'large%'}}
                sx={{padding:'0px'}}
                count={props.table.getPageCount()}
                siblingCount={1}
                // defaultPage={(props.table.getState().pagination.pageIndex)?props.table.getState().pagination.pageIndex:1}
                page={(0===props.table.getState().pagination.pageIndex)?1:props.table.getState().pagination.pageIndex+1}
                showFirstButton
                showLastButton
                onChange={(e,pageNumber)=>{
                    console.log('=== pageNumber ',pageNumber)
                    props.table.setPageIndex(pageNumber-1)
                }}
            />
        </Stack>

    </>)

}

{/*<button*/}
{/*    className="border rounded p-1"*/}
{/*    onClick={() => props.table.setPageIndex(0)}*/}
{/*    disabled={!props.table.getCanPreviousPage()}*/}
{/*>*/}
{/*    {'<<'}*/}
{/*</button>*/}
{/*<button*/}
{/*    className="border rounded p-1"*/}
{/*    onClick={() => props.table.previousPage()}*/}
{/*    disabled={!props.table.getCanPreviousPage()}*/}
{/*>*/}
{/*    {'<'}*/}
{/*</button>*/}
{/*<button*/}
{/*    className="border rounded p-1"*/}
{/*    onClick={() => props.table.nextPage()}*/}
{/*    disabled={!props.table.getCanNextPage()}*/}
{/*>*/}
{/*    {'>'}*/}
{/*</button>*/}
{/*<button*/}
{/*    className="border rounded p-1"*/}
{/*    onClick={() => props.table.setPageIndex(props.table.getPageCount() - 1)}*/}
{/*    disabled={!props.table.getCanNextPage()}*/}
{/*>*/}
{/*    {'>>'}*/}
{/*</button>*/}


export default RT_PaginationButtons
