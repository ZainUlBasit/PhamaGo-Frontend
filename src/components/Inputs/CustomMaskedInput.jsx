import React from "react";

const CustomMaskedInput = ({
  LabelName,
  className,
  placeholder,
  Value,
  setValue,
  disabled,
  type,
  mask,
  maskChar = "_",
}) => {
  // Function to apply mask to input value
  const applyMask = (inputValue, maskPattern) => {
    if (!maskPattern) return inputValue;
    
    let maskedValue = "";
    let inputIndex = 0;
    
    for (let i = 0; i < maskPattern.length && inputIndex < inputValue.length; i++) {
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
      if (maskPattern[i] === "9" || maskPattern[i] === "A" || maskPattern[i] === "*") {
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
    <div className="flex flex-col gap-y-1 font-roboto w-full">
      <label htmlFor="" className="text-black">
        {LabelName}
      </label>
      <input
        type={type ? type : "text"}
        className={`bg-[#F5F5F5] text-black font-roboto border border-gray-300 rounded-[7.94px] py-3 px-3 outline-none w-full ${className} text-[1rem]`}
        placeholder={placeholder}
        value={Value}
        onChange={handleInputChange}
        disabled={disabled ? true : false}
        maxLength={mask ? mask.length : undefined}
      />
    </div>
  );
};

export default CustomMaskedInput;
