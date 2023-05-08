// pages/profile.tsx

import UserProfile from '@/components/profile/UserProfile';
import User from '@/types/User';
import withAuth from '@/utils/withAuth';
import React, { useState } from 'react';


const Profile: React.FC = () => {
  const initialUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password',
    userType: 'student',
    profilePicture: '/path/to/profile-picture.jpg',
    description: 'A passionate learner and enthusiastic student.',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [user, setUser] = useState<User>(initialUser);

  const handleUpdateProfile = (updatedUser: User) => {
    // Aqui você pode fazer chamadas à API para atualizar o perfil do usuário.
    setUser(updatedUser);
  };

  return (

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Perfil</h1>
        <UserProfile user={user} onSubmit={handleUpdateProfile} />
      </div>

  );
};

export default withAuth(Profile);
