// components/moduleList/ModuleList.tsx

import React, { useState } from 'react';
import Module from '@/types/Module';
import LessonItem from './LessonItem';

interface ModuleListProps {
  modules: Module[];
}

const ModuleList: React.FC<ModuleListProps> = ({ modules }) => {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);




  const toggleModule = (moduleId: number) => {
    if (moduleId === expandedModule) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
    }
  };

  return (
    <div className="mv-8 border-slate-200">
    <div className="bg-white shadow-md rounded-lg p-6">
      {modules?.map((module) => (
        <div key={module.id}>
          <button
            className="text-xl font-semibold border-neutral-100 border-b-2 pb-2 btn-block text-left"
            onClick={() => toggleModule(module.id as number)}
          >
            {module.title}
          </button>
          {expandedModule === module.id && (
            <ul className="mt-2 ">
              {module.aulas?.map((aula) => (
                <LessonItem lesson={aula} onCompletionChange={function (lessonId: number, completed: boolean): void {
                  throw new Error('Function not implemented.');
                }} />


              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default ModuleList;
