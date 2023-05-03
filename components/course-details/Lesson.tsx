// components/lesson/Lesson.tsx

import Lesson from '@/types/Module';
import Link from 'next/link';
import React from 'react';
import VideoPlayer from '../course/courseForms/VideoPlayer';



const Lesson: React.FC<Lesson> = ({ id, title, description, videoUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="mb-4">
      <VideoPlayer videoId={videoUrl as string} />
      </div>
      <p className="mb-4">{description}</p>

    </div>
  );
};

export default Lesson;
