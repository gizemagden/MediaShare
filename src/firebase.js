import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
  db,
  collection,
  onSnapshot,
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword
};
