// components/supplementaryMaterialButton/SupplementaryMaterialButton.tsx

import SupleMaterial from '@/types/SuplementarMaterial';
import React from 'react';


interface SupplementaryMaterialButtonProps {
  material: SupleMaterial;
}

const SupplementaryMaterialButton: React.FC<SupplementaryMaterialButtonProps> = ({
  material,
}) => {
  const handleButtonClick = () => {
    window.open(material.link, '_blank');
  };

  return (
    <div >
      <button
        onClick={handleButtonClick}
        className="btn-s btn-active btn-link"
      >
        {material.formato ==
          "LINK" ?
          (<button className="btn  gap-2">
            Acessar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </button>) :
          (<button className="btn ">
          Baixar
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>)}
      </button>

    </div>
  );
};

export default SupplementaryMaterialButton;
