import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Convert Firebase user to app user
        const appUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || '',
          role: firebaseUser.email === 'admin@bvrit.ac.in' ? 'admin' : 'student'
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simple validation
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Please enter email and password",
          variant: "destructive",
        });
        return false;
      }

      // Special case for admin login
    if (email === "admin@bvrit.ac.in" && password === "admin123") {
      const adminUser: User = {
        id: "admin-1",
        name: "Admin User",
        email: "admin@bvrit.ac.in",
        role: "admin"
      };
      
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin panel",
      });
      setIsLoading(false);
      return true;
    }
      
      // Check if email format is valid
      if (!email.endsWith('@bvrit.ac.in')) {
        toast({
          title: "Invalid Email",
          description: "Please use your @bvrit.ac.in email address",
          variant: "destructive",
        });
        return false;
      }

      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      return true;
    } catch (error: unknown) {
      let errorMessage = "Login failed";
      
      // Handle common Firebase auth errors
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = "User not found. Please check your email.";
            break;
          case 'auth/wrong-password':
            errorMessage = "Incorrect password. Please try again.";
            break;
          case 'auth/invalid-credential':
            errorMessage = "Invalid credentials. Please try again.";
            break;
          case 'auth/too-many-requests':
            errorMessage = "Too many failed login attempts. Please try again later.";
            break;
          default:
            errorMessage = error.message || "Login failed. Please try again.";
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simple validation
      if (!name || !email || !password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return false;
      }
      
      // Check if email format is valid
      if (!email.endsWith('@bvrit.ac.in')) {
        toast({
          title: "Invalid Email",
          description: "Please use your @bvrit.ac.in email address",
          variant: "destructive",
        });
        return false;
      }

      // Create new user with Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      return true;
    } catch (error: unknown) {
      let errorMessage = "Signup failed";
      
      // Handle common Firebase auth errors
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = "Email already in use. Please use a different email or try logging in.";
            break;
          case 'auth/invalid-email':
            errorMessage = "Invalid email format.";
            break;
          case 'auth/weak-password':
            errorMessage = "Password is too weak. Please use a stronger password.";
            break;
          default:
            errorMessage = error.message || "Signup failed. Please try again.";
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to logout";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
