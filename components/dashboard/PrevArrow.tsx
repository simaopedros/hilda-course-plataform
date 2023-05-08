// components/dashboard/PrevArrow.tsx
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

const PrevArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full ml-4 z-10 cursor-pointer"
      onClick={onClick}
      style={style}
    >
      <AiOutlineLeft className={`${className} h-8 w-8 text-gray-500 hover:text-gray-800`} />
    </div>
  );
};

export default PrevArrow;
