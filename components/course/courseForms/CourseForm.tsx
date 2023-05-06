import React, { FC } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Module } from './ModuleList';

export interface CourseFormValues {
  title: string;
  description: string;
  coverImage: string;
  videoUrl: string;
  category: string;
  instructorId: string;
  modules: Module[];
  }

const CourseFormSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  coverImage: Yup.string().required('A imagem de capa é obrigatória'),
  videoUrl: Yup.string().required('A ID do vídeo é obrigatória'),
  category: Yup.string().required('A categoria é obrigatória'),
  prerequisites: Yup.string(),
});

interface CourseFormProps {
    onSubmit: (values: CourseFormValues) => void;
  }

  const CourseForm: FC<CourseFormProps> = ({ onSubmit }) => {
    return (
      <Formik
      initialValues={{
        title: '',
        description: '',
        coverImage: '',
        videoUrl: '',
        category: '',
        prerequisites: '',
      }}
      validationSchema={CourseFormSchema}
      onSubmit={(values) => {
        onSubmit(values as unknown as CourseFormValues);
      }}
    >
      {() => (
        <Form>
          <div className="form-control">
            <label htmlFor="title" className="label">
              Título
            </label>
            <Field name="title" type="text" className="input border-gray-600" />
            <ErrorMessage name="title" component="span" className="text-error" />
          </div>
    
          <div className="form-control">
            <label htmlFor="description" className="label">
              Descrição
            </label>
            <Field name="description" as="textarea" className="textarea border-gray-600" />
            <ErrorMessage name="description" component="span" className="text-error" />
          </div>
    
          <div className="form-control">
            <label htmlFor="coverImage" className="label">
              Imagem de capa
            </label>
            <Field name="coverImage" type="text" className="input border-gray-600" />
            <ErrorMessage name="coverImage" component="span" className="text-error" />
          </div>
    
          <div className="form-control">
            <label htmlFor="videoUrl" className="label">
              URL do vídeo de destaque
            </label>
            <Field name="videoUrl" type="text" className="input border-gray-600" />
            <ErrorMessage name="videoUrl" component="span" className="text-error" />
          </div>
    
          <div className="form-control">
            <label htmlFor="category" className="label">
              Categoria
            </label>
            <Field name="category" as="select" className="select border-gray-600">
              <option value="">Selecione a categoria</option>
              <option value="categoria1">Categoria 1</option>
              <option value="categoria2">Categoria 2</option>
            </Field>
            <ErrorMessage name="category" component="span" className="text-error" />
          </div>
    
          <div className="form-control">
            <label htmlFor="prerequisites" className="label">
              Pré-requisitos
            </label>
            <Field name="prerequisites" as="textarea" className="textarea border-gray-600" />
            <ErrorMessage name="prerequisites" component="span" className="text-error" />
          </div>
    
          <button type="submit" className="btn btn-primary mt-5">
            Criar curso
          </button>
        </Form>
      )}
    </Formik>
    
    );
  };
  
  export default CourseForm;