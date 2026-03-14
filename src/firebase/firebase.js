import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCp2RQoKzvkRR5dcfTuLDkh3is9l9JovtU",
  authDomain: "olx-like.firebaseapp.com",
  projectId: "olx-like",
  storageBucket: "olx-like.firebasestorage.app",
  messagingSenderId: "729039407492",
  appId: "1:729039407492:web:ddc135dd499564eb6cf5d1",
  measurementId: "G-QRDNYJMDCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)