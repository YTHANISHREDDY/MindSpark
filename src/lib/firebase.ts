// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6YsTBTEjmYbahiiHSjXiy28UmHyupBxs",
  authDomain: "quiz-26610.firebaseapp.com",
  projectId: "quiz-26610",
  storageBucket: "quiz-26610.firebasestorage.app",
  messagingSenderId: "205972823350",
  appId: "1:205972823350:web:73cc9078648a24b825e797",
  measurementId: "G-X65M45M2FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 


