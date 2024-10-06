"use client";
import api from "./apiService";
import { AppDispatch } from "../redux/store";
import { removeAuthCookies, setAuthCookies } from "@/utils/cookies";
import { login } from "@/redux/slices/authSlice";

export const loginService = async (
  username: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    const responseData = response?.data?.data;
    if (responseData) {
      const { accessToken, refreshToken, user } = responseData;
      console.log(accessToken, refreshToken, user, "login response");
      setAuthCookies(accessToken, refreshToken);
      dispatch(login(user));
      return Promise.resolve(`${user.firstName} ${user.lastName}`);
    } else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signupService = async (
  firstName: string,
  lastName: string,
  username: string,
  dob: string,
  password: string
) => {
  try {
    const response = await api.post("/auth/signup", {
      firstName,
      lastName,
      dob,
      username,
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

export const getUserDataService = async (username:string) => {
  try {
    const response = await api.post("/auth/profileInfo",{
      username
    });
    if (response?.data?.data) return Promise.resolve(response?.data?.data);
    else return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};
