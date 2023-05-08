// components/courseList/CourseList.tsx
import React from 'react';
import CourseCard from './CourseCard';
import Course from "@/types/Course";




type CourseListProps = {
  courses: Course[];
};

const CourseList = ({ courses }: CourseListProps) => {
  return (
    <div className="course-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {courses && courses.map((course, id) => (
      <CourseCard
        key={id}
        course={course}
      />
    ))}
  </div>
  );
};

export default CourseList;
