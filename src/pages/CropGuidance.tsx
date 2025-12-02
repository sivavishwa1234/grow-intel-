import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sprout, ArrowLeft, CheckCircle, XCircle, Clock, Wheat, Leaf, Plus } from "lucide-react";
import { toast } from "sonner";

// Import crop images
import fingerMilletImg from "@/assets/crops/finger-millet.jpg";
import pearlMilletImg from "@/assets/crops/pearl-millet.jpg";
import foxtailMilletImg from "@/assets/crops/foxtail-millet.jpg";
import kodoMilletImg from "@/assets/crops/kodo-millet.jpg";
import sorghumImg from "@/assets/crops/sorghum.jpg";
import sesameImg from "@/assets/crops/sesame.jpg";
import sunflowerImg from "@/assets/crops/sunflower.jpg";
import safflowerImg from "@/assets/crops/safflower.jpg";
import groundnutImg from "@/assets/crops/groundnut.jpg";
import horseGramImg from "@/assets/crops/horse-gram.jpg";
import greenGramImg from "@/assets/crops/green-gram.jpg";
import blackGramImg from "@/assets/crops/black-gram.jpg";
import pigeonPeaImg from "@/assets/crops/pigeon-pea.jpg";
import amaranthImg from "@/assets/crops/amaranth.jpg";
import buckwheatImg from "@/assets/crops/buckwheat.jpg";
import moringaImg from "@/assets/crops/moringa.jpg";
import okraImg from "@/assets/crops/okra.jpg";
import clusterBeanImg from "@/assets/crops/cluster-bean.jpg";
import heritageRiceImg from "@/assets/crops/heritage-rice.jpg";
import kharchiaWheatImg from "@/assets/crops/kharchia-wheat.jpg";

type CropType = "finger-millet" | "pearl-millet" | "foxtail-millet" | "kodo-millet" | "sorghum" | "sesame" | "sunflower" | "safflower" | "groundnut" | "horse-gram" | "green-gram" | "black-gram" | "pigeon-pea" | "amaranth" | "buckwheat" | "moringa" | "okra" | "cluster-bean" | "heritage-rice" | "kharchia-wheat" | null;

