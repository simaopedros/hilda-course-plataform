// components/lesson/Lesson.tsx

import Lesson from '@/types/Module';
import Link from 'next/link';
import React from 'react';



const Lesson: React.FC<Lesson> = ({ id, title, description, videoUrl, supplementaryMaterial = [] }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="mb-4">
        <iframe
          className="w-full h-64 rounded-md"
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <p className="mb-4">{description}</p>

      {supplementaryMaterial.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-2">Materiais de apoio:</h3>
          <ul className="list-disc list-inside">
            {supplementaryMaterial.map((material, index) => (
              <li key={index} className="mb-1">
                <Link href={material.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {material.formato}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Lesson;
