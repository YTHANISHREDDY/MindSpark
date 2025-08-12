
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Bookmark, BookmarkCheck } from "lucide-react";
import AppLayout from "@/layouts/AppLayout";
import { Quiz } from "@/types";

const QuizPage = () => {
  const { subjectId, topicId, quizId } = useParams<{ subjectId: string; topicId: string; quizId: string }>();
  const { getSubject, getTopic, getQuiz, startQuiz, currentAttempt, answerQuestion, bookmarkQuestion, completeQuiz } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<Quiz | undefined>(
    subjectId && topicId && quizId ? getQuiz(subjectId, topicId, quizId) : undefined
  );
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Initialize quiz data
  useEffect(() => {
    if (subjectId && topicId && quizId) {
      const foundQuiz = getQuiz(subjectId, topicId, quizId);
      setQuiz(foundQuiz);
      
      if (foundQuiz) {
        setTimeLeft(foundQuiz.timeLimit * 60); // Convert minutes to seconds
      }
    }
  }, [subjectId, topicId, quizId, getQuiz]);
  
  // Timer effect
  useEffect(() => {
    if (!isQuizStarted || timeLeft <= 0 || showResults) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Time's up, submit the quiz
          completeQuiz();
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isQuizStarted, timeLeft, showResults, completeQuiz]);
  
  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start quiz handler
  const handleStartQuiz = () => {
    if (quiz && user) {
      startQuiz(quiz.id, user.id);
      setIsQuizStarted(true);
    }
  };
  
  // Answer selection handler
  const handleAnswerSelect = (answerIndex: number) => {
    if (showResults) return; // Prevent changing answers after submission
    answerQuestion(activeQuestion, answerIndex);
  };
  
  // Bookmark toggle handler
  const handleBookmarkToggle = () => {
    if (!quiz || !currentAttempt) return;
    bookmarkQuestion(quiz.questions[activeQuestion].id);
  };
  
  // Question navigation handlers
  const handleNextQuestion = () => {
    if (activeQuestion < (quiz?.questions.length || 0) - 1) {
      setActiveQuestion(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(prev => prev - 1);
    }
  };
  
  // Submit quiz handler
  const handleSubmitQuiz = () => {
    completeQuiz();
    setShowResults(true);
  };
  
  // Return to topics handler
  const handleReturnToTopics = () => {
    navigate(`/subjects/${subjectId}/topics/${topicId}`);
  };
  
  if (!quiz) {
    return (
      <AppLayout requireAuth>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Quiz not found</h2>
          <Button 
            onClick={() => navigate(`/subjects/${subjectId}/topics/${topicId}`)} 
            className="mt-4 bg-brand-purple hover:bg-brand-darkPurple"
          >
            Back to Topic
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  // If quiz not yet started
  if (!isQuizStarted && !currentAttempt) {
    return (
      <AppLayout requireAuth>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p>{quiz.description}</p>
                <div className="flex flex-col sm:flex-row justify-between bg-gray-50 p-4 rounded-md">
                  <div>
                    <p className="font-medium">Time Limit:</p>
                    <p className="text-lg">{quiz.timeLimit} minutes</p>
                  </div>
                  <div>
                    <p className="font-medium">Questions:</p>
                    <p className="text-lg">{quiz.questions.length} questions</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-center mb-4">
                    Are you ready to begin? The timer will start as soon as you click "Start Quiz".
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={handleReturnToTopics}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleStartQuiz}
                      className="bg-brand-purple hover:bg-brand-darkPurple"
                    >
                      Start Quiz
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }
  
  // If quiz is complete and showing results
  if (showResults && currentAttempt) {
    return (
      <AppLayout requireAuth>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Quiz Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {currentAttempt.score} / {quiz.questions.length}
                </div>
                <p className="text-lg mb-6">
                  You scored {Math.round((currentAttempt.score / quiz.questions.length) * 100)}%
                </p>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Review Questions</h3>
                
                {quiz.questions.map((question, index) => {
                  const userAnswer = currentAttempt.answers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div 
                      key={question.id} 
                      className={`p-4 rounded-lg border ${
                        isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex gap-2 items-start">
                        <div className={`mt-1 p-1 rounded-full ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                          {isCorrect ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{index + 1}. {question.text}</p>
                          
                          <div className="mt-2 space-y-1">
                            {question.options.map((option, optIndex) => (
                              <div 
                                key={optIndex}
                                className={`px-3 py-2 rounded ${
                                  optIndex === question.correctAnswer 
                                    ? "bg-green-100 text-green-800"
                                    : optIndex === userAnswer
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-50"
                                }`}
                              >
                                {option}
                                {optIndex === question.correctAnswer && " (Correct)"}
                              </div>
                            ))}
                          </div>
                          
                          {question.explanation && (
                            <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              <span className="font-medium">Explanation:</span> {question.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={handleReturnToTopics}
                  className="bg-brand-purple hover:bg-brand-darkPurple"
                >
                  Back to Topic
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }
  
  // Active quiz display
  if (isQuizStarted && currentAttempt && quiz.questions[activeQuestion]) {
    const question = quiz.questions[activeQuestion];
    const isBookmarked = currentAttempt.bookmarkedQuestions.includes(question.id);
    
    return (
      <AppLayout requireAuth>
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <p className="text-gray-600">Question {activeQuestion + 1} of {quiz.questions.length}</p>
            </div>
            <div className="text-xl font-mono bg-gray-100 px-4 py-2 rounded-md">
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl pr-10">
                  {question.text}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmarkToggle}
                  className="text-brand-purple"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-5 w-5" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                      currentAttempt.answers[activeQuestion] === index 
                        ? "bg-brand-lightPurple border-brand-purple" 
                        : "border-gray-200"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button
                  onClick={handlePrevQuestion}
                  disabled={activeQuestion === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                
                {activeQuestion === quiz.questions.length - 1 ? (
                  <Button
                    onClick={handleSubmitQuiz}
                    className="bg-brand-purple hover:bg-brand-darkPurple"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    variant="outline"
                  >
                    Next
                  </Button>
                )}
              </div>
              
              {/* Question navigator */}
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-2">Navigate to question:</p>
                <div className="flex flex-wrap gap-2">
                  {quiz.questions.map((_, index) => (
                    <button
                      key={index}
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                        ${activeQuestion === index 
                          ? 'bg-brand-purple text-white' 
                          : currentAttempt.answers[index] !== -1
                            ? 'bg-brand-lightPurple text-brand-darkPurple'
                            : 'bg-gray-100'
                        }`}
                      onClick={() => setActiveQuestion(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
              
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout requireAuth>
      <div className="text-center py-10">
        <p className="text-lg">Loading quiz...</p>
      </div>
    </AppLayout>
  );
};

export default QuizPage;
