"use client";

import { useState } from "react";
import { MyLoanTable } from "./MyLoanTable";
import LoanForm from "./MyLoanForm";

export const LoanView = () => {
  const [mode, setMode] = useState<string>("list");
  return (
    <div>
      {mode === "list" ? (
        <MyLoanTable setMode={setMode} />
      ) : (
        <LoanForm setMode={setMode} />
      )}
    </div>
  );
};
