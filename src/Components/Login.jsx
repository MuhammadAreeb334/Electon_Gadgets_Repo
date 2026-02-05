import React, { useState } from "react";
// import { logIn } from "../API";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { baseURL } from "../Constrant";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Error logging in");
      }
      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome ${user.name}!`);
      dispatch(setUser({ token, user }));
      
      console.log("token:", token);
      console.log("User: ", user);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
      console.log("Login Sucess: ", user.name);
    } catch (error) {
      console.log("Error: ", error.message);
      toast.error("Login failed. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="p-10 rounded-lg shadow-lg w-full max-w-sm mb-6">
        <h1 className="text-5xl text-gray-400 font-medium mb-5 text-center">
          Login
        </h1>
        <div className="flex flex-col gap-4">
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
          <button
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            onClick={handleChange}
          >
            Login
          </button>
          <Link to="/signup" className="text-center text-blue-500">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
