
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Shield, ChartBar, FileText, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthed = localStorage.getItem("safehaven-authed") === "true";
    setIsAuthenticated(isAuthed);
  }, []);
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-safehaven-purple" />
            <span className="font-bold text-lg">Safe Haven</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link to="#" className="text-sm font-medium transition-colors hover:text-primary">
              Resources
            </Link>
            <Link to="#" className="text-sm font-medium transition-colors hover:text-primary">
              Impact
            </Link>
            <Link to="#" className="text-sm font-medium transition-colors hover:text-primary">
              Get Involved
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="auth-background py-20 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              Fighting Trafficking Through <span className="text-safehaven-purple">Technology</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-8">
              Join our global community of activists, researchers, developers, and supporters 
              working together to combat human trafficking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth">Join the Fight</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/auth">Make a Donation</Link>
              </Button>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-center">
                    <Shield className="h-6 w-6 text-safehaven-purple mx-auto mb-2" />
                    Report Securely
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Anonymous, encrypted reporting channels for at-risk situations</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-center">
                    <ChartBar className="h-6 w-6 text-safehaven-blue mx-auto mb-2" />
                    Track Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Transparent data on interventions, rescues, and donations</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-center">
                    <FileText className="h-6 w-6 text-safehaven-teal mx-auto mb-2" />
                    Access Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Educational materials, best practices, and support systems</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-center">
                    <Users className="h-6 w-6 text-safehaven-green mx-auto mb-2" />
                    Join Community
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Connect with experts, survivors, and allies worldwide</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Role-Based Access for Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Safe Haven provides specialized tools for different stakeholders in the 
              anti-trafficking movement. Select the role that best fits you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Activists",
                description: "Report trafficking, request assistance, and coordinate interventions securely",
                color: "bg-safehaven-blue/10 border-safehaven-blue/20",
                icon: Shield
              },
              {
                title: "Donors",
                description: "Track your donations' impact, see transparent financial information",
                color: "bg-safehaven-purple/10 border-safehaven-purple/20",
                icon: ChartBar
              },
              {
                title: "Researchers",
                description: "Access anonymized datasets, collaboration tools, and publication channels",
                color: "bg-safehaven-teal/10 border-safehaven-teal/20",
                icon: FileText
              },
              {
                title: "Developers",
                description: "Contribute to our open-source tools, access APIs, and build solutions",
                color: "bg-safehaven-green/10 border-safehaven-green/20",
                icon: Shield
              },
              {
                title: "Enforcement",
                description: "Secure, role-verified access to intervention planning and coordination",
                color: "bg-safehaven-orange/10 border-safehaven-orange/20",
                icon: Shield
              },
              {
                title: "Survivors",
                description: "End-to-end encrypted support resources and optional case tracking",
                color: "bg-safehaven-red/10 border-safehaven-red/20",
                icon: Users
              }
            ].map((role, i) => (
              <Card key={i} className={cn("border", role.color)}>
                <CardHeader>
                  <role.icon className="h-8 w-8 mb-2" />
                  <CardTitle>{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1" asChild>
                    <Link to="/auth">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-safehaven-purple" />
                <span className="font-bold text-lg">Safe Haven</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Fighting trafficking through community and technology
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-3">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#">About Us</Link></li>
                <li><Link to="#">Impact Reports</Link></li>
                <li><Link to="#">Our Approach</Link></li>
                <li><Link to="#">Partnerships</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#">Emergency Contacts</Link></li>
                <li><Link to="#">Support Services</Link></li>
                <li><Link to="#">Research Library</Link></li>
                <li><Link to="#">Developer Docs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Get Involved</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/auth">Create Account</Link></li>
                <li><Link to="#">Donate</Link></li>
                <li><Link to="#">Volunteer</Link></li>
                <li><Link to="#">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Safe Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
