import { TrackCard } from "./TrackCard";

export const TrackContent: React.FC = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Track Overview</h2>
  
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TrackCard
            title="Spends"
            recentActivity="2024-10-06 12:30 PM"
            bgColor="bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300"
          />
          <TrackCard
            title="EMIs"
            recentActivity="2024-10-05 03:45 PM"
            bgColor="bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300"
          />
          <TrackCard
            title="Investments"
            recentActivity="2024-10-04 01:15 PM"
            bgColor="bg-gradient-to-r from-green-100 via-green-200 to-green-300"
          />
          <TrackCard
            title="Loans"
            recentActivity="2024-10-06 11:00 AM"
            bgColor="bg-gradient-to-r from-red-100 via-red-200 to-red-300"
          />
          <TrackCard
            title="Credits"
            recentActivity="2024-10-06 09:30 AM"
            bgColor="bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300"
          />
          <TrackCard
            title="Debits"
            recentActivity="2024-10-06 08:00 AM"
            bgColor="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300"
          />
          <TrackCard
            title="Transactions"
            recentActivity="2024-10-06 10:45 AM"
            bgColor="bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300"
          />
        </div>
      </div>
    );
  };