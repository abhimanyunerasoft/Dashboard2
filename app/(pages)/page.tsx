"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

function Home() {
  // Array of images for the carousel
  const images = [
    "https://plus.unsplash.com/premium_photo-1661700152890-931fb04588e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661694429186-30b7224fe7ad?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    "https://media.istockphoto.com/id/1488294044/photo/businessman-works-on-laptop-showing-business-analytics-dashboard-with-charts-metrics-and-kpi.jpg?s=1024x1024&w=is&k=20&c=VpSNiVam6Fw3egrJYnP28mEEAXyCjFRjqV_k4PK5S04=",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [images.length]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white">

      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          filter: "blur(1px)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-6 animate-fade-in-down">
          Be Part of Something Big - Sign Up Today!
        </h1>
        <Link
          href="/signup"
          className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Become a Member
        </Link>
      </div>
    </div>
  );
}

export default Home;
