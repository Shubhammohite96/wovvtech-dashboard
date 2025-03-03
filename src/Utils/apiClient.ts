import axios from "axios";
import { getAuthData, clearAuthData } from "./authUtils";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Replace with your base API URL
  timeout: 10000, // Optional: Set a timeout for requests
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const { token } = getAuthData(); // Get the token from localStorage or authUtils
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response; // Return the response if successful
  },
  (error) => {
    console.log('error: ', error);
    // Handle unauthorized (401) errors
    if (error.response && error.response.status === 401) {
      clearAuthData(); // Clear token and role on unauthorized access
    //   window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error.response.data);
  }
);

export default apiClient;
