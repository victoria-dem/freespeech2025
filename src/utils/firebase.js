import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDDDyOw0EgDP5_RAQqTv0y-oM4tJR9cnuA",
    authDomain: "freespeech2025-46bc5.firebaseapp.com",
    databaseURL: "https://freespeech2025-46bc5-default-rtdb.firebaseio.com",
    projectId: "freespeech2025-46bc5",
    storageBucket: "freespeech2025-46bc5.appspot.com",
    messagingSenderId: "831583678552",
    appId: "1:831583678552:web:74cff3c6bcf5ecdccb1a2d"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();