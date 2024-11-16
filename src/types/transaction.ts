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
  page: number;
  pageSize: number;
  startDate?: Date;
  endDate?: Date;
  status?: "PENDING" | "COMPLETED" | "FAILED";
}
