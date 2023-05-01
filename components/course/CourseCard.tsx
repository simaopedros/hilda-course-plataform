import Course from '@/types/Course';
import React from 'react';



const CourseCard: React.FC<Course> = ({ title, description, instructorId, coverImage } ) => {
  return (
    <div className="card shadow-lg">
      <img src={coverImage} alt={title} className="w-full h-64 object-cover" />
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold">{title}</h2>
        <p>{description}</p>
        <div className="flex items-center justify-center mt-4">
          {/* <span className="font-medium">Instructor: {instructorId}</span> */}
          <button className="btn btn-primary" >Iniciar Curso </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
