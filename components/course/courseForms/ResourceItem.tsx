// ResourceItem.tsx

import React from 'react';

interface ResourceItemProps {
  title: string;
  formatFile: string;
  linkFile: string;
  onDoubleClick?: () => void;
  onClick?: () => void;
}

const ResourceItem: React.FC<ResourceItemProps> = ({
  title,
  formatFile,
  linkFile,
  onDoubleClick,
  onClick,
}) => {
  return (
<div
  className="flex items-center space-x-4 p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 bg-white mb-3"
  onDoubleClick={onDoubleClick}
  onClick={onClick}
>
  <div className="flex-grow">
    <p className="font-medium text-xs">{title}</p>
    <p className="text-xs text-gray-500">Formato: {formatFile}</p>
    <a
      href={linkFile}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-blue-600 underline"
    >
      Ver recurso
    </a>
  </div>
</div>

  );
};

export default ResourceItem;
