// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM6o_1wU58g4F2SLQMilHG3pqmTbFk_e8",
  authDomain: "bookstore-328a6.firebaseapp.com",
  projectId: "bookstore-328a6",
  storageBucket: "bookstore-328a6.firebasestorage.app",
  messagingSenderId: "981587148620",
  appId: "1:981587148620:web:a7fb54cde009d25c6199e9",
  measurementId: "G-4YJ4MXBHV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;