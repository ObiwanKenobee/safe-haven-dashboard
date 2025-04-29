
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";

export const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthed = localStorage.getItem("safehaven-authed") === "true";
    if (isAuthed) {
      const role = localStorage.getItem("safehaven-role") || "public";
      navigate(`/dashboard/${role}`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen w-full auth-background flex flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center mb-8">
        <Shield className="h-12 w-12 text-safehaven-purple mb-2" />
        <h1 className="text-3xl font-bold text-center">Safe Haven</h1>
        <p className="text-muted-foreground text-center mt-1">
          Fighting trafficking through community and technology
        </p>
      </div>

      <AuthForm />

      <div className="mt-8 text-center text-sm text-muted-foreground max-w-md">
        <p>
          By using Safe Haven, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Auth;
