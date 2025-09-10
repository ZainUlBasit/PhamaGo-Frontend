import React from "react";

const AnimatedMaskedInput = ({
  placeholder,
  Type,
  Value,
  setValue,
  id,
  mask,
  maskChar = "_",
}) => {
  // Function to apply mask to input value
  const applyMask = (inputValue, maskPattern) => {
    if (!maskPattern) return inputValue;

    let maskedValue = "";
    let inputIndex = 0;

    for (
      let i = 0;
      i < maskPattern.length && inputIndex < inputValue.length;
      i++
    ) {
      if (maskPattern[i] === "9") {
        // Only allow digits
        if (/[0-9]/.test(inputValue[inputIndex])) {
          maskedValue += inputValue[inputIndex];
          inputIndex++;
        } else {
          break;
        }
      } else if (maskPattern[i] === "A") {
        // Only allow letters
        if (/[a-zA-Z]/.test(inputValue[inputIndex])) {
          maskedValue += inputValue[inputIndex];
          inputIndex++;
        } else {
          break;
        }
      } else if (maskPattern[i] === "*") {
        // Allow any character
        maskedValue += inputValue[inputIndex];
        inputIndex++;
      } else {
        // Fixed character in mask
        maskedValue += maskPattern[i];
      }
    }

    return maskedValue;
  };

  // Function to remove mask characters for the actual value
  const removeMask = (maskedValue, maskPattern) => {
    if (!maskPattern) return maskedValue;

    let cleanValue = "";
    for (let i = 0; i < maskedValue.length; i++) {
      if (
        maskPattern[i] === "9" ||
        maskPattern[i] === "A" ||
        maskPattern[i] === "*"
      ) {
        cleanValue += maskedValue[i];
      }
    }
    return cleanValue;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const maskedValue = applyMask(inputValue, mask);
    setValue(maskedValue);
  };
  return (
    <div class="relative w-[100%] group">
      <span class="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-main to-sec2 opacity-70 transition-all duration-300 group-focus-within:opacity-100"></span>
      <input
        type={Type ? Type : "text"}
        id={id}
        placeholder=""
        class="peer w-full pl-6 pr-4 pt-[1.7rem] pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-main focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
        value={Value}
        onChange={handleInputChange}
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

export default AnimatedMaskedInput;
