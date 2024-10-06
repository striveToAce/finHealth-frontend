"use client";
import React, { useState } from "react";

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
  // Function to render content based on active tab
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
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-purple-100 to-blue-100 flex flex-col items-center p-6">
     
      {/* Tab Menu */}
      <div className="flex space-x-4 mb-8">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(tab.value)}
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
              activeTab === tab.value
                ? "bg-gradient-to-r from-teal-400 to-blue-400 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            My Fin
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
};

const MyFinContent: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Fin</h2>
    <p className="text-gray-600">
      This is your personal finance overview section where you can manage your
      financial goals, funds, and spending.
    </p>
  </div>
);

const TrackContent: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Track</h2>
    <p className="text-gray-600">
      Track your expenses, monitor savings progress, and get detailed insights
      into your financial health.
    </p>
  </div>
);

const ThreadsContent: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Threads</h2>
    <p className="text-gray-600">
      Engage in financial discussions with other users. Share tips, ask
      questions, and participate in community threads.
    </p>
  </div>
);

export default PrimaryTab;
