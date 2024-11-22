"use client";

import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { getAllEMIsService, payEmiService } from "@/services/loanService";
// import { CustomModal } from "@/components/common/CustomModal";

interface Emi {
  id: string;
  title: string;
  amount: number;
  createdAt: string;
  label?: string;
  month: number;
  loanInfo: any;
  status: "PENDING" | "COMPLETED" | "FAILED" | "";
}

export const MyEmiTable: React.FC = () => {
  const [emis, setEmis] = useState<Emi[]>([]);
  const [total, setTotal] = useState(0);
  //   const [selected, setSelectedLoan] = useState<Loan | null>(null);
  const [filter, setFilter] = useState<IGeneralListPayload>({
    page: 1,
    pageSize: 50,
  });

  const fetchAllEmis = useCallback(async () => {
    try {
      toast.loading("fetching emis...");
      const data = await getAllEMIsService(filter);
      const rows = data.rows;
      const count = data.count;
      setEmis(rows);
      setTotal(count);
      toast.dismiss();
      toast.success("fetched transactions :)");
    } catch (err) {
      toast.dismiss();
      toast.error("fetching transactions failed.");
    }
  }, [JSON.stringify(filter)]);

  const payEmiNow = useCallback(async (emiInfo: Emi) => {
    try {
      if (emiInfo.status !== "PENDING") return;
      console.log(emiInfo);
      if (!(emiInfo.loanInfo && emiInfo.loanInfo.id)) {
        toast.error("loan or emi not valid");
        return;
      }
      console.log(emiInfo);
      toast.loading("paying emi... :)");
      await payEmiService({
        emiId: emiInfo.id,
        loanId: emiInfo.loanInfo?.id,
        month: emiInfo.month,
      });
      toast.dismiss();
      toast.success("emi paid successfully");
      fetchAllEmis();
    } catch (err) {
      console.log(err, "___payment emi___");
      toast.dismiss();
      toast.error("emi payment failed");
    }
  }, []);

  useEffect(() => {
    fetchAllEmis();
  }, [JSON.stringify(filter)]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-black to-blue-900 p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-glow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            My EMIs
          </span>
        </h1>
      </div>
      <div></div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-left border-collapse bg-gray-900 rounded-lg">
          <thead className="bg-gradient-to-r from-purple-700 via-black to-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 text-xl font-bold">SN</th>
              <th className="px-4 py-2 text-xl font-bold">Title</th>
              <th className="px-4 py-2 text-xl font-bold">Amount</th>
              <th className="px-4 py-2 text-xl font-bold">CreatedAt</th>
              <th className="px-4 py-2 text-xl font-bold">Status</th>
              <th className="px-4 py-2 text-xl font-bold">Payment</th>
            </tr>
          </thead>
          <tbody>
            {emis.map((emi, index) => (
              <tr
                key={emi.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600`}
              >
                <td className="px-4 py-2 text-lg font-medium">{emi.id}</td>
                <td className="px-4 py-2 text-lg">{emi.title}</td>
                <td
                  className={`px-4 py-2 text-lg font-bold ${"text-red-400 text-shadow-red"}`}
                >
                  {"-"}${emi.loanInfo.amount}
                </td>
                <td className="px-4 py-2 text-lg">
                  {new Date(emi.createdAt).toLocaleString()}
                </td>
                <td
                  className={`px-4 py-2 text-lg font-semibold ${
                    emi.status === "COMPLETED"
                      ? "text-green-500"
                      : emi.status === "PENDING"
                      ? "text-yellow-400"
                      : "text-red-500"
                  }`}
                >
                  {emi.status}
                </td>
                <td
                  className={`px-4 py-2 text-lg cursor-pointer font-semibold ${
                    emi.status === "COMPLETED"
                      ? "text-green-500"
                      : emi.status === "PENDING"
                      ? "text-blue-400"
                      : "text-red-500"
                  }`}
                  onClick={() => payEmiNow(emi)}
                >
                  {emi.status === "COMPLETED" ? "PAID" : "Pay Now"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
