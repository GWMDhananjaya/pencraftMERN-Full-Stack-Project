// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pencraft-287b7.firebaseapp.com",
  projectId: "pencraft-287b7",
  storageBucket: "pencraft-287b7.appspot.com",
  messagingSenderId: "131081645848",
  appId: "1:131081645848:web:6a5a365a54b7448501f86d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);