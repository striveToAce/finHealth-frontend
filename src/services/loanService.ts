"use client";
import api from "./apiService";

export const addUpdateLoanService = async (payload: LoanFormValues) => {
  try {
    const response = await api.post("/loan/addUpdate", payload);
    const responseData = response?.data?.data;
    if (responseData) {
      return Promise.resolve(
        `Congrats! loan ${payload.id ? "updated" : "added"} :)`
      );
    } else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getLoanInfoService = async (id: string) => {
  try {
    const response = await api.post("/loan/getLoanInfo", { id });
    const responseData = response?.data?.data;
    if (responseData) {
      return Promise.resolve(responseData);
    } else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllLoansService = async (payload: ILoanListPayload) => {
  try {
    const response = await api.post("/loan/getAllLoans", payload);
    const responseData = response?.data?.data;
    if (responseData) {
      return Promise.resolve(responseData);
    } else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllEMIsService = async (payload: IGeneralListPayload) => {
  try {
    const response = await api.post("/loan/getEMIList", payload);
    const responseData = response?.data?.data;
    if (responseData) {
      return Promise.resolve(responseData);
    } else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const payEmiService = async (payload: IPayEMI) => {
  try {
    const response = await api.post("/loan/payEmi", payload);
    const responseData = response?.data?.data;
    if (responseData) {
      return Promise.resolve(responseData);
    } else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};
