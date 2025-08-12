
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/AppLayout";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-5xl font-bold text-brand-purple">
            Mind<span className="text-brand-darkPurple">spark</span>
          </h1>
          <p className="text-3xl font-medium mt-2">BVRIT Quiz Portal</p>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Enhance your learning journey with interactive quizzes across various subjects.
            Test your knowledge, track your progress, and achieve academic excellence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <Button
              onClick={() => navigate("/auth")}
              className="bg-brand-purple hover:bg-brand-darkPurple text-lg px-8 py-6 h-auto"
              size="lg"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/about")}
              className="text-lg px-8 py-6 h-auto"
              size="lg"
            >
              Learn More
            </Button>
          </div>
          
          <div className="pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Subject-Specific Quizzes"
              description="Access quizzes on DSA, OS, DBMS, and other key subjects"
              icon="📚"
            />
            <FeatureCard
              title="Progress Tracking"
              description="Monitor your performance and improvements over time"
              icon="📈"
            />
            <FeatureCard
              title="Time-Based Assessments"
              description="Test your knowledge under timed conditions"
              icon="⏱️"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover-scale">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;
