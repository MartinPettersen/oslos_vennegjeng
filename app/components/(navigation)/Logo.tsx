import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className=" hover:text-orange-500 font-bold text-4xl sm:text-6xl flex items-center justify-center"
    >
      Oslo's Venner
    </Link>
  );
};

export default Logo;
