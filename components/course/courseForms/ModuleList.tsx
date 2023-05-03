// components/courseForms/ModuleList.tsx

import React, { useState } from 'react';
import LessonForm, { LessonFormValues } from './LessonForm';
//import { HandleLessonSubmitValues } from '@/pages/courses/create-course2';

export interface HandleLessonSubmitValues extends LessonFormValues {
  moduleId: number;
}
export interface Lesson {
  UUIDAula?: string
  UUIDModule?: string
  type?: string;
  title?: string;
  description?: string;
  duration?: number;
  videoUrl?: string;
  readingMaterial?: string;
}

export interface Module {
  UUIDCourse?: string;
  UIDModule?: string;
  displayOrder?: number;
  id?: number | string;
  title?: string;
  description?: string;
  lessons?: Lesson[];
}

interface ModuleListProps {
  modules: Module[];
  selectedModuleIndex: number | null;
  onModuleSelection: (index: number) => void;
  onLessonSubmit: (values: HandleLessonSubmitValues) => void;
  handleReorderLessons: () => void;
}



const ModuleList: React.FC<ModuleListProps> = ({ modules, onLessonSubmit, handleReorderLessons, selectedModuleIndex }) => {
  const [activeModule, setActiveModule] = React.useState<number | null>(null);
  const [showLessonForm, setShowLessonForm] = React.useState(true);



  return (
    <div className="module-list space-y-4">
      {modules && modules.map((module, index) => (
        <div key={module.id} className="module-item p-4 rounded-lg bg-white shadow">
          <h3 className="text-xl font-bold">{module.title}</h3>
          <button onClick={() => setActiveModule(module.id as  number)} className="btn btn-primary mt-2">Adicionar Aula</button>
        </div>
      ))}
      {activeModule && showLessonForm && (
        // Dentro do componente ModuleList
        <LessonForm
          onSubmit={(values) => {
            if (selectedModuleIndex !== null) {
              onLessonSubmit({ ...values, moduleId: modules[selectedModuleIndex].id as number });
            }
            setShowLessonForm(false); // Adicione esta linha
          }}
          onCancel={() => setShowLessonForm(false)} // Adicione esta linha
          selectedModuleIndex={selectedModuleIndex} // Adicione esta prop
        />




      )}
    </div>
  );
};

export default ModuleList;
