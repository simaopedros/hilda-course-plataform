// pages/terms.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Termos de Uso</title>
      </Head>
      <h1 className="text-4xl font-bold mb-6">Termos de Uso</h1>
      <div className="w-full max-w-xl mb-8">
        <p className="text-gray-700 mb-4">
          Os termos de uso a seguir se aplicam ao uso deste site e de todos os produtos e serviços oferecidos.
        </p>
        <h2 className="text-2xl font-bold mb-2">1. Aceitação dos Termos</h2>
        <p className="text-gray-700 mb-4">
          Ao utilizar este site, você concorda em cumprir e ficar vinculado por estes termos de uso.
        </p>
        <h2 className="text-2xl font-bold mb-2">2. Modificação dos Termos</h2>
        <p className="text-gray-700 mb-4">
          Reservamo-nos o direito de modificar estes termos a qualquer momento, sem aviso prévio. É responsabilidade do usuário verificar periodicamente os termos de uso.
        </p>
        <h2 className="text-2xl font-bold mb-2">3. Uso do Conteúdo</h2>
        <p className="text-gray-700 mb-4">
          O conteúdo deste site é protegido por direitos autorais e não pode ser usado para fins comerciais sem a nossa autorização prévia por escrito.
        </p>
        {/* Continue adicionando seções conforme necessário */}
      </div>
      <Link href="/" className="mt-8 text-blue-600 hover:text-blue-800">Voltar para a página inicial
      </Link>
    </div>
  );
};

export default Terms;
