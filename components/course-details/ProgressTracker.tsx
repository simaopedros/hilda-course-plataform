// components/progressTracker/ProgressTracker.tsx

import Lesson from '@/types/Module';
import React from 'react';
import { Module } from '../course/courseForms/ModuleList';

interface ProgressTrackerProps {
  modules: Module[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ modules }) => {
  return (
<div className="bg-white shadow-md rounded-md p-4">
  <h3 className="text-xl font-semibold mb-2">Módulos do Curso</h3>
  <ul className="steps steps-vertical">
    {modules && modules.map((module, index) => (
      <li key={index} className={`step module-step`}>
        {module.title}
      </li>
    ))}
  </ul>
</div>

  );
};

export default ProgressTracker;
