import { baseURL } from "../Constrant";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { toast } from "react-toastify";
import Slider from "react-slick";
import StripePayment from "./StripePayment";
import Navbar from "./Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
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
    if (id && token) {
      getProductById(id, token);
    }
  }, []);

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

  // const handlePayment = async () => {
  //   try {
  //     const stripe = await loadStripe(KEY);
  //     if (!product) return;
  //     const response = await fetch(`${baseURL}/checkout`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         cartItems: [
  //           {
  //             _id: product?._id,
  //             name: product.name,
  //             price: product.price,
  //             quantity: 1,
  //           },
  //         ],
  //       }),
  //     });
  //     const data = await response.json();
  //     window.location.href = data.url;
  //   } catch (error) {
  //     console.log("Error", error.message);
  //   }
  // };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image[0],
      }),
      toast.info("added to cart"),
    );
  };
  return (
    <div>
      <Navbar />
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row gap-10 bg-gray-50">
        <div className="flex flex-col md:flex-row lg:flex-row gap-6 w-full lg:w-[50%] shadow-lg">
          <div className="flex flex-col md:flex-row lg:flex-row gap-6 w-full">
            {product?.image?.length > 0 ? (
              <Slider {...sliderSetting} className="w-full">
                {product.image.map((img, index) => (
                  <div key={index}>
                    <img
                      src={`${baseURL}${img}`}
                      alt={`${product.name}-${index}`}
                      className="w-full h-64 sm:h-80 md:h-[400px] object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-2xl">
                <p>No Image</p>
              </div>
            )}
          </div>
        </div>
        {/* <div className="flex flex-col md:flex-row lg:flex-row gap-6 w-full lg:w-2/3">
          <div className="flex flex-row md:flex-col justify-center items-center gap-3 w-auto md:w-auto max-w-full">
            {[0, 1, 2].map((index) => (
              <img
                key={index}
                src={`${baseURL}${product?.image[0]}`}
                alt={product?.name}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-auto md:h-24 object-cover rounded-md hover:scale-105 transition-transform"
              />
            ))}
          </div>
          <div className="w-full flex justify-center items-center">
            <img
              src={`${baseURL}${product?.image[0]}`}
              alt={product?.name}
              className="w-full h-64 sm:h-80 md:h-[400px] object-cover rounded-xl shadow-md"
            />
          </div>
        </div> */}

        <div className="flex-1 flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 hover:shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {product?.name}
            </h1>

            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              {product?.description}
            </p>

            <p className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-8">
              ${product?.price}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-4">
            <button
              onClick={() => handleAddToCart()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md w-full"
            >
              Add to Cart
            </button>

            <StripePayment
              cartItems={[
                {
                  _id: product?._id,
                  name: product?.name,
                  price: product?.price,
                  quantity: 1,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
