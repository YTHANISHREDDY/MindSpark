// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqK-Q2D64dzB_rJCvB1t7PoaGWUndjGOA",
  authDomain: "quiz-e2772.firebaseapp.com",
  projectId: "quiz-e2772",
  storageBucket: "quiz-e2772.firebasestorage.app",
  messagingSenderId: "985810891747",
  appId: "1:985810891747:web:cbd01a9172e8304ed4a6d6",
  measurementId: "G-95M7K3FRJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 