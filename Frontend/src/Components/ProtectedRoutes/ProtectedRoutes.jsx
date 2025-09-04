import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";
import { useEffect } from "react";
const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
        console.log("Unauthorized user");
        
      toast.error("Unauthorized user. Please login first!", {
        autoClose: 2000,
      });
    }
    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      localStorage.removeItem("token");
      toast.error("Invalid token. Please login again.", {
        autoClose: 2000,
      });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
