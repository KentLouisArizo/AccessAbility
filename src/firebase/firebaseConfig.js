import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: "AIzaSyAAU3E5okpJMGQ6r7z0byvdlwslV2sFlsc",
    authDomain: "accessability-a149e.firebaseapp.com",
    projectId: "accessability-a149e",
    storageBucket: "accessability-a149e.appspot.com",
    messagingSenderId: "5977907952",
    appId: "1:5977907952:web:d375a21f4b8f04b6941835",
    measurementId: "G-TGZDNKVG4W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
