import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientid = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log("Google Client ID:", clientid);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientid}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>,
);
