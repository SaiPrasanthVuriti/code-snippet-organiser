
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAGBw_nwjRAGoF2dedyvE8kZpsZtswr2Ls",
  authDomain: "code-snippet-2f542.firebaseapp.com",
  projectId: "code-snippet-2f542",
  storageBucket: "code-snippet-2f542.firebasestorage.app",
  messagingSenderId: "161148535303",
  appId: "1:161148535303:web:00f65e9879ed976368a0a2",
  measurementId: "G-BSRTVT64R1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

