interface CardProps {
  title: string;
  value: string;
  isNegative?: boolean; // For negative values like loans or debit
  bgColor: string; // Background color class
}

export const MyFinCard: React.FC<CardProps> = ({
  title,
  value,
  isNegative = false,
  bgColor,
}) => {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform ${bgColor} relative`}
    >
      {/* Glowing Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 opacity-20 blur-lg"></div>

      {/* Card Content */}
      <div className="relative z-10">
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
          {title}
        </h3>

        {/* Value */}
        <p
          className={`text-2xl font-extrabold ${
            isNegative
              ? "text-red-800 text-shadow-red"
              : "text-green-800 text-shadow-green"
          }`}
        >
          {value}
        </p>

        {/* View Details */}
        <p className="mt-4 text-blue-400 text-sm underline cursor-pointer hover:text-cyan-400 hover:scale-110 transition-transform">
          View in details
        </p>
      </div>
    </div>
  );
};