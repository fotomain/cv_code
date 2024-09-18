
import React from 'react';
import { createRoot } from 'react-dom/client';

import './ui/fonts_custom/fonts_main/fonts_main.css'
import './index.css'


//mysettigs +
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';
import { defineCustomElements as jeepSqlite, applyPolyfills, JSX as LocalJSX  } from "jeep-sqlite/loader";
import { HTMLAttributes } from 'react';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

import App from "./App";

// mysettigs +

type StencilToReact<T> = {
    [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, 'className'> & {
    class?: string;
};
} ;

declare global {
    export namespace JSX {
        interface IntrinsicElements extends StencilToReact<LocalJSX.IntrinsicElements> {
        }
    }
}

applyPolyfills().then(() => {
    jeepSqlite(window);
});
//mysettigs -

//mysettigs +
window.addEventListener('DOMContentLoaded', async () => {

    const platform = Capacitor.getPlatform();
    const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
    // alert('=== platform === ' + platform.toString())
    console.log('=== platform === ' + platform.toString())
    if(platform === "web") {

        const jeepEl = document.createElement("jeep-sqlite");
        document.body.appendChild(jeepEl);
        await customElements.whenDefined('jeep-sqlite');
        await sqlite.initWebStore();
    }
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection("db_issue99",false)).result;
    let db: SQLiteDBConnection
    try {
        if (ret.result && isConn) {
            db = await sqlite.retrieveConnection("db_issue99",false);
            console.log("=== db retrieveConnection ",db)
        } else {
            db = await sqlite.createConnection("db_issue99", false, "no-encryption", 1,false);
            console.log("=== db createConnection ",db)
        }

        await db.open();
        //PRIMARY KEY NOT NULL
        //NOT NULL
        //TODO device_guid
        let query = `
            CREATE TABLE IF NOT EXISTS test (
              id INTEGER ,
              name TEXT 
        );
        `
        //=== INSERT INTO test (id,name) VALUES (11111,'2222222')

        let query2 = `
            SELECT * FROM test
        `

        // const res: any =
        await db.execute(query).then(res=> async () => {
            
        })
        // console.log(55555555)
        // const res1: any = await db.execute(query1);
        const res2: any = await db.query(query2);
        // alert("=== res2 ==="+JSON.stringify(res2))

        console.log(`=== sqlite test result 1 : ${JSON.stringify(res2)}`);
        await db.close();
        await sqlite.closeConnection("db_issue99", false);

        //mysettigs -

        const container = document.getElementById('root');
        const root = createRoot(container!);
        root.render(
            // for arimations
            // <React.StrictMode>

            <App/>

            // </React.StrictMode>
        );

        //mysettigs +

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
        serviceWorkerRegistration.unregister();
        // If you want to start measuring performance in your app, pass a function
        // to log results (for example: reportWebVitals(console.log))
        // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        // reportWebVitals();

    } catch (err) {
        alert(`=== index.tsx Error: ${err}`);
        console.log(`=== index.tsx Error: ${err}`);
        throw new Error(`=== index.tsx Error: ${err}`)
    }

});
//mysettigs -

// ==============================
// ==============================
// ==============================
// ==============================
// ============================== 000000000000000000
// ==============================
// ==============================
//
// const container = document.getElementById('root');
// const root = createRoot(container!);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
