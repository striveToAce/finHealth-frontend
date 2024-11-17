"use client";

import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { getAllLoansService, getLoanInfoService } from "@/services/loanService";
import MyLoanFilterComponent from "./MyLoanFilter";
import { CustomModal } from "@/components/common/CustomModal";

interface Loan {
  id: string;
  title: string;
  amount: number;
  createdAt: string;
  label?: string;
  description?: string;
  lender: string;
  emiQty: number;
  status: "ACTIVE" | "CLOSED";
}

type IPropType = { setMode: React.Dispatch<React.SetStateAction<string>> };

export const MyLoanTable: React.FC<IPropType> = ({ setMode }) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [filter, setFilter] = useState<ILoanListPayload>({
    page: 1,
    pageSize: 50,
    search: "",
    status: "",
  });

  const fetchLoans = useCallback(async () => {
    try {
      toast.loading("fetching transactions...");
      const data = await getAllLoansService(filter);
      const rows = data.rows;
      const count = data.count;
      setLoans(rows);
      setTotal(count);
      toast.dismiss();
      toast.success("fetched transactions :)");
    } catch (err) {
      toast.dismiss();
      toast.error("fetching transactions failed.");
    }
  }, [JSON.stringify(filter)]);

  const handleLoanClick = useCallback(async (id: string) => {
    try {
      toast.loading("fetching transaction detail...");
      const data = await getLoanInfoService(id);
      toast.dismiss();
      toast.success("fetched transaction detail :)");
      setSelectedLoan(data);
    } catch (err) {
      toast.dismiss();
      toast.error("fetching transaction detail failed.");
    }
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [JSON.stringify(filter)]);

  const handleFilterChange = useCallback((value: ILoanFilterPayload) => {
    if (!value.startDate) delete value.startDate;
    if (!value.endDate) delete value.endDate;
    if (!value.status) delete value.status;
    setFilter((prev) => ({ ...prev, ...value }));
  }, []);

  const handleSearchTextChange = useCallback((value: string) => {
    setFilter((prev) => {
      return { ...prev, search: value };
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-black to-blue-900 p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-glow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            My Loans
          </span>
        </h1>

        {/* Add Transaction Button */}
        <button
          onClick={() => {
            setMode("form");
          }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          + Add Loan Info
        </button>
      </div>
      <div>
        <MyLoanFilterComponent
          onFilterChange={handleFilterChange}
          onSearch={handleSearchTextChange}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-left border-collapse bg-gray-900 rounded-lg">
          <thead className="bg-gradient-to-r from-purple-700 via-black to-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 text-xl font-bold">SN</th>
              <th className="px-4 py-2 text-xl font-bold">Title</th>
              <th className="px-4 py-2 text-xl font-bold">Amount</th>
              <th className="px-4 py-2 text-xl font-bold">Created At</th>
              <th className="px-4 py-2 text-xl font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr
                key={loan.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600`}
                onClick={() => handleLoanClick(loan.id)}
              >
                <td className="px-4 py-2 text-lg font-medium">{loan.id}</td>
                <td className="px-4 py-2 text-lg">{loan.title}</td>
                <td
                  className={`px-4 py-2 text-lg font-bold ${"text-red-400 text-shadow-red"}`}
                >
                  {"-"}${loan.amount}
                </td>
                <td className="px-4 py-2 text-lg">
                  {new Date(loan.createdAt).toLocaleString()}
                </td>
                <td
                  className={`px-4 py-2 text-lg font-semibold ${
                    loan.status === "ACTIVE"
                      ? "text-green-500"
                      : loan.status === "CLOSED"
                      ? "text-yellow-400"
                      : "text-red-500"
                  }`}
                >
                  {loan.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        {selectedLoan && (
          <CustomModal
            isOpen={!!selectedLoan}
            onClose={() => setSelectedLoan(null)}
            title={selectedLoan?.title}
          >
            {selectedLoan && (
              <div>
                <p className="text-lg text-gray-300 mb-2">
                  <strong>Description:</strong> {selectedLoan.description}
                </p>
                <p className="text-lg text-gray-300 mb-4">
                  <strong>Label:</strong> {selectedLoan.label}
                </p>
                <p className="text-lg text-gray-300">
                  <strong>Amount:</strong>{" "}
                  <span className={`font-bold ${"text-red-400"}`}>
                    {"-"}${selectedLoan.amount}
                  </span>
                </p>
                <p className="text-lg text-gray-300 mb-4">
                  <strong>Lender:</strong> {selectedLoan.lender}
                </p>
                <p className="text-xl text-gray-300 mb-4">
                  <strong>EMIs remaining:</strong> {selectedLoan.emiQty}
                </p>
              </div>
            )}
          </CustomModal>
        )}
      </AnimatePresence>
    </div>
  );
};
