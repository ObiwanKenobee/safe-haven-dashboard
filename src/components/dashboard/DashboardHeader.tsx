
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bell, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole } from "../auth/AuthForm";
import { cn } from "@/lib/utils";

export const DashboardHeader = () => {
  const [userRole, setUserRole] = useState<UserRole>("public");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("safehaven-role") as UserRole || "public";
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("safehaven-authed");
    localStorage.removeItem("safehaven-role");
    navigate("/auth");
  };

  const getRoleName = (role: UserRole): string => {
    const roleMap: Record<UserRole, string> = {
      public: "Public Visitor",
      activist: "Activist",
      donor: "Donor",
      researcher: "Researcher", 
      developer: "Developer",
      enforcer: "Enforcer",
      survivor: "Survivor"
    };
    return roleMap[role] || "User";
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-safehaven-purple">
              Safe Haven
            </span>
          </Link>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <Link to="/dashboard" className="transition-colors hover:text-foreground/80">
              Dashboard
            </Link>
            <Link to="/dashboard/tracker" className="transition-colors hover:text-foreground/80">
              Tracker
            </Link>
            <Link to="/dashboard/donate" className="transition-colors hover:text-foreground/80">
              Donate
            </Link>
          </nav>
        </div>
        
        <div className="flex-1 md:ml-auto md:justify-end justify-between items-center flex">
          <div className="w-full flex-1 md:w-auto md:flex-none mr-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full md:w-[200px] pl-8 bg-background"
              />
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="mr-2">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-safehaven-purple text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@safehaven.org
                  </p>
                  <p className="text-xs text-safehaven-purple font-semibold mt-1">
                    {getRoleName(userRole)}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

