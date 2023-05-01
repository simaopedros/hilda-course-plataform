// components/courseDetails/CourseDetails.tsx

import Course from '@/types/Course';
import React from 'react';


const CourseDetails: React.FC<Course> = ({ title, description, instructor, duration, price }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <span className="font-semibold">Instrutor: </span>
        <span>{instructor?.name}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Duração: </span>
        <span>{duration}</span>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Ir Para o Curso</button>
    </div>
  );
};

export default CourseDetails;
