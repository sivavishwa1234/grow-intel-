import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sprout, Users, ShoppingCart, Package, TrendingUp, LogOut, ClipboardList } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Users", value: "1,456", icon: Users, color: "text-primary", change: "+12%" },
    { title: "Active Orders", value: "234", icon: ShoppingCart, color: "text-secondary", change: "+8%" },
    { title: "Products Listed", value: "567", icon: Package, color: "text-accent", change: "+5%" },
    { title: "Revenue (Month)", value: "$45,678", icon: TrendingUp, color: "text-primary", change: "+23%" },
  ];

  const taskManager = [
    { id: 1, orderId: "#ORD-001", customer: "Alice Williams", product: "Organic Wheat", action: "Payment Received", time: "2 mins ago", status: "pending" },
    { id: 2, orderId: "#ORD-002", customer: "Bob Davis", product: "Garden Kit", action: "Shipped", time: "15 mins ago", status: "completed" },
    { id: 3, orderId: "#ORD-003", customer: "Carol Miller", product: "Fresh Tomatoes", action: "Order Placed", time: "1 hour ago", status: "pending" },
    { id: 4, orderId: "#ORD-004", customer: "David Brown", product: "Rice Seeds", action: "Ready to Ship", time: "2 hours ago", status: "in-progress" },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", role: "Farmer", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Customer", email: "jane@example.com", status: "Active" },
    { id: 3, name: "Mike Johnson", role: "Agent", email: "mike@example.com", status: "Active" },
    { id: 4, name: "Sarah Brown", role: "Farmer", email: "sarah@example.com", status: "Pending" },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "Alice Williams", product: "Organic Wheat", amount: "$125.99", status: "Delivered" },
    { id: "#ORD-002", customer: "Bob Davis", product: "Garden Kit", amount: "$45.99", status: "Shipped" },
    { id: "#ORD-003", customer: "Carol Miller", product: "Fresh Tomatoes", amount: "$32.50", status: "Processing" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">GrowIntel Admin</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor the entire GrowIntel platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-primary font-medium">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Management Tabs */}
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="tasks">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="tasks">Task Manager</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="tasks" className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Recent Activities</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taskManager.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.orderId}</TableCell>
                        <TableCell>{task.customer}</TableCell>
                        <TableCell>{task.product}</TableCell>
                        <TableCell>{task.action}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{task.time}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              task.status === "completed"
                                ? "default"
                                : task.status === "in-progress"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {task.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell className="font-semibold">{order.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "default"
                                : order.status === "Shipped"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Analytics charts would be displayed here</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Revenue visualization would be shown here</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
