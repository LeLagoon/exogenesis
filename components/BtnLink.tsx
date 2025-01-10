import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  classes?: string;
  href: string;
}

const Button = ({ children, width, height, classes, href }: ButtonProps) => {
  return (
    <Link
      type="submit"
      className={`h-[${height || "auto"}] w-[${
        width || "auto"
      }] bg-[#651DFF] text-white py-4 px-6 rounded-full text-xl ${classes}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Button;
