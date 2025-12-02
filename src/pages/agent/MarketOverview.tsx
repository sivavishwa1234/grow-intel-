import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Filter, TrendingUp, DollarSign, Package } from "lucide-react";

const MarketOverview = () => {
  const [filterType, setFilterType] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Farmer supply data with sales information
  const products = [
    { id: 1, name: "Organic Wheat", farmer: "John Smith", quantity: 500, unit: "kg", price: 25, costPrice: 18, status: "Sold", type: "Grain", soldDate: "2024-01-15" },
    { id: 2, name: "Fresh Rice", farmer: "Sarah Johnson", quantity: 300, unit: "kg", price: 40, costPrice: 30, status: "Sold", type: "Grain", soldDate: "2024-01-20" },
    { id: 3, name: "Red Chili", farmer: "Raj Kumar", quantity: 50, unit: "kg", price: 120, costPrice: 85, status: "Sold", type: "Spice", soldDate: "2024-01-18" },
    { id: 4, name: "Peanuts", farmer: "Mike Brown", quantity: 200, unit: "kg", price: 80, costPrice: 60, status: "Available", type: "Legume", soldDate: null },
    { id: 5, name: "Cotton Bales", farmer: "Emily Davis", quantity: 10, unit: "bales", price: 5000, costPrice: 4200, status: "Sold", type: "Fiber", soldDate: "2024-01-22" },
    { id: 6, name: "Yellow Corn", farmer: "John Smith", quantity: 400, unit: "kg", price: 20, costPrice: 15, status: "Sold", type: "Grain", soldDate: "2024-01-25" },
    { id: 7, name: "Turmeric", farmer: "Priya Sharma", quantity: 80, unit: "kg", price: 150, costPrice: 110, status: "Sold", type: "Spice", soldDate: "2024-01-28" },
    { id: 8, name: "Green Gram", farmer: "Raj Kumar", quantity: 150, unit: "kg", price: 90, costPrice: 70, status: "Available", type: "Legume", soldDate: null },
  ];

  // Calculate sales metrics
  const soldProducts = products.filter(p => p.status === "Sold");
  const totalRevenue = soldProducts.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const totalCost = soldProducts.reduce((sum, p) => sum + (p.quantity * p.costPrice), 0);
  const totalProfit = totalRevenue - totalCost;
  const profitMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;

  const filteredProducts = filterType === "all" 
    ? products 
    : products.filter(p => p.type === filterType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market Overview</h1>
          <p className="text-muted-foreground">View and manage farmer products for sale</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="Grain">Grains</SelectItem>
              <SelectItem value="Spice">Spices</SelectItem>
              <SelectItem value="Legume">Legumes</SelectItem>
              <SelectItem value="Fiber">Fiber</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">From {soldProducts.length} sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Profit
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹{totalProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{profitMargin}% margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Products Sold
            </CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{soldProducts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{products.filter(p => p.status === "Available").length} available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Sale
            </CardTitle>
            <DollarSign className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              ₹{soldProducts.length > 0 ? Math.round(totalRevenue / soldProducts.length).toLocaleString() : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales History */}
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Sale Price</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {soldProducts.map((product) => {
                const profit = (product.price - product.costPrice) * product.quantity;
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.farmer}</TableCell>
                    <TableCell>{product.quantity} {product.unit}</TableCell>
                    <TableCell>₹{product.price}/{product.unit}</TableCell>
                    <TableCell>₹{product.costPrice}/{product.unit}</TableCell>
                    <TableCell className="font-semibold text-green-600">₹{profit.toLocaleString()}</TableCell>
                    <TableCell>{product.soldDate}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Sale Details</DialogTitle>
                          </DialogHeader>
                          {selectedProduct && (
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                                <p className="text-sm text-muted-foreground">Supplied by {selectedProduct.farmer}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Quantity</p>
                                  <p className="font-medium">{selectedProduct.quantity} {selectedProduct.unit}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Sale Price</p>
                                  <p className="font-medium">₹{selectedProduct.price}/{selectedProduct.unit}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Cost Price</p>
                                  <p className="font-medium">₹{selectedProduct.costPrice}/{selectedProduct.unit}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                                  <p className="font-medium">₹{(selectedProduct.quantity * selectedProduct.price).toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Total Cost</p>
                                  <p className="font-medium">₹{(selectedProduct.quantity * selectedProduct.costPrice).toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Profit</p>
                                  <p className="font-semibold text-green-600">
                                    ₹{((selectedProduct.price - selectedProduct.costPrice) * selectedProduct.quantity).toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Type</p>
                                  <Badge variant="outline">{selectedProduct.type}</Badge>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Sale Date</p>
                                  <p className="font-medium">{selectedProduct.soldDate}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Available Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Available Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Expected Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.filter(p => p.status === "Available").map((product) => {
                const expectedProfit = (product.price - product.costPrice) * product.quantity;
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.farmer}</TableCell>
                    <TableCell>{product.quantity} {product.unit}</TableCell>
                    <TableCell>₹{product.price}/{product.unit}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.type}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-blue-600">₹{expectedProfit.toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverview;
