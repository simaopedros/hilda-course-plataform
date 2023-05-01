// components/lessonItem/LessonItem.tsx

import React, { useState } from 'react';
import Aula from '@/types/Aula';
import SupplementaryMaterialButton from './SupplementaryMaterialButton';

interface LessonItemProps {
  lesson: Aula;
  onCompletionChange: (lessonId: number, completed: boolean) => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, onCompletionChange }) => {
  const [completed, setCompleted] = useState(lesson.completed || false);

  const handleCompletionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCompleted(isChecked);
    onCompletionChange(Number.parseInt(lesson.id as string), isChecked);
  };

  return (
    <>
      <div className="border-slate-200 border-2 p-2 rounded-md my-1">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCompletionChange}
          className="mr-2"
        />
        <span className={`text-gray-700 ${completed ? 'line-through' : ''}`}>
          {lesson.nome}
        </span>

        <div>
          <span className="ml-auto">
            {
              lesson.suplementar?.map((material, idx) => (
                <SupplementaryMaterialButton key={idx} material={material} />
              ))
            }
          </span>
        </div>

      </div>
    </>
  );
};

export default LessonItem;
