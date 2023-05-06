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
    <div className="form-control">
      <label htmlFor="title" className="label">Título</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input border-gray-600"
      />
    </div>
  
    <div className="form-control">
      <label htmlFor="urlAula" className="label">( URL | ID ) da Aula </label>
      <input
        id="urlAula"
        type="text"
        value={urlAula}
        onChange={(e) => setUrlAula(e.target.value)}
        className="input border-gray-600"
      />
    </div>
  
    <div className="form-control">
      <label htmlFor="duration" className="label">Duração (minutos)</label>
      <input
        id="duration"
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        className="input border-gray-600"
      />
    </div>
  
    <div className="form-control">
      <label htmlFor="description" className="label">Descrição</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea border-gray-600"
      />
    </div>
  
    <button type="submit" className="btn btn-primary">
      Salvar
    </button>
  </form>
  
  );
};

export default ClassForm;
