import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);

export {
  db,
  auth,
  storage,
  ref,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  uploadBytesResumable,
  getDownloadURL
};
