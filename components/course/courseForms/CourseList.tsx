import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';



interface CourseListProps {
  courses: Course[];
  selectedCourseId: string | null;
  onCourseSelection: (selectedCourseId: string, index: number) => void;
}



interface Module {
  lessons: any;
  id: number;
  title: string;
  description: string;
}

export interface Course {
  UUID?: string;
  title: string;
  category: string;
  coverImage: string;
  description: string;
  instructorId: string;
  modules: Module[];
}

const CourseList: React.FC<CourseListProps> = ({ courses, selectedCourseId, onCourseSelection }) => {
  // ...

  return (
<div>
  <h2 className="text-2xl font-bold mb-4">Meus Cursos</h2>

  {courses.map((course, index) => (
    <div
      key={course.title}
      className="w-full h-full max-w-sm p-2 min-y-min btn text-xs shadow-md bg-white mb-2"
    >
      <div className="flex items-center">
        {course.UUID === selectedCourseId && (
          <FiChevronRight className="mr-2 text-stone-950" />
        )}
        <h3
          className={`w-full text-left font-semibold  cursor-pointer ${
            course.UUID === selectedCourseId ? "text-stone-950" : "text-stone-400"
          }`}
          onClick={() => onCourseSelection(course.UUID as string, index)}
        >
          {course.title}
        </h3>
      </div>
    </div>
  ))}
</div>

  );
};


export default CourseList;