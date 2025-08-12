import { useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import { Question, Quiz, Subject, Topic } from "@/types";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { subjects, addQuiz, addTopic, deleteTopic, deleteQuiz, addSubject } = useQuiz();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [isAddQuizOpen, setIsAddQuizOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [deleteType, setDeleteType] = useState<'topic' | 'quiz'>('topic');
  
  const [newSubject, setNewSubject] = useState({
    name: "",
    description: "",
    icon: "📚"
  });
  
  const [newTopic, setNewTopic] = useState({
    name: "",
    description: "",
    subjectId: ""
  });
  
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    description: "",
    subjectId: "",
    topicId: "",
    timeLimit: 15,
    questions: [] as Omit<Question, "id">[]
  });
  
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: ""
  });
  
  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
    setSelectedQuiz(null);
  };
  
  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedQuiz(null);
  };
  
  const handleSelectQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };
  
  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.description) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    
    const success = addSubject(newSubject);
    
    if (success) {
      setIsAddSubjectOpen(false);
      setNewSubject({
        name: "",
        description: "",
        icon: "📚"
      });
    }
  };
  
  const handleAddTopic = () => {
    if (!newTopic.name || !newTopic.description || !newTopic.subjectId) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    
    const success = addTopic(newTopic.subjectId, {
      name: newTopic.name,
      description: newTopic.description,
      subjectId: newTopic.subjectId
    });
    
    if (success) {
      setIsAddTopicOpen(false);
      setNewTopic({
        name: "",
        description: "",
        subjectId: ""
      });
    }
  };
  
  const handleAddQuestionToQuiz = () => {
    if (
      !newQuestion.text || 
      newQuestion.options.some(opt => !opt) || 
      newQuestion.correctAnswer < 0 || 
      newQuestion.correctAnswer > 3
    ) {
      toast({ title: "Error", description: "Please fill all question fields", variant: "destructive" });
      return;
    }
    
    setNewQuiz({
      ...newQuiz,
      questions: [
        ...newQuiz.questions,
        {
          text: newQuestion.text,
          options: [...newQuestion.options],
          correctAnswer: newQuestion.correctAnswer,
          explanation: newQuestion.explanation || undefined
        }
      ]
    });
    
    setNewQuestion({
      text: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: ""
    });
    
    toast({ title: "Success", description: "Question added to quiz" });
  };
  
  const handleAddQuiz = () => {
    if (
      !newQuiz.title || 
      !newQuiz.description || 
      !newQuiz.subjectId || 
      !newQuiz.topicId ||
      !newQuiz.timeLimit ||
      newQuiz.questions.length === 0
    ) {
      toast({ title: "Error", description: "Please complete all quiz information and add at least one question", variant: "destructive" });
      return;
    }
    
    const success = addQuiz(newQuiz.subjectId, newQuiz.topicId, {
      title: newQuiz.title,
      description: newQuiz.description,
      topicId: newQuiz.topicId,
      timeLimit: newQuiz.timeLimit,
      questions: newQuiz.questions.map((q, i) => ({ ...q, id: `q${Date.now()}-${i}` }))
    });
    
    if (success) {
      setIsAddQuizOpen(false);
      setNewQuiz({
        title: "",
        description: "",
        subjectId: "",
        topicId: "",
        timeLimit: 15,
        questions: []
      });
    }
  };
  
  const openDeleteConfirm = (type: 'topic' | 'quiz', id?: string) => {
    setDeleteType(type);
    setIsDeleteConfirmOpen(true);
  };
  
  const handleDelete = () => {
    if (deleteType === 'topic' && selectedSubject && selectedTopic) {
      const success = deleteTopic(selectedSubject.id, selectedTopic.id);
      if (success) {
        setSelectedTopic(null);
        setIsDeleteConfirmOpen(false);
      }
    } else if (deleteType === 'quiz' && selectedSubject && selectedTopic && selectedQuiz) {
      const success = deleteQuiz(selectedSubject.id, selectedTopic.id, selectedQuiz.id);
      if (success) {
        setSelectedQuiz(null);
        setIsDeleteConfirmOpen(false);
      }
    }
  };
  
  return (
    <AppLayout requireAuth requireAdmin>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Subjects, Topics, and Quizzes</h2>
            <div className="space-x-2">
              <Button onClick={() => setIsAddSubjectOpen(true)}>Add Subject</Button>
              <Button onClick={() => setIsAddTopicOpen(true)}>Add Topic</Button>
              <Button onClick={() => setIsAddQuizOpen(true)}>Add Quiz</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Subjects</CardTitle>
                <CardDescription>Select a subject to manage</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                <div className="space-y-2">
                  {subjects.length > 0 ? (
                    subjects.map(subject => (
                      <div 
                        key={subject.id}
                        className={`p-3 rounded-lg cursor-pointer ${
                          selectedSubject?.id === subject.id 
                            ? 'bg-brand-purple text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => handleSelectSubject(subject)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{subject.icon}</span>
                          <span className="font-medium">{subject.name}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-gray-500">No subjects found</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-1 h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle>Topics</CardTitle>
                <CardDescription>
                  {selectedSubject 
                    ? `Topics in ${selectedSubject.name}`
                    : "Select a subject to view its topics"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                {selectedSubject ? (
                  selectedSubject.topics.length > 0 ? (
                    <div className="space-y-2">
                      {selectedSubject.topics.map(topic => (
                        <div 
                          key={topic.id}
                          className={`p-3 rounded-lg cursor-pointer ${
                            selectedTopic?.id === topic.id 
                              ? 'bg-brand-purple text-white' 
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                          onClick={() => handleSelectTopic(topic)}
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">{topic.name}</span>
                            <span className="text-sm">
                              {topic.quizzes.length} {topic.quizzes.length === 1 ? 'quiz' : 'quizzes'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-gray-500">No topics for this subject</p>
                  )
                ) : (
                  <p className="text-center py-4 text-gray-500">Select a subject from the left</p>
                )}
              </CardContent>
              {selectedSubject && selectedTopic && (
                <div className="p-3 border-t">
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteConfirm('topic')}
                  >
                    Delete Topic
                  </Button>
                </div>
              )}
            </Card>
            
            <Card className="lg:col-span-1 h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Quizzes</CardTitle>
                <CardDescription>
                  {selectedTopic 
                    ? `Quizzes in ${selectedTopic.name}`
                    : "Select a topic to view its quizzes"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                {selectedTopic ? (
                  selectedTopic.quizzes.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTopic.quizzes.map(quiz => (
                        <div 
                          key={quiz.id}
                          className={`p-3 rounded-lg cursor-pointer ${
                            selectedQuiz?.id === quiz.id 
                              ? 'bg-brand-purple text-white' 
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                          onClick={() => handleSelectQuiz(quiz)}
                        >
                          <div className="font-medium">{quiz.title}</div>
                          <div className="text-sm mt-1">
                            {quiz.questions.length} questions • {quiz.timeLimit} min
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-gray-500">No quizzes for this topic</p>
                  )
                ) : (
                  <p className="text-center py-4 text-gray-500">Select a topic from the middle column</p>
                )}
              </CardContent>
              {selectedSubject && selectedTopic && selectedQuiz && (
                <div className="p-3 border-t">
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteConfirm('quiz')}
                  >
                    Delete Quiz
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      
      <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>Create a new subject for your curriculum</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject-name">Subject Name</Label>
              <Input
                id="subject-name"
                value={newSubject.name}
                onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                placeholder="e.g., Data Structures & Algorithms"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject-description">Description</Label>
              <Textarea
                id="subject-description"
                value={newSubject.description}
                onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                placeholder="Brief description of the subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject-icon">Icon (Emoji)</Label>
              <Input
                id="subject-icon"
                value={newSubject.icon}
                onChange={(e) => setNewSubject({ ...newSubject, icon: e.target.value })}
                placeholder="e.g., 📚"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubjectOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddSubject} 
              className="bg-brand-purple hover:bg-brand-darkPurple"
            >
              Add Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isAddTopicOpen} onOpenChange={setIsAddTopicOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Topic</DialogTitle>
            <DialogDescription>Create a new topic within a subject</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic-subject">Select Subject</Label>
              <select
                id="topic-subject"
                className="w-full p-2 border rounded-md"
                value={newTopic.subjectId}
                onChange={(e) => setNewTopic({ ...newTopic, subjectId: e.target.value })}
              >
                <option value="">-- Select a subject --</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic-name">Topic Name</Label>
              <Input
                id="topic-name"
                value={newTopic.name}
                onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                placeholder="e.g., Arrays and Strings"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic-description">Description</Label>
              <Textarea
                id="topic-description"
                value={newTopic.description}
                onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                placeholder="Brief description of the topic"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTopicOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddTopic} 
              className="bg-brand-purple hover:bg-brand-darkPurple"
            >
              Add Topic
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isAddQuizOpen} onOpenChange={setIsAddQuizOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Quiz</DialogTitle>
            <DialogDescription>Add a new quiz with questions to a topic</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-subject">Select Subject</Label>
                <select
                  id="quiz-subject"
                  className="w-full p-2 border rounded-md"
                  value={newQuiz.subjectId}
                  onChange={(e) => {
                    setNewQuiz({ 
                      ...newQuiz, 
                      subjectId: e.target.value,
                      topicId: ""
                    });
                  }}
                >
                  <option value="">-- Select a subject --</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quiz-topic">Select Topic</Label>
                <select
                  id="quiz-topic"
                  className="w-full p-2 border rounded-md"
                  value={newQuiz.topicId}
                  onChange={(e) => setNewQuiz({ ...newQuiz, topicId: e.target.value })}
                  disabled={!newQuiz.subjectId}
                >
                  <option value="">-- Select a topic --</option>
                  {newQuiz.subjectId && subjects.find(s => s.id === newQuiz.subjectId)?.topics.map(topic => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input
                id="quiz-title"
                value={newQuiz.title}
                onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                placeholder="e.g., Arrays Basics"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quiz-description">Description</Label>
              <Textarea
                id="quiz-description"
                value={newQuiz.description}
                onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                placeholder="Brief description of the quiz"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quiz-time">Time Limit (minutes)</Label>
              <Input
                id="quiz-time"
                type="number"
                min="1"
                max="120"
                value={newQuiz.timeLimit}
                onChange={(e) => setNewQuiz({ ...newQuiz, timeLimit: parseInt(e.target.value) || 15 })}
              />
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Questions</h3>
              
              {newQuiz.questions.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {newQuiz.questions.map((q, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md">
                      <p className="font-medium">Question {index + 1}: {q.text}</p>
                      <div className="ml-4 mt-1">
                        {q.options.map((opt, i) => (
                          <p key={i} className={i === q.correctAnswer ? "text-green-600 font-medium" : ""}>
                            {String.fromCharCode(65 + i)}. {opt} {i === q.correctAnswer && "(Correct)"}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-3 bg-gray-50 rounded-md mb-4">
                  No questions added yet. Add at least one question below.
                </p>
              )}
              
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-3">Add a Question</h4>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="question-text">Question Text</Label>
                    <Textarea
                      id="question-text"
                      value={newQuestion.text}
                      onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                      placeholder="e.g., What is the time complexity of array access by index?"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Options</Label>
                    {newQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-6">
                          <input
                            type="radio"
                            checked={newQuestion.correctAnswer === index}
                            onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                          />
                        </div>
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...newQuestion.options];
                            newOptions[index] = e.target.value;
                            setNewQuestion({ ...newQuestion, options: newOptions });
                          }}
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          className="flex-1"
                        />
                      </div>
                    ))}
                    <p className="text-sm text-muted-foreground">
                      Select the radio button next to the correct answer.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="question-explanation">Explanation (Optional)</Label>
                    <Textarea
                      id="question-explanation"
                      value={newQuestion.explanation}
                      onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                      placeholder="Explain why the answer is correct"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleAddQuestionToQuiz}
                    className="w-full"
                  >
                    Add Question to Quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsAddQuizOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddQuiz} 
              className="bg-brand-purple hover:bg-brand-darkPurple"
              disabled={newQuiz.questions.length === 0}
            >
              Create Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {deleteType}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Admin;
