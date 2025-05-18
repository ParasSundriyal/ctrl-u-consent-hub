
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Lock, ListCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-b from-background to-muted">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-32 pb-16 md:pt-48 md:pb-24">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">CtrlU – Digital Identity and Consent Platform</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Take control of your digital identity. Manage which applications can access your data and what information they can see.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/login">Sign In <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/register">Register Now</Link>
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Identity Protection</CardTitle>
                <CardDescription>
                  Secure your personal information with our advanced identity management system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Control which applications have access to your identity data and for how long.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Lock className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Consent Management</CardTitle>
                <CardDescription>
                  Explicitly approve or deny access to your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>View all permission requests and manage your consent preferences in one place.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <ListCheck className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Transparency</CardTitle>
                <CardDescription>
                  See which apps accessed your data, when, and what they viewed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Complete access logs and notifications keep you informed about your data usage.</p>
              </CardContent>
            </Card>
          </div>

          {/* For Developers Section */}
          <div className="bg-card rounded-lg p-8 shadow-sm mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">For Developers</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Integrate CtrlU into your applications to provide transparent and ethical user data access.
              </p>
            </div>
            <div className="flex justify-center">
              <Button asChild variant="outline">
                <Link to="/developer">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
