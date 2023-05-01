import React from 'react';

export type ClassFormValues = {
    title: string;
    urlAula?: string;
    duration?: number;
    description: string;
  };
  
  

  interface ClassFormProps {
    onSubmit: (values: ClassFormValues) => void;
    initialValues?: ClassFormValues | null | undefined;
  }
  
  

const ClassForm: React.FC<ClassFormProps> = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = React.useState(initialValues?.title || '');
  const [urlAula, setUrlAula] = React.useState(initialValues?.urlAula || '');
  const [duration, setDuration] = React.useState(initialValues?.duration || 0);
  const [description, setDescription] = React.useState(initialValues?.description || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ title, urlAula, duration, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Título</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded"
        />
      </div>

      <div>
        <label htmlFor="urlAula" className="block text-sm font-medium">( URL | ID ) da Aula </label>
        <input
          id="urlAula"
          type="text"
          value={urlAula}
          onChange={(e) => setUrlAula(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded"
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium">Duração (minutos)</label>
        <input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full p-2 border border-gray-600 rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
};

export default ClassForm;
