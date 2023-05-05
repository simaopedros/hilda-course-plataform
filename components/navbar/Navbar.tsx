// components/navbar/Navbar.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAuth, signOut } from 'firebase/auth';
import { appFirebase } from '@/data/sdk';


const Navbar = () => {

  const handleLogout = async () => {
    const auth = getAuth(appFirebase);
    try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };
  

  
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">SuaMarca
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src='https://pbs.twimg.com/profile_images/1596571012237254657/M37hirAG_400x400.jpg' alt={'Avatar'} width={40} height={40} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                
              </Link>
            </li>
            <li>
              <Link href="/settings">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/logout" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
