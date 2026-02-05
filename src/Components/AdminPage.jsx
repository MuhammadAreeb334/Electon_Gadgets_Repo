import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import {
  setProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/productSlice";
import { toast } from "react-toastify";
import Logo from "../Assets/Logo.png";
import { FireApi } from "../hooks/useRequest";
import { baseURL } from "../Constrant";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiBox, FiLogOut, FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const { user, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const Headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await FireApi("products", "GET", null, Headers);
      if (response.ok || response.status === 200 || response.success === true) {
        dispatch(setProduct(response.data));
      }
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await FireApi(
        `products/deleteproduct/${productId}`,
        "DELETE",
        null,
        headers,
      );
      console.log("DELETE response:", response);

      // if (response.success || response.status == 200) {
      dispatch(deleteProduct(productId));
      toast.success("Product deleted successfully!");
      // } else {
      //   toast.error("Failed to delete product");
      // }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.info("You have been logged out.");
    navigate("/");
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const handleAddNew = () => {
    setIsEditing(false);
    setFormData({ name: "", description: "", price: "", image: null });
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({
      name: product?.name,
      description: product?.description,
      price: product?.price,
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed z-50 left-0 top-0 h-full w-64 bg-white shadow-md flex flex-col justify-between overflow-y-auto transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex [&::-webkit-scrollbar]:hidden`}
      >
        <div>
          <div className="border-b border-gray-200 flex justify-between items-center px-2">
            <div className="flex items-center gap-2 p-2 ">
              <img src={Logo} alt="Logo" className="w-10 sm:w-12" />
              <h1 className="text-lg sm:text-xl font-bold text-blue-600">
                MyShop
              </h1>
            </div>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <RxCross2 />
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 sm:gap-3 w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all"
            >
              <FiBox size={18} className="sm:text-base" />
              Products
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 p-3 sm:p-4">
          <div className="mb-2 sm:mb-3 text-gray-600 text-sm sm:text-base">
            <p className="font-semibold">{user?.name || "Guest"}</p>
            <p className="text-xs sm:text-sm text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-red-500 text-xs sm:text-sm text-white rounded-md hover:bg-red-600 transition-all"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden [&::-webkit-scrollbar]:hidden">
        <div className="flex justify-between items-center p-2 sm:p-3 bg-white shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-700"
          >
            <FiMenu size={24} />
          </button>

          <h2 className="text-lg sm:text-2xl font-bold text-gray-700">
            Products List
          </h2>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-md text-sm sm:text-base hover:bg-blue-700 transition-all shadow-sm"
          >
            Add New Product
          </button>
        </div>

        <div className="flex-1 overflow-hidden p-2 sm:p-6">
          {loading ? (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              Loading products...
            </p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              No products found.
            </p>
          ) : (
            <div className="bg-white rounded-lg shadow flex flex-col h-full">
              <div className="overflow-x-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden bg-white rounded-lg ">
                <table className="min-w-full text-left border-collapse text-xs sm:text-sm">
                  <thead className="bg-gray-50 border-b border-gray-400 sticky top-0 z-10">
                    <tr>
                      <th className="px-2 sm:px-6 py-2 sm:py-3 text-gray-600 font-semibold">
                        Image
                      </th>
                      <th className="px-2 sm:px-6 py-2 sm:py-3 text-gray-600 font-semibold">
                        Name
                      </th>
                      <th className="px-2 sm:px-6 py-2 sm:py-3 text-gray-600 font-semibold">
                        Description
                      </th>
                      <th className="px-2 sm:px-6 py-2 sm:py-3 text-gray-600 font-semibold">
                        Price
                      </th>
                      <th className="px-2 sm:px-6 py-2 sm:py-3 text-gray-600 font-semibold text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => (
                      <tr
                        key={item?._id}
                        className="border-b border-gray-400 hover:bg-gray-50 transition-all"
                      >
                        <td className="px-2 sm:px-6 py-1 sm:py-3">
                          <img
                            src={`${baseURL}${item?.image[0]}`}
                            alt={item?.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-2 sm:px-6 py-1 sm:py-3 font-medium text-gray-800">
                          {item?.name}
                        </td>
                        <td className="px-2 sm:px-6 py-1 sm:py-3 text-gray-600 truncate max-w-[100px] lg:max-w-xs">
                          {item?.description}
                        </td>
                        <td className="px-2 sm:px-6 py-1 sm:py-3 font-semibold text-blue-600">
                          ${item?.price}
                        </td>
                        <td className="px-2 sm:px-6 py-1 sm:py-3 text-center">
                          <div className="flex justify-center gap-1 sm:gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-green-600"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(item?._id)}
                              className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-red-600"
                            >
                              <MdDelete size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm animate-fadeIn p-2 sm:p-0">
          <div className="bg-white rounded-lg w-full max-w-sm sm:w-96 p-4 sm:p-6 shadow-lg relative">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4 text-sm sm:text-base"
            >
              <div>
                <label className="block font-medium text-gray-600 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 focus:ring focus:ring-blue-100 text-sm sm:text-base"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 focus:ring focus:ring-blue-100 text-sm sm:text-base"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-600 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 focus:ring focus:ring-blue-100 text-sm sm:text-base"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-600 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base"
                />
              </div>

              <div className="flex justify-end gap-2 sm:gap-3 mt-3 sm:mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
