import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Complaints = () => {
  const { toast } = useToast();
  const [product, setProduct] = useState("");
  const [feedback, setFeedback] = useState("");

  const products = [
    { name: "Organic Wheat", seller: "Farmer John" },
    { name: "Fresh Tomatoes", seller: "Green Valley" },
    { name: "Home Garden Kit", seller: "Agent Smith" },
  ];

  const previousFeedback = [
    { id: 1, product: "Organic Rice", type: "Complaint", message: "Product quality was not as expected", status: "Resolved", date: "2025-01-15" },
    { id: 2, product: "Fresh Carrots", type: "Feedback", message: "Great product! Very fresh", status: "Acknowledged", date: "2025-01-18" },
  ];

  const handleSubmit = () => {
    if (!product || !feedback) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Submitted Successfully",
      description: "Your feedback has been recorded",
    });
    setProduct("");
    setFeedback("");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Complaints & Feedback</h1>
        <p className="text-muted-foreground">Share your experience and help us improve</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="product">Product Name</Label>
                <Select value={product} onValueChange={setProduct}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p, index) => (
                      <SelectItem key={index} value={p.name}>
                        {p.name} (Seller: {p.seller})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="feedback">Your Feedback/Complaint</Label>
                <Textarea
                  id="feedback"
                  placeholder="Describe your experience or issue..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                />
              </div>
              <Button className="w-full" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Previous Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {previousFeedback.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{item.product}</p>
                        <Badge variant={item.type === "Complaint" ? "destructive" : "default"}>
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.message}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{item.date}</span>
                        <Badge variant="outline">{item.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Complaints;
