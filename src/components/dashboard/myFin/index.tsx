import { MyFinCard } from "./MyFinCard";

export const MyFinContent: React.FC = () => {
    return (
        <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Fin Overview</h2>
        
        {/* MyFinCards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* MyFinCards with subtle background colors */}
          <MyFinCard 
            title="Total Funds" 
            value="Rs 50,000" 
            bgColor="bg-gradient-to-r from-green-100 via-green-200 to-green-300" 
          />
          <MyFinCard 
            title="Total Recurring Investments (Monthly)" 
            value="2" 
            bgColor="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300" 
          />
          <MyFinCard 
            title="Total EMIs" 
            value="3" 
            isNegative 
            bgColor="bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300" 
          />
          <MyFinCard 
            title="Total Loans" 
            value="2" 
            isNegative 
            bgColor="bg-gradient-to-r from-red-100 via-red-200 to-red-300" 
          />
          <MyFinCard 
            title="Upcoming Payments (Debit)" 
            value="Rs 400" 
            isNegative 
            bgColor="bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300" 
          />
          <MyFinCard 
            title="Upcoming Payments (Credit)" 
            value="Rs 300" 
            bgColor="bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300" 
          />
        </div>
      </div>
    );
  };
  