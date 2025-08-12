
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/AppLayout";
import { Topic } from "@/types";

const SubjectDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { getSubject } = useQuiz();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(subjectId ? getSubject(subjectId) : undefined);
  
  useEffect(() => {
    if (subjectId) {
      const foundSubject = getSubject(subjectId);
      setSubject(foundSubject);
    }
  }, [subjectId, getSubject]);
  
  if (!subject) {
    return (
      <AppLayout requireAuth>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Subject not found</h2>
          <Button 
            onClick={() => navigate("/dashboard")} 
            className="mt-4 bg-brand-purple hover:bg-brand-darkPurple"
          >
            Back to Dashboard
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const handleTopicClick = (topic: Topic) => {
    navigate(`/subjects/${subjectId}/topics/${topic.id}`);
  };
  
  return (
    <AppLayout requireAuth>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-4xl">{subject.icon}</span>
              {subject.name}
            </h1>
            <p className="text-gray-600 mt-1">{subject.description}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Topics</h2>
          
          {subject.topics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.topics.map((topic) => (
                <Card 
                  key={topic.id} 
                  className="hover-scale cursor-pointer" 
                  onClick={() => handleTopicClick(topic)}
                >
                  <CardHeader>
                    <CardTitle>{topic.name}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">{topic.quizzes.length} Quizzes available</p>
                      <Button 
                        className="bg-brand-purple hover:bg-brand-darkPurple"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTopicClick(topic);
                        }}
                      >
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-500">No topics available yet for this subject.</p>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default SubjectDetail;
