"use client";
import api from "./apiService";

export const makeTransactionService = async (
  payload: TransactionFormValues
) => {
  try {
    const response = await api.post("/transaction/transact", payload);
    const responseData = response?.data?.data;
    if (responseData) {
      return Promise.resolve(
        `Congrats! transaction ${payload.id ? "updated" : "done"} :)`
      );
    } else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllTransactionService = async (id: string) => {
  try {
    const response = await api.post("/transaction/getTransaction", { id });
    const responseData = response?.data?.data;
    if (responseData) {
      return Promise.resolve(responseData);
    } else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllTransactionsService = async (
  payload: ITransactionListPayload
) => {
  try {
    const response = await api.post("/transaction/getTransactions", payload);
    const responseData = response?.data?.data;
    if (responseData) {
      return Promise.resolve(responseData);
    } else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};
