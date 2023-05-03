// components/userProfile/UserProfile.tsx

import User from '@/types/User';
import Image from 'next/image';
import React, { useState } from 'react';

interface UserProfileProps {
  user: User;
  onSubmit: (updatedUser: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onSubmit }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(updatedUser);
    setEditMode(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col md:flex-row items-center">
        <Image
          src={user.profilePicture || '/path/to/default-profile-picture.png'}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="border-2 border-gray-300 p-2 rounded-lg"
              />
              <input
                disabled={true}
                type="text"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className="border-0 p-2 rounded-lg mt-4"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded"
              >
                Salvar
              </button>
            </form>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={() => setEditMode(true)}
              >
                Editar
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Descrição</h3>
        {editMode ? (
          <textarea
            name="description"
            value={updatedUser.description}
            className="border-2 border-gray-300 p-2 rounded-lg w-full mt-2"
            rows={5}
          />
        ) : (
          <p className="text-gray-600 cursor-pointer" onClick={() => setEditMode(true)}>
            {user.description || 'Clique aqui para adicionar uma descrição.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
