import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/Slices/CategorySlice";
import Loader from "../Loader/Loader";

export const categories = [
  { name: "Mouse", count: 10 },
  { name: "Keyboard", count: 15 },
  { name: "Speaker", count: 20 },
  { name: "Cables", count: 5 },
  { name: "Joystick", count: 17 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
];

const MobileCategory = ({ selectedCategories, setSelectedCategories }) => {
  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const dispatch = useDispatch();
  const { data: categories, loading } = useSelector((state) => state.CategoryState);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex justify-between items-center flex-col px-2 text-main  w-full">
      <div className="hidden max718:flex w-full text-white bg-main font-quicksand text-2xl font-bold px-4 py-3 rounded-t-xl">
        Category
      </div>
      <div className="bg-white mt-0 gap-x-3 max-w-screen overflow-x-auto h-fit py-3 hidden max718:flex px-3  border-y-2  border-y-sec border-x-2  border-x-main  mb-3 w-full  rounded-b-xl">
        {loading ? (
          <div className="flex justify-center items-center w-full py-4">
            <Loader size="medium" />
          </div>
        ) : (
          categories.map((category, index) => (
            <div
              key={index}
              className={`flex items-center rounded-lg h-full whitespace-nowrap bg-main px-3 text-white border-main border-2 ${
                selectedCategories.includes(category._id) && "bg-sec !text-white"
              } transition-all  ease-in-out  duration-700`}
              style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
            >
              <input
                type="checkbox"
                id={category.name}
                checked={selectedCategories.includes(category._id)}
                onChange={() => handleCheckboxChange(category._id)}
                className="appearance-none cursor-pointer"
              />
              <label
                htmlFor={category.name}
                className={`text-white w-full rounded-lg font-quicksand font-bold text-xl`}
              >
                {category.name}
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MobileCategory;
