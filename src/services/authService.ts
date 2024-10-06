"use client";
import api from "./apiService";
import { AppDispatch } from "../redux/store";
import { removeAuthCookies, setAuthCookies } from "@/utils/cookies";

export const loginService = async (
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const responseData = response?.data?.data;
    if (responseData) {
      const { accessToken, refreshToken } = responseData;
      setAuthCookies(accessToken, refreshToken);
      return Promise.resolve();
    } else return Promise.reject();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const signupService = async (
  fullname: string,
  email: string,
  password: string,
) => {
  try {
    const response = await api.post("/auth/signup", {
      fullname,
      email,
      password,
    });
    const responseData = response?.data?.data;
    if (responseData) {
      return Promise.resolve(responseData);
    } else return Promise.reject();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const logoutService = (dispatch: AppDispatch) => {
  removeAuthCookies();
};

export const getUserData = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("Fetching user data failed:", error);
    throw error;
  }
};