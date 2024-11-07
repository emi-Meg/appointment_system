import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import LoadingAppointment from "../../Components/LoadingAppointment";

const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get("/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const ProtectedRoutes:React.FC = () => {
  const { data: user, isLoading, isError } = useQuery("userProfile", fetchUserProfile, {
    retry: false,
  });

  if (isLoading) {
    return <LoadingAppointment />;
  }

  if (isError || !user) {
    return <Navigate to="/signin"/>;
  }

  return <Outlet />;
};

export default ProtectedRoutes;