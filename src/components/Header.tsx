
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  
  // Determine if we're on the landing page
  const isLandingPage = location.pathname === "/";
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <header className={`w-full py-4 px-6 ${isLandingPage ? 'absolute top-0 z-10' : 'bg-background border-b'}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl">CtrlU</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/developer" className="text-foreground hover:text-primary transition-colors">
              Developers
            </Link>
            {isLoggedIn ? (
              <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            ) : null}
          </nav>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                    <Avatar>
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border rounded-md shadow-md p-2">
                  <DropdownMenuLabel className="px-2 py-1.5">
                    {user?.name || 'My Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 h-px bg-muted" />
                  <DropdownMenuItem className="flex cursor-pointer items-center px-2 py-1.5 rounded-sm text-sm hover:bg-accent">
                    <Link to="/dashboard" className="flex w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex cursor-pointer items-center px-2 py-1.5 rounded-sm text-sm hover:bg-accent">
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 h-px bg-muted" />
                  <DropdownMenuItem 
                    className="flex cursor-pointer items-center px-2 py-1.5 rounded-sm text-sm hover:bg-accent"
                    onClick={logout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
