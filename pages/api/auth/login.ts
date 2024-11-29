import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await connectDB();

    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches (simple string comparison)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // On successful login, store user data in sessionStorage
    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
 