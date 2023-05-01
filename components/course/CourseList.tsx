// components/courseList/CourseList.tsx
import React from 'react';
import CourseCard from './CourseCard';
import Course from '@/types/Course';



type CourseListProps = {
  courses: Course[];
};

const CourseList = ({ courses }: CourseListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courses.map((course) => (
        <CourseCard
          //key={course.id}
          id={course.id}
          title={course.title}
          coverImage={course.coverImage}
          instructorId={course.instructorId}
          price={course.price} 
          Module={course.Module}        />
      ))}
    </div>
  );
};

export default CourseList;
