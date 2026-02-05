import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Components/Cart";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminPage from "./Components/AdminPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import CheckTest from "./Components/checkTest";

function App() {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route
          path="/"
          element={
            token ? (
              user?.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            token ? (
              user?.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Signup />
            )
          }
        />
          <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
        <Route path="cart" element={<Cart />} />

        </Route>
         <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
            <Route path="/success" element={<CheckTest />} />
          </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />

      {/* <Route
          path="/"
          element={
            isLoggedIn ? (
              user?.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Login />
            )
          }
        /> */}
      {/* <Route 
          path="/signup"
          element={
            isLoggedIn ? (
              user?.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Signup />
            )
          }
        /> */}

      {/* <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        /> */}
    </>
  );
}

export default App;
