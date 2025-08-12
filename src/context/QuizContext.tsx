import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Subject, Topic, Quiz, Question, QuizAttempt } from "@/types";
import { subjects } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { 
  saveQuizAttempt, 
  updateQuizAttempt, 
  getUserQuizAttempts 
} from "@/lib/quizService";

interface QuizContextType {
  subjects: Subject[];
  getSubject: (id: string) => Subject | undefined;
  getTopic: (subjectId: string, topicId: string) => Topic | undefined;
  getQuiz: (subjectId: string, topicId: string, quizId: string) => Quiz | undefined;
  currentAttempt: QuizAttempt | null;
  startQuiz: (quizId: string, userId: string) => void;
  answerQuestion: (questionIndex: number, answerIndex: number) => void;
  bookmarkQuestion: (questionId: string) => void;
  completeQuiz: () => void;
  quizAttempts: QuizAttempt[];
  addQuiz: (subjectId: string, topicId: string, quiz: Omit<Quiz, "id">) => boolean;
  addTopic: (subjectId: string, topic: Omit<Topic, "id" | "quizzes">) => boolean;
  deleteTopic: (subjectId: string, topicId: string) => boolean;
  deleteQuiz: (subjectId: string, topicId: string, quizId: string) => boolean;
  addSubject: (subject: Omit<Subject, "id" | "topics">) => boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [subjectList, setSubjectList] = useState<Subject[]>(subjects);
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load quiz attempts from Firestore when user changes
  useEffect(() => {
    const loadQuizAttempts = async () => {
      if (user) {
        try {
          const attempts = await getUserQuizAttempts(user.id);
          setQuizAttempts(attempts);
        } catch (error) {
          console.error("Failed to load quiz attempts:", error);
          toast({
            title: "Error",
            description: "Failed to load your quiz history",
            variant: "destructive",
          });
        }
      } else {
        // Clear attempts when user logs out
        setQuizAttempts([]);
        setCurrentAttempt(null);
      }
    };

    loadQuizAttempts();
  }, [user, toast]);

  const getSubject = (id: string): Subject | undefined => {
    return subjectList.find(subject => subject.id === id);
  };

  const getTopic = (subjectId: string, topicId: string): Topic | undefined => {
    const subject = getSubject(subjectId);
    if (subject) {
      return subject.topics.find(topic => topic.id === topicId);
    }
    return undefined;
  };

  const getQuiz = (subjectId: string, topicId: string, quizId: string): Quiz | undefined => {
    const topic = getTopic(subjectId, topicId);
    if (topic) {
      return topic.quizzes.find(quiz => quiz.id === quizId);
    }
    return undefined;
  };

  const startQuiz = async (quizId: string, userId: string) => {
    // Find the quiz
    let foundQuiz: Quiz | undefined;
    let foundSubject: Subject | undefined;
    let foundTopic: Topic | undefined;

    for (const subject of subjectList) {
      for (const topic of subject.topics) {
        const quiz = topic.quizzes.find(q => q.id === quizId);
        if (quiz) {
          foundQuiz = quiz;
          foundSubject = subject;
          foundTopic = topic;
          break;
        }
      }
      if (foundQuiz) break;
    }

    if (!foundQuiz) {
      toast({
        title: "Error",
        description: "Quiz not found",
        variant: "destructive",
      });
      return;
    }

    // Create a new attempt
    const newAttempt: QuizAttempt = {
      id: Date.now().toString(),
      userId,
      quizId,
      answers: Array(foundQuiz.questions.length).fill(-1), // -1 means unanswered
      score: 0,
      completed: false,
      startedAt: new Date(),
      bookmarkedQuestions: [],
    };

    try {
      // Save to Firestore
      await saveQuizAttempt(newAttempt);
      setCurrentAttempt(newAttempt);
      
      toast({
        title: "Quiz Started",
        description: `You have started ${foundQuiz.title}`,
      });
    } catch (error) {
      console.error("Failed to start quiz:", error);
      toast({
        title: "Error",
        description: "Failed to start quiz. Please try again.",
        variant: "destructive",
      });
    }
  };

