// components/dashboard/NextArrow.tsx
import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const NextArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full mr-4 z-10 cursor-pointer"
      onClick={onClick}
      style={style}
    >
      <AiOutlineRight className={`${className} h-8 w-8 text-gray-500 hover:text-gray-800`} />
    </div>
  );
};

export default NextArrow;
