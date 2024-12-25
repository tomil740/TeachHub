import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApjEvAOZ67-_NMwydyS-6gG8rxPqVAjKU",
  authDomain: "finalproject-76cd7.firebaseapp.com",
  databaseURL: "https://finalproject-76cd7-default-rtdb.firebaseio.com",
  projectId: "finalproject-76cd7",
  storageBucket: "finalproject-76cd7.appspot.com", // Corrected storage bucket
  messagingSenderId: "487633042332",
  appId: "1:487633042332:web:86fde33c3dc7a47c54e659",
  measurementId: "G-KFP1ST7Y9K",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
