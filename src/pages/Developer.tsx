
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Developer = () => {
  const [appName, setAppName] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [appCredentials, setAppCredentials] = useState<{appId: string; appSecret: string} | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to register app
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock credentials generation
      const mockAppId = "app_" + Math.random().toString(36).substring(2, 15);
      const mockSecret = Math.random().toString(36).substring(2, 15) + 
                        Math.random().toString(36).substring(2, 15);
      
      setAppCredentials({
        appId: mockAppId,
        appSecret: mockSecret
      });
      
      setShowCredentials(true);
      
      toast({
        title: "App Registered Successfully",
        description: "Your application has been registered with CtrlU.",
      });
    }, 1500);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Developer Portal</h1>
            <p className="text-xl text-muted-foreground">
              Register your application to integrate with CtrlU's identity and consent management platform.
            </p>
          </div>

          {!showCredentials ? (
            <Card>
              <CardHeader>
                <CardTitle>Register Your Application</CardTitle>
                <CardDescription>
                  Complete this form to get your API credentials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="appName">Application Name</Label>
                    <Input
                      id="appName"
                      placeholder="My Amazing App"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Application Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what your application does and how it will use user data"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="redirectUri">Redirect URI</Label>
                    <Input
                      id="redirectUri"
                      type="url"
                      placeholder="https://your-app.com/auth/callback"
                      value={redirectUri}
                      onChange={(e) => setRedirectUri(e.target.value)}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Users will be redirected to this URL after authorization
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering Application..." : "Register Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Application Registered Successfully</CardTitle>
                <CardDescription>
                  Save your credentials securely. The app secret will only be shown once.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm">Application ID</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(appCredentials?.appId || "", "appId")}
                    >
                      {copied === "appId" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="bg-background p-2 rounded border text-sm font-mono">
                    {appCredentials?.appId}
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm">Application Secret</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(appCredentials?.appSecret || "", "appSecret")}
                    >
                      {copied === "appSecret" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="bg-background p-2 rounded border text-sm font-mono">
                    {appCredentials?.appSecret}
                  </div>
                </div>
                
                <div className="rounded-md bg-amber-50 p-4 border border-amber-200 text-amber-800">
                  <p className="text-sm font-medium">Important Security Notice</p>
                  <p className="text-sm mt-1">
                    This secret key will only be shown once and cannot be retrieved later. 
                    Please store it securely.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setShowCredentials(false)} className="w-full">
                  Register Another Application
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Integration Documentation</h2>
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  To integrate CtrlU into your application, follow these steps:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Register your application above to get your credentials</li>
                  <li>Implement the OAuth 2.0 authorization flow using your App ID and Secret</li>
                  <li>Request specific data scopes during the authorization process</li>
                  <li>Handle user consent responses and token exchanges</li>
                  <li>Use the access token to request user data via the CtrlU API</li>
                </ol>
                <p>
                  For detailed API documentation and SDK references, please visit our
                  developer documentation.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full Documentation
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
