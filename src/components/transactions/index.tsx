"use client";

import { useState } from "react";
import { TransactionTable } from "./TransactionTable";
import TransactionForm from "./TransactionForm";

export const TransactionView = () => {
  const [mode, setMode] = useState<string>("list");
  return (
    <>
      {mode === "list" ? (
        <TransactionTable setMode={setMode} />
      ) : (
        <TransactionForm setMode={setMode} />
      )}
    </>
  );
};
