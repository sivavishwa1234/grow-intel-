import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sprout,
  Users,
  Leaf,
  CloudRain,
  Send,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  LayoutDashboard,
  Bell,
  TrendingUp,
  Activity,
  ListTodo,
  MapPin,
  Clock,
  Bot,
  MessageCircle
} from "lucide-react";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [agentName, setAgentName] = useState("Agent Smith");

  useEffect(() => {
    const storedName = localStorage.getItem("agentUsername");
    if (storedName) {
      setAgentName(storedName);
    }
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/agent-dashboard" },
    { id: "farmers", label: "Farmer Management", icon: Users, path: "/agent-dashboard/farmer-management" },
    { id: "crop-template", label: "Crop Template Creator", icon: Sprout, path: "/agent-dashboard/crop-template-creator" },
    { id: "tasks", label: "Send Tasks", icon: Send, path: "/agent-dashboard/send-tasks" },
    { id: "market", label: "Market Overview", icon: ShoppingBag, path: "/agent-dashboard/market-overview" },
    { id: "reports", label: "Reports & Analytics", icon: BarChart3, path: "/agent-dashboard/reports-analytics" },
    { id: "connections", label: "Connections", icon: MessageCircle, path: "/agent-dashboard/connections" },
    { id: "settings", label: "Profile Settings", icon: Settings, path: "/agent-dashboard/profile-settings" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === "/agent-dashboard";

  const stats = [
    { title: "Total Farmers Managed", value: "50", icon: Users, change: "+5 this month" },
    { title: "Active Crops", value: "45", icon: Activity, change: "+8 this week" },
    { title: "Tasks Sent", value: "127", icon: ListTodo, change: "+23 this week" },
    { title: "Pending Updates", value: "12", icon: Bell, change: "3 urgent" },
  ];

  const recentActivities = [
    { id: 1, type: "New Farmer", message: "Raj Kumar registered with 1.5 acres", time: "2 hours ago" },
    { id: 2, type: "Task Completed", message: "John Smith completed fertilizer application", time: "3 hours ago" },
    { id: 3, type: "Crop Update", message: "Sarah Johnson updated Rice crop to Flowering stage", time: "5 hours ago" },
    { id: 4, type: "Alert", message: "Heavy rain expected in Punjab region", time: "6 hours ago" },
  ];

  const weatherData = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    location: "Punjab Region"
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">GrowIntel</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 mb-6">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {agentName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm">{agentName}</p>
              <p className="text-xs text-muted-foreground">Agent</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/")}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {isHomePage ? (
            <>
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Welcome, {agentName}!</h1>
                <p className="text-muted-foreground">Manage farmers and monitor crop activities</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <p className="text-xs text-green-600">{stat.change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                        >
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm mb-1">{activity.type}</p>
                            <p className="text-sm text-muted-foreground mb-2">{activity.message}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Weather Highlight */}
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900 dark:text-blue-100">Weather Highlight</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                        <MapPin className="h-4 w-4" />
                        <span>{weatherData.location}</span>
                      </div>
                      <div className="text-center py-4">
                        <CloudRain className="h-16 w-16 mx-auto text-blue-600 mb-2" />
                        <div className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-1">
                          {weatherData.temperature}°C
                        </div>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{weatherData.condition}</p>
                      </div>
                      <div className="pt-4 border-t border-blue-200">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-blue-700 dark:text-blue-300">Humidity</span>
                          <span className="font-semibold text-blue-900 dark:text-blue-100">{weatherData.humidity}%</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                        onClick={() => navigate("/agent-dashboard/weather")}
                      >
                        View Full Forecast
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-green-50 dark:bg-green-950 border-green-200">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New Farmer Sign-Up</p>
                        <p className="text-xs text-muted-foreground">Priya Sharma joined with 2.5 acres land</p>
                      </div>
                      <span className="text-xs text-muted-foreground">Just now</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-blue-50 dark:bg-blue-950 border-blue-200">
                      <Activity className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Weather Alert</p>
                        <p className="text-xs text-muted-foreground">Moderate rainfall expected tomorrow</p>
                      </div>
                      <span className="text-xs text-muted-foreground">1h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
