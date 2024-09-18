
// color="#6cd04c"

import React, {useState, useMemo, useEffect, useRef} from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Stack, Divider
} from '@mui/material';


import { useTable } from 'react-table';
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {CancelOutlined, DeleteForever} from "@mui/icons-material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


import {styled} from "@mui/styles";

import IconWithShowAfter from "../../show_global/IconWithShowAfter";
import {tw_row_left} from "../../../../../system_code/tw/tw_tools";
import {GlobalsContext} from "../../../../../system_code/context_globals/globals_context";
import {
    fi_login_places_crud_delete,
    fi_login_places_crud_disconnect_start
} from "../../../../../system_code/firebase_stack/fi_login_places_crud";

const string_add = (params) => {
    const ts = params.string.toString()
    if(ts) {
        const more_length = params.new_length - ts.length
        if (more_length > 0) {
            return ts + new Array(more_length).join(' ')
        }
    }
    return ts
}


const WorkPlacesTable = (props) => {

    const { global_props, global_dispatch } = React.useContext(GlobalsContext);

    var data =[];
    // data = [
    //     {
    //         col_n: 1,
    //         col_os: 'Windows',
    //         col_status: 'on',
    //         col_workplace_guid: '123456789_123456789_123456789_123456',
    //         node_ref: useRef(null),
    //     },
    //     {
    //         col_n: 2,
    //         col_os: 'iPhone',
    //         col_status: 'off',
    //         col_workplace_guid: '123456789_123456789_123456789_123456',
    //         node_ref: useRef(null),
    //     },
    //     {
    //         col_n: 3,
    //         col_os: 'iPad',
    //         col_status: 'off',
    //         col_workplace_guid: '123456789_123456789_123456789_123456',
    //         node_ref: useRef(null),
    //     },
    // ];

    let place_row_ref = useRef({});

    for (let i = 0; i <global_props.current_user.login_places?.length ; i++) {
        // console.log('=== global_props.current_user.login_places[i]',global_props.current_user.login_places[i])
        const place = global_props.current_user.login_places[i]
        data[i]={
            col_n:i,
            col_os: place.os,
            col_status: place.is_focused,
            col_workplace_guid: place.device_guid,
            node_ref: place_row_ref,
        }
    }

    console.log('=== data',data)

    const [dataRows, setData] = useState(data);
    const [skipPageReset, setSkipPageReset] = useState(false);
    const [open, setOpen] = useState(false);

    const columns = useMemo(() => [
        {
            Header: '#',
            accessor: 'col_n',
            width:'2px',
        },
        {

            //customHeader
            // CardHeader: 'OS',
            Header: (props) => (
                <div className="flex">
                    <div className="inline-flex" title={"This data is about OS from thi client's browser window"}
                         style={{paddingLeft:'5px'}}
                    >
                        OS
                    </div>
                    <div className="inline-flex">
                        <FontAwesomeIcon
                            icon={faExclamationCircle}
                            color={'#6cd04c'}
                            className={"icon__" + props.value}
                            title={"This data is about OS from thi client's browser window"}
                        />
                    </div>
                </div>
            ),
            accessor: 'col_os',
            width:'30px',


            // Cell: (props) => ( // RENDER CELL of THIS column
            //     <FontAwesomeIcon
            //         icon={faExclamationCircle}
            //         color={'red'}
            //         className={"icon__" + props.value}
            //     />
            // ),
        },
        {
            Header: 'Status',
            accessor: 'col_status',
            width:'30px',
        },
        {
            Header: 'Guid',
            accessor: 'col_workplace_guid',
            width:'30px',
        },
    ], []);

    // Editable cell code
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            })
        );
    };



    // TODO  row: row;  row_index = row.index
    // TODO  column: column;  column_id = column.id

    //TODO dataRows = from global_props
    //TODO CellRender
    const HeaderRender = ({
                                     value: initialValue,
                                     row: { index },
                                     column: { id: column_id },
                                     updateMyData, // This is a custom function that we supplied to our table instance
                                 }) => {
        return <div>Header</div>
    }

    const CellRender = ({
                                     value: initialValue,
                                     row: { index },
                                     column: { id: column_id },
                                     updateMyData, // This is a custom function that we supplied to our table instance
                                 }) => {


        console.log('=== CellRender ',column_id)
        // We need to keep and update the state of the cell normally
        const [value, setValue] = useState(initialValue);

        const onChange = e => {
            setValue(e.target.value);
        };

        // We'll only update the external data when the input is blurred
        const onBlur = () => {
            updateMyData(index, column_id, value);
        };

        // If the initialValue is changed external, sync it up with our state
        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        // Check to make sure not all columns are editable
        // if (column_id !== "col_os") {
        //     console.log('=== column ',column_id)
        //     return (<div className={tw_row_left +  ' w-[20px] '}>
        //         <input value={value} onChange={onChange} onBlur={onBlur}/>
        //     </div>)
        // }

        const MyDivider = styled(Divider)(({ thiccness, direction }) => ({
            ...(thiccness !== undefined &&
                ((direction === "x_axis" || direction === "x" )
                    ? { borderRightWidth: thiccness }
                    : { borderBottomWidth: thiccness }))

        }));

        if (column_id === "col_os") {

            const local_id = 'col_os_'+dataRows[index].col_n+'___'+dataRows[index].col_workplace_guid
            const before_icon_id = local_id+'_before_icon'


            return <TableCell>
            <div className={tw_row_left+  ' w-[70px] '}
                        id={'div_os_column_'+local_id}
            >

                <div
                    id={'div_os_icons_'+local_id}
                >

                    {/*<IconWithGlobalAlert*/}
                    {/*    icon={CancelOutlined}*/}
                    {/*    on_click={async (p) =>{*/}
                    {/*        console.log('=== on_press IconOnPressAlert')*/}
                    {/*        fi_login_places_crud_disconnect_start(*/}
                    {/*            {*/}
                    {/*                user_guid: global_props.current_user.user_guid,*/}
                    {/*                device_guid:dataRows[index].col_workplace_guid,*/}
                    {/*                do_after:()=>{*/}
                    {/*                    show_global_alert({*/}
                    {/*                        show_title:'Workplace disconnected',global_props, global_dispatch,*/}
                    {/*                        // show_severity:'info',*/}
                    {/*                        show_severity:'warning',*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*            }*/}
                    {/*        )*/}
                    {/*    }}*/}
                    {/*/>*/}


                    <IconWithShowAfter
                        use_mount_alert={true}
                        use_timeout={1500}
                        main_element={CancelOutlined}
                        node_id={'copy_'+before_icon_id}
                        title_message_alert={'Workplace disconnected'}
                        show_where={'near'}
                        show_multiline={false}
                        props_alert={{severity:'info'}}
                        do_after={async (p) =>{

                            fi_login_places_crud_disconnect_start(
                                {
                                    user_guid: global_props.current_user.user_guid,
                                    device_guid:dataRows[index].col_workplace_guid,
                                    do_after:()=>{
                                        // show_global_alert({
                                        //     show_title:'Workplace disconnected',global_props, global_dispatch,
                                        //     // show_severity:'info',
                                        //     show_severity:'warning',
                                        // })
                                    }
                                }
                            )
                        }}

                    />

                </div>

                <MyDivider direction="x_axis" thiccness={10} />

                <Stack
                    sx={{width:'60px'}}
                >
                    {string_add({string:value,new_length:10})}
                </Stack>
                {/*<Stack sx={{width:'60px'}}>{value}</Stack>*/}

                {/*return*/}
            </div>
            </TableCell>

        }

        if (column_id === "col_status") {
            return <TableCell>
            <Stack
                sx={{...(value!=='blur')?{color:'green'}:{},
                    ...{width:'56px'}}}
            >
                {string_add({string:value,new_length:10})}
            </Stack>
            </TableCell>

        }


        if (column_id === "col_workplace_guid") {

            const local_id = 'col_os_'+dataRows[index].col_n+'___'+dataRows[index].col_workplace_guid
            const before_icon_id = local_id+'_before_icon'

            // customCell
            return <TableCell sx={{pl:'0px'}}>

            <div id='cell_guid' className={tw_row_left+  ' pl-0 ml-0 w-[30px] '}>

                <div
                    id={'div_guid_'+index.toString()}
                >

                    <IconWithShowAfter
                        use_mount_snackbar={true}
                        use_timeout={1500}
                        main_element={ContentCopyIcon}
                        node_id={'copy_'+before_icon_id}
                        title_message_snackbar={'Data copied'}
                        do_after={async (p) =>{
                            navigator.clipboard.writeText(JSON.stringify({col_workplace_guid: dataRows[index].col_workplace_guid}))
                        }}

                        sx_alert={{marginLeft:'-90px'}}
                    />

                </div>

                <div>
                    <IconWithShowAfter
                        use_mount_dialog={true}
                        sx_dialog={{maxWidth:"xs"}} //xs sm md
                        main_element={DeleteForever}
                        node_id={'delete_'+before_icon_id}
                        title_message_dialog={'Workplace deleted...'}
                        message_time={3000}

                        on_press_left={async (p) =>{
                            //need for refresh component
                        }}

                        on_press_right={async (p) =>{

                            fi_login_places_crud_delete({
                                user_guid: global_props.current_user.user_guid,
                                device_guid:dataRows[index].col_workplace_guid,
                                do_after:(p)=>{
                                }
                            })

                        }}

                    />
                </div>

                <div style={{width:'550px'}}>{value}</div>

            </div>
            </TableCell>
        }

        return (<div className={tw_row_left+  ' w-[30px] '}>
            {value}
        </div>)
    };


    // Set our editable cell renderer as the default Cell renderer
    const defaultCellRender = {
        Cell: CellRender,
    };
    const defaultHeaderRender = {
        Cell: HeaderRender,
    };


    useEffect(() => {
        setSkipPageReset(false);
        console.log(dataRows);
    }, [dataRows]);

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn: defaultCellRender,
        // defaultHeader: defaultHeaderRender,
        autoResetPage:
            !skipPageReset, updateMyData });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <Box
        id={'table_box'}
            sx={{
            // marginTop: 15,
            // marginLeft: 15,
            marginBottom: 10,
            // height: 200,
            width: '100%',
            // width: 'auto',
            overflow:'auto',
        }}>

            {(0 === dataRows.length)?<p>Data not exist...</p>:

                <TableContainer style={{
                    // maxHeight: 200,
                    // overflow:'auto'
                    // overflow:'visible'
                }} >
                    <Table {...getTableProps()}
                           stickyHeader={true}
                    >
                        <TableHead>
                            {headerGroups.map(headerGroup => (
                                <TableRow {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <TableCell  {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                // sx={{width:cell.width}}
                                                <td  {...cell.getCellProps()} >
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box>
    );
}

export default WorkPlacesTable;

