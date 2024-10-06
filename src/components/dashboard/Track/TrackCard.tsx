interface TrackCardProps {
    title: string;
    recentActivity: string; // Recent activity in the form of Date/Time
    bgColor: string;        // Background color for each card
  }
  
  export const TrackCard: React.FC<TrackCardProps> = ({ title, recentActivity, bgColor }) => {
    return (
      <div className={`p-6 rounded-lg shadow-xl ${bgColor}`}>
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-700 mb-2">Most Recent Activity</p>
        <p className="text-gray-500 text-sm">{recentActivity}</p>
      </div>
    );
  };