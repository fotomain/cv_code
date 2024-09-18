
// AT_SQLITE_MAIN_DATA_READ_START
// saga_SQLITE_MAIN_DATA_READ_START

import saga_AT_SQLITE_MAIN_DATA_READ_START from '../state_saga/saga_AT_CRUD_READ_GLOBAL_SQLITE_START'
import saga_AT_SQLITE_DB_OPEN_START from '../state_saga/saga_AT_DB_OPEN_SQLITE_START'

import saga_AT_AT_CRUD_EXEC from "../state_saga/saga_AT_CRUD_EXEC";

export default [

    saga_AT_SQLITE_MAIN_DATA_READ_START,
    saga_AT_SQLITE_DB_OPEN_START,
    saga_AT_AT_CRUD_EXEC

]

