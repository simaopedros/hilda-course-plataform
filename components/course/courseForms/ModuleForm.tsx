import React from 'react'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export interface ModuleFormValues {
    title: string;
    description: string;
  }
  

const ModuleFormSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
});

interface ModuleFormProps {
  onSubmit: (values: ModuleFormValues) => void;
  onCancel: () => void; // Adicione esta linha
}

const ModuleForm: React.FC<ModuleFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        id: 0,
        title: '',
        description: '',
      }}
      validationSchema={ModuleFormSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">Título</label>
            <Field id="title" name="title" placeholder="Título do módulo" className="input border-gray-600" />
            <ErrorMessage name="title" component="div" className="text-red-600" />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Descrição</label>
            <Field id="description" name="description" placeholder="Descrição do módulo" className="input border-gray-600" />
            <ErrorMessage name="description" component="div" className="text-red-600" />
          </div>

          <button type="submit" className="btn btn-primary">Criar Módulo</button>
        </Form>
      )}
    </Formik>
  );
};

export default ModuleForm;