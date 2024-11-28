"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      // Store user details in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to profile page after successful login
      router.push("/profile");
    } else {
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md space-y-6 transform transition-all duration-500 ease-in-out hover:scale-105"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
