import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export interface LessonFormValues {
  moduleId: number;
  title: string;
  description: string;
  duration: number;
  videoUrl?: string;
  readingMaterial?: string;
  type?: string;
}

const LessonFormSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  duration: Yup.number().required('A duração é obrigatória'),
  videoUrl: Yup.string().url('Insira uma URL válida'),
  readingMaterial: Yup.string(),
});

interface LessonFormProps {
  onSubmit: (values: LessonFormValues) => void;
  onCancel: () => void; // Adicione esta linha
  selectedModuleIndex: number | null; // adicione essa prop
}



const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, onCancel, selectedModuleIndex }) => {
  return (
    <Formik
      initialValues={{
        moduleId: selectedModuleIndex !== null ? selectedModuleIndex : 0, // adicione este campo inicial
        title: '',
        description: '',
        duration: 0,
        videoUrl: '',
        readingMaterial: '',
      }}
      validationSchema={LessonFormSchema}
      onSubmit={onSubmit}
    >

      {() => (
        <Form>
          <Field type="hidden" id="moduleId" name="moduleId" />

          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">Título</label>
            <Field id="title" name="title" placeholder="Título da aula" className="input" />
            <ErrorMessage name="title" component="div" className="text-red-600" />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Descrição</label>
            <Field id="description" name="description" placeholder="Descrição da aula" className="input" />
            <ErrorMessage name="description" component="div" className="text-red-600" />
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="block mb-2">Duração</label>
            <Field id="duration" name="duration" type="number" min="0" placeholder="Duração em minutos" className="input" />
            <ErrorMessage name="duration" component="div" className="text-red-600" />
          </div>

          <div className="mb-4">
            <label htmlFor="videoUrl" className="block mb-2">URL do Vídeo</label>
            <Field id="videoUrl" name="videoUrl" placeholder="https://example.com/video.mp4" className="input" />
            <ErrorMessage name="videoUrl" component="div" className="text-red-600" />
          </div>

          <div className="mb-4">
            <label htmlFor="readingMaterial" className="block mb-2">Material de leitura</label>
            <Field as="textarea" id="readingMaterial" name="readingMaterial" placeholder="Insira o material de leitura aqui" className="input input-bordered h-24" />
            <ErrorMessage name="readingMaterial" component="div" className="text-red-600" />
          </div>

          <button type="submit" className="btn btn-primary">Criar Aula</button>
          
          <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>Cancelar</button>

        </Form>
      )}
    </Formik>
  );
};

export default LessonForm;