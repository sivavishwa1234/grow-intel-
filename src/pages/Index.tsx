import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Users, ShoppingCart, Shield } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [landSize, setLandSize] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    // Check if user exists in localStorage
    const storedUser = localStorage.getItem(`user_${username}`);
    let userRole = null;
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      userRole = userData.role;
      
      // For farmer, use stored land size or require new input
      if (userRole === "farmer") {
        const farmerLandSize = userData.areaOfLand || landSize;
        if (!farmerLandSize) {
          toast.error("Please enter your land size");
          return;
        }
        localStorage.setItem("farmerLandSize", farmerLandSize);
        localStorage.setItem("farmerUsername", username);
      }
    } else {
      // Fallback to username-based detection for demo users
      if (username.toLowerCase().includes("farmer")) {
        userRole = "farmer";
        if (!landSize) {
          toast.error("Please enter your land size");
          return;
        }
        localStorage.setItem("farmerLandSize", landSize);
        localStorage.setItem("farmerUsername", username);
      } else if (username.toLowerCase().includes("agent")) {
        userRole = "agent";
      } else if (username.toLowerCase().includes("admin")) {
        userRole = "admin";
      } else {
        userRole = "customer";
      }
    }

    // Redirect based on role
    if (userRole === "farmer") {
      navigate("/farmer-dashboard");
    } else if (userRole === "agent") {
      localStorage.setItem("agentUsername", username);
      navigate("/agent-dashboard");
    } else if (userRole === "admin") {
      navigate("/admin-dashboard");
    } else {
      localStorage.setItem("customerUsername", username);
      navigate("/customer-dashboard");
    }
    
    toast.success("Login successful!");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sprout className="h-8 w-8 text-primary-foreground" />
          <span className="text-2xl font-bold text-primary-foreground">GrowIntel</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="text-primary-foreground space-y-6 animate-fade-in">
            <h1 className="text-5xl font-bold leading-tight">
              Intelligent Agriculture, Connected Marketplace
            </h1>
            <p className="text-xl opacity-90">
              Empowering farmers, agents, and customers through AI-powered insights and seamless commerce
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-start gap-3">
                <Sprout className="h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-semibold">AI Crop Guidance</h3>
                  <p className="text-sm opacity-80">Smart recommendations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-semibold">Agent Network</h3>
                  <p className="text-sm opacity-80">Connected supply chain</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShoppingCart className="h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-semibold">Marketplace</h3>
                  <p className="text-sm opacity-80">Direct to customer</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-semibold">Secure Platform</h3>
                  <p className="text-sm opacity-80">Protected transactions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <Card className="shadow-glow animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl">Login to GrowIntel</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard</CardDescription>
              <p className="text-xs text-muted-foreground mt-2">
                Demo: Include your role in username (e.g., "farmer1", "agent1", "customer1")
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                {username.toLowerCase().includes("farmer") && (
                  <div className="space-y-2">
                    <Label htmlFor="landSize">Land Size (in acres)</Label>
                    <Input
                      id="landSize"
                      type="number"
                      placeholder="Enter your land size"
                      value={landSize}
                      onChange={(e) => setLandSize(e.target.value)}
                      required
                    />
                  </div>
                )}
                
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="text-center pt-2">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => navigate("/register")}
                  >
                    Don't have an account? Register here
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
