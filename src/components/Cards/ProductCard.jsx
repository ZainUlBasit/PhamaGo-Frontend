import React, { useState } from "react";
import NavigateToScreen from "../../utils/NavigateToScreen";
import { useNavigate } from "react-router-dom";
import { AddToCartApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
const user = JSON.parse(localStorage.getItem("user"));

const ProductCard = ({ product }) => {
  console.log(product.name);

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const navigate = useNavigate();

  const [Loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    console.log(product);

    e.preventDefault();
    const uuid = localStorage.getItem("uuid");
    console.log(uuid);
    const BodyData = uuid
      ? {
          order_no: uuid,
          item: product,
          qty: quantity,
          price: product.price,
        }
      : {
          item: product,
          qty: quantity,
          price: product.price,
        };
    try {
      const response = await AddToCartApi(BodyData);
      console.log(response.data.data.payload.order_no);
      
      const currentUUID = response.data?.data?.payload?.order_no;
      if (currentUUID) {
        localStorage.setItem("uuid", currentUUID);
      }
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        setLoading(false);
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (error) {
      if (error.response.data.error.msg === "Item already in cart.")
        ErrorToast(error.response.data.error.msg);
      console.log("error");
    }
  };

  return (
    <div className="flex flex-col items-start w-full justify-start max300:min-w-[200px] max300:w-[200px] mb-4 ">
      <div className="relative w-full h-fit">
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-main text-white text-xs rounded px-2 py-1">
            NEW
          </span>
        )}
        <img
          src={product.images[2] || product.images[0]}
          alt={product.name}
          className="w-full h-[260px] object-cover overflow-hidden max1200:h-[230px]"
          onClick={() => {
            navigate("/product-detail/" + product._id);
          }}
        />
      </div>
      <div className="flex justify-between items-center w-full px-1 mt-2 gap-x-2">
        <div className="flex items-center justify-between border border-main rounded-lg px-4 py-2 w-1/2 h-[4.5vh]">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="text-main text-xl"
          >
            -
          </button>
          <span className="mx-2 font-roboto text-main text-[.9rem]">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="text-main text-xl"
          >
            +
          </button>
        </div>
        <button
          className="bg-[#ffde59] hover:bg-[#ffde59]/80 transition-all ease-in-out duration-300 cursor-pointer text-black rounded-lg text-[.9rem] h-[4.5vh] w-1/2"
          onClick={onSubmit}
        >
          Add to cart
        </button>
      </div>
      <div className="mt-2 px-2 flex justify-start flex-col items-start w-full">
        <h3 className="text-[.85rem] font-semibold text-[#7A645B] font-roboto w-full text-left overflow-hidden text-ellipsis line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[#333333] font-roboto text-sm">
          PKR {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
