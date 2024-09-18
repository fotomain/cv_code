
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


import React, {useState} from "react";
import {
    Table,
    Box,
    Grid,
    TableBody,
    TableHead,
    TableRow,
    IconButton,
    Stack,
} from "@mui/material";
import {tw_row_center} from "../../../system_code/tw/tw_tools";
import {flexRender} from "@tanstack/react-table";
import FilterForColumn from "./inner/table_filter_column";


import SwapVertIcon from '@mui/icons-material/SwapVert';
import StraightIcon from '@mui/icons-material/Straight';

import get_style_header from "./inner/table_get_style_header";
import {no_filter_no_search} from "./products_table_definitions";
import RT_PaginationButtons from "./inner/RT_PaginationButtons";
import RT_PaginationGoToPage from "./inner/RT_PaginationGoToPage";
import RT_PaginationRowsPerPage from "./inner/RT_PaginationRowsPerPage";
import RT_PaginationTotalRows from "./inner/RT_PaginationTotalRows";
import {useTheme} from "@mui/material/styles";


const TableCRUDVisual = (props:any) => {


    // sss 000

    const [state, set_state] = useState({
        pageNumberToGo:1,
    })

    const theme = useTheme();

    // sss1
    return(<Grid container id={'table1_container'}
                 display={'column'}
                 justifyContent={'start'}
                 alignItems={'start'}
    >
        {/*xs, sm, md, lg, xl*/}
        <Grid item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            // lg={ 8}
            // xl={ 8}
        >
        <Table id={'table1_table'}

               sx={{
                   display: 'block',
                   // maxWidth:{xs: '98%', sm: '98%', md: '98%', lg: '100%', xl: '100%'},
                   maxWidth:{xs:'355px',sm:'655px',md:'760px',lg:'100%',xl:'100%',},
                   overflow:'auto',
                   // pl: {xs: '5px', sm: 2, md: 2, lg: 0, xl: 0},
                   // pr: {xs: '5px', sm: 2, md: 2, lg: 0, xl: 0},
               }}

        >
            {/*<thead>*/}
            <TableHead>
            {props.table.getHeaderGroups().map((headerGroup:any) => (
                <TableRow key={headerGroup.id}>
                {/*<tr key={headerGroup.id}>*/}
                    {headerGroup.headers.map((header:any) => {
                        return (
                            <th key={header.id} colSpan={header.colSpan}
                                id={header.id+'-'+header.colSpan}
                                style={{...get_style_header({id: header.id + '-' + header.colSpan})} }
                            >
                            {/*<th key={header.id} colSpan={header.colSpan}>*/}
                                {header.isPlaceholder ? null : (
                                    <div
                                        style={{
                                        // backgroundColor:'red',
                                        // border:'solid 2px red',
                                        }}
                                    >
                                        Select row
                                            <div className={tw_row_center}
                                                //TODO C+ FIX WIDTH TANSTACK
                                                //WORKS! style={{width:150}}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}

                                                {(
                                                    !header.column.getCanSort()
                                                    // || ('titles'===header.column.id)
                                                    || no_filter_no_search(header.column.id)
                                                    || ('media'===header.column.id)
                                                    || ('prices'===header.column.id)
                                                )?<></>:

                                                    // <SwapVertIcon/>
                                                    <IconButton
                                                        title={'Sort toggler'}
                                                        style={{width:'10px',height:'10px'}}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {/*{header.column.getIsSorted()}*/}
                                                        {('asc'===(header.column.getIsSorted() as string))
                                                            ?<StraightIcon />
                                                            :('desc'===(header.column.getIsSorted() as string))
                                                                ?
                                                                <StraightIcon
                                                                    sx={{
                                                                        transform : 'rotate(180deg)',
                                                                    }}
                                                                />
                                                                :
                                                                <SwapVertIcon/>
                                                        }
                                                    </IconButton>

                                                    // onClick: header.column.getToggleSortingHandler(),
                                                }

                                            </div>


                                            {(
                                                header.column.getCanFilter()
                                                // && ('titles'!==header.column.id)
                                                //     TODO props
                                                && (!no_filter_no_search(header.column.id))
                                                && ('media'!==header.column.id)
                                                && ('prices'!==header.column.id)
                                              )
                                                ? (
                                                <Box id={'filter_'+header.id} sx={{
                                                    // optins_
                                                    margin:0,
                                                    padding:0,
                                                    width:'auto',
                                                    // width:'100%'
                                                }}>
                                                    <FilterForColumn column={header.column} table={props.table} />
                                                </Box>
                                            ) : null}

                                    </div>
                                )}
                            </th>
                        )
                    })}
                </TableRow>
            ))}
            </TableHead>
            {/*<tbody>*/}
            <TableBody>
            {props.table.getRowModel().rows.map((row:any) => {
                // prepareRow(row);
                return (
                    <React.Fragment key={'fragment-'+row.id}>
                        <TableRow>
                        {/*<tr>*/}
                            {/*key={row.id}*/}
                            {row.getVisibleCells().map((cell:any) => {
                                return (
                                    <td key={cell.id}
                                        data-debug={'data-debug-cell'}

                                        //TODO C+ FIX WIDTH TANSTACK
                                        // NOT WORK style={{ width: cell.column.getSize(),}}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                )
                            })}
                        </TableRow>

                        {/*000*/}
                        {/*<div  >{row.getVisibleCells().length}</div>*/}
                        {(props.table.options.meta?.row_CanNotBeExpanded(row)) && props.table.options.meta?.row_IsExpanded(row) && (
                            <TableRow>
                            {/*<tr>*/}
                                <td colSpan={row.getVisibleCells().length}>
                                    <props.TableRowSubNode row={row} table={props.table}/>
                                    {/*<div>{JSON.stringify(row.id)}</div>*/}
                                    {/*<div>row_expand_subnode {(row.original.row_expand_subnode)?'true':''}</div>*/}
                                    {/*<div>{JSON.stringify(row)}</div>*/}
                                </td>
                            </TableRow>
                        )}

                    </React.Fragment>
                )
            })}
            </TableBody>
        </Table>
        </Grid>
        {/*<div className="h-2" />*/}
        <Stack direction="column" justifyContent={'space-between'} sx={{width:'100%'}} >

            <div id='div_line1'
                 css={css` padding-top:4px; padding-bottom:4px; width:100%;  border-bottom:1px solid; 
                        border-bottom-color: darkgray; `
                        // border-bottom-color: ${theme.palette.primary.main}; `
                 }
                 // css={css` padding-top:4px; padding-bottom:4px; width:100%;  border-bottom:1px solid; border-bottom-color: ${theme.palette.primary.main} ` }
            ></div>

            <Stack direction="column" justifyContent={'start'} alignItems={'center'}>
                <RT_PaginationButtons {...props}/>
                <RT_PaginationGoToPage {...props} state={state} set_state={set_state} />
            </Stack>

            <Stack direction="column" justifyContent={'end'} alignItems={'center'}>
                <RT_PaginationRowsPerPage {...props}/>
                <RT_PaginationTotalRows {...props}/>
            </Stack>
        </Stack>

    </Grid>)

}
export default TableCRUDVisual
