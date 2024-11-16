import { TrackCard } from "./TrackCard";

export const TrackContent: React.FC = () => {
  return (
    <div className="p-6 rounded-xl">
      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-8 text-glow">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Track Overview
        </span>
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <TrackCard
          title="Spends"
          recentActivity="2024-10-06 12:30 PM"
          bgColor="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700"
        />
        <TrackCard
          title="EMIs"
          recentActivity="2024-10-05 03:45 PM"
          bgColor="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
        />
        <TrackCard
          title="Investments"
          recentActivity="2024-10-04 01:15 PM"
          bgColor="bg-gradient-to-r from-green-500 via-green-600 to-green-700"
        />
        <TrackCard
          title="Loans"
          recentActivity="2024-10-06 11:00 AM"
          bgColor="bg-gradient-to-r from-red-500 via-red-600 to-red-700"
        />
        <TrackCard
          title="Credits"
          recentActivity="2024-10-06 09:30 AM"
          bgColor="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700"
        />
        <TrackCard
          title="Debits"
          recentActivity="2024-10-06 08:00 AM"
          bgColor="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
        />
        <TrackCard
          title="Transactions"
          recentActivity="2024-10-06 10:45 AM"
          bgColor="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700"
        />
      </div>
    </div>
  );
};