// import delay from 'redux-saga';
import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {AT_CRUD_READ_cat_content_types_SQLITE_START, IS_LOADING} from "../state_redux/actions_types";

const delay_async = (ms:any) => new Promise(res => setTimeout(res, ms))

const thisFile = "FILE_saga_AT_SQLITE_MAIN_DATA_READ_START"

const todo1 = async(action_to_exec:any) => {
    console.log("=== todo1 action_to_exec ",action_to_exec)
    console.log("=== todo1 action_to_exec.params_to_exec ",action_to_exec.params_to_exec)
    try {
        //new main data -> STEP 6 !!! query from SQLite

        let database1  = action_to_exec.params_to_exec.database_to_exec

        if(IS_LOADING==database1){ return }

        let f_pre_sql = await database1.query( "PRAGMA case_sensitive_like = 1" )

        let tSQL = "" +
            "SELECT * FROM content_types "

        let tRES= await database1.query( tSQL )

        console.log("=== tRES.values",tRES.values)

        return tRES

    }catch (e) {

        window.alert("=== ERROR 202 error_message:e " + e )
        return {ret_code:"ERROR", error_message:e}

    }
}

export function* exec1(action:any) {

    console.log("=== exec1 action",action)

    try{
        const ret111:any[] = yield call(todo1, action)
        console.log("=== ret111",ret111)
    }
    catch (e) {
        console.error("=== ERROR exec_function "+thisFile,e)
    }

}


function* taskOne() {
    console.log('taskOne starting...');

    try {
         const ret1:any[] = yield call(exec1,AT_CRUD_READ_cat_content_types_SQLITE_START)
        // const ret1:any[] = yield takeLatest(AT_CRUD_READ_cat_content_types_SQLITE_START,exec1)
        console.log('=== ret111', ret1[0]);
    }
    catch (e) {
        console.error("=== ERROR 303 exec_function "+thisFile,e)
    }

    // yield delay(7000);
    console.log('first task completed');



    // yield delay(7000);
    console.log('first task completed');
}

function* taskTwo() {
    console.log('taskTwo starting...');
    yield delay_async(5000);
    console.log('second task completed');
}

function* taskThree() {
    console.log('taskThree starting...');
    yield delay_async(3000);
    console.log('third task completed');
}

function* runTasks() {
    const firstTask:any[] = yield fork(taskOne);
    const secondTask:any[] = yield fork(taskTwo);
    const thirdTask:any[] = yield fork(taskThree);
}

function* workerAdd(action:any) {
    try {
        console.log("=== workerAdd action",action)
    }
    catch (e) {

        console.error("=== ERROR 505 exec_function "+thisFile,e)

    }


}

export function* watchAdd() {
    // yield takeLatest(AT_CRUD_READ_cat_content_types_SQLITE_START, workerAdd);
     yield call( workerAdd, AT_CRUD_READ_cat_content_types_SQLITE_START);
}

export default function* parallelTasksSaga() {

    yield all([
        watchAdd()
    ])

    //Saga  parallel Tasks with takeLatest
    // console.log('%cstarting tasks...', 'color: #16b141');
    // yield call(runTasks);
    // console.log('%call tasks completed', 'color: #1f29c5');
}
