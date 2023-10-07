// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkcEuuq6hkAMQOUO1dH6jlu4V9fVOsl3M",
  authDomain: "e-com-c89a5.firebaseapp.com",
  projectId: "e-com-c89a5",
  storageBucket: "e-com-c89a5.appspot.com",
  messagingSenderId: "193577967024",
  appId: "1:193577967024:web:8264d7279768ab01f20a75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
