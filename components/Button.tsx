import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  classes?: string;
  onClickEvent?: (e: React.MouseEvent) => void
}

const Button = ({ children, width, height, classes, onClickEvent}: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`h-[${height || "auto"}] w-[${
        width || "auto"
      }] bg-[#651DFF] text-white py-4 px-6 rounded-full text-xl ${classes}`}
       onClick={(e) => onClickEvent!(e)}
    >
      {children}
    </button>
  );
};

export default Button;
