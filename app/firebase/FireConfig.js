
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVg9vqXNA-SKrjomC8vgI1x-FHjR60TpI",
  authDomain: "authenticationapp2-8a108.firebaseapp.com",
  projectId: "authenticationapp2-8a108",
  storageBucket: "authenticationapp2-8a108.appspot.com",
  messagingSenderId: "986294196292",
  appId: "1:986294196292:web:2a054bcf844cf7afb74411"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);