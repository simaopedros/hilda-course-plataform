// components/instructorCard/InstructorCard.tsx

import Image from 'next/image';
import React from 'react';

interface InstructorCardProps {
  name: string;
  avatarUrl: string;
  expertise: string;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ name, avatarUrl, expertise }) => {
  return (
    
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center">
        <Image className="w-16 h-16 rounded-full mr-4" src={avatarUrl} alt={name} width={50} height={50} />
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{expertise}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
