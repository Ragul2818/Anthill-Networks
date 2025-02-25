import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Firebase Storage

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMByrsUOYEilxPY-QNtW9J-wwAfx-9sh4",
  authDomain: "second-hand-cars-fe6ae.firebaseapp.com",
  projectId: "second-hand-cars-fe6ae",
  storageBucket: "second-hand-cars-fe6ae.appspot.com",
  messagingSenderId: "669183766733",
  appId: "1:669183766733:web:5976d1dbfa8e9f09d57984",
  clientId: "669183766733-qnbrgb5as7r9jv12lk6ourk60on0tvij.apps.googleusercontent.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Firebase Storage

// ✅ Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

// ✅ Function to log out
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// ✅ Export everything correctly
export { auth, provider, db, storage, app };
