import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save, Calendar, Sprout } from "lucide-react";
import { toast } from "sonner";

interface DayTask {
  day: number;
  phase: string;
  task: string;
}

const CropTemplateCreator = () => {
  const [cropName, setCropName] = useState("");
  const [cropDescription, setCropDescription] = useState("");
  const [totalDays, setTotalDays] = useState(100);
  const [cropType, setCropType] = useState("");
  const [tasks, setTasks] = useState<DayTask[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentPhase, setCurrentPhase] = useState("");
  const [currentTask, setCurrentTask] = useState("");

  const phases = [
    "Land Preparation",
    "Sowing",
    "Early Growth",
    "Vegetative Stage",
    "Flowering",
    "Grain Filling",
    "Maturation & Harvest",
  ];

  const handleAddTask = () => {
    if (!currentPhase || !currentTask) {
      toast.error("Please fill in phase and task details");
      return;
    }

    if (currentDay > totalDays) {
      toast.error(`Day cannot exceed total cultivation days (${totalDays})`);
      return;
    }

    const newTask: DayTask = {
      day: currentDay,
      phase: currentPhase,
      task: currentTask,
    };

    setTasks([...tasks, newTask].sort((a, b) => a.day - b.day));
    setCurrentDay(currentDay + 1);
    setCurrentTask("");
    toast.success(`Task added for Day ${currentDay}`);
  };

  const handleRemoveTask = (day: number) => {
    setTasks(tasks.filter((t) => t.day !== day));
    toast.success(`Task for Day ${day} removed`);
  };

  const handleSaveTemplate = () => {
    if (!cropName || !cropDescription || tasks.length === 0) {
      toast.error("Please fill in all crop details and add at least one task");
      return;
    }

    const template = {
      id: cropName.toLowerCase().replace(/\s+/g, "-"),
      name: cropName,
      description: cropDescription,
      type: cropType,
      days: totalDays,
      tasks: tasks,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingTemplates = JSON.parse(localStorage.getItem("cropTemplates") || "[]");
    existingTemplates.push(template);
    localStorage.setItem("cropTemplates", JSON.stringify(existingTemplates));

    toast.success(`Crop template "${cropName}" saved successfully!`);
    
    // Reset form
    setCropName("");
    setCropDescription("");
    setTotalDays(100);
    setCropType("");
    setTasks([]);
    setCurrentDay(1);
    setCurrentPhase("");
    setCurrentTask("");
  };

  const handleAutoGenerateTasks = () => {
    if (!totalDays || totalDays < 1) {
      toast.error("Please set total cultivation days first");
      return;
    }

    const autoTasks: DayTask[] = [];
    const phaseDistribution = [
      { phase: "Land Preparation", percentage: 0.1, tasks: ["Plow the field", "Level the soil", "Add fertilizer"] },
      { phase: "Sowing", percentage: 0.1, tasks: ["Prepare seeds", "Sow seeds", "Water field"] },
      { phase: "Early Growth", percentage: 0.2, tasks: ["Monitor germination", "Light irrigation", "Weed control"] },
      { phase: "Vegetative Stage", percentage: 0.25, tasks: ["Regular irrigation", "Apply fertilizer", "Pest control"] },
      { phase: "Flowering", percentage: 0.15, tasks: ["Controlled irrigation", "Monitor flowering", "Pollination check"] },
      { phase: "Grain Filling", percentage: 0.1, tasks: ["Maintain moisture", "Monitor development", "Disease prevention"] },
      { phase: "Maturation & Harvest", percentage: 0.1, tasks: ["Reduce irrigation", "Check maturity", "Harvest crop"] },
    ];

    let currentDayNum = 1;
    phaseDistribution.forEach((phase) => {
      const phaseDays = Math.ceil(totalDays * phase.percentage);
      const endDay = Math.min(currentDayNum + phaseDays - 1, totalDays);

      for (let day = currentDayNum; day <= endDay; day++) {
        const taskIndex = Math.floor(((day - currentDayNum) / phaseDays) * phase.tasks.length);
        autoTasks.push({
          day,
          phase: phase.phase,
          task: phase.tasks[Math.min(taskIndex, phase.tasks.length - 1)],
        });
      }
      currentDayNum = endDay + 1;
    });

    setTasks(autoTasks);
    toast.success(`Auto-generated ${autoTasks.length} tasks for ${totalDays} days`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Sprout className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Crop Template Creator</h1>
            <p className="text-muted-foreground">Create detailed crop cultivation guides for farmers</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Crop Details & Task Input */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Crop Information</CardTitle>
                <CardDescription>Basic details about the crop</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cropName">Crop Name *</Label>
                  <Input
                    id="cropName"
                    placeholder="e.g., Finger Millet (Ragi)"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropType">Crop Type</Label>
                  <Input
                    id="cropType"
                    placeholder="e.g., Millet, Cereal, Pulse"
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalDays">Total Cultivation Days *</Label>
                  <Input
                    id="totalDays"
                    type="number"
                    min="1"
                    max="365"
                    value={totalDays}
                    onChange={(e) => setTotalDays(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the crop, ideal conditions, soil type, etc."
                    value={cropDescription}
                    onChange={(e) => setCropDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Daily Task</CardTitle>
                <CardDescription>Create tasks for each day of cultivation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="day">Day Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="day"
                      type="number"
                      min="1"
                      max={totalDays}
                      value={currentDay}
                      onChange={(e) => setCurrentDay(Number(e.target.value))}
                    />
                    <Button
                      variant="outline"
                      onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                    >
                      -
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentDay(Math.min(totalDays, currentDay + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phase">Growth Phase *</Label>
                  <Select value={currentPhase} onValueChange={setCurrentPhase}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      {phases.map((phase) => (
                        <SelectItem key={phase} value={phase}>
                          {phase}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task">Task Description *</Label>
                  <Textarea
                    id="task"
                    placeholder="Describe the task to be done on this day"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddTask} className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                  <Button onClick={handleAutoGenerateTasks} variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Auto Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSaveTemplate} className="w-full" size="lg">
              <Save className="h-5 w-5 mr-2" />
              Save Crop Template
            </Button>
          </div>

          {/* Right: Task Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Schedule ({tasks.length} tasks)</CardTitle>
                <CardDescription>
                  {cropName || "Untitled Crop"} - {totalDays} days cultivation plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-[600px] overflow-y-auto space-y-2">
                  {tasks.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No tasks added yet. Add tasks or use auto-generate.</p>
                    </div>
                  ) : (
                    tasks.map((task) => (
                      <Card key={task.day} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-primary">Day {task.day}</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                  {task.phase}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{task.task}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTask(task.day)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {tasks.length > 0 && (
              <Card className="bg-primary/5">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Template Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Days</p>
                      <p className="font-bold">{totalDays}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tasks Added</p>
                      <p className="font-bold">{tasks.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Coverage</p>
                      <p className="font-bold">
                        {((tasks.length / totalDays) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phases</p>
                      <p className="font-bold">
                        {new Set(tasks.map((t) => t.phase)).size}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropTemplateCreator;
