interface CardProps {
    title: string;
    value: string;
    isNegative?: boolean; // For negative values like loans or debit
    bgColor: string;      // Background color class
  }
  
  export const MyFinCard: React.FC<CardProps> = ({ title, value, isNegative = false, bgColor }) => {
    return (
      <div className={`p-6 rounded-lg shadow-xl ${bgColor}`}>
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className={`text-2xl font-semibold ${isNegative ? 'text-red-500' : 'text-gray-900'}`}>
          {value}
        </p>
        <p className="mt-2 underline text-blue-600 cursor-pointer hover:text-blue-800">
          View in details
        </p>
      </div>
    );
  };
  