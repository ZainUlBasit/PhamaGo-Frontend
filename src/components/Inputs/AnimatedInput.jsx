import React from "react";

const AnimatedInput = ({ placeholder, Type, Value, setValue, id }) => {
  return (
    <div class="relative w-[100%] group">
      <span class="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-main to-sec2 opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
      <input
        type={Type ? Type : "text"}
        id={id}
        placeholder=""
        class="peer w-full pl-6 pr-4 pt-[1.7rem] pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-main focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
        value={Value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <label
        for="input"
        class="absolute left-6 top-[0.5rem] text-sm text-sec2 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[0.5rem] peer-focus:text-sm peer-focus:text-main peer-focus:font-semibold cursor-text"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default AnimatedInput;
