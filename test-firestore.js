import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  doc, 
  getDoc 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword
} from 'firebase/auth';

// Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

// Test user credentials - update these with a valid test user
const email = "test@bvrit.ac.in";
const password = "test123";

async function testFirestore() {
  try {
    // Create a test user or sign in with existing one
    let userCredential;
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Created test user:", userCredential.user.uid);
    } catch (createError) {
      if (createError.code === "auth/email-already-in-use") {
        // User exists, try to sign in
        try {
          userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("Signed in with test user:", userCredential.user.uid);
        } catch (signInError) {
          console.error("Error signing in:", signInError);
          return;
        }
      } else {
        console.error("Error creating user:", createError);
        return;
      }
    }

    const userId = userCredential.user.uid;

    // Test creating a quiz attempt
    const quizAttempt = {
      id: Date.now().toString(),
      userId: userId,
      quizId: "test-quiz-id",
      answers: [-1, -1, -1],
      score: 0,
      completed: false,
      startedAt: new Date(),
      bookmarkedQuestions: []
    };

    try {
      const docRef = await addDoc(collection(db, "quizAttempts"), quizAttempt);
      console.log("Successfully added quiz attempt with ID:", docRef.id);

      // Try to read the quiz attempt back
      const attemptDoc = await getDoc(doc(db, "quizAttempts", docRef.id));
      if (attemptDoc.exists()) {
        console.log("Successfully read quiz attempt:", attemptDoc.data());
      } else {
        console.log("Quiz attempt not found");
      }
    } catch (error) {
      console.error("Error with quiz attempt operations:", error);
    }

  } catch (error) {
    console.error("Error in testFirestore:", error);
  }
}

testFirestore(); 