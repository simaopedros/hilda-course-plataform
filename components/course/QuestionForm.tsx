// components/questionForm/QuestionForm.tsx

import React, { useState } from 'react';

interface QuestionFormProps {
  onSubmit: (question: string) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(question);
    setQuestion('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Faça uma pergunta</h3>
      <textarea
        value={question}
        onChange={handleChange}
        placeholder="Digite sua pergunta aqui..."
        rows={4}
        className="w-full border-2 border-gray-300 p-2 rounded-lg resize-none"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Enviar
      </button>
    </form>
  );
};

export default QuestionForm;
