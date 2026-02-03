import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import { toast } from "react-toastify";

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleclick = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.info("You have been logged out.");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome, Admin!</h1>
      <p className="mt-3 text-gray-700">You are an Admin.</p>
      <button
        onClick={handleclick}
        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPage;
