interface LoanFormValues {
  id?: string;
  title: string;
  description?: string;
  amount: number;
  emiQty: number;
  lender: string;
  label: string;
  status: "ACTIVE" | "CLOSED" | "";
  reason?: string;
}

interface ILoanListPayload {
  search: string;
  page: number;
  pageSize: number;
  startDate?: string;
  endDate?: string;
  status: "ACTIVE" | "CLOSED" | "";
  sortBy?: string;
}
interface ILoanFilterPayload {
  search: string;
  startDate?: string;
  endDate?: string;
  status?: "ACTIVE" | "CLOSED" | "";
  sortBy?: string;
}
