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
      className={`p-6 rounded-lg shadow-xl ${bgColor} cursor-pointer`}
      onClick={() => {
        router.push(`/dashboard/track?type=${title.toLowerCase()}`);
      }}
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-sm text-gray-700 mb-2">Most Recent Activity</p>
      <p className="text-gray-500 text-sm">{recentActivity}</p>
    </div>
  );
};