  const answerQuestion = async (questionIndex: number, answerIndex: number) => {
    if (!currentAttempt) return;

    const updatedAttempt = { 
      ...currentAttempt,
      answers: [...currentAttempt.answers]
    };
    updatedAttempt.answers[questionIndex] = answerIndex;

    try {
      // Update in Firestore
      await updateQuizAttempt(updatedAttempt);
      setCurrentAttempt(updatedAttempt);
    } catch (error) {
      console.error("Failed to save answer:", error);
      toast({
        title: "Warning",
        description: "Failed to save your answer. Please check your connection.",
        variant: "destructive",
      });
    }
  };

  const bookmarkQuestion = async (questionId: string) => {
    if (!currentAttempt) return;

    const bookmarkedQuestions = [...currentAttempt.bookmarkedQuestions];
    const index = bookmarkedQuestions.indexOf(questionId);
    
    if (index >= 0) {
      // Remove bookmark
      bookmarkedQuestions.splice(index, 1);
    } else {
      // Add bookmark
      bookmarkedQuestions.push(questionId);
    }

    const updatedAttempt = { 
      ...currentAttempt,
      bookmarkedQuestions 
    };

    try {
      // Update in Firestore
      await updateQuizAttempt(updatedAttempt);
      setCurrentAttempt(updatedAttempt);
      
      toast({
        title: index >= 0 ? "Bookmark Removed" : "Bookmark Added",
        description: index >= 0 
          ? "Question removed from bookmarks" 
          : "Question added to bookmarks",
      });
    } catch (error) {
      console.error("Failed to update bookmark:", error);
      toast({
        title: "Warning",
        description: "Failed to update bookmark. Please check your connection.",
        variant: "destructive",
      });
    }
  };

