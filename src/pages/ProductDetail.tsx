import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sprout, ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import wheatImg from "@/assets/products/wheat.jpg";
import tomatoesImg from "@/assets/products/tomatoes.jpg";
import gardenKitImg from "@/assets/products/garden-kit.jpg";
import riceImg from "@/assets/products/rice.jpg";
import carrotsImg from "@/assets/products/carrots.jpg";
import herbKitImg from "@/assets/products/herb-kit.jpg";
import cornImg from "@/assets/products/corn.jpg";
import potatoesImg from "@/assets/products/potatoes.jpg";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");
  const [product, setProduct] = useState<any>(null);

  const staticProducts = [
    { id: "1", name: "Organic Wheat", price: 25.99, category: "Grains", seller: "Farmer John", image: wheatImg, stock: "In Stock", description: "Premium quality organic wheat, grown without synthetic pesticides or fertilizers. Perfect for making bread, pasta, and other baked goods. Sourced directly from certified organic farms." },
    { id: "2", name: "Fresh Tomatoes", price: 12.99, category: "Vegetables", seller: "Green Valley", image: tomatoesImg, stock: "In Stock", description: "Fresh, juicy tomatoes picked at peak ripeness. Rich in vitamins and antioxidants. Perfect for salads, cooking, and sauces." },
    { id: "3", name: "Home Garden Kit", price: 45.99, category: "Kits", seller: "Agent Smith", image: gardenKitImg, stock: "Low Stock", description: "Complete gardening kit with seeds, tools, and soil. Everything you need to start your home garden. Perfect for beginners." },
    { id: "4", name: "Organic Rice", price: 30.99, category: "Grains", seller: "Farmer Sarah", image: riceImg, stock: "In Stock", description: "Premium organic rice grown using traditional methods. Non-GMO and pesticide-free. Perfect for daily meals." },
    { id: "5", name: "Fresh Carrots", price: 8.99, category: "Vegetables", seller: "Green Valley", image: carrotsImg, stock: "In Stock", description: "Crunchy, sweet carrots rich in beta-carotene. Freshly harvested from organic farms. Great for snacking and cooking." },
    { id: "6", name: "Herb Garden Kit", price: 35.99, category: "Kits", seller: "Agent Brown", image: herbKitImg, stock: "In Stock", description: "Grow your own fresh herbs at home. Includes basil, mint, coriander, and more. Easy to use kit for kitchen gardening." },
    { id: "7", name: "Organic Corn", price: 18.99, category: "Grains", seller: "Farmer Mike", image: cornImg, stock: "In Stock", description: "Sweet, organic corn grown without chemicals. Fresh from the farm. Perfect for grilling, boiling, or salads." },
    { id: "8", name: "Fresh Potatoes", price: 15.99, category: "Vegetables", seller: "Green Valley", image: potatoesImg, stock: "In Stock", description: "High-quality potatoes ideal for all your cooking needs. Grown organically without harmful pesticides." },
  ];

  useEffect(() => {
    // Load products from localStorage and static products
    const farmerProducts = JSON.parse(localStorage.getItem("farmerProducts") || "[]");
    const formattedFarmerProducts = farmerProducts.map((p: any) => ({
      id: p.id,
      name: p.cropName,
      price: p.price,
      category: p.category,
      seller: p.farmerName,
      image: p.image,
      stock: "In Stock",
      description: `Fresh ${p.cropName} from ${p.farmerName}. Quantity available: ${p.quantity}kg. High quality produce ready for sale.`
    }));
    
    const allProducts = [...staticProducts, ...formattedFarmerProducts];
    const foundProduct = allProducts.find(p => p.id.toString() === id);
    
    if (foundProduct) {
      setProduct({
        ...foundProduct,
        specifications: [
          { label: "Weight", value: "50 kg" },
          { label: "Seller", value: foundProduct.seller },
          { label: "Category", value: foundProduct.category },
          { label: "Stock Status", value: foundProduct.stock },
        ],
        reviews: [
          {
            author: "John Doe",
            rating: 5,
            comment: "Excellent quality! Very fresh and pure.",
            date: "2025-01-05",
          },
          {
            author: "Sarah Smith",
            rating: 4,
            comment: "Good product, timely delivery. Satisfied with purchase.",
            date: "2025-01-03",
          },
        ],
      });
    }
  }, [id]);

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }
    toast.success("Thank you for your feedback!");
    setFeedback("");
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem("customerCart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= 10) {
        toast.error("Maximum 10 units per product allowed");
        return;
      }
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("customerCart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    toast.success("Proceeding to checkout...");
    navigate("/order-tracking");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">GrowIntel</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/customer-dashboard/products")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image & Info */}
          <div>
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="w-full h-96 overflow-hidden rounded-lg mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <Badge className="mb-4">{product.stock}</Badge>
                  <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                  <p className="text-muted-foreground mb-4">{product.category}</p>
                  <p className="text-5xl font-bold text-primary">₹{product.price}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <dl className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b pb-2">
                      <dt className="font-medium">{spec.label}:</dt>
                      <dd className="text-muted-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1" size="lg" onClick={handleBuyNow}>
                Buy Now
              </Button>
              <Button className="flex-1" variant="outline" size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <Card className="shadow-soft mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-secondary text-secondary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Add Your Feedback</h2>
            <div className="space-y-4">
              <Textarea
                placeholder="Share your experience with this product..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
              />
              <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProductDetail;
