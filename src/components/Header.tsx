
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };
  
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-brand-purple">
            Mind<span className="text-brand-darkPurple">spark</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex space-x-6 ml-10">
          {user && (
            <>
              <NavLink to="/dashboard" currentPath={location.pathname}>
                Dashboard
              </NavLink>
              {user.role === "admin" && (
                <NavLink to="/admin" currentPath={location.pathname}>
                  Admin Panel
                </NavLink>
              )}
            </>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.role}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/auth")} className="bg-brand-purple hover:bg-brand-darkPurple">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, currentPath, children }: { to: string; currentPath: string; children: React.ReactNode }) => {
  const isActive = currentPath.startsWith(to);
  
  return (
    <Link
      to={to}
      className={`transition-colors hover:text-brand-purple ${
        isActive ? "text-brand-purple font-medium" : "text-foreground"
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;
