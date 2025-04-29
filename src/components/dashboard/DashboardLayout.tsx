
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthed = localStorage.getItem("safehaven-authed") === "true";
    if (!isAuthed) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex-1 md:ml-60">
          <main className="container py-6">{children}</main>
        </div>
      </div>
    </div>
  );
};
