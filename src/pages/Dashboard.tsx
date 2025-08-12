
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useQuiz } from "@/context/QuizContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import { Subject } from "@/types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Trophy, Award, Star } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { subjects, quizAttempts } = useQuiz();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    completedQuizzes: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    highScore: 0,
    averageScore: 0
  });
  
  useEffect(() => {
    if (user) {
      const userAttempts = quizAttempts.filter(attempt => attempt.userId === user.id);
      const completed = userAttempts.filter(attempt => attempt.completed);
      
      const totalCorrect = completed.reduce((acc, attempt) => acc + attempt.score, 0);
      const totalQuestions = completed.reduce((acc, attempt) => {
        const quiz = subjects
          .flatMap(s => s.topics)
          .flatMap(t => t.quizzes)
          .find(q => q.id === attempt.quizId);
        return acc + (quiz?.questions.length || 0);
      }, 0);
      
      const scores = completed.map(attempt => {
        const quiz = subjects
          .flatMap(s => s.topics)
          .flatMap(t => t.quizzes)
          .find(q => q.id === attempt.quizId);
        const total = quiz?.questions.length || 0;
        return (attempt.score / total) * 100;
      });
      
      setStats({
        completedQuizzes: completed.length,
        correctAnswers: totalCorrect,
        totalAnswers: totalQuestions,
        highScore: Math.max(...(scores.length ? scores : [0])),
        averageScore: scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
      });
    }
  }, [user, quizAttempts, subjects]);
  
  const handleSubjectClick = (subject: Subject) => {
    navigate(`/subjects/${subject.id}`);
  };

  // Performance data for line chart
  const performanceData = quizAttempts
    .filter(attempt => attempt.userId === user?.id && attempt.completed)
    .map((attempt, index) => ({
      name: `Quiz ${index + 1}`,
      score: (attempt.score / attempt.answers.length) * 100
    }));

  // Subject completion data for pie chart
  const subjectCompletionData = subjects.map(subject => {
    const totalQuizzes = subject.topics.reduce((acc, topic) => acc + topic.quizzes.length, 0);
    const completedQuizzes = quizAttempts.filter(
      attempt => attempt.completed && 
      attempt.userId === user?.id && 
      subject.topics.some(topic => 
        topic.quizzes.some(quiz => quiz.id === attempt.quizId)
      )
    ).length;
    
    return {
      name: subject.name,
      value: totalQuizzes ? (completedQuizzes / totalQuizzes) * 100 : 0
    };
  });

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];
  
  return (
    <AppLayout requireAuth>
      <div className="space-y-8">
        {/* User welcome section */}
        <section className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mt-2">Track your learning progress and continue your quizzes</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <StatCard 
              title="Completed Quizzes" 
              value={stats.completedQuizzes} 
              icon={Trophy}
              description="Total quizzes completed"
            />
            <StatCard 
              title="High Score" 
              value={`${stats.highScore.toFixed(1)}%`} 
              icon={Award}
              description="Your best performance"
              isText
            />
            <StatCard 
              title="Average Score" 
              value={`${stats.averageScore.toFixed(1)}%`} 
              icon={Star}
              description="Overall performance"
              isText
            />
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Timeline</CardTitle>
                <CardDescription>Your quiz scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Completion</CardTitle>
                <CardDescription>Progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectCompletionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
                      >
                        {subjectCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Subjects section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Available Subjects</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map(subject => (
              <Card key={subject.id} className="hover-scale cursor-pointer" onClick={() => handleSubjectClick(subject)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{subject.icon}</span>
                    {subject.name}
                  </CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm">{subject.topics.length} Topics</p>
                      <p className="text-sm">
                        {subject.topics.reduce((acc, topic) => acc + topic.quizzes.length, 0)} Quizzes
                      </p>
                    </div>
                    <Button 
                      className="bg-brand-purple hover:bg-brand-darkPurple"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubjectClick(subject);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  isText = false 
}: { 
  title: string; 
  value: number | string; 
  icon: React.ComponentType<any>;
  description: string;
  isText?: boolean;
}) => (
  <div className="bg-gray-50 p-4 rounded-md">
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-brand-purple" />
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