  const completeQuiz = async () => {
    if (!currentAttempt) return;

    // Find the quiz
    let foundQuiz: Quiz | undefined;
    
    for (const subject of subjectList) {
      for (const topic of subject.topics) {
        const quiz = topic.quizzes.find(q => q.id === currentAttempt.quizId);
        if (quiz) {
          foundQuiz = quiz;
          break;
        }
      }
      if (foundQuiz) break;
    }

    if (!foundQuiz) {
      toast({
        title: "Error",
        description: "Quiz not found",
        variant: "destructive",
      });
      return;
    }

    // Calculate score
    let score = 0;
    for (let i = 0; i < foundQuiz.questions.length; i++) {
      if (currentAttempt.answers[i] === foundQuiz.questions[i].correctAnswer) {
        score++;
      }
    }

    const completedAttempt: QuizAttempt = {
      ...currentAttempt,
      score,
      completed: true,
      completedAt: new Date(),
    };

    try {
      // Update in Firestore
      await updateQuizAttempt(completedAttempt);
      
      // Update local state
      setQuizAttempts(prev => [...prev, completedAttempt]);
      setCurrentAttempt(completedAttempt);
      
      toast({
        title: "Quiz Completed",
        description: `Your score: ${score}/${foundQuiz.questions.length}`,
      });
    } catch (error) {
      console.error("Failed to complete quiz:", error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Admin functions
  const addQuiz = (subjectId: string, topicId: string, quizData: Omit<Quiz, "id">): boolean => {
    const subject = getSubject(subjectId);
    if (!subject) return false;

    const topicIndex = subject.topics.findIndex(topic => topic.id === topicId);
    if (topicIndex === -1) return false;

    // Create new quiz with unique ID
    const newQuiz: Quiz = {
      ...quizData,
      id: `${subjectId}-${topicId}-${Date.now()}`
    };

    // Update state
    setSubjectList(prevSubjects => {
      const newSubjects = [...prevSubjects];
      const newTopic = {
        ...newSubjects[newSubjects.findIndex(s => s.id === subjectId)].topics[topicIndex]
      };

      newTopic.quizzes = [...newTopic.quizzes, newQuiz];
      
      newSubjects[newSubjects.findIndex(s => s.id === subjectId)].topics[topicIndex] = newTopic;
      
      return newSubjects;
    });

    toast({
      title: "Success",
      description: `Quiz "${quizData.title}" has been added`,
    });

    return true;
  };

  const addTopic = (subjectId: string, topicData: Omit<Topic, "id" | "quizzes">): boolean => {
    const subject = getSubject(subjectId);
    if (!subject) return false;

    // Create new topic with unique ID
    const newTopic: Topic = {
      ...topicData,
      id: `${subjectId}-${Date.now()}`,
      quizzes: []
    };

    // Update state
    setSubjectList(prevSubjects => {
      const newSubjects = [...prevSubjects];
      const subjectIndex = newSubjects.findIndex(s => s.id === subjectId);
      
      newSubjects[subjectIndex] = {
        ...newSubjects[subjectIndex],
        topics: [...newSubjects[subjectIndex].topics, newTopic]
      };
      
      return newSubjects;
    });

    toast({
      title: "Success",
      description: `Topic "${topicData.name}" has been added`,
    });

    return true;
  };

  const addSubject = (subjectData: Omit<Subject, "id" | "topics">): boolean => {
    // Create new subject with unique ID
    const newSubject: Subject = {
      ...subjectData,
      id: Date.now().toString(),
      topics: []
    };

    // Update state
    setSubjectList(prevSubjects => [...prevSubjects, newSubject]);

    toast({
      title: "Success",
      description: `Subject "${subjectData.name}" has been added`,
    });

    return true;
  };

  const deleteTopic = (subjectId: string, topicId: string): boolean => {
    const subject = getSubject(subjectId);
    if (!subject) return false;

    // Check if topic exists
    if (!subject.topics.some(topic => topic.id === topicId)) return false;

    // Update state
    setSubjectList(prevSubjects => {
      const newSubjects = [...prevSubjects];
      const subjectIndex = newSubjects.findIndex(s => s.id === subjectId);
      
      newSubjects[subjectIndex] = {
        ...newSubjects[subjectIndex],
        topics: newSubjects[subjectIndex].topics.filter(topic => topic.id !== topicId)
      };
      
      return newSubjects;
    });

    toast({
      title: "Success",
      description: "Topic has been deleted",
    });

    return true;
  };

  const deleteQuiz = (subjectId: string, topicId: string, quizId: string): boolean => {
    const topic = getTopic(subjectId, topicId);
    if (!topic) return false;

    // Check if quiz exists
    if (!topic.quizzes.some(quiz => quiz.id === quizId)) return false;

    // Update state
    setSubjectList(prevSubjects => {
      const newSubjects = [...prevSubjects];
      const subjectIndex = newSubjects.findIndex(s => s.id === subjectId);
      const topicIndex = newSubjects[subjectIndex].topics.findIndex(t => t.id === topicId);
      
      const newTopic = {
        ...newSubjects[subjectIndex].topics[topicIndex],
        quizzes: newSubjects[subjectIndex].topics[topicIndex].quizzes.filter(quiz => quiz.id !== quizId)
      };
      
      newSubjects[subjectIndex].topics[topicIndex] = newTopic;
      
      return newSubjects;
    });

    toast({
      title: "Success",
      description: "Quiz has been deleted",
    });

    return true;
  };

  return (
    <QuizContext.Provider value={{
      subjects: subjectList,
      getSubject,
      getTopic,
      getQuiz,
      currentAttempt,
      startQuiz,
      answerQuestion,
      bookmarkQuestion,
      completeQuiz,
      quizAttempts,
      addQuiz,
      addTopic,
      deleteTopic,
      deleteQuiz,
      addSubject
    }}>
      {children}
    </QuizContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
