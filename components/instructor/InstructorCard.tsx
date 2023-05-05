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
    <div className="instructor-card bg-white shadow-md rounded-md p-4 mb-4">
    <div className="flex items-center">
      <Image className="instructor-avatar w-16 h-16 rounded-full mr-4" src={avatarUrl} alt={name} width={50} height={50} />
      <div>
        <h3 className="instructor-name text-xl font-semibold">{name}</h3>
        <p className="instructor-expertise text-sm text-gray-600">{expertise}</p>
      </div>
    </div>
  </div>
  );
};

export default InstructorCard;
