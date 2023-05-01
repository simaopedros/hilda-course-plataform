// LessonList.tsx
import React, { useState } from 'react';
import { Lesson } from './ModuleList';


interface LessonListProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

const LessonList: React.FC<LessonListProps> = ({ lessons, onEdit, onReorder }) => {
  const [setLessons] = useState([]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    onReorder(result.source.index, result.destination.index);
  };

  return (
    <div>
      {/* Implemente a lógica de arrastar e soltar para reordenar as aulas */}
      {lessons.map((lesson, index) => (
        <div key={index} className="flex items-center justify-between">
          <div>
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
          </div>
          <button onClick={() => onEdit(lesson)}>Editar</button>
        </div>
      ))}
    </div>
  );
};

export default LessonList;
