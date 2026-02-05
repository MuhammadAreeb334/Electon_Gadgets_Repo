import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkoutSession } from "../hooks/paymentService";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";

const KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const StripePayment = ({ cartItems }) => {
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty!");
    }
    setLoading(true);
    try {
      const stripe = await loadStripe(KEY);
      const data = await checkoutSession(cartItems, token);
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Unable to redirect to Stripe checkout.");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.log(error.message);
    } finally {
      dispatch(clearCart());
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        disabled={loading}
        onClick={handleCheckout}
        className={`bg-green-600 text-white px-6 py-2 rounded-lg transition w-full ${
          loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"
        }`}
      >
        {loading ? "Processing" : "Checkout"}
      </button>
    </div>
  );
};

export default StripePayment;
