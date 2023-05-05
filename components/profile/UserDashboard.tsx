// components/userDashboard/UserDashboard.tsx

import User from '@/types/User';
import Image from 'next/image';
import React from 'react';



const UserDashboard: React.FC<User> = ({ name, profilePicture, description }) => {
  return (
<div className="bg-white rounded-lg shadow p-6">
  <div className="flex items-center space-x-4">
    <div className="relative">
      <Image src={profilePicture as string} alt={name as string} className="w-20 h-20 rounded-full" width={50} height={50} />
      <div className="absolute bottom-0 right-0 bg-green-500 text-white font-semibold text-xs rounded-full px-2 py-1">
        Online
      </div>
    </div>
    <div>
      <h2 className="text-2xl font-semibold font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 mt-4 transition-colors focus:outline-none">
        Edit Profile
      </button>
    </div>
  </div>
</div>

  );
};

export default UserDashboard;
