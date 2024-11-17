"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";

interface FilterProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: ILoanFilterPayload) => void;
}

const MyLoanFilterComponent: React.FC<FilterProps> = ({
  onSearch,
  onFilterChange,
}) => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ILoanFilterPayload>({
    search: searchParams.get("search") || "",
    startDate: "",
    endDate: "",
    status:
      (searchParams.get("status") as "CLOSED" | "ACTIVE") || "",
    sortBy: "",
  });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    filters.search
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(filters.search);
    }, 500);

    return () => clearTimeout(handler);
  }, [filters.search]);

  // Trigger onSearch when debouncedSearchTerm changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleInputChange = (
    key: keyof ITransactionFilterPayload,
    value: any
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters: ILoanFilterPayload = {
      search: "",
      startDate: "",
      endDate: "",
      status: "",
      sortBy: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const isFilterApplied = useMemo(
    () =>
      Object.entries(filters).some(([key, value]) =>
        key === "search" ||
        key === "sortBy" ||
        key === "startDate" ||
        key === "endDate" ||
        key === "status"
      ),
    [filters]
  );

  return (
    <div className="p-6 bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white rounded-lg shadow-lg">
      {/* Toggle Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold text-glow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Filter Loans
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
              value={filters.search}
              onChange={(e) => handleInputChange("search", e.target.value)}
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
                value={filters.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block mb-1 text-gray-400">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={filters.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 text-gray-400">Status</label>
              <select
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={filters.status}
                onChange={(e) =>
                  handleInputChange(
                    "status",
                    e.target.value as "COMPLETED" | "PENDING" | "FAILED" | ""
                  )
                }
              >
                <option value={""}>All</option>
                <option value="CLOSED">Closed</option>
                <option value="ACTIVE">Active</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block mb-1 text-gray-400">Sort by</label>
              <select
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={filters.sortBy}
                onChange={(e) => handleInputChange("sortBy", e.target.value)}
              >
                <option value="">None</option>
                <option value="amount-asc">Price: Low to High</option>
                <option value="amount-desc">Price: High to Low</option>
                <option value="date-asc">Date: Oldest First</option>
                <option value="date-desc">Date: Newest First</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-4">
            <button
              className="px-6 py-2 rounded-md bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:from-green-600 hover:to-blue-600 transition-transform transform hover:scale-105"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
            <button
              disabled={!isFilterApplied}
              className={`ml-2 px-6 py-2 rounded-md bg-gradient-to-r ${
                isFilterApplied
                  ? "from-red-400 to-red-500"
                  : "from-gray-600 to-gray-700"
              } text-white font-semibold ${
                isFilterApplied
                  ? "hover:from-red-600 hover:to-red-700"
                  : "cursor-not-allowed"
              } transition-transform transform hover:scale-105`}
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLoanFilterComponent;
