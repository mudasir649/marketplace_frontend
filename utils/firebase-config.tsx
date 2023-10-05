// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNgp2owPCTFdoonCCfEIA3c-mdTP52bXs",
    authDomain: "eidcarosse-7d282.firebaseapp.com",
    projectId: "eidcarosse-7d282",
    storageBucket: "eidcarosse-7d282.appspot.com",
    messagingSenderId: "232832919856",
    appId: "1:232832919856:web:c2cd17aa51558494f0c0f5",
    measurementId: "G-Q5SN026G80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();