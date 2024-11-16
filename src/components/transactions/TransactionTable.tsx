"use client";

import { getAllTransactionsService } from "@/services/transactionService";
import { toast } from "react-toastify";
import React, { useCallback, useEffect, useState } from "react";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  isCredit: boolean;
  createdAt: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
}

type IPropType = { setMode: React.Dispatch<React.SetStateAction<string>> };

export const TransactionTable: React.FC<IPropType> = ({ setMode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<ITransactionListPayload>({
    page: 1,
    pageSize: 50,
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
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [filter.page]);

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
              >
                <td className="px-4 py-2 text-lg font-medium">{index + 1}</td>
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
    </div>
  );
};