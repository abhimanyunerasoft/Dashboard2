"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Check if user is logged in by fetching from sessionStorage
  useEffect(() => {
    const userData = sessionStorage.getItem("user");

    if (!userData) {
      router.push("/login"); // Redirect to login if no user is logged in
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data from sessionStorage
    sessionStorage.removeItem("user");
    
    // Redirect to login page after logout
    router.push("/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-800 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg transform transition-all duration-500 ease-in-out hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">
          Welcome, {user.name}
        </h1>

        <div className="space-y-4">
          <p className="text-xl font-medium text-gray-600">Name: <span className="text-gray-800 font-bold">{user.name}</span></p>
          <p className="text-xl font-medium text-gray-600">Email: <span className="text-gray-800 font-bold">{user.email}</span></p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
              Go to Dashboard
            </button>
          </Link>
        </div>

        {/* Logout button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
