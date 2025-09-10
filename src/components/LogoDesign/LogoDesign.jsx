import React from "react";
import "./LogoDesign.css";
import { FaWhatsapp } from "react-icons/fa";
import { PiWhatsappLogoDuotone } from "react-icons/pi";

const LogoDesign = () => {
  return (
    <div className="relative fade-in max-w-[602px">
      <img src="/AuthBg.png" className="w-fit h-[105vh]" />
      <div className="absolute bottom-7 right-[15%] h-[30vh] flex flex-col justify-between">
        <div className="w-full flex justify-center items-center">
          <img src="/Logo1.svg" className="w-[420px] pl-13" />
        </div>
        <div className="flex flex-col px-4 gap-y-2 pb-4 items-start">
          <div className="text-white flex gap-x-2">
            <div className="whitespace-nowrap font-semibold underline font-quicksand">
              Store Address:
            </div>
            <div className="flex flex-col gap-y-1">
              <a
                href="https://maps.app.goo.gl/d3dgRw1EhuHpAtKB9"
                className="hover:underline flex items-start gap-2 text-left font-quicksand"
              >
                Shop No. 22 Abbas Computer Market, Near Gul Haji Plaza,
                University Road Peshawar
              </a>
              <a
                href="https://wa.me/+923159166758"
                className="hover:underline flex items-center gap-2 gap-x-1"
              >
                {/* <div className="flex items-center text-xl font-semibold font-quicksand gap-x-1 text-white"> */}
                <PiWhatsappLogoDuotone className="text-[#3fb62e] text-2xl" />{" "}
                +92315-9166758
              </a>

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoDesign;
