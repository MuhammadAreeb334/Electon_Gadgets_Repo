import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../Constrant";
import { FireApi } from "../hooks/useRequest";
import Navbar from "./Navbar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="">
      <Navbar />
      <div className="grid gap-6 m-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((item) => (
          <div
            key={item?._id}
            onClick={() => navigate(`/products/${item?._id}`)}
            className="rounded-2xl flex flex-col  transition hover:scale-105 hover:shadow-xl duration-300"
          >
            <img
              src={`${baseURL}${item?.image[0]}`}
              className="w-full h-60 object-cover rounded-t-2xl"
              alt=""
            />
            <div className="p-4">
              <h1 className="font-bold text-gray-700 text-lg">{item?.name}</h1>
              <p className="text-gray-600">{item?.description}</p>
              <p className="text-gray-700 font-bold mt-2">${item?.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
