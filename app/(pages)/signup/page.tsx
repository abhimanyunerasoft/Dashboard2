"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      // Redirect to login page after successful signup
      router.push("/login");
    } else {
      alert("Signup failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg space-y-6 transform transition-all duration-500 ease-in-out hover:scale-105"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Join Us Now
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
