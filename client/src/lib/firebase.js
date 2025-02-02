// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuXjA_ZV4fBlOdJcACRaxDUm8vVQoRL38",
  authDomain: "eiskenpropertiesoauth.firebaseapp.com",
  projectId: "eiskenpropertiesoauth",
  storageBucket: "eiskenpropertiesoauth.firebasestorage.app",
  messagingSenderId: "989043385584",
  appId: "1:989043385584:web:4313c583ad9b5f5ee28e35",
  measurementId: "G-3F2TBY9KVR",
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
