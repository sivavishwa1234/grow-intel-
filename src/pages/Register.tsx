import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sprout } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"farmer" | "agent" | "customer">("farmer");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    areaOfLand: "",
    landType: "",
    soilType: "",
    username: "",
    password: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.username || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Store user data with role in localStorage
    const userData = {
      username: formData.username,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: role,
      areaOfLand: formData.areaOfLand,
      landType: formData.landType,
      soilType: formData.soilType,
    };
    
    localStorage.setItem(`user_${formData.username}`, JSON.stringify(userData));
    
    toast.success("Registration successful! You can now login.");
    navigate("/");
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      areaOfLand: "",
      landType: "",
      soilType: "",
      username: "",
      password: "",
    });
    setPhoto(null);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col">
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sprout className="h-8 w-8 text-primary-foreground" />
          <span className="text-2xl font-bold text-primary-foreground">GrowIntel</span>
        </div>
        <Button variant="outline" onClick={() => navigate("/")} className="bg-background">
          Back to Login
        </Button>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-2xl shadow-glow">
          <CardHeader>
            <CardTitle className="text-3xl">Create Your Account</CardTitle>
            <CardDescription>Register as a Farmer, Agent, or Customer</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Register as *</Label>
                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`${role}@example.com`}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Farmer-specific fields */}
                {role === "farmer" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="areaOfLand">Area of Land (acres)</Label>
                      <Input
                        id="areaOfLand"
                        type="number"
                        placeholder="50"
                        value={formData.areaOfLand}
                        onChange={(e) => setFormData({ ...formData, areaOfLand: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landType">Land Type</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, landType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select land type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agricultural">Agricultural</SelectItem>
                          <SelectItem value="irrigated">Irrigated</SelectItem>
                          <SelectItem value="rainfed">Rainfed</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="soilType">Soil Type</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, soilType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clay">Clay</SelectItem>
                          <SelectItem value="loamy">Loamy</SelectItem>
                          <SelectItem value="sandy">Sandy</SelectItem>
                          <SelectItem value="silt">Silt</SelectItem>
                          <SelectItem value="peaty">Peaty</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    placeholder="farmer123"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Profile Photo</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Register
                </Button>
                <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
