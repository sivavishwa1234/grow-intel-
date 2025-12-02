import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sprout, 
  LayoutDashboard, 
  Leaf, 
  CloudRain, 
  ListTodo, 
  Bot, 
  Activity, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Sun,
  Droplets,
  AlertTriangle,
  BookOpen,
  Users,
  Package,
  CreditCard
} from "lucide-react";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [landSize, setLandSize] = useState(0);
  const [farmerName, setFarmerName] = useState("");
  const [recommendedCrop, setRecommendedCrop] = useState("");
  const [activeRoute, setActiveRoute] = useState("dashboard");

  useEffect(() => {
    const storedLandSize = localStorage.getItem("farmerLandSize");
    const storedUsername = localStorage.getItem("farmerUsername");
    
    if (storedLandSize) {
      const size = parseFloat(storedLandSize);
      setLandSize(size);
      
      // Determine recommended crop based on land size
      if (size < 1) {
        setRecommendedCrop("Ladyfinger");
      } else if (size >= 1 && size < 2) {
        setRecommendedCrop("Chili");
      } else if (size >= 2 && size < 3) {
        setRecommendedCrop("Peanut");
      } else if (size >= 3 && size < 5) {
        setRecommendedCrop("Wheat");
      } else {
        setRecommendedCrop("Rice");
      }
    }
    
    if (storedUsername) {
      setFarmerName(storedUsername);
    }
  }, []);

  useEffect(() => {
    // Update active route based on current location
    const path = location.pathname;
    if (path === "/farmer-dashboard") {
      setActiveRoute("dashboard");
    } else if (path.includes("/my-crops")) {
      setActiveRoute("my-crops");
    } else if (path.includes("/weather-alerts")) {
      setActiveRoute("weather-alerts");
    } else if (path.includes("/admin-tasks")) {
      setActiveRoute("admin-tasks");
    } else if (path.includes("/ai-chatbot")) {
      setActiveRoute("ai-chatbot");
    } else if (path.includes("/ai-recommendation")) {
      setActiveRoute("ai-recommendation");
    } else if (path.includes("/disease-prediction")) {
      setActiveRoute("disease-prediction");
    } else if (path.includes("/market-products")) {
      setActiveRoute("market-products");
    } else if (path.includes("/order-management")) {
      setActiveRoute("order-management");
    } else if (path.includes("/payment-verification")) {
      setActiveRoute("payment-verification");
    } else if (path.includes("/profile-settings")) {
      setActiveRoute("profile-settings");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("farmerLandSize");
    localStorage.removeItem("farmerUsername");
    navigate("/");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/farmer-dashboard" },
    { id: "my-crops", label: "My Crops", icon: Leaf, path: "/farmer-dashboard/my-crops" },
    { id: "crop-guidance", label: "Crop Guidance", icon: BookOpen, path: "/crop-guidance" },
    { id: "weather-alerts", label: "Weather & Alerts", icon: CloudRain, path: "/farmer-dashboard/weather-alerts" },
    { id: "admin-tasks", label: "Tasks from Admin", icon: ListTodo, path: "/farmer-dashboard/admin-tasks" },
    { id: "ai-chatbot", label: "AI Assistant", icon: Bot, path: "/farmer-dashboard/ai-chatbot" },
    { id: "ai-recommendation", label: "AI Crop Recommendation", icon: Activity, path: "/farmer-dashboard/ai-recommendation" },
    { id: "disease-prediction", label: "Disease Prediction", icon: Activity, path: "/farmer-dashboard/disease-prediction" },
    { id: "market-products", label: "Sell My Products", icon: ShoppingBag, path: "/farmer-dashboard/market-products" },
    { id: "order-management", label: "Order Management", icon: Package, path: "/farmer-dashboard/order-management" },
    { id: "payment-verification", label: "Payment Verification", icon: CreditCard, path: "/farmer-dashboard/payment-verification" },
    { id: "connections", label: "Connections", icon: Users, path: "/farmer-dashboard/connections" },
    { id: "profile-settings", label: "Profile Settings", icon: Settings, path: "/farmer-dashboard/profile-settings" },
  ];

  const isOnDashboardHome = location.pathname === "/farmer-dashboard";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-primary/10 to-primary/5 border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">GrowIntel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeRoute === item.id ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                activeRoute === item.id 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "hover:bg-primary/10"
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">
            {navItems.find(item => item.id === activeRoute)?.label || "Dashboard"}
          </h1>
          
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {farmerName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">{farmerName}</div>
              <div className="text-muted-foreground text-xs">Farmer</div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {isOnDashboardHome ? (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-glow">
                <h2 className="text-3xl font-bold mb-2">Welcome back, {farmerName}!</h2>
                <p className="text-white/90">Here's your farm overview for today</p>
              </div>

              {/* Recommended Crop Card */}
              <Card className="shadow-soft border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="h-6 w-6 text-primary" />
                    Recommended Crop for Your Farm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Based on your land size ({landSize} acres)</div>
                      <div className="text-4xl font-bold text-primary">{recommendedCrop}</div>
                    </div>
                    <Badge className="text-lg px-4 py-2">Perfect Match</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="shadow-soft hover:shadow-glow transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">5</div>
                    <p className="text-xs text-muted-foreground mt-1">2 pending</p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft hover:shadow-glow transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Crops Planted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">3</div>
                    <p className="text-xs text-muted-foreground mt-1">All healthy</p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft hover:shadow-glow transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Recent Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-accent">2</div>
                    <p className="text-xs text-muted-foreground mt-1">Weather updates</p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft hover:shadow-glow transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">AI Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-secondary">4</div>
                    <p className="text-xs text-muted-foreground mt-1">New today</p>
                  </CardContent>
                </Card>
              </div>

              {/* Current Weather and Climate Alert */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-secondary" />
                      Current Weather
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-4xl font-bold">28°C</div>
                        <div className="text-sm text-muted-foreground">Partly Cloudy</div>
                      </div>
                      <Sun className="h-16 w-16 text-secondary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-accent" />
                        <div className="text-sm">
                          <div className="font-medium">Humidity</div>
                          <div className="text-muted-foreground">65%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CloudRain className="h-4 w-4 text-accent" />
                        <div className="text-sm">
                          <div className="font-medium">Rain Chance</div>
                          <div className="text-muted-foreground">20%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft border-accent/30 bg-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                      Climate Alert
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge className="bg-accent text-accent-foreground">High Humidity</Badge>
                      <p className="text-sm">
                        Current humidity levels are ideal for rice cultivation. 
                        This is a perfect time for transplanting if you're growing rice.
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Updated: 2 hours ago
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;