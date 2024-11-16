"use client";

import React, { useState, useEffect } from "react";

interface FilterProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: ITransactionFilterPayload) => void;
}

const TransactionFilterComponent: React.FC<FilterProps> = ({
  onSearch,
  onFilterChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<
    "COMPLETED" | "PENDING" | "FAILED" | undefined
  >();
  const [sortBy, setSortBy] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Debounce effect for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleApplyFilters = () => {
    onFilterChange({
      search: debouncedSearchTerm,
      startDate,
      endDate,
      status,
      sortBy,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white rounded-lg shadow-lg">
      {/* Toggle Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold text-glow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Filter Transactions
          </span>
        </h2>
        <button
          className={`px-6 py-2 rounded-lg ${
            isFiltersOpen
              ? "bg-gradient-to-r from-red-500 to-red-600"
              : "bg-gradient-to-r from-cyan-500 to-blue-500"
          } text-white font-semibold hover:scale-105 transition-transform`}
          onClick={() => setIsFiltersOpen((prev) => !prev)}
        >
          {isFiltersOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filters Section */}
      {isFiltersOpen && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search by title or description"
              className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Start Date */}
            <div>
              <label className="block mb-1 text-gray-400">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block mb-1 text-gray-400">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 text-gray-400">Status</label>
              <select
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as
                      | "COMPLETED"
                      | "PENDING"
                      | "FAILED"
                      | undefined
                  )
                }
              >
                <option value="">All</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>

            {/* Sort by Options */}
            <div className="sm:col-span-2 lg:col-span-1 flex space-x-4">
              <div>
                <label className="block mb-1 text-gray-400">
                  Sort by Price
                </label>
                <select
                  className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="amount-asc">Low to High</option>
                  <option value="amount-desc">High to Low</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-400">Sort by Date</label>
                <select
                  className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="date-desc">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="flex justify-end mt-4">
            <button
              className="px-6 py-2 rounded-md bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:from-green-600 hover:to-blue-600 transition-transform transform hover:scale-105"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilterComponent;
