'use client'
import axios from 'axios';
import { getCookies, removeAuthCookies, setAuthCookies } from '@/utils/cookies';
// import { setAuthenticated } from '@/store/authSlice';


const API_URL = 'http://localhost:4401/api'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add access token to headers
api.interceptors.request.use(
  (config) => {
    const cookies = getCookies()
    const accessToken = cookies.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const cookies = getCookies()
        const refreshToken = cookies.refreshToken;

        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refreshToken`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data.data;

          // Update tokens in the store
          setAuthCookies(accessToken, newRefreshToken);
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
        else window.location.href = '/auth?type=login'; 
      } catch (err) {
        // setAuthenticated(false)
        removeAuthCookies()
        // Optionally, redirect to the login page
        window.location.href = '/auth?type=login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;