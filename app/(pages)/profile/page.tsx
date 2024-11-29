"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the user is logged in by checking localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex flex-col text-gray-800">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
        <div className="flex justify-between items-center container mx-auto text-white">
          <div className="text-2xl font-extrabold">Nerasoft</div>
          <div className="space-x-6 text-lg">
            <Link href="/dashboard" className="hover:text-yellow-300 transition-colors duration-300">
              Dashboard
            </Link>
            <Link href="/" className="hover:text-yellow-300 transition-colors duration-300">
              Home
            </Link>
            <Link href="/about" className="hover:text-yellow-300 transition-colors duration-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-yellow-300 transition-colors duration-300">
              Contact
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition-colors duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center pt-24 px-4 text-center">
        <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-lg shadow-xl w-full max-w-lg">
          <h1 className="text-3xl font-bold text-purple-700 mb-6">
            Welcome to Your Profile
          </h1>
          <p className="text-gray-700">
            Use the navigation above to explore the site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
