// pages/404.tsx
import React from 'react';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
<div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
      <p className="text-gray-600 text-center mb-8">
        Desculpe, a página que você está procurando não foi encontrada. Verifique o URL ou retorne à página inicial.
      </p>
      <Link href="/">
        <a className="btn btn-primary">
          Voltar para a página inicial
        </a>
      </Link>
    </div>
  </div>
</div>
  );
};

export default Custom404;
