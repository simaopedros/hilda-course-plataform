// components/course/courseForms/UpDownArrows.tsx

import React from "react";
import { FiChevronsUp, FiChevronsDown } from "react-icons/fi";

const UpDownArrows: React.FC = () => {
  return (
    <div className="flex flex-col mr-2">
      <FiChevronsUp className="h-2 w-2 text-gray-500" />
      <FiChevronsDown className="h-2 w-2 text-gray-500" />
    </div>
  );
};

export default UpDownArrows;
