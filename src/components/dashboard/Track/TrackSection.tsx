"use client";
import { useSearchParams } from "next/navigation";
import TrackTable from "./TrackTable";

export const TrackSection: React.FC = () => {
  const searchParams = useSearchParams();
  type trackTypes =
    | "spends"
    | "emis"
    | "investments"
    | "loans"
    | "credits"
    | "debits"
    | "transactions";
  const type = searchParams.get("type") as trackTypes;
  const typeToHeaders = {
    spends: "Spends",
    emis: "EMIs",
    investments: "Investments",
    loans: "Loans",
    credits: "Credits",
    debits: "Debits",
    transactions: "Transactions",
  };
  return (
    <div>
      <TrackTable
        heading={typeToHeaders[type]}
        rows={[
          {
            label: "Milk 1l purchase",
            description: "Milk",
            type: "debit",
            amount: 100,
            date: "2022-01-01",
            isPaid: true,
          },
          {
            label: "Milk Shake Banana 1l purchase",
            description: "Milk shake",
            type: "debit",
            amount: 90,
            date: "2022-01-01",
            isPaid: true,
          },
          {
            label: "Chiar 2pcs purchase",
            description: "Chair",
            type: "debit",
            amount: 1100,
            date: "2022-01-01",
            isPaid: false,
          },
        ]}
      />
    </div>
  );
};
