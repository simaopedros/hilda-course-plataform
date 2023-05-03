// components/courseList/CourseList.tsx
import React from 'react';
import CourseCard from './CourseCard';
import { Course } from './courseForms/CourseList';




type CourseListProps = {
  courses: Course[];
};

const CourseList = ({ courses }: CourseListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courses && courses.map((course, id) => (
        <CourseCard
        key={id}
          course={course}
          courseUUID={course.UUID}
     />
      ))}
    </div>
  );
};

export default CourseList;
