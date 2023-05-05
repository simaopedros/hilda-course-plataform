// pages/contact.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Contato</title>
      </Head>
      <h1 className="text-4xl font-bold mb-6">Entre em contato</h1>
      <p className="text-gray-700 text-center mb-8 max-w-xl">
        Se você tiver alguma dúvida ou quiser saber mais sobre nossos serviços, não hesite em entrar em contato conosco.
      </p>
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nome
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Seu nome" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Seu email" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Mensagem
            </label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none" id="message" placeholder="Digite sua mensagem"></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
      <Link href="/"  className="mt-8 text-blue-600 hover:text-blue-800">Voltar para a página inicial
      </Link>
    </div>
  );
};

export default Contact;
