// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  orderBy,
  where,
  query,
  addDoc,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBES5_O83o6ddl3K8cxwKf7kYr8Ivf6jhg",
  authDomain: "testchat-fcbaa.firebaseapp.com",
  databaseURL: "https://testchat-fcbaa-default-rtdb.firebaseio.com",
  projectId: "testchat-fcbaa",
  storageBucket: "testchat-fcbaa.appspot.com",
  messagingSenderId: "163188260816",
  appId: "1:163188260816:web:71a55007018b29cf87c3d5",
  measurementId: "G-4M4KB1LYQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const fbProvider = new FacebookAuthProvider();
const storage = getStorage(app);
fbProvider.addScope("user_photos");
fbProvider.addScope("publicProfile");
const ggProvider = new GoogleAuthProvider();

export {
  auth,
  db,
  fbProvider,
  ggProvider,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  collection,
  getDocs,
  doc,
  onSnapshot,
  orderBy,
  where,
  query,
  addDoc,
};
