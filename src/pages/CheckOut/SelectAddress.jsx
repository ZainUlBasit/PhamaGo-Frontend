import React, { useEffect, useState } from "react";
import AddressSelector from "../../components/Select/AddressSelector";
import { FaPlus } from "react-icons/fa";
import AddAddressModal from "../../components/Modals/AddAddressModal";
import { useNavigate } from "react-router-dom";
import OrderNavs from "../../components/OrderNav/OrderNavs";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/Slices/CartSlice";
import { AddAddressToOrderApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { fetchCustomersAddress } from "../../store/Slices/CustomerAddressSlice";
const user = JSON.parse(localStorage.getItem("user"));
const uuid_order_no = localStorage.getItem("uuid");

const SelectAddress = () => {
  const navigate = useNavigate();
  const [OpenAddModal, setOpenAddModal] = useState(false);
  const [SelectedAddress, setSelectedAddress] = useState("");
  const items = [
    {
      id: 1,
      name: "Skullcandy - Crusher anc 2 wireless headphones",
      color: "Black",
      price: 299.99,
    },
    {
      id: 2,
      name: "APPLE AirPods Pro MagSafe Case",
      color: "White",
      price: 399.99,
    },
    { id: 3, name: "RODE PodMic", color: "Black", price: 199.99 },
  ];

  const currentDate = new Date();
  const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 7));

  const formattedDate = futureDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const CartState = useSelector((state) => state.CartState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart(uuid_order_no));
    setSelectedAddress(CartState.data?.address);
  }, []);
  useEffect(() => {
    if (CartState.data) {
      setSelectedAddress(CartState.data.address);
    }
    console.log("CartState", CartState.data.shipping_fee);
  }, [CartState]);
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="flex mt-[125px] flex-col gap-y-3 pt-3 w-[70%] max990:w-[80%] max400:w-[90%]"
        id="cart"
      >
        <OrderNavs />
        <div className="flex gap-x-10 justify-between items-start gap-y-3 flex-wrap">
          <div className="flex flex-col gap-y-2 max820:w-full">
            <AddressSelector
              SelectedAddress={SelectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <hr />
            <button
              className="flex items-center gap-x-2 text-main ml-4 mt-1 font-roboto text-[1rem] font-normal group transition-all duration-700 ease-in-out border-2 border-white hover:border-main w-fit px-2 py-1 rounded-md hover:bg-main hover:text-white"
              onClick={() => {
                setOpenAddModal(true);
              }}
            >
              <FaPlus />
              Add New Address
            </button>
          </div>

          <div className="border-[1px] flex flex-col gap-y-2 shadow-lg p-8 max365:p-4 max-w-[400px] min-w-[280px] max1050:max-w-full max1050:w-full">
            <h2 className="font-bold mb-4 mt-1 font-roboto">Order Summary</h2>
            <div className="flex flex-col gap-y-4 font-roboto text-[.9rem]">
              <div className="flex justify-between gap-x-8">
                <div className="">Amount</div>
                <div className="">
                  Rs{" "}
                  {CartState.data &&
                  Array.isArray(CartState.data.items) &&
                  CartState.data.items.length !== 0
                    ? CartState.data.items
                        .reduce(
                          (total, item) => total + item.price * item.qty,
                          0
                        )
                        .toLocaleString()
                    : 0}
                </div>
              </div>
              <div className="flex justify-between gap-x-8">
                <div className="">Shipping</div>
                <div className="">
                  {Number(CartState?.data?.shipping_fee) === 0
                    ? "-"
                    : `Rs ${Number(
                        CartState?.data?.shipping_fee
                      ).toLocaleString()}`}
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-y-4 font-roboto text-[.9rem]">
              <div className="flex justify-between gap-x-8">
                <span>Total Amount</span>
                <span>
                  Rs{" "}
                  {CartState.data &&
                  Array.isArray(CartState.data.items) &&
                  CartState.data.items.length !== 0
                    ? (
                        Number(
                          CartState.data.items
                            .reduce(
                              (total, item) => total + item.price * item.qty,
                              0
                            )
                            .toFixed(2)
                        ) + Number(CartState?.data?.shipping_fee)
                      ).toLocaleString()
                    : 0}
                </span>
              </div>
              <div className="flex justify-between gap-x-8">
                <span>Estimated Delivery by</span>
                <span>{formattedDate}</span>
              </div>
            </div>
            <button
              className="mt-4 bg-[#ffde59] hover:bg-pink-600 hover:rounded-[.3rem] transition-all ease-in-out duration-700 text-white py-2 px-4 font-roboto text-[.9rem]"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const response = await AddAddressToOrderApi(
                    CartState.data._id,
                    {
                      address: SelectedAddress,
                      shipping_fee: Number(localStorage.getItem("shipping")),
                    }
                  );
                  if (response.data.success) {
                    SuccessToast(response.data.data.msg);
                    navigate("/checkout/select-shipping");
                  } else {
                    ErrorToast(response.data.error.msg);
                  }
                } catch (err) {
                  ErrorToast(err?.response?.data?.message);
                  console.log("err", err);
                }
              }}
            >
              Proceed to Shipping
            </button>
          </div>
        </div>
        {AddAddressModal && (
          <AddAddressModal setOpen={setOpenAddModal} open={OpenAddModal} />
        )}
      </div>
    </div>
  );
};

export default SelectAddress;
