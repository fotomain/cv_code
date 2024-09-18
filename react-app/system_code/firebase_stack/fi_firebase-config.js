
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getFunctions } from 'firebase/functions';
import {apiKey, appId, authDomain, measurementId, messagingSenderId, projectId, storageBucket} from "./secrets";

export const fi_firebaseConfig = {

  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId

};

export const firebase_app = initializeApp(fi_firebaseConfig);

export const fiauth = getAuth(firebase_app);

export const fidb = getFirestore(firebase_app);

export const fifunc = getFunctions(firebase_app);


