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
  emiAmount:number;
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

interface IGeneralListPayload {
  page:number;
  pageSize:number;
}
interface IPayEMI{
  loanId:string;
  emiId:string;
  month:number;
}