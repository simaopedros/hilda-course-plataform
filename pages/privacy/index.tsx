// pages/privacy.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Política de Privacidade</title>
      </Head>
      <h1 className="text-4xl font-bold mb-6">Política de Privacidade</h1>
      <div className="w-full max-w-xl mb-8">
        <p className="text-gray-700 mb-4">
          A política de privacidade a seguir se aplica ao uso deste site e de todos os produtos e serviços oferecidos.
        </p>
        <h2 className="text-2xl font-bold mb-2">1. Coleta de Informações</h2>
        <p className="text-gray-700 mb-4">
          Podemos coletar informações pessoais identificáveis, como nome, endereço de e-mail e outras informações relevantes, quando os usuários visitam nosso site ou se inscrevem em nossos serviços.
        </p>
        <h2 className="text-2xl font-bold mb-2">2. Uso de Informações</h2>
        <p className="text-gray-700 mb-4">
          As informações que coletamos são usadas para melhorar nossos serviços, personalizar a experiência do usuário e responder a solicitações de suporte.
        </p>
        <h2 className="text-2xl font-bold mb-2">3. Proteção de Informações</h2>
        <p className="text-gray-700 mb-4">
          Empregamos medidas de segurança adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
        </p>
        {/* Continue adicionando seções conforme necessário */}
      </div>
      <Link href="/" className="mt-8 text-blue-600 hover:text-blue-800">Voltar para a página inicial
      </Link>
    </div>
  );
};

export default Privacy;
