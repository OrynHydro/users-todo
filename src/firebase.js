import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2ancYNPC3forcWNnuONKPZTYqIRB658U",
    authDomain: "register-form-11025.firebaseapp.com",
    projectId: "register-form-11025",
    storageBucket: "register-form-11025.appspot.com",
    messagingSenderId: "843923185430",
    appId: "1:843923185430:web:ac57d0f665d5ecad993a37"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)