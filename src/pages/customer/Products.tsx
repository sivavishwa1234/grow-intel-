import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import wheatImg from "@/assets/products/wheat.jpg";
import tomatoesImg from "@/assets/products/tomatoes.jpg";
import gardenKitImg from "@/assets/products/garden-kit.jpg";
import riceImg from "@/assets/products/rice.jpg";
import carrotsImg from "@/assets/products/carrots.jpg";
import herbKitImg from "@/assets/products/herb-kit.jpg";
import cornImg from "@/assets/products/corn.jpg";
import potatoesImg from "@/assets/products/potatoes.jpg";

interface Product {
  id: number | string;
  name: string;
  price: number;
  category: string;
  seller: string;
  image: string;
  stock: string;
  quantity?: string;
  qrCode?: string;
  paymentNumber?: string;
}

const Products = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const staticProducts: Product[] = [
    { id: 1, name: "Organic Wheat", price: 25.99, category: "Grains", seller: "Farmer John", image: wheatImg, stock: "In Stock" },
    { id: 2, name: "Fresh Tomatoes", price: 12.99, category: "Vegetables", seller: "Green Valley", image: tomatoesImg, stock: "In Stock" },
    { id: 3, name: "Home Garden Kit", price: 45.99, category: "Kits", seller: "Agent Smith", image: gardenKitImg, stock: "Low Stock" },
    { id: 4, name: "Organic Rice", price: 30.99, category: "Grains", seller: "Farmer Sarah", image: riceImg, stock: "In Stock" },
    { id: 5, name: "Fresh Carrots", price: 8.99, category: "Vegetables", seller: "Green Valley", image: carrotsImg, stock: "In Stock" },
    { id: 6, name: "Herb Garden Kit", price: 35.99, category: "Kits", seller: "Agent Brown", image: herbKitImg, stock: "In Stock" },
    { id: 7, name: "Organic Corn", price: 18.99, category: "Grains", seller: "Farmer Mike", image: cornImg, stock: "In Stock" },
    { id: 8, name: "Fresh Potatoes", price: 15.99, category: "Vegetables", seller: "Green Valley", image: potatoesImg, stock: "In Stock" },
  ];

  const loadProducts = () => {
    // Load farmer-listed products from localStorage
    const farmerProducts = JSON.parse(localStorage.getItem("farmerProducts") || "[]");
    const formattedFarmerProducts = farmerProducts.map((p: any) => ({
      id: p.id,
      name: p.cropName,
      price: p.price,
      category: p.category,
      seller: p.farmerName,
      image: p.image,
      stock: "In Stock",
      quantity: p.quantity,
      qrCode: p.qrCode,
      paymentNumber: p.paymentNumber
    }));
    
    setAllProducts([...staticProducts, ...formattedFarmerProducts]);
  };

  useEffect(() => {
    loadProducts();
    
    // Auto-refresh products every 3 seconds to show new farmer products
    const interval = setInterval(() => {
      loadProducts();
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    const matchesPrice = priceRange === "all" || 
      (priceRange === "low" && product.price < 20) ||
      (priceRange === "medium" && product.price >= 20 && product.price < 40) ||
      (priceRange === "high" && product.price >= 40);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("customerCart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= 10) {
        toast({
          title: "Limit Reached",
          description: "You can only purchase up to 10 units of each product",
          variant: "destructive"
        });
        return;
      }
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("customerCart", JSON.stringify(cart));
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">Browse and purchase quality agricultural products</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Grains">Grains</SelectItem>
            <SelectItem value="Vegetables">Vegetables</SelectItem>
            <SelectItem value="Kits">Garden Kits</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="low">Under ₹20</SelectItem>
            <SelectItem value="medium">₹20 - ₹40</SelectItem>
            <SelectItem value="high">Above ₹40</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
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
              <Badge variant={product.stock === "In Stock" ? "default" : "secondary"}>
                {product.stock}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">Sold by: {product.seller}</p>
              {product.paymentNumber && (
                <p className="text-sm text-muted-foreground mt-1">
                  Payment: {product.paymentNumber}
                </p>
              )}
              {product.qrCode && (
                <div className="mt-2 flex justify-center">
                  <img src={product.qrCode} alt="Payment QR" className="w-24 h-24 object-contain border rounded" />
                </div>
              )}
              <p className="text-2xl font-bold mt-4 text-primary">₹{product.price}</p>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => navigate(`/product/${product.id}`)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
