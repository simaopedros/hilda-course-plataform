import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import LessonItem from './LessonItem';
import { firestore } from '@/data/firestore';

export interface Module {
  id: string | number;
  title?: string;
  description?: string;
  displayOrder?: number;
  lessons?: Lesson[];

}

export interface Lesson {
  id: string;
  title: string;
  displayOrder: number;
  duration: number;
  videoURL?: string;
}


interface ModuleListProps {
  modules: Module[];
  courseID: string;
  onLessonClick: (lessonId: string) => void; // Adicione esta linha
}



const ModuleList: React.FC<ModuleListProps> = ({ modules, courseID, onLessonClick }) => {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});


  const toggleModule = (moduleId: string) => {
    if (expandedModuleId === moduleId) {
      setExpandedModuleId(null);
    } else {
      setExpandedModuleId(moduleId);
    }
  };




  useEffect(() => {
    const fetchLessons = async () => {
      const lessonsData: Record<string, Lesson[]> = {};

      for (const modulo of modules) {
        const lessonsQuery = query(
          collection(firestore, 'aulas'),
          where('UUIDModule', '==', modulo.id),
          orderBy('displayOrder', 'asc')
        );

        const querySnapshot = await getDocs(lessonsQuery);
        lessonsData[modulo.id] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Lesson[];
      }

      setLessons(lessonsData);
    };

    fetchLessons();
  }, [modules]);



  const getCourseIdFromURL = () => {
    if (typeof window !== 'undefined') {
      const pathArray = window.location.pathname.split('/');
      const courseIndex = pathArray.indexOf('courses');
      if (courseIndex !== -1 && pathArray.length > courseIndex + 1) {
        return pathArray[courseIndex + 1];
      }
    }
    return null;
  };
  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <div
          key={module.id}
          className={`p-4 rounded-lg border-2 border-gray-300 cursor-pointer ${expandedModuleId === module.id ? 'bg-gray-200' : 'bg-white'
            }`}
          onClick={() => toggleModule(module.id as string)}
        >
          <h3 className="text-lg font-semibold">{module.title}</h3>
          <p className="text-sm text-gray-600">{module.description}</p>
          {expandedModuleId === module.id && (
            <div className="mt-4">
              <div className="list-disc list-inside">
                {lessons[module.id]?.map((lesson) => (
                  <div key={lesson.id} className="text-sm">
                    <LessonItem
                      lesson={{
                        id: lesson.id,
                        title: lesson.title,
                        courseId: courseID,
                        moduleId: module.id as string,
                        duration: lesson.duration,
                      }}
                      completed={false}
                      onToggleCompleted={function (lessonId: string): void {
                        throw new Error('Function not implemented.');
                      }}
                      onLessonClick={onLessonClick} // Atualize esta linha
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default ModuleList;
