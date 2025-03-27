import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsMZQzepbbXG0okbVC8ZlWov97tAGPGXo",
  authDomain: "fin-app-e66c3.firebaseapp.com",
  projectId: "fin-app-e66c3",
  storageBucket: "fin-app-e66c3.firebasestorage.app",
  messagingSenderId: "42968297174",
  appId: "1:42968297174:android:4f7130525e891cd211e377"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
