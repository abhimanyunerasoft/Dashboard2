"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define Task type for type-checking
interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [newTask, setNewTask] = useState<Task>({ _id: "", title: "", description: "", dueDate: "", completed: false });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<string>("");

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem("user");
      if (userId) {
        const response = await fetch(`/api/tasks?userId=${userId}`);
        const data = await response.json();
        setTasks(data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const resetForm = () => {
    setNewTask({ _id: "", title: "", description: "", dueDate: "", completed: false });
    setIsEditing(false);
    setEditingTaskId("");
  };

  const handleAddOrEditTask = async () => {
    const userId = localStorage.getItem("user");
    if (!userId) return;
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/tasks/${editingTaskId}` : "/api/tasks";
    const body = JSON.stringify({
      ...newTask,
      userId: userId,
    });

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      const result = await response.json();
      if (result.success) {
        resetForm();
        fetchTasks();
        toast.success(isEditing ? "Task updated successfully!" : "Task created successfully!");
      } else {
        toast.error("Failed to save task!");
      }
    } catch (error) {
      toast.error("Error occurred while saving task.");
      console.error(error);
    }
  };

  const handleMarkComplete = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks?id=${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });

      const updatedTask = await response.json();
      if (updatedTask.success) {
        setTasks(prevTasks => prevTasks.map(task =>
          task._id === taskId ? { ...task, completed: true } : task
        ));
        toast.success("Task marked as complete!");
      } else {
        toast.error("Failed to mark task as complete.");
      }
    } catch (error) {
      toast.error("Error occurred while marking task complete.");
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks?id=${taskId}`, { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        fetchTasks();
        toast.error("Task deleted successfully!");
      } else {
        toast.error("Failed to delete task.");
      }
    } catch (error) {
      toast.error("Error occurred while deleting task.");
      console.error(error);
    }
  };

  const handleEditTask = (task: Task) => {
    setIsEditing(true);
    setEditingTaskId(task._id);
    setNewTask(task);
  };

  const renderTaskItem = (task: Task) => (
    <div key={task._id} className={`p-4 rounded shadow-sm flex flex-col justify-between items-start transition-transform transform hover:scale-105 ${task.completed ? "bg-green-200" : "bg-gray-50"}`}>
      <div>
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
      </div>
      <div className="flex space-x-2 mt-2 w-full justify-between">
        {!task.completed && (
          <button
            onClick={() => handleMarkComplete(task._id)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
          >
            Mark as Complete
          </button>
        )}
        <button
          onClick={() => handleEditTask(task)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteTask(task._id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <header className="bg-blue-800 text-white p-4 text-lg font-semibold flex justify-between items-center">
        <div className="flex-grow text-center">
          <a
            href="/profile"
            className="px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 text-xl font-semibold transition-all"
          >
            Go to Profile
          </a>
        </div>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        <div
          className="bg-white shadow rounded p-4"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1678846851728-f7a8f94702e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">Tasks</h2>
          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map(renderTaskItem)}
            </div>
          ) : (
            <p className="text-white">No tasks available. Add a new task!</p>
          )}
        </div>

        <div className="bg-red shadow rounded p-4 mt-6 ">
          <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Task" : "Add New Task"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded"
              />
            </div>
            <button
              onClick={handleAddOrEditTask}
              className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-all"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
