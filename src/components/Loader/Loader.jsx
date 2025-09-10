import React from "react";

const Loader = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    xlarge: "w-20 h-20",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-main rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;
