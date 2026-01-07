// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-NnHwxqCTGdJzpZgTmZoEYii75No-dIQ",
  authDomain: "tastematch-c2647.firebaseapp.com",
  projectId: "tastematch-c2647",
  storageBucket: "tastematch-c2647.firebasestorage.app",
  messagingSenderId: "41882599139",
  appId: "1:41882599139:web:b66d2dd1a2dcc8a1788fd6",
  measurementId: "G-EH9C4Y4WJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);