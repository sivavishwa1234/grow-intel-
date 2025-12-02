import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Send, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SendTasks = () => {
  const { toast } = useToast();
  const [task, setTask] = useState({
    farmer: "",
    title: "",
    description: "",
    priority: "",
    deadline: "",
  });

  const [sentTasks, setSentTasks] = useState([
    { id: 1, farmer: "John Smith", title: "Apply Fertilizer", priority: "High", deadline: "2025-02-15", status: "Pending" },
    { id: 2, farmer: "Sarah Johnson", title: "Check Irrigation System", priority: "Medium", deadline: "2025-02-20", status: "Completed" },
    { id: 3, farmer: "Mike Brown", title: "Pest Control Inspection", priority: "High", deadline: "2025-02-18", status: "In Progress" },
    { id: 4, farmer: "Emily Davis", title: "Soil Testing", priority: "Low", deadline: "2025-02-25", status: "Pending" },
  ]);

  const farmers = ["John Smith", "Sarah Johnson", "Mike Brown", "Emily Davis", "Raj Kumar"];

  const handleSendTask = () => {
    if (task.farmer && task.title && task.description && task.priority && task.deadline) {
      const newTask = {
        id: Date.now(),
        farmer: task.farmer,
        title: task.title,
        description: task.description,
        priority: task.priority as "Low" | "Medium" | "High",
        deadline: task.deadline,
        status: "Pending",
        assignedDate: new Date().toISOString().split('T')[0]
      };
      
      setSentTasks([newTask, ...sentTasks]);
      
      // Save to localStorage for farmer to receive
      const existingTasks = JSON.parse(localStorage.getItem("farmerTasks") || "[]");
      localStorage.setItem("farmerTasks", JSON.stringify([newTask, ...existingTasks]));
      
      toast({
        title: "Task Sent Successfully",
        description: `Task "${task.title}" has been sent to ${task.farmer}`,
      });

      setTask({ farmer: "", title: "", description: "", priority: "", deadline: "" });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending the task",
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "In Progress": return "secondary";
      case "Pending": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Send Tasks to Farmers</h1>
        <p className="text-muted-foreground">Assign and manage tasks for farmers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Farmer</Label>
              <Select value={task.farmer} onValueChange={(value) => setTask({ ...task, farmer: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a farmer" />
                </SelectTrigger>
                <SelectContent>
                  {farmers.map((farmer) => (
                    <SelectItem key={farmer} value={farmer}>
                      {farmer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority Level</Label>
              <Select value={task.priority} onValueChange={(value) => setTask({ ...task, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Set priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Task Title</Label>
            <Input
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Enter task title"
            />
          </div>

          <div className="space-y-2">
            <Label>Task Description</Label>
            <Textarea
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              placeholder="Describe the task in detail..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Deadline</Label>
            <div className="relative">
              <Input
                type="date"
                value={task.deadline}
                onChange={(e) => setTask({ ...task, deadline: e.target.value })}
              />
              <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <Button onClick={handleSendTask} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Task
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previously Sent Tasks ({sentTasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sentTasks.map((sentTask) => (
              <div
                key={sentTask.id}
                className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">{sentTask.title}</h3>
                    <p className="text-sm text-muted-foreground">Assigned to: {sentTask.farmer}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getPriorityColor(sentTask.priority)}>
                      {sentTask.priority}
                    </Badge>
                    <Badge variant={getStatusColor(sentTask.status)}>
                      {sentTask.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Deadline: {new Date(sentTask.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendTasks;
