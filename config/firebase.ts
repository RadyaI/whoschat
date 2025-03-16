// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE,
  authDomain: "whoschat-e2516.firebaseapp.com",
  projectId: "whoschat-e2516",
  storageBucket: "whoschat-e2516.firebasestorage.app",
  messagingSenderId: "811298083658",
  appId: "1:811298083658:web:5dd45b9595fdf7542f67b3",
  measurementId: "G-1DZXCR6BBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}