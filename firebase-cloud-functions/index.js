// === DOC https://medium.com/@marwa.diab/firebase-cloud-functions-event-triggers-57d9a039bc7f

const admin = require('firebase-admin');

const {
    log,
} = require("firebase-functions/logger");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

const nodemailer = require('nodemailer');
const nodemailer_handler = nodemailer.createTransport({
    secure: true,
    service: "gmail",
    auth: {
        user: 'foto888999@gmail.com',
        pass: 'byly zhzl puhi henn',
    }
});

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");

const {getFirestore, Timestamp} = require("firebase-admin/firestore");
const functions = require("firebase-functions");

initializeApp();

var db = admin.firestore();

exports.do_send_email = onDocumentCreated("/port_otp_for_check/{docId}", (event) => {

    let doc_data = event.data.data();
    console.log('=== doc_data ', doc_data)

    db.collection('log_data').add({
        moment: Date.now(),
        original: JSON.stringify(doc_data),
    })

    const ts = Timestamp.now();
    const sec = Timestamp.now().seconds;

    const new_data = {
        ts: ts,
        sec: sec,
        created: Math.floor(ts),
        expired: Math.floor(ts) + (3 * 60 * 60 * 24),
        otp_plan: Math.floor(Math.random() * 100000),
    }

    nodemailer_handler.sendMail({
        // bp_sign_up_with_email_otp_send_email
        //=== NOT WORKING from :'good_food@gmail.com',
        //=== DOC TO SOLVE https://stackoverflow.com/questions/44761407/nodemailer-with-gmail-from-address-does-not-change
        // to:"vtest777999@gmail.com",
        to: doc_data.new_email, //client side new_email,
        subject: 'Good Food one time password: for Sign Up !',
        text: "You are on the way into Good Food system - one time pin/password: " + new_data.otp_plan,
        html: "<div>" +
            "You are on the way into Good Food system" +
            "<br>  " +
            "<br> " +
            "one time pin/password: " + new_data.otp_plan +
            "<br>" +
            "<br>" +
            "Have a nice day!" +
            "</div>",
    }).then(res => {
            console.log('===!!!!!!!!!!! OK do_send_email successfully sent that mail')
        }
    ).catch(err => log('=== ERROR /////////// nodemailer_handler ', err));

    // ====================
    // ====================
    // ====================

    return event.data.ref.set({...new_data, status: 'OK', do_send_email_exit: Date.now()}, {merge: true});

    // return event.data?.ref.update({
    //     creationDate: event.data.updateTime,
    //     "isActive": true,
    // });

});


exports.port_check_otp = functions.https.onCall(async (data, context) => {
    const docId = data.docId;
    const new_email = data.new_email;
    var docRef = db.collection("port_otp_for_check").doc(docId) //user_email
    const ret_all = await docRef.get().then(async (ret_get) => {
        if (!ret_get.exists) {
            ret = {
                status: 'ERROR - data not exist for ' + docId,
                bp_id: 'bp_sign_up_with_email_otp_check',
            }
            return ret
        } else {
            ret_plan = ret_get.data()
            ret = {
                ret_plan: JSON.stringify(ret_plan),
                params_docId: docId,
                otp_input: data.otp_input,
                ret_plant: typeof ret_plan,
                otp_inputt: typeof data.otp_input,
                otp_verified: (ret_plan.otp_plan.toString() === data.otp_input),

                bp_id: 'bp_sign_up_with_email_otp_check',
                // ==========================
                timestamp: Date.now(),
                status: 'OK'
            }

            ret = {...ret, ...{user_exist: false}}

            // new_email == user_email
            await db.collection("port_users").where("user_email", "==", new_email)
                .get()
                .then((res_users) => {
                    res_users.forEach((doc_user) => {
                        // doc.data() is never undefined for query doc snapshots
//                             console.log("=== !!!! doc_user", doc_user.id, " => ", doc_user.data());
                        ret = {...ret, ...{user_exist: true}}
                    });
                })
                .catch((error) => {
//                         console.log("=== !!!! no data in port_users documents: ", error);
                });


            return ret
        }
    });


    return ret_all

});

// new_email
// vtest777999@gmail.com
