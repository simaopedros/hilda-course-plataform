// pages/instructors.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

type Instructor = {
  id: number;
  name: string;
  bio: string;
};

const instructorsData: Instructor[] = [
  { id: 1, name: 'Instrutor 1', bio: 'Especialista em Desenvolvimento Web' },
  { id: 2, name: 'Instrutor 2', bio: 'Especialista em Machine Learning' },
  { id: 3, name: 'Instrutor 3', bio: 'Especialista em Segurança da Informação' },
];

const Instructors: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    // Simulando uma chamada à API para obter a lista de instrutores
    setTimeout(() => {
      setInstructors(instructorsData);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Instrutores</title>
      </Head>
      <h1 className="text-4xl font-bold mb-6">Instrutores</h1>
      {instructors.length === 0 ? (
        <p className="text-xl">Carregando instrutores...</p>
      ) : (
        <ul className="w-full max-w-md">
          {instructors.map((instructor) => (
            <li key={instructor.id} className="mb-4">
              <div className="p-4 bg-gray-200 rounded-lg">
                <h2 className="text-2xl font-bold">{instructor.name}</h2>
                <p>{instructor.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Instructors;
