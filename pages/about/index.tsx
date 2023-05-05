// pages/about.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Sobre nós</title>
      </Head>
      <h1 className="text-4xl font-bold mb-6">Sobre nós</h1>
      <p className="text-gray-700 text-center mb-8 max-w-xl">
        Somos uma empresa fictícia focada em fornecer soluções incríveis e inovadoras para nossos clientes. Nossa equipe é composta por profissionais talentosos e apaixonados que se dedicam a criar um futuro melhor para todos.
      </p>
      <p className="text-gray-700 text-center mb-8 max-w-xl">
        Acreditamos na importância da inovação e do trabalho em equipe para levar nosso negócio adiante. Estamos sempre em busca de novas ideias e oportunidades para crescer e melhorar nossos serviços.
      </p>
      <Link href="/" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          Voltar para a página inicial

      </Link>
    </div>
  );
};

export default About;
