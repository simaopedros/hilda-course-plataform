import React from 'react';
import { Course } from '../course/courseForms/CourseList';

interface CourseDetailsProps {
  course: Course;
  buttonText: string;
  onButtonClick?: () => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course: { title, description, duration }, buttonText, onButtonClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="mb-4">
        <span className="font-semibold">Duração: </span>
        <span>{duration}</span>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={onButtonClick}>{buttonText}</button>
    </div>
  );
};

export default CourseDetails;
