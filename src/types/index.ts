
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  subjectId: string;
  quizzes: Quiz[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  topicId: string;
  timeLimit: number; // in minutes
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  answers: number[];
  score: number;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
  bookmarkedQuestions: string[];
}
