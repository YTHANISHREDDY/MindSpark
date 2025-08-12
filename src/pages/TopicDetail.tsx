
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/AppLayout";

const TopicDetail = () => {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const { getSubject, getTopic } = useQuiz();
  const navigate = useNavigate();
  
  const [subject, setSubject] = useState(subjectId ? getSubject(subjectId) : undefined);
  const [topic, setTopic] = useState(
    subjectId && topicId ? getTopic(subjectId, topicId) : undefined
  );
  
  useEffect(() => {
    if (subjectId) {
      const foundSubject = getSubject(subjectId);
      setSubject(foundSubject);
    }
    
    if (subjectId && topicId) {
      const foundTopic = getTopic(subjectId, topicId);
      setTopic(foundTopic);
    }
  }, [subjectId, topicId, getSubject, getTopic]);
  
  if (!subject || !topic) {
    return (
      <AppLayout requireAuth>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Topic not found</h2>
          <Button 
            onClick={() => navigate(`/subjects/${subjectId}`)} 
            className="mt-4 bg-brand-purple hover:bg-brand-darkPurple"
          >
            Back to Subject
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const handleQuizStart = (quizId: string) => {
    navigate(`/subjects/${subjectId}/topics/${topicId}/quizzes/${quizId}`);
  };
  
  return (
    <AppLayout requireAuth>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {topic.name}
            </h1>
            <p className="text-gray-600 mt-1">{topic.description}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Subject: <span className="font-medium">{subject.name}</span>
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/subjects/${subjectId}`)}
          >
            Back to Subject
          </Button>
        </div>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Available Quizzes</h2>
          
          {topic.quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topic.quizzes.map((quiz) => (
                <Card key={quiz.id} className="hover-scale">
                  <CardHeader>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm flex justify-between">
                        <span>Questions:</span> 
                        <span className="font-medium">{quiz.questions.length}</span>
                      </p>
                      <p className="text-sm flex justify-between">
                        <span>Time Limit:</span> 
                        <span className="font-medium">{quiz.timeLimit} minutes</span>
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-brand-purple hover:bg-brand-darkPurple"
                      onClick={() => handleQuizStart(quiz.id)}
                    >
                      Start Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-500">No quizzes available yet for this topic.</p>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default TopicDetail;
