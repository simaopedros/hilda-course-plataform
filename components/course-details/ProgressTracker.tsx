// components/progressTracker/ProgressTracker.tsx

import Lesson from '@/types/Module';
import React from 'react';

interface ProgressTrackerProps {
  lessons: Lesson[];
  currentLessonIndex: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ lessons, currentLessonIndex }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-xl font-semibold mb-2">Progresso do Curso</h3>
      <ul className="steps steps-vertical">
        {lessons.map((lesson, index) => (
          <li key={index} className={`step ${index <= currentLessonIndex ? 'step-primary' : ''}`}>
            {lesson.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressTracker;
