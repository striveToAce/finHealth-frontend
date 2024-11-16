interface TransactionFormValues {
  id?: string;
  title: string;
  description?: string;
  amount: number;
  isCredit: boolean;
  label: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  reason?: string;
}

interface ITransactionListPayload {
  search: string;
  page: number;
  pageSize: number;
  startDate?: string;
  endDate?: string;
  status?: "PENDING" | "COMPLETED" | "FAILED";
  sortBy?: string;
}
interface ITransactionFilterPayload {
    search: string;
    startDate?: string;
    endDate?: string;
    status?: "PENDING" | "COMPLETED" | "FAILED";
    sortBy?: string;
  }
