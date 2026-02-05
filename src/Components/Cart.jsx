import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, updateQuantity } from "../features/cartSlice";
import { baseURL } from "../Constrant";
import StripePayment from "./StripePayment";
import Navbar from "./Navbar";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="">
      <Navbar />
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
              >
                
                <img
                  src={`${baseURL}${item.image}`}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md"
                />

                <div className="flex-1 sm:ml-4 mt-3 sm:mt-0">
                  <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                  <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition"
                      onClick={() => dispatch(updateQuantity({ id: item._id, type: "decrement" }))}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-gray-100 rounded">{item.quantity}</span>
                    <button
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition"
                      onClick={() => dispatch(updateQuantity({ id: item._id, type: "increment" }))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="mt-3 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6 h-fit">
            <h3 className="text-2xl font-bold text-gray-800">Order Summary</h3>

            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <div key={item._id} className="flex justify-between text-gray-700">
                  <span>{item.name} X {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="border-gray-300" />

            <div className="flex justify-between text-gray-900 font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex flex-col gap-3">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>

              <StripePayment
                cartItems={items.map((item) => ({
                  _id: item._id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity || 1,
                }))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Cart;
