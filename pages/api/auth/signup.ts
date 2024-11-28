import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await connectDB();

    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
    });

    try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
