"use client";
import React from "react";
import PrimaryTab from "./PrimaryTab";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-black to-blue-900 flex flex-col items-center p-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-glow mb-8">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          Dashboard
        </span>
      </h1>

      {/* PrimaryTab */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 rounded-lg shadow-lg">
        <PrimaryTab />
      </div>
    </div>
  );
};

export default Dashboard;