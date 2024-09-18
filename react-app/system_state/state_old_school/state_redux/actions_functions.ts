
import {
    AT_DISPLAY_ACTION,
    AT_DB_OPEN_SQLITE_START,
    AT_CRUD_READ_GLOBAL_SQLITE_START,
    AT_CRUD_EXEC,
} from './actions_types';

export const function_AT_DISPLAY_ACTION = (p_params:any) => ({

    type    : AT_DISPLAY_ACTION,
    p_data  : {p_data_items:p_params},

})

export const function_AT_CRUD_EXEC = (params:any) => ({
    type: AT_CRUD_EXEC,
    status: 'STARTED',
    params_to_exec:params
});

export const function_AT_SQLITE_MAIN_DATA_READ_START = (params:any) => ({
    type: AT_CRUD_READ_GLOBAL_SQLITE_START,
    status: 'STARTED',
    params_to_exec:params
});

export const function_AT_SQLITE_DB_OPEN_START = (params:any) => ({
    type: AT_DB_OPEN_SQLITE_START,
    status: 'STARTED',
    params_to_exec:params
                        // {database_name:'dic1_mw'}
});

