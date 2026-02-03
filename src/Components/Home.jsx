import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
// import { getProducts } from "../API";
import { baseURL } from "../Constrant";
import { FireApi } from "../hooks/useRequest";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const checkUser=user||JSON.parse(localStorage.getItem('user'))


  const getProducts = async () => {
    try {
      setLoading(true);
      // const token = localStorage.getItem("token");

      const Headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await FireApi("products", "GET", null, Headers);
      if (response.ok || response.status == 200 || response.success === true) {
        setProducts(response?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    getProducts();
    console.log('check,111111')
  }, []);

  const handleclick = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.info("You have been logged out.");
    navigate("/");
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="min-h-screen p-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-700">
          {/* Welcome, {checkUser?.name} */}
          Welcome, {user?.name}
          {/* {products.map((item)=>( <div key={item._id}> <h1>{item.name}</h1></div> ))} */}
        </h1>
        <div>
          <button
            onClick={handleclick}
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {products?.map((item) => (
          <div
            key={item?._id}
            onClick={() => navigate(`/products/${item?._id}`)}
            className="border rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <img
              src={`${baseURL}${item?.image[0]}`}
              className="w-full h-48 object-cover mb-2"
              alt=""
            />
            <h1 className="font-bold text-gray-700 text-lg">{item?.name}</h1>
            <p className="text-gray-600">{item?.description}</p>
            <p className="text-gray-700 font-bold mt-2">{item?.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