const CropGuidance = () => {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState<CropType>(null);
  const [taskStatuses, setTaskStatuses] = useState<Record<number, "completed" | "not-completed" | "in-progress">>({});

  const handleAddToMyCrops = (cropName: string) => {
    const existingCrops = JSON.parse(localStorage.getItem("myCrops") || "[]");
    const newCrop = {
      id: Date.now(),
      name: cropName,
      datePlanted: new Date().toISOString().split('T')[0],
      growthStage: "Planning",
      healthStatus: "Good",
      expectedYield: "TBD"
    };
    localStorage.setItem("myCrops", JSON.stringify([...existingCrops, newCrop]));
    toast.success(`${cropName} added to My Crops for tracking!`);
  };

  const cropOptions = [
    { id: "finger-millet", name: "Finger Millet (Ragi)", icon: Wheat, days: 100, color: "text-amber-600", image: fingerMilletImg, description: "Nutritious, drought resilient" },
    { id: "pearl-millet", name: "Pearl Millet (Bajra)", icon: Wheat, days: 90, color: "text-yellow-700", image: pearlMilletImg, description: "Semi-arid zones, less water" },
    { id: "foxtail-millet", name: "Foxtail Millet", icon: Wheat, days: 85, color: "text-amber-500", image: foxtailMilletImg, description: "Short duration, water-efficient" },
    { id: "kodo-millet", name: "Kodo Millet", icon: Wheat, days: 110, color: "text-amber-700", image: kodoMilletImg, description: "Marginal lands, niche potential" },
    { id: "sorghum", name: "Sorghum (Jowar)", icon: Wheat, days: 100, color: "text-orange-700", image: sorghumImg, description: "Dryland farming versatile" },
    { id: "sesame", name: "Sesame (Til)", icon: Leaf, days: 85, color: "text-green-700", image: sesameImg, description: "Oilseed, drought tolerant" },
    { id: "sunflower", name: "Sunflower", icon: Leaf, days: 90, color: "text-yellow-600", image: sunflowerImg, description: "Oilseed, moderate water" },
    { id: "safflower", name: "Safflower", icon: Leaf, days: 120, color: "text-orange-600", image: safflowerImg, description: "Oilseed, niche market" },
    { id: "groundnut", name: "Groundnut (Peanut)", icon: Leaf, days: 100, color: "text-orange-800", image: groundnutImg, description: "Under-exploited potential" },
    { id: "horse-gram", name: "Horse Gram", icon: Leaf, days: 100, color: "text-amber-800", image: horseGramImg, description: "Hardy pulse, marginal lands" },
    { id: "green-gram", name: "Green Gram (Moong)", icon: Leaf, days: 65, color: "text-green-600", image: greenGramImg, description: "Short duration, rotation" },
    { id: "black-gram", name: "Black Gram (Urad)", icon: Leaf, days: 90, color: "text-gray-800", image: blackGramImg, description: "Pulse with demand" },
    { id: "pigeon-pea", name: "Pigeon Pea (Red Gram)", icon: Leaf, days: 135, color: "text-yellow-800", image: pigeonPeaImg, description: "Rotational, market potential" },
    { id: "amaranth", name: "Amaranth", icon: Leaf, days: 90, color: "text-red-600", image: amaranthImg, description: "Dual purpose grain/leaf" },
    { id: "buckwheat", name: "Buckwheat", icon: Wheat, days: 80, color: "text-green-800", image: buckwheatImg, description: "Alternative cereal, health food" },
    { id: "moringa", name: "Moringa (Drumstick)", icon: Leaf, days: 270, color: "text-green-700", image: moringaImg, description: "Tree crop, nutrient-rich" },
    { id: "okra", name: "Okra (Lady's Finger)", icon: Leaf, days: 45, color: "text-green-600", image: okraImg, description: "Quick vegetable turnover" },
    { id: "cluster-bean", name: "Cluster Bean (Guar)", icon: Leaf, days: 65, color: "text-green-700", image: clusterBeanImg, description: "Drought tolerant, industrial uses" },
    { id: "heritage-rice", name: "Heritage Rice Varieties", icon: Wheat, days: 130, color: "text-yellow-700", image: heritageRiceImg, description: "Premium niche market" },
    { id: "kharchia-wheat", name: "Kharchia Wheat", icon: Wheat, days: 115, color: "text-amber-600", image: kharchiaWheatImg, description: "Salt tolerant, saline soils" },
  ];

  // Generate tasks based on crop's cultivation period
  const generateTasks = (totalDays: number) => {
    const phases = [
      {
        name: "Land Preparation",
        percentage: 0.1,
        tasks: ["Plow the field", "Level the soil", "Add organic fertilizer", "Prepare seed bed"],
      },
      {
        name: "Sowing",
        percentage: 0.1,
        tasks: ["Select quality seeds", "Treat seeds", "Sow seeds at proper depth", "Ensure proper spacing"],
      },
      {
        name: "Early Growth",
        percentage: 0.2,
        tasks: ["Monitor germination", "Light irrigation", "Weed control", "Check for pests"],
      },
      {
        name: "Vegetative Stage",
        percentage: 0.25,
        tasks: [
          "Regular irrigation",
          "Apply nitrogen fertilizer",
          "Monitor plant health",
          "Disease prevention",
        ],
      },
      {
        name: "Flowering",
        percentage: 0.15,
        tasks: ["Controlled irrigation", "Pest monitoring", "Apply phosphorus", "Check pollination"],
      },
      {
        name: "Grain Filling",
        percentage: 0.1,
        tasks: ["Maintain moisture", "Monitor grain development", "Prevent lodging", "Watch for diseases"],
      },
      {
        name: "Maturation & Harvest",
        percentage: 0.1,
        tasks: ["Reduce irrigation", "Monitor grain color", "Harvest at right moisture", "Post-harvest handling"],
      },
    ];

    const allTasks = [];
    let currentDay = 1;

    for (const phase of phases) {
      const phaseDays = Math.ceil(totalDays * phase.percentage);
      const endDay = Math.min(currentDay + phaseDays - 1, totalDays);

      for (let day = currentDay; day <= endDay; day++) {
        const taskIndex = Math.floor(((day - currentDay) / phaseDays) * phase.tasks.length);
        allTasks.push({
          day,
          phase: phase.name,
          task: phase.tasks[Math.min(taskIndex, phase.tasks.length - 1)],
        });
      }
      currentDay = endDay + 1;
      if (currentDay > totalDays) break;
    }
    return allTasks;
  };

  const currentCrop = cropOptions.find(c => c.id === selectedCrop);
  const tasks = selectedCrop && currentCrop ? generateTasks(currentCrop.days) : [];

  const handleStatusChange = (day: number, status: "completed" | "not-completed" | "in-progress") => {
    setTaskStatuses((prev) => ({ ...prev, [day]: status }));
    const messages = {
      completed: "Task marked as completed!",
      "not-completed": "Task marked as not completed",
      "in-progress": "Task marked as in progress",
    };
    toast.success(messages[status]);
  };

  const getStatusIcon = (day: number) => {
    const status = taskStatuses[day];
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case "not-completed":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-secondary" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (day: number) => {
    const status = taskStatuses[day];
    switch (status) {
      case "completed":
        return "default";
      case "not-completed":
        return "destructive";
      case "in-progress":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Show crop selection if no crop is selected
  if (!selectedCrop) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">GrowIntel</span>
            </div>
            <Button variant="outline" onClick={() => navigate("/farmer-dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Select Your Crop</h1>
            <p className="text-muted-foreground">Choose a crop to view its cultivation guide</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cropOptions.map((crop) => (
              <Card 
                key={crop.id} 
                className="cursor-pointer hover:shadow-glow transition-all overflow-hidden"
                onClick={() => {
                  setSelectedCrop(crop.id as CropType);
                  toast.success(`${crop.name} cultivation guide selected`);
                }}
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={crop.image} 
                    alt={crop.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <crop.icon className={`h-5 w-5 ${crop.color}`} />
                    <span className="line-clamp-1">{crop.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground line-clamp-2">{crop.description}</p>
                  <p className="text-sm font-semibold text-primary">{crop.days} days</p>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline" size="sm">
                      View Guide
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default"
                      className="gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToMyCrops(crop.name);
                      }}
                    >
                      <Plus className="h-3 w-3" />
                      Track
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
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
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedCrop(null)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Change Crop
            </Button>
            <Button variant="outline" onClick={() => navigate("/farmer-dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{currentCrop.name} Cultivation Guide</h1>
          <p className="text-muted-foreground">{currentCrop.days}-day complete cultivation checklist</p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">
                    {Object.values(taskStatuses).filter((s) => s === "completed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">
                    {Object.values(taskStatuses).filter((s) => s === "in-progress").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-2xl font-bold">{currentCrop.days - Object.keys(taskStatuses).length}</p>
                </div>
                <Sprout className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <Dialog key={task.day}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">Day {task.day}</span>
                      {getStatusIcon(task.day)}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {task.phase}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{task.task}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Day {task.day} - {task.phase}</DialogTitle>
                  <DialogDescription>Cultivation task details and status management</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Task Description</h3>
                    <p className="text-muted-foreground">{task.task}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Detailed Steps</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Prepare necessary tools and materials</li>
                      <li>Check weather conditions before starting</li>
                      <li>Follow recommended techniques for this phase</li>
                      <li>Document observations and any issues</li>
                      <li>Update task status upon completion</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Update Status</h3>
                    <div className="flex gap-2">
                      <Button
                        variant={taskStatuses[task.day] === "completed" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => handleStatusChange(task.day, "completed")}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                      <Button
                        variant={taskStatuses[task.day] === "in-progress" ? "secondary" : "outline"}
                        className="flex-1"
                        onClick={() => handleStatusChange(task.day, "in-progress")}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        In Progress
                      </Button>
                      <Button
                        variant={taskStatuses[task.day] === "not-completed" ? "destructive" : "outline"}
                        className="flex-1"
                        onClick={() => handleStatusChange(task.day, "not-completed")}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Not Done
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CropGuidance;
