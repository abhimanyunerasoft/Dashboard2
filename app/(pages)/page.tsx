"use client";

import Link from "next/link";
import React from "react";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white">  
      <h1 className="text-4xl font-bold mb-6 animate-fade-in-down">Be Part of Something Big - Sign Up Today! </h1>
      <Link
        href="/signup"
        className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
      >
        Become a Member
      </Link>

    </div>

    
    </>
  );  
}

export default Home;









   
     
 


