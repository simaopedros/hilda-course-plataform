// components/progressTracker/ProgressTracker.tsx

import React from 'react';

interface ProgressProps {
  totalLessons: number;
  completedLessons: number;
}

const ProgressTracker: React.FC<ProgressProps> = ({ totalLessons, completedLessons }) => {
  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-2">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Progress</h2>
      <div className="bg-gray-200 w-full h-4 rounded-md">
        <div
          className="bg-blue-600 h-4 rounded-md transition-width"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-gray-600 mt-2">
        {completedLessons} of {totalLessons} lessons completed
      </p>
    </div>
  );
};

export default ProgressTracker;
