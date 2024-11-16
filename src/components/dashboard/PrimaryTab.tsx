"use client";
import React, { useState } from "react";
import { MyFinContent } from "./myFin";
import { TrackContent } from "./Track";

const PrimaryTab: React.FC = () => {
  type tabType = "myFin" | "track" | "threads";
  interface ITab {
    label: string;
    value: tabType;
  }
  const [activeTab, setActiveTab] = useState<tabType>("myFin");

  const tabs: ITab[] = [
    { label: "My Fin", value: "myFin" },
    { label: "Track", value: "track" },
    { label: "Threads", value: "threads" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "myFin":
        return <MyFinContent />;
      case "track":
        return <TrackContent />;
      case "threads":
        return <ThreadsContent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Tab Menu */}
      <div className="flex space-x-4 mb-8">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(tab.value)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeTab === tab.value
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-glow"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border-none shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
};

const ThreadsContent: React.FC = () => (
  <div>
    <h2 className="text-2xl font-extrabold mb-4 text-glow">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
        Threads
      </span>
    </h2>
    <p className="text-gray-300">
      Engage in financial discussions with other users. Share tips, ask
      questions, and participate in community threads.
    </p>
  </div>
);

export default PrimaryTab;