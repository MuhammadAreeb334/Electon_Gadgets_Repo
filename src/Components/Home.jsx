import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../Constrant";
import { FireApi } from "../hooks/useRequest";
import { FaStar } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import Navbar from "./Navbar";
import Slider from "react-slick";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { token } = useSelector((state) => state.user);
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
  }, []);

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image[0],
      }),
    );
    toast.info("added to cart");
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

    const sliderSetting = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className="">
      <Navbar />
      <div className="grid gap-6 m-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((item) => (
          <div
            key={item?._id}
            className="rounded-2xl flex flex-col shadow-lg transition hover:scale-105 hover:shadow-xl duration-300"
          >
            <img
              onClick={() => navigate(`/products/${item?._id}`)}
              src={`${baseURL}${item?.image[0]}`}
              className="w-full h-60 object-cover rounded-t-2xl"
              alt=""
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mt-2 text-gray-700">
                {item?.name}
              </h3>
              <p className="text-sm text-gray-500">{item?.description}</p>
              <p className="text-xl font-semibold text-gray-700">
                ${item?.price}
              </p>
              <div className="flex items-center mt-1 text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-500 text-white rounded-full mt-1 p-2 hover:bg-blue-600 transition"
                >
                  <RiShoppingCartFill size={22} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
