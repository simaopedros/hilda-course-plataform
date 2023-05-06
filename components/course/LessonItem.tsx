import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getLessonIdFromURL from '@/utils/getLessonIdFromURL';

interface LessonItemProps {
  lesson: {
    id: string;
    title: string;
    courseId: string;
    moduleId: string;
    duration: number;
  };
  completed: boolean;
  onToggleCompleted: (lessonId: string) => void;
  onLessonClick: (lessonId: string) => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, completed, onToggleCompleted, onLessonClick }) => {
  const router = useRouter();
  const [isCurrentLesson, setIsCurrentLesson] = useState(false);


  useEffect(() => {
    const currentLessonId = getLessonIdFromURL();
    setIsCurrentLesson(currentLessonId === lesson.id);
  }, [lesson.id]);




  const handleClick = () => {
    if (!isCurrentLesson) {
      if (typeof onLessonClick === 'function') {
        onLessonClick(lesson.id);
        window.location.assign(`/courses/${lesson.courseId}/module/${lesson.moduleId}/lessons/${lesson.id}`);
        
      } else {
        console.error('onLessonClick is not a function:', onLessonClick);
      }
    }
  };


  function toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h:${minutes > 0 ? `${minutes}` : ''}m`;
  }
  return (
    <div
      className="border m-1 border-gray-300 rounded p-2 flex items-center space-x-4 cursor-pointer bg-white hover:bg-gray-100"
      onClick={handleClick}
    >
      <input
        type="checkbox"
        className="form-checkbox text-accent"
        checked={completed}
        onChange={() => onToggleCompleted(lesson.id)}
      />
      <p className="text-xs flex-grow">{lesson.title}</p>
      <div className="badge badge-outline">
        {toHoursAndMinutes(lesson.duration)}
      </div>
    </div>
  );
};

export default LessonItem;
