import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB5IaBi2_KlrcYcD2Qqc6OVQi2Ud3ViDNk",
    authDomain: "rogue-tattoos-5107a.firebaseapp.com",
    databaseURL: "https://rogue-tattoos-5107a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "rogue-tattoos-5107a",
    storageBucket: "rogue-tattoos-5107a.appspot.com",
    messagingSenderId: "171746665523",
    appId: "1:171746665523:web:4a37c880e8d8b84c5a6f46",
    measurementId: "G-55TYYMGKW1"
};


initializeApp(firebaseConfig);

const db = getFirestore();

export {db}