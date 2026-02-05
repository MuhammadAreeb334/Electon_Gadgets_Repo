import React from "react";
import { useNavigate } from "react-router-dom";

const CheckTest = () => {
  const navigate = useNavigate();
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        Thank You
      </h1>
      <button
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md w-full"
        onClick={() => navigate("/home")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default CheckTest;
