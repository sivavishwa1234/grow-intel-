import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Pencil, Trash2 } from "lucide-react";

const FarmerManagement = () => {
  const [farmers, setFarmers] = useState([
    { id: 1, name: "John Smith", location: "Punjab", landSize: "5 acres", crop: "Wheat", contact: "+91-9876543210", status: "Active" },
    { id: 2, name: "Sarah Johnson", location: "Haryana", landSize: "3 acres", crop: "Rice", contact: "+91-9876543211", status: "Active" },
    { id: 3, name: "Mike Brown", location: "Gujarat", landSize: "2 acres", crop: "Peanut", contact: "+91-9876543212", status: "Inactive" },
    { id: 4, name: "Emily Davis", location: "Maharashtra", landSize: "7 acres", crop: "Cotton", contact: "+91-9876543213", status: "Active" },
    { id: 5, name: "Raj Kumar", location: "Tamil Nadu", landSize: "1.5 acres", crop: "Chili", contact: "+91-9876543214", status: "Active" },
  ]);

  const [newFarmer, setNewFarmer] = useState({
    name: "",
    location: "",
    landSize: "",
    crop: "",
    contact: "",
  });

  const handleAddFarmer = () => {
    if (newFarmer.name && newFarmer.location && newFarmer.landSize) {
      setFarmers([
        ...farmers,
        {
          id: farmers.length + 1,
          ...newFarmer,
          status: "Active",
        },
      ]);
      setNewFarmer({ name: "", location: "", landSize: "", crop: "", contact: "" });
    }
  };

  const handleDelete = (id: number) => {
    setFarmers(farmers.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Farmer Management</h1>
          <p className="text-muted-foreground">Manage all registered farmers</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Farmer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Farmer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={newFarmer.name}
                  onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                  placeholder="Enter farmer name"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={newFarmer.location}
                  onChange={(e) => setNewFarmer({ ...newFarmer, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
              <div className="space-y-2">
                <Label>Land Size</Label>
                <Input
                  value={newFarmer.landSize}
                  onChange={(e) => setNewFarmer({ ...newFarmer, landSize: e.target.value })}
                  placeholder="e.g., 5 acres"
                />
              </div>
              <div className="space-y-2">
                <Label>Current Crop</Label>
                <Input
                  value={newFarmer.crop}
                  onChange={(e) => setNewFarmer({ ...newFarmer, crop: e.target.value })}
                  placeholder="e.g., Wheat"
                />
              </div>
              <div className="space-y-2">
                <Label>Contact</Label>
                <Input
                  value={newFarmer.contact}
                  onChange={(e) => setNewFarmer({ ...newFarmer, contact: e.target.value })}
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>
              <Button onClick={handleAddFarmer} className="w-full">
                Add Farmer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Farmers ({farmers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Land Size</TableHead>
                <TableHead>Current Crop</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell className="font-medium">{farmer.name}</TableCell>
                  <TableCell>{farmer.location}</TableCell>
                  <TableCell>{farmer.landSize}</TableCell>
                  <TableCell>{farmer.crop}</TableCell>
                  <TableCell>{farmer.contact}</TableCell>
                  <TableCell>
                    <Badge variant={farmer.status === "Active" ? "default" : "secondary"}>
                      {farmer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(farmer.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerManagement;
