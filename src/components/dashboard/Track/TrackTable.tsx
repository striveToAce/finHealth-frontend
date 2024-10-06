interface TrackTableRowProps {
    label: string;
    description: string;
    type: 'debit' | 'credit';
    amount: number;
    date: string;
    isPaid: boolean;
  }
  
  interface TrackTableProps {
    heading: string;
    rows: TrackTableRowProps[];
  }
  
  const TrackTable: React.FC<TrackTableProps> = ({ heading, rows }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-xl w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{heading}</h2>
  
        <div className="hidden md:block">
          {/* Desktop / Tablet View */}
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="p-4">Label</th>
                <th className="p-4">Description</th>
                <th className="p-4">Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="p-4">{row.label}</td>
                  <td className="p-4">{row.description}</td>
                  <td className="p-4 capitalize">{row.type}</td>
                  <td className={`p-4 font-semibold ${row.type === 'debit' ? 'text-red-500' : 'text-green-500'}`}>
                    {row.type === 'debit' ? `- Rs ${row.amount}` : `+ Rs ${row.amount}`}
                  </td>
                  <td className="p-4">{row.date}</td>
                  <td className="p-4">
                    {row.isPaid ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <button className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Mobile View */}
        <div className="md:hidden">
          {rows.map((row, index) => (
            <div key={index} className="border-b border-gray-100 mb-4">
              <div className="p-4">
                <div className="mb-2">
                  <span className="block font-semibold">Label:</span>
                  <span>{row.label}</span>
                </div>
                <div className="mb-2">
                  <span className="block font-semibold">Description:</span>
                  <span>{row.description}</span>
                </div>
                <div className="mb-2">
                  <span className="block font-semibold">Type:</span>
                  <span className="capitalize">{row.type}</span>
                </div>
                <div className="mb-2">
                  <span className="block font-semibold">Amount:</span>
                  <span className={`font-semibold ${row.type === 'debit' ? 'text-red-500' : 'text-green-500'}`}>
                    {row.type === 'debit' ? `- Rs ${row.amount}` : `+ Rs ${row.amount}`}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="block font-semibold">Date:</span>
                  <span>{row.date}</span>
                </div>
                <div>
                  <span className="block font-semibold">Status:</span>
                  {row.isPaid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <button className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TrackTable;
  