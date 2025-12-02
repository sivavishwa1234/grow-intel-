import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Sprout, ShoppingCart, Package, Settings, LogOut, Bell, 
  LayoutDashboard, Store, ClipboardList, CreditCard, MapPin, 
  Users, MessageSquare, User 
} from "lucide-react";
import wheatImg from "@/assets/products/wheat.jpg";
import tomatoesImg from "@/assets/products/tomatoes.jpg";
import gardenKitImg from "@/assets/products/garden-kit.jpg";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customerName, setCustomerName] = useState("");
  const [cartCount] = useState(5);
  const [notificationCount] = useState(3);

  useEffect(() => {
    const name = localStorage.getItem("customerUsername") || "Customer";
    setCustomerName(name);
  }, []);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/customer-dashboard" },
    { name: "Products", icon: Store, path: "/customer-dashboard/products" },
    { name: "My Orders", icon: ClipboardList, path: "/customer-dashboard/my-orders" },
    { name: "Cart", icon: ShoppingCart, path: "/customer-dashboard/cart" },
    { name: "Order Tracking", icon: MapPin, path: "/customer-dashboard/order-tracking" },
    { name: "Connections", icon: Users, path: "/customer-dashboard/connections" },
    { name: "Complaints & Feedback", icon: MessageSquare, path: "/customer-dashboard/complaints" },
    { name: "Profile Settings", icon: User, path: "/customer-dashboard/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const stats = [
    { label: "Total Orders", value: "24", icon: Package },
    { label: "Pending Deliveries", value: "3", icon: MapPin },
    { label: "Connected Farmers", value: "12", icon: Users },
    { label: "Connected Agents", value: "5", icon: Users },
  ];

  const recommendedProducts = [
    { id: 1, name: "Organic Wheat", price: 25.99, seller: "Farmer John", image: wheatImg },
    { id: 2, name: "Fresh Tomatoes", price: 12.99, seller: "Green Valley Farm", image: tomatoesImg },
    { id: 3, name: "Home Garden Kit", price: 45.99, seller: "Agent Smith", image: gardenKitImg },
  ];

  const isDashboardHome = location.pathname === "/customer-dashboard";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
          <Sprout className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">GrowIntel</span>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant={isActive(item.path) ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card p-4 sticky top-0 z-50">
          <div className="flex items-center justify-end gap-4">
            <Button variant="outline" size="icon" className="relative" onClick={() => navigate("/customer-dashboard/order-tracking")}>
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {notificationCount}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="icon" className="relative" onClick={() => navigate("/customer-dashboard/cart")}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>{customerName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{customerName}</span>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {isDashboardHome ? (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Welcome back, {customerName}!</h1>
                <p className="text-muted-foreground">Explore quality agricultural products and manage your orders</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <Card key={stat.label}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </CardTitle>
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recommended Products */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
                <div className="grid grid-cols-3 gap-6">
                  {recommendedProducts.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardTitle className="text-center">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Sold by: {product.seller}</p>
                        <p className="text-2xl font-bold text-primary">₹{product.price}</p>
                        <div className="flex gap-2 mt-4">
                          <Button className="flex-1" onClick={() => navigate("/customer-dashboard/products")}>Add to Cart</Button>
                          <Button variant="outline" className="flex-1" onClick={() => navigate(`/product/${product.id}`)}>View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Latest Updates */}
              <Card>
                <CardHeader>
                  <CardTitle>Latest Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <Package className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Order #12345 has been shipped</p>
                        <p className="text-sm text-muted-foreground">Expected delivery: 2 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">New farmer "Green Valley Farm" available</p>
                        <p className="text-sm text-muted-foreground">Specializes in organic vegetables</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <Store className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">5 new products added to marketplace</p>
                        <p className="text-sm text-muted-foreground">Check out the latest offerings</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
