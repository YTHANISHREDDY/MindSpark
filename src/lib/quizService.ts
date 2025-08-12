import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc,
  serverTimestamp,
  Timestamp,
  deleteDoc,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { QuizAttempt } from '@/types';

// Convert Firestore timestamps to JavaScript Dates
const convertTimestamps = (attempt: DocumentData): QuizAttempt => {
  return {
    ...attempt,
    startedAt: attempt.startedAt instanceof Timestamp ? attempt.startedAt.toDate() : attempt.startedAt,
    completedAt: attempt.completedAt instanceof Timestamp ? attempt.completedAt.toDate() : attempt.completedAt
  } as QuizAttempt;
};

// Convert JavaScript Dates to Firestore timestamps
const convertDatesToTimestamps = (attempt: QuizAttempt): DocumentData => {
  return {
    ...attempt,
    startedAt: attempt.startedAt instanceof Date ? Timestamp.fromDate(attempt.startedAt) : attempt.startedAt,
    completedAt: attempt.completedAt instanceof Date ? Timestamp.fromDate(attempt.completedAt) : attempt.completedAt,
    updatedAt: serverTimestamp()
  };
};

// Save a quiz attempt to Firestore
export const saveQuizAttempt = async (attempt: QuizAttempt): Promise<boolean> => {
  try {
    const attemptRef = doc(db, 'quizAttempts', attempt.id);
    await setDoc(attemptRef, convertDatesToTimestamps(attempt));
    return true;
  } catch (error) {
    console.error('Error saving quiz attempt:', error);
    return false;
  }
};

// Update a quiz attempt in Firestore
export const updateQuizAttempt = async (attempt: QuizAttempt): Promise<boolean> => {
  try {
    const attemptRef = doc(db, 'quizAttempts', attempt.id);
    await updateDoc(attemptRef, convertDatesToTimestamps(attempt));
    return true;
  } catch (error) {
    console.error('Error updating quiz attempt:', error);
    return false;
  }
};

// Get a specific quiz attempt from Firestore
export const getQuizAttempt = async (attemptId: string): Promise<QuizAttempt | null> => {
  try {
    const attemptRef = doc(db, 'quizAttempts', attemptId);
    const docSnap = await getDoc(attemptRef);
    
    if (docSnap.exists()) {
      return convertTimestamps(docSnap.data());
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting quiz attempt:', error);
    return null;
  }
};

// Get all quiz attempts for a user
export const getUserQuizAttempts = async (userId: string): Promise<QuizAttempt[]> => {
  try {
    const q = query(collection(db, 'quizAttempts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const attempts: QuizAttempt[] = [];
    querySnapshot.forEach(doc => {
      attempts.push(convertTimestamps({ id: doc.id, ...doc.data() }));
    });
    
    return attempts;
  } catch (error) {
    console.error('Error getting user quiz attempts:', error);
    return [];
  }
};

// Get all attempts for a specific quiz
export const getQuizAttempts = async (quizId: string): Promise<QuizAttempt[]> => {
  try {
    const q = query(collection(db, 'quizAttempts'), where('quizId', '==', quizId));
    const querySnapshot = await getDocs(q);
    
    const attempts: QuizAttempt[] = [];
    querySnapshot.forEach(doc => {
      attempts.push(convertTimestamps({ id: doc.id, ...doc.data() }));
    });
    
    return attempts;
  } catch (error) {
    console.error('Error getting quiz attempts:', error);
    return [];
  }
};

// Delete a quiz attempt
export const deleteQuizAttempt = async (attemptId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'quizAttempts', attemptId));
    return true;
  } catch (error) {
    console.error('Error deleting quiz attempt:', error);
    return false;
  }
}; 