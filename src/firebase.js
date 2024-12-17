// firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApjEvAOZ67-_NMwydyS-6gG8rxPqVAjKU",
  authDomain: "finalproject-76cd7.firebaseapp.com",
  databaseURL: "https://finalproject-76cd7-default-rtdb.firebaseio.com",
  projectId: "finalproject-76cd7",
  storageBucket: "finalproject-76cd7.firebasestorage.app",
  messagingSenderId: "487633042332",
  appId: "1:487633042332:web:86fde33c3dc7a47c54e659",
  measurementId: "G-KFP1ST7Y9K",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
const db = getFirestore(app);

// Authentication instance
const auth = getAuth(app);

// Sign up with email and password
const signUp = async (
  email,
  password,
  name,
  profileImg,
  bio,
  skills,
  servicesOffered,
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const userProfile = {
      uid: user.uid,
      name,
      profileImg,
      bio,
      skills,
      servicesOffered,
      servicesRequested: [],
      coins: 0,
      created_at: new Date(),
    };
    await setDoc(doc(db, "users", user.uid), userProfile);
    console.log("User signed up and profile created");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

// Sign in with email and password
const signInWithEmailPassword = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

// Get user profile
const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

// Update user profile
const updateUserProfile = async (uid, updatedData) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

export {
  auth,
  db,
  signUp,
  signInWithEmailPassword,
  getUserProfile,
  updateUserProfile,
};
