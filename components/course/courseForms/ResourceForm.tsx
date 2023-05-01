import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export interface ResourceFormValues {
  UUIDAula?: string,
  formatFile?: string,
  title?: string,
  linkFile?: string
}

const ResourceFormSchema = Yup.object().shape({
  title: Yup.string().required('O nome do recurso é obrigatório'),
  formatFile: Yup.string().oneOf(['document', 'external-link'], 'Selecione um tipo de recurso válido').required('O tipo de recurso é obrigatório'),
  linkFile: Yup.string().url('Insira uma URL válida').required('A URL do recurso é obrigatória'),
});

interface ResourceFormProps {
  onSubmit: (values: ResourceFormValues) => void;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        title: '',
        formatFile: 'document',
        linkFile: '',
      }}
      validationSchema={ResourceFormSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text">Nome do recurso</span>
            </label>
            <Field id="title" name="title" placeholder="Nome do recurso" className="input border-gray-600" />
            <ErrorMessage name="title" component="span" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="formatFile" className="label">
              <span className="label-text">Tipo de recurso</span>
            </label>
            <Field as="select" id="formatFile" name="formatFile" className="select border-gray-600">
              <option value="document">Documento</option>
              <option value="external-link">Link externo</option>
            </Field>
            <ErrorMessage name="formatFile" component="span" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="linkFile" className="label">
              <span className="label-text">URL do recurso</span>
            </label>
            <Field id="linkFile" name="linkFile" placeholder="https://example.com/resource" className="input border-gray-600" />
            <ErrorMessage name="linkFile" component="span" className="error" />
          </div>

          <button type="submit" className="btn btn-primary mt-4">Criar Recurso</button>
        </Form>
      )}
    </Formik>
  );
};

export default ResourceForm;