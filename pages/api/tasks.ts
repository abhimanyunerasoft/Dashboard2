import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Task from "@/models/Task";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  return mongoose.connect(process.env.MONGODB_URI as string, {});
  // if (!process.env.MONGODB_URI) {
  //   throw new Error("MONGODB_URI environment variable is not defined");
  // }
  // try {
  //   return mongoose.connect(process.env.MONGODB_URI);
  // } catch (error) {
  //   console.error("Error connecting to MongoDB:", error);
  //   throw error;
  // }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      // Inside your handler for GET requests (fetch tasks)
      case "GET": {
        const { userId } = req.query; // Assuming the userId is passed in the query or headers

        if (!userId) {
          return res
            .status(400)
            .json({ success: false, message: "User ID is required" });
        }

        const tasks = await Task.find({ userId }); // Filter tasks by userId
        return res.status(200).json({ success: true, data: tasks });
      }

      // Inside your handler for POST requests (create task)
      case "POST": {
        const { title, description, dueDate, completed, userId } = req.body;

        if (!title || !description || !dueDate || !userId) {
          return res
            .status(400)
            .json({ success: false, message: "Missing required fields" });
        }

        const task = new Task({
          title,
          description,
          dueDate,
          completed,
          userId,
        });
        await task.save();
        return res.status(201).json({ success: true, data: task });
      }

      case "PUT": {
        const { id } = req.query;
        const { title, description, dueDate, completed } = req.body;

        // if (!id || !mongoose.Types.ObjectId.isValid(id as string)) {
        //   return res.status(400).json({ success: false, message: "Invalid task ID" });
        // }

        const task = await Task.findByIdAndUpdate(
          id,
          { title, description, dueDate, completed },
          { new: true }
        );

        if (!task) {
          return res
            .status(404)
            .json({ success: false, message: "Task not found" });
        }

        return res.status(200).json({ success: true, data: task });
      }

      case "DELETE": {
        const { id } = req.query;

        // if (!id || !mongoose.Types.ObjectId.isValid(id as string)) {
        //   return res.status(400).json({ success: false, message: "Invalid task ID" });
        // }

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
          return res
            .status(404)
            .json({ success: false, message: "Task not found" });
        }

        return res.status(200).json({ success: true, message: "Task deleted" });
      }

      default:
        return res
          .status(405)
          .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}
