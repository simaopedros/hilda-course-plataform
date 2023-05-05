import Course from '@/types/Course';
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';


type CourseItemProps = {
  course: Course;
  courseUUID?: string;
};



const CourseCard: React.FC<CourseItemProps> = ({ course, courseUUID } ) => {

  const router = useRouter();

  const handleStartCourse = () => {
    router.push(`/courses/${courseUUID}`);
  };


  return (
<div className="course-card card shadow-lg">
  <Image
    src={course.coverImage as string}
    alt={course.title as string}
    className="w-full h-64 object-cover rounded-lg"
    width={500}
    height={500}
  />
  <div className="card-body">
    <h2 className="card-title text-xl font-semibold mb-4">{course.title}</h2>
    <p className="text-gray-700">{course.description}</p>
    <div className="flex items-center justify-center mt-4">
      <button className="w-full btn btn-primary" onClick={handleStartCourse}>
        Detalhes
      </button>
    </div>
  </div>
</div>

  );
};

export default CourseCard;
