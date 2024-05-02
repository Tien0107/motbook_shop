// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFylqglT1S7EIVnO0HfJSeSiNgXj-5mxQ",
  authDomain: "mern-book-project-74650.firebaseapp.com",
  projectId: "mern-book-project-74650",
  storageBucket: "mern-book-project-74650.appspot.com",
  messagingSenderId: "843725028497",
  appId: "1:843725028497:web:9b860b5fe106e922e25330",
  measurementId: "G-7HT04GPHT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;