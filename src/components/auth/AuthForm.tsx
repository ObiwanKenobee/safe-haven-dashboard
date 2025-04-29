
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRoleSelector } from "./UserRoleSelector";

export type UserRole = "public" | "activist" | "donor" | "researcher" | "developer" | "enforcer" | "survivor";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("public");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (isSignUp: boolean) => {
    setIsLoading(true);
    
    try {
      // In a real app, here we would authenticate with a real backend
      // For demo purposes, we'll just simulate successful authentication
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (isSignUp) {
        toast({
          title: "Account created successfully!",
          description: `Welcome to Safe Haven as a ${selectedRole}`,
        });
      } else {
        toast({
          title: "Login successful!",
          description: "Welcome back to Safe Haven",
        });
      }
      
      // In a real app, we would store the JWT token in a secure cookie or local storage
      localStorage.setItem("safehaven-role", selectedRole);
      localStorage.setItem("safehaven-authed", "true");
      
      // Redirect to the appropriate dashboard based on the role
      navigate(`/dashboard/${selectedRole}`);
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Access your Safe Haven dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={isLoading || !email || !password}
              onClick={() => handleAuth(false)}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </CardFooter>
        </TabsContent>

        <TabsContent value="signup">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Join Safe Haven's fight against trafficking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="signup-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="signup-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="signup-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Your Role</label>
              <UserRoleSelector
                selectedRole={selectedRole}
                onChange={setSelectedRole}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={isLoading || !email || !password}
              onClick={() => handleAuth(true)}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
