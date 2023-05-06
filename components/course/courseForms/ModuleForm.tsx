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
        <div className="form-control">
          <label htmlFor="title" className="label">Título</label>
          <Field id="title" name="title" placeholder="Título do módulo" className="input border-gray-600" />
          <ErrorMessage name="title" component="div" className="text-error" />
        </div>
  
        <div className="form-control">
          <label htmlFor="description" className="label">Descrição</label>
          <Field id="description" name="description" placeholder="Descrição do módulo" className="input border-gray-600" />
          <ErrorMessage name="description" component="div" className="text-error" />
        </div>
  
        <button type="submit" className="btn btn-primary mt-5">Criar Módulo</button>
      </Form>
    )}
  </Formik>
  
  );
};

export default ModuleForm;