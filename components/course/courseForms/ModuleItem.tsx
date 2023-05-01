import React from 'react';
import { FiChevronsDown, FiChevronsUp } from 'react-icons/fi';

interface ModuleItemProps {
  title: string;
  description: string;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ title, description }) => {
  return (
    <div className={`collapse shadow-md rounded-lg bg-white mb-2 `}>
      <input type="checkbox"/>
      <div className="collapse-title font-semibold text-xs">
        {title} OLA
      </div>
      <div className="collapse-content">
        <p>{description}</p>
      </div>
    </div>
    
  );
};

export default ModuleItem;
