"use client";

import { useRouter } from "next/navigation";

interface TrackCardProps {
  title: string;
  recentActivity: string;
  bgColor: string;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  title,
  recentActivity,
  bgColor,
}) => {
  const router = useRouter();

  return (
    <div
      className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform relative overflow-hidden cursor-pointer ${bgColor}`}
      onClick={() => {
        router.push(`/dashboard/track?type=${title.toLowerCase()}`);
      }}
    >
      {/* Glowing Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 opacity-30 blur-lg"></div>

      {/* Card Content */}
      <div className="relative z-10">
        {/* Title */}
        <h3 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          {title}
        </h3>

        {/* Recent Activity Label */}
        <p className="text-sm text-gray-300 uppercase tracking-wide mb-2">
          Most Recent Activity
        </p>

        {/* Recent Activity */}
        <p className="text-gray-200 text-base font-light">{recentActivity}</p>
      </div>
    </div>
  );
};