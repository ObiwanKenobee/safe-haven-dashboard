
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  FileText,
  ChartBar,
  Database,
  Users,
  User,
  Calendar,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserRole } from "../auth/AuthForm";

interface SidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: ChartBar,
    roles: ["public", "activist", "donor", "researcher", "developer", "enforcer", "survivor"],
  },
  {
    title: "Tracker Map",
    href: "/dashboard/tracker",
    icon: Shield,
    roles: ["activist", "enforcer", "researcher", "developer"],
  },
  {
    title: "Incident Reports",
    href: "/dashboard/incidents",
    icon: FileText,
    roles: ["activist", "enforcer", "researcher"],
  },
  {
    title: "Data Insights",
    href: "/dashboard/insights",
    icon: Database,
    roles: ["researcher", "developer"],
  },
  {
    title: "Donation Impact",
    href: "/dashboard/impact",
    icon: ChartBar,
    roles: ["public", "donor"],
  },
  {
    title: "Support Network",
    href: "/dashboard/network",
    icon: Users,
    roles: ["activist", "survivor"],
  },
  {
    title: "Personal Case",
    href: "/dashboard/case",
    icon: User,
    roles: ["survivor"],
  },
  {
    title: "Developer Tools",
    href: "/dashboard/tools",
    icon: Calendar,
    roles: ["developer"],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["public", "activist", "donor", "researcher", "developer", "enforcer", "survivor"],
  },
];

export function DashboardSidebar({ className }: SidebarProps) {
  const [userRole, setUserRole] = useState<UserRole>("public");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("safehaven-role") as UserRole || "public";
    setUserRole(role);
  }, []);

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter((item) => 
    item.roles.includes(userRole)
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="md:hidden fixed bottom-4 right-4 z-40 rounded-full shadow-md"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r bg-background transition-transform duration-300 md:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="border-b px-4 py-6">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-safehaven-purple" />
            <span className="font-bold text-lg">Safe Haven</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-2 py-4">
            <div className="px-4 text-xs font-semibold text-muted-foreground">
              MAIN NAVIGATION
            </div>
            <div className="mt-2 space-y-1">
              {filteredNavItems.map((item, index) => (
                <Button
                  key={index}
                  asChild
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start",
                    location.pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link to={item.href} className="px-2">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="px-4 text-xs font-semibold text-muted-foreground">
              QUICK ACTIONS
            </div>

            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-safehaven-red hover:text-red-600 border-safehaven-red hover:border-red-600"
              >
                <Shield className="mr-2 h-4 w-4" />
                Report Emergency
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
