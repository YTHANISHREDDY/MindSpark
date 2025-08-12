
import { useState } from "react";
import { Card } from "@/components/ui/card";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import AppLayout from "@/layouts/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <AppLayout>
      <div className="min-h-[80vh] flex flex-col lg:flex-row items-center">
        {/* Left side - Branding with Interactive Carousel */}
        <div className="flex-1 w-full max-w-md px-6 py-12 lg:p-0 text-center lg:text-left mb-8 lg:mb-0">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight text-brand-purple mb-4">
                Welcome to Mindspark
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your ultimate learning companion for academic excellence at BVRIT.
              </p>
            </div>

            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {[
                  {
                    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
                    title: "Interactive Learning",
                    description: "Engage with dynamic quizzes across multiple subjects"
                  },
                  {
                    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
                    title: "Track Progress",
                    description: "Monitor your performance with detailed analytics"
                  },
                  {
                    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
                    title: "Study Anywhere",
                    description: "Access your courses anytime, anywhere"
                  }
                ].map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="p-2">
                      <div className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4 bg-white">
                          <h3 className="text-lg font-semibold text-brand-purple">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4 animate-fade-in">
              <li className="hover:text-brand-purple transition-colors">Track your progress across subjects</li>
              <li className="hover:text-brand-purple transition-colors">Test your knowledge with interactive quizzes</li>
              <li className="hover:text-brand-purple transition-colors">Bookmark challenging questions for later review</li>
              <li className="hover:text-brand-purple transition-colors">See detailed performance analytics</li>
            </ul>
          </div>
        </div>
        
        {/* Right side - Auth forms */}
        <div className="flex-1 w-full max-w-md px-6 py-12 lg:p-0">
          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Auth;
