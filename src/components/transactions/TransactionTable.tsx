"use client";

import {
  getAllTransactionService,
  getAllTransactionsService,
} from "@/services/transactionService";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CustomModal } from "../common/CustomModal";
import TransactionFilterComponent from "./TransactionFilter";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  isCredit: boolean;
  createdAt: string;
  label?: string;
  description?: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
}

type IPropType = { setMode: React.Dispatch<React.SetStateAction<string>> };

export const TransactionTable: React.FC<IPropType> = ({ setMode }) => {
  const searchParams = useSearchParams();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [filter, setFilter] = useState<ITransactionListPayload>({
    page: 1,
    pageSize: 50,
    search: "",
    transactionType:
      (searchParams.get("transactionType") as "DEBIT" | "CREDIT" | "") || "",
  });

  const fetchTransactions = useCallback(async () => {
    try {
      toast.loading("fetching transactions...");
      const data = await getAllTransactionsService(filter);
      const rows = data.rows;
      const count = data.count;
      setTransactions(rows);
      setTotal(count);
      toast.dismiss();
      toast.success("fetched transactions :)");
    } catch (err) {
      toast.dismiss();
      toast.error("fetching transactions failed.");
    }
  }, [JSON.stringify(filter)]);

  const handleTransactionClick = useCallback(async (id: string) => {
    try {
      toast.loading("fetching transaction detail...");
      const data = await getAllTransactionService(id);
      toast.dismiss();
      toast.success("fetched transaction detail :)");
      setSelectedTransaction(data);
    } catch (err) {
      toast.dismiss();
      toast.error("fetching transaction detail failed.");
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [JSON.stringify(filter)]);

  const handleFilterChange = useCallback((value: ITransactionFilterPayload) => {
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
            Transactions
          </span>
        </h1>

        {/* Add Transaction Button */}
        <button
          onClick={() => {
            setMode("form");
          }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          + Add Transaction
        </button>
      </div>
      <div>
        <TransactionFilterComponent
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
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600`}
                onClick={() => handleTransactionClick(transaction.id)}
              >
                <td className="px-4 py-2 text-lg font-medium">
                  {transaction.id}
                </td>
                <td className="px-4 py-2 text-lg">{transaction.title}</td>
                <td
                  className={`px-4 py-2 text-lg font-bold ${
                    transaction.isCredit
                      ? "text-green-400 text-shadow-green"
                      : "text-red-400 text-shadow-red"
                  }`}
                >
                  {transaction.isCredit ? "+" : "-"}${transaction.amount}
                </td>
                <td className="px-4 py-2 text-lg">
                  {new Date(transaction.createdAt).toLocaleString()}
                </td>
                <td
                  className={`px-4 py-2 text-lg font-semibold ${
                    transaction.status === "COMPLETED"
                      ? "text-green-500"
                      : transaction.status === "PENDING"
                      ? "text-yellow-400"
                      : "text-red-500"
                  }`}
                >
                  {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        {selectedTransaction && (
          <CustomModal
            isOpen={!!selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
            title={selectedTransaction?.title}
          >
            {selectedTransaction && (
              <div>
                <p className="text-lg text-gray-300 mb-2">
                  <strong>Description:</strong>{" "}
                  {selectedTransaction.description}
                </p>
                <p className="text-lg text-gray-300 mb-4">
                  <strong>Label:</strong> {selectedTransaction.label}
                </p>
                <p className="text-lg text-gray-300">
                  <strong>Amount:</strong>{" "}
                  <span
                    className={`font-bold ${
                      selectedTransaction.isCredit
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {selectedTransaction.isCredit ? "+" : "-"}$
                    {selectedTransaction.amount}
                  </span>
                </p>
              </div>
            )}
          </CustomModal>
        )}
      </AnimatePresence>
    </div>
  );
};
