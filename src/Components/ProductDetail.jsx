import React from "react";
import { baseURL } from "../Constrant";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  //   const { selectedProduct } = useSelector((state) => state.product);
  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);

  const getProductById = async (id, token) => {
    try {
      const response = await fetch(`${baseURL}/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log("Error", response.status);
      }
      const data = await response.json();
      setProduct(data?.data);
    } catch (error) {
      console.log("Error fetching product: ", error.message);
    }
  };
  useEffect(() => {
    getProductById(id, token);
  }, []);

  return (
    <div className="p-1 sm:p-10 flex flex-col lg:flex-row gap-10 bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex justify-between lg:flex-col gap-3 w-full lg:w-1/4">
          <img
            src={`${baseURL}${product?.image[0]}`}
            alt={product?.name}
            className="w-24 h-24 sm:w-full lg:h-24 object-cover rounded-md border hover:scale-105 transition-transform"
          />
          <img
            src={`${baseURL}${product?.image[0]}`}
            alt={product?.name}
            className="w-24 h-24 sm:w-full lg:h-24 object-cover rounded-md border hover:scale-105 transition-transform"
          />
          <img
            src={`${baseURL}${product?.image[0]}`}
            alt={product?.name}
            className="w-24 h-24 sm:w-full object-cover rounded-md border hover:scale-105 transition-transform"
          />
        </div>

        <div className="w-full flex justify-center items-center">
          <img
            src={`${baseURL}${product?.image[0]}`}
            alt={product?.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          {product?.name}
        </h1>
        <p className="text-gray-600 mb-4">{product?.description}</p>
        <p className="text-2xl font-semibold text-blue-600 mb-6">
          ${product?.price}
        </p>
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Add to Cart
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
