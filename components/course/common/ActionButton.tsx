// components/common/ActionButton.tsx

import React from "react";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`btn-block bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
      {label}
    </button>
  );
};

export default ActionButton;
