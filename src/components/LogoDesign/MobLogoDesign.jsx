import React from "react";

const MobLogoDesign = () => {
  return (
    <div className="relative w-full">
      <img src="/LogoBackG.svg" className="w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center max480:h-[90%]">
        <img
          src="/Logo1.svg"
          className="w-[300px] max480:w-[250px] max330:w-[200px] max300:w-[180px] max820:w-[350px]"
        />
      </div>
    </div>
  );
};

export default MobLogoDesign;
