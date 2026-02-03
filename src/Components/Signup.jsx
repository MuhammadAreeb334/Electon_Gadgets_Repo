import React, { useState } from "react";
import { baseURL } from "../Constrant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleSignupBtn from "./GoogleSignupBtn";
// import { signUp } from "../API";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role: "user" }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Signup failed!");
        console.error("Signup failed:", errorData.message);
        return;
      }
      const result = await response.json();
      console.log("Signup success: ", result);
      toast.success("Signup successful! Please login.");
      navigate("/");
    } catch (error) {
      console.error("Error :", error.message);
      toast.error("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="p-10 rounded-lg shadow-lg w-full max-w-sm mb-6">
        <h1 className="text-5xl text-gray-400 font-medium mb-5 text-center">
          Signup
        </h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select> */}
          <button
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <GoogleSignupBtn />
        </div>
      </div>
    </div>
  );
};

export default Signup;
