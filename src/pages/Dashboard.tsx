
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Clock, X, Check } from "lucide-react";
import Header from "@/components/Header";

// Mock data
const mockApps = [
  {
    id: "1",
    name: "TravelHelper",
    description: "Flight tracking and travel recommendations",
    requestedScopes: ["email", "name", "location"],
    approvedScopes: ["email", "name"],
    lastAccess: "2023-06-15T14:23:00Z"
  },
  {
    id: "2",
    name: "HealthTracker",
    description: "Monitor your health and wellness activities",
    requestedScopes: ["email", "name", "health_data"],
    approvedScopes: ["email", "name"],
    lastAccess: "2023-06-14T09:45:00Z"
  },
  {
    id: "3",
    name: "FinanceManager",
    description: "Personal finance tracking and budgeting",
    requestedScopes: ["email", "name", "financial_data"],
    approvedScopes: ["email"],
    lastAccess: "2023-06-10T16:30:00Z"
  }
];

const mockRequests = [
  {
    id: "1",
    appName: "NewsReader",
    description: "Personalized news aggregator",
    requestedScopes: ["email", "reading_preferences"],
    requestDate: "2023-06-15T18:30:00Z"
  },
  {
    id: "2",
    appName: "WeatherAlert",
    description: "Local weather notifications",
    requestedScopes: ["email", "location"],
    requestDate: "2023-06-15T12:15:00Z"
  }
];

const mockAccessLogs = [
  { 
    id: "1", 
    appName: "TravelHelper", 
    accessedFields: ["email", "name"], 
    timestamp: "2023-06-15T14:23:00Z", 
    ipAddress: "192.168.1.1" 
  },
  { 
    id: "2", 
    appName: "HealthTracker", 
    accessedFields: ["email"], 
    timestamp: "2023-06-14T09:45:00Z", 
    ipAddress: "192.168.1.2" 
  },
  { 
    id: "3", 
    appName: "FinanceManager", 
    accessedFields: ["email"], 
    timestamp: "2023-06-10T16:30:00Z", 
    ipAddress: "192.168.1.3" 
  }
];

const Dashboard = () => {
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Handle consent toggle
  const handleToggleConsent = (appId: string, scope: string, currentValue: boolean) => {
    console.log(`Toggling ${scope} for app ${appId} to ${!currentValue}`);
    // Here you would update the state and send to backend
  };

  // Handle consent request response
  const handleConsentRequest = (requestId: string, approved: boolean) => {
    console.log(`Request ${requestId} ${approved ? 'approved' : 'denied'}`);
    // Here you would update the state and send to backend
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

        <Tabs defaultValue="consents" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="consents">My Consents</TabsTrigger>
            <TabsTrigger value="requests">Pending Requests</TabsTrigger>
            <TabsTrigger value="logs">Access Logs</TabsTrigger>
          </TabsList>

          {/* Consents Tab */}
          <TabsContent value="consents">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockApps.map((app) => (
                <Card key={app.id} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>{app.name}</CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Last access: {formatDate(app.lastAccess)}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Data Access Permissions</h4>
                        {app.requestedScopes.map((scope) => (
                          <div key={scope} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{scope}</span>
                              {app.approvedScopes.includes(scope) && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                  Approved
                                </Badge>
                              )}
                            </div>
                            <Switch
                              checked={app.approvedScopes.includes(scope)}
                              onCheckedChange={(checked) => 
                                handleToggleConsent(app.id, scope, app.approvedScopes.includes(scope))
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4 bg-muted/20">
                    <Button variant="outline" size="sm" className="w-full">
                      Revoke All Access
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests">
            {mockRequests.length === 0 ? (
              <Card>
                <CardContent className="py-10">
                  <div className="text-center text-muted-foreground">
                    No pending consent requests at this time.
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {mockRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <CardTitle>{request.appName}</CardTitle>
                      <CardDescription>{request.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Requested on</h4>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{formatDate(request.requestDate)}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Requested Data</h4>
                          <div className="flex flex-wrap gap-2">
                            {request.requestedScopes.map((scope) => (
                              <Badge key={scope} variant="secondary">
                                {scope}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => handleConsentRequest(request.id, false)}
                        className="flex-1 mr-2"
                      >
                        <X className="mr-2 h-4 w-4" /> Deny
                      </Button>
                      <Button
                        onClick={() => handleConsentRequest(request.id, true)}
                        className="flex-1 ml-2"
                      >
                        <Check className="mr-2 h-4 w-4" /> Approve
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Access Logs Tab */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Recent Data Access</CardTitle>
                <CardDescription>
                  See which applications have accessed your data recently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAccessLogs.map((log) => (
                    <div key={log.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">{log.appName}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(log.timestamp)}</div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Eye className="h-4 w-4 mt-0.5" />
                        <div>
                          <span>Accessed: </span>
                          <span className="text-muted-foreground">
                            {log.accessedFields.join(", ")}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        IP: {log.ipAddress}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
