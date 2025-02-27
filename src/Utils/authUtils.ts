import { UserRole, userRole } from "../signals/userSignal";

export const setAuthData = (token: string, role: UserRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    userRole.value = role; // Update signal
  };
  
  export const getAuthData = () => {
    return ({
      token: localStorage.getItem("token"),
      userRole: localStorage.getItem("userRole"),
    })
  };
  
  export const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    userRole.value = "guest";
  };
  
  export const isAuthenticated = () => !!localStorage.getItem("token");
  