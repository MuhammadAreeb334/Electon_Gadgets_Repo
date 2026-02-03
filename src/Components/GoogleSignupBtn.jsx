import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { baseURL } from "../Constrant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/userSlice";
import { useDispatch } from "react-redux";

const GoogleSignupBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async (creadentialResonse) => {
    try {
      const token = creadentialResonse.credential;
      const response = await fetch(`${baseURL}/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(result.message || "Signup failed!");
        console.error("Signup failed:", errorData.message);
        return;
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      dispatch(setUser({ token: result.token, user: result.user }));
      console.log(result.token, "hashfkasjh");
      console.log(result.user, "sahfjksha");
      navigate("/home");

      //   console.log(response.json())
      // console.log(result, "asdgjhgshjdg");
      // console.log(result.user, "12312312");
      // console.log(result.token, "4545454");

      // const userToken = localStorage.setItem("token", result.token);
      // const user = localStorage.setItem("user", JSON.stringify(result.user));
      // dispatch(setUser({ token: userToken, user }));

      // console.log("Google Signup Success: ", result);
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Google signup error:", error.message);
      toast.error("Google signup failed.");
    }
  };

  return (
    <div>
      <div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Google Login Failed")}
        />
      </div>
    </div>
  );
};

export default GoogleSignupBtn;
