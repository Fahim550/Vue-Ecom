// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseApp = initializeApp({
    // your application settings
    apiKey: "AIzaSyAwBRseMY7F3sjOuWfoUtkE1s10Ked3G68",
    authDomain: "e-com-vue.firebaseapp.com",
    projectId: "e-com-vue",
    storageBucket: "e-com-vue.appspot.com",
    messagingSenderId: "500650255920",
    appId: "1:500650255920:web:0ebd0e9041cd56a57a2ff5"
})

// Initialize Firebase
export const db = getFirestore(firebaseApp)
// export const todosRef = collection(db, 'todos')