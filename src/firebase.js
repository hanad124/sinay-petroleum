import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "petroleum-system.firebaseapp.com",
  projectId: "petroleum-system",
  storageBucket: "petroleum-system.appspot.com",
  messagingSenderId: "70047918980",
  appId: "1:70047918980:web:bfcf7362a30c33111bcbd1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth();
export const storage = getStorage(app);
