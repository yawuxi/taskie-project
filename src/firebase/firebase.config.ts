import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbzQja6UGxCTMAJ3ROalRN_vCvPYECYX8",
  authDomain: "taskie-project-607b7.firebaseapp.com",
  projectId: "taskie-project-607b7",
  storageBucket: "taskie-project-607b7.appspot.com",
  messagingSenderId: "424404484548",
  appId: "1:424404484548:web:a341ab66d3f15975a5e491"
};

const firebaseAPP = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(firebaseAPP);
const firebaseAUTH = getAuth(firebaseAPP);
const firebaseSTORAGE = getStorage();

export default {firebaseAPP, firestoreDB, firebaseAUTH, firebaseSTORAGE}
