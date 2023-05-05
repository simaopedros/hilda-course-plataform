import React, { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import useAuth from '@/utils/hooks/useAuth';
import NavbarLogoff from '../navbar/NavbarLogoff';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {user ? <Navbar /> : <NavbarLogoff />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
