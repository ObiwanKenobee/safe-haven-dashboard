
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { UserRole } from "@/components/auth/AuthForm";
import { ChartBar, Shield, Users, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Dashboard = () => {
  const { role } = useParams<{ role?: string }>();
  const [userRole, setUserRole] = useState<UserRole>("public");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("safehaven-role") as UserRole || "public";
    setUserRole(role as UserRole || storedRole);
    
    // If role in URL doesn't match stored role, redirect
    if (role && role !== storedRole) {
      navigate(`/dashboard/${storedRole}`);
    }
  }, [role, navigate]);

  const roleContent = {
    public: {
      title: "Public Dashboard",
      description: "View stories, statistics, and donation opportunities",
      stats: [
        { title: "Total Cases", value: "1,247", icon: Shield, color: "text-blue-500" },
        { title: "Lives Impacted", value: "5,891", icon: Users, color: "text-green-500" },
        { title: "Donations", value: "$245K", icon: ChartBar, color: "text-purple-500" },
      ]
    },
    activist: {
      title: "Activist Dashboard",
      description: "Report trafficking, request help, and track incidents",
      stats: [
        { title: "Active Reports", value: "42", icon: Shield, color: "text-orange-500" },
        { title: "Support Requests", value: "18", icon: Users, color: "text-blue-500" },
        { title: "Community Members", value: "243", icon: Users, color: "text-green-500" },
      ]
    },
    donor: {
      title: "Donor Dashboard",
      description: "View impact, manage donations, and see where your help is needed",
      stats: [
        { title: "Your Donations", value: "$1,250", icon: ChartBar, color: "text-green-500" },
        { title: "Lives Impacted", value: "37", icon: Users, color: "text-blue-500" },
        { title: "Projects Funded", value: "5", icon: Database, color: "text-purple-500" },
      ]
    },
    researcher: {
      title: "Researcher Dashboard",
      description: "Access datasets, insights, and research papers",
      stats: [
        { title: "Datasets", value: "24", icon: Database, color: "text-blue-500" },
        { title: "Research Papers", value: "152", icon: ChartBar, color: "text-purple-500" },
        { title: "Pending Reviews", value: "7", icon: Shield, color: "text-orange-500" },
      ]
    },
    developer: {
      title: "Developer Dashboard",
      description: "Contribute code, track APIs, and join projects",
      stats: [
        { title: "API Requests", value: "1.2M", icon: Database, color: "text-blue-500" },
        { title: "Contributions", value: "37", icon: ChartBar, color: "text-green-500" },
        { title: "Open Issues", value: "12", icon: Shield, color: "text-orange-500" },
      ]
    },
    enforcer: {
      title: "Enforcer Dashboard",
      description: "Access intervention data and coordinate responses",
      stats: [
        { title: "Active Cases", value: "18", icon: Shield, color: "text-red-500" },
        { title: "Pending Actions", value: "7", icon: Users, color: "text-orange-500" },
        { title: "Reports Filed", value: "34", icon: Database, color: "text-blue-500" },
      ]
    },
    survivor: {
      title: "Survivor Support Dashboard",
      description: "Request aid, track your case, and access resources",
      stats: [
        { title: "Support Resources", value: "24", icon: Users, color: "text-green-500" },
        { title: "Case Updates", value: "3", icon: Shield, color: "text-blue-500" },
        { title: "Messages", value: "8", icon: Database, color: "text-purple-500" },
      ]
    },
  };
  
  const content = roleContent[userRole] || roleContent.public;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{content.title}</h2>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates and notifications for your role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({length: 3}).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-safehaven-purple mr-2" />
                    <div className="text-sm">
                      {userRole === "donor" && "Your donation helped fund a rescue operation"}
                      {userRole === "activist" && "New incident report filed in your area"}
                      {userRole === "researcher" && "New dataset available for analysis"}
                      {userRole === "developer" && "API usage spike detected"}
                      {userRole === "enforcer" && "Urgent case requires review"}
                      {userRole === "survivor" && "Support meeting scheduled"}
                      {userRole === "public" && "New success story published"}
                      <span className="text-muted-foreground ml-2">2h ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Frequently used tools and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userRole === "activist" && (
                  <>
                    <Button variant="outline" size="sm">Report Incident</Button>
                    <Button variant="outline" size="sm">Request Support</Button>
                    <Button variant="outline" size="sm">Find Resources</Button>
                  </>
                )}
                {userRole === "donor" && (
                  <>
                    <Button variant="outline" size="sm">Make Donation</Button>
                    <Button variant="outline" size="sm">View Impact</Button>
                    <Button variant="outline" size="sm">Download Receipt</Button>
                  </>
                )}
                {userRole === "researcher" && (
                  <>
                    <Button variant="outline" size="sm">Download Data</Button>
                    <Button variant="outline" size="sm">Submit Paper</Button>
                    <Button variant="outline" size="sm">Request Access</Button>
                  </>
                )}
                {userRole === "developer" && (
                  <>
                    <Button variant="outline" size="sm">View API Docs</Button>
                    <Button variant="outline" size="sm">Test Endpoint</Button>
                    <Button variant="outline" size="sm">Report Bug</Button>
                  </>
                )}
                {userRole === "enforcer" && (
                  <>
                    <Button variant="outline" size="sm">Review Cases</Button>
                    <Button variant="outline" size="sm">Coordinate Response</Button>
                    <Button variant="outline" size="sm">File Report</Button>
                  </>
                )}
                {userRole === "survivor" && (
                  <>
                    <Button variant="outline" size="sm">Contact Support</Button>
                    <Button variant="outline" size="sm">Update Information</Button>
                    <Button variant="outline" size="sm">Find Resources</Button>
                  </>
                )}
                {userRole === "public" && (
                  <>
                    <Button variant="outline" size="sm">Make Donation</Button>
                    <Button variant="outline" size="sm">Read Stories</Button>
                    <Button variant="outline" size="sm">Share</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
