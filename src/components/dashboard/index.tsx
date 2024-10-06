'use client'
import React, { useState } from 'react';
import PrimaryTab from './PrimaryTab';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-purple-100 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <PrimaryTab/>
    </div>
  );
};
export default Dashboard;
