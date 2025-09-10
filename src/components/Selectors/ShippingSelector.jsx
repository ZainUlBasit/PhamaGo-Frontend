import React, { useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { Popover, Typography } from "@mui/material";
import AnimatedPopover from "../Inputs/AnimatedPopover";

const ShippingSelector = ({ SelectedShipping, setSelectedShipping }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("Closing popover...");
    setAnchorEl(null); // ✅ Ensures popover closes
  };
  const open = Boolean(anchorEl);
  const id = open ? "my-popover" : undefined;

  return (
    <div className="flex flex-col px-0 gap-y-4 w-full">
      <AnimatedPopover
        placeholder={"Shipping"}
        id={"Shipping"}
        onClick={handleClick}
        Value={SelectedShipping}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadiusBottomLeftRadius: "25px", // Add rounded corners
            borderRadiusBottomRightRadius: "25px", // Add rounded corners
            backgroundColor: "white", // Set background color to white
            width: anchorEl ? anchorEl.offsetWidth : "auto",
            overflow: "hidden", // Hide overflowing content
            marginTop: "3px",
            boxShadow: "none",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography
          sx={{
            pt: 2,
            pl: 4,
            pr: 5,
            pb: 5,
            borderColor: "#465462",
            backgroundColor: "#465462",
            // width: "400px",
            overflow: "hidden",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <div className="bg-[#465462] text-white font-quicksand  flex flex-col justify-center items-center rounded-[50px]">
            <div className="w-full flex flex-col justify-between gap-y-3 items-start">
              {["Asia Cargo", "Tm Cargo", "TCS", "M&P", "Other"].map(
                (tab, i) => {
                  return (
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => {
                        setSelectedShipping(tab);
                        handleClose();
                      }}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={tab === SelectedShipping}
                      />
                      <span>{tab}</span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </Typography>
      </Popover>
    </div>
  );
};

export default ShippingSelector;
