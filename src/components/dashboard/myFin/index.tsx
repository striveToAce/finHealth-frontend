import { MyFinCard } from "./MyFinCard";

export const MyFinContent: React.FC = () => {
  return (
    <div className="p-6 rounded-xl">
      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-8 text-glow">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          My Fin Overview
        </span>
      </h2>

      {/* MyFinCards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* MyFinCards with neon-inspired backgrounds */}
        <MyFinCard
          title="Total Funds"
          value="Rs 50,000"
          bgColor="bg-gradient-to-r from-green-300 via-green-400 to-green-500"
        />
        <MyFinCard
          title="Total Recurring Investments (Monthly)"
          value="2"
          bgColor="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500"
        />
        <MyFinCard
          title="Total EMIs"
          value="3"
          isNegative
          bgColor="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500"
        />
        <MyFinCard
          title="Total Loans"
          value="2"
          isNegative
          bgColor="bg-gradient-to-r from-red-300 via-red-400 to-red-500"
        />
        <MyFinCard
          title="Upcoming Payments (Debit)"
          value="Rs 400"
          isNegative
          bgColor="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
        />
        <MyFinCard
          title="Upcoming Payments (Credit)"
          value="Rs 300"
          bgColor="bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500"
        />
      </div>
    </div>
  );
};