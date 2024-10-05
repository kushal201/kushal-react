// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-4QYbHFAna2PTpz5cmaOQ6JXQWjmUfAI",
  authDomain: "foodie-faster-f8dfd.firebaseapp.com",
  projectId: "foodie-faster-f8dfd",
  storageBucket: "foodie-faster-f8dfd.appspot.com",
  messagingSenderId: "344423228413",
  appId: "1:344423228413:web:7401c545dd1b4dcfd6ef94",
  measurementId: "G-1SEFEW7DR7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { auth };
