import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/Slices/CategorySlice";
import CategoryItem from "./CategoryItem";
import Loader from "../Loader/Loader";

const Category = ({ selectedCategories, setSelectedCategories }) => {
  const dispatch = useDispatch();
  const { data: categories, loading } = useSelector((state) => state.CategoryState);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCheckboxChange = (category) => {
    console.log("yes");

    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="p-4 px-6 bg-white shadow-md border-r-2 border-r-main rounded-r-xl min-w-[250px] max780:min-w-[200px] min-h-[90vh] mt-1 max718:hidden z-10">
      <h2 className="text-xl font-bold mb-4">Category</h2>
      <div className=""></div>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader size="medium" />
        </div>
      ) : (
        categories?.map((category, index) => (
          <div key={category._id || index} className="flex items-center mb-2">
            <CategoryItem
              name={category.name}
              cat_id={category._id}
              index={index}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Category;
