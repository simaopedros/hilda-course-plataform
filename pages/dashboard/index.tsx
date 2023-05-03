// pages/dashboard.tsx

import CourseCard from '@/components/course/CourseCard';
import ProgressTracker from '@/components/profile/ProgressTracker';
import UserDashboard from '@/components/profile/UserDashboard';
import DataCursos from '@/data/dataFake';
import Course from '@/types/Course';
import React from 'react';

const Dashboard: React.FC = () => {

    const enrolledCourses = [
        {
            id: 1,
            title: 'Curso 1',
            image: 'https://picsum.photos/300/300',
            progress: { totalLessons: 10, completedLessons: 4 },
        },
        {
            id: 2,
            title: 'Curso 2',
            image: 'https://picsum.photos/300/300',
            progress: { totalLessons: 15, completedLessons: 9 },
        },
        {
            id: 2,
            title: 'Curso 2',
            image: 'https://picsum.photos/300/300',
            progress: { totalLessons: 15, completedLessons: 9 },
        }, 
        {
            id: 2,
            title: 'Curso 2',
            image: 'https://picsum.photos/300/300',
            progress: { totalLessons: 15, completedLessons: 9 },
        },

    ];

    const curso = [enrolledCourses, ...DataCursos]

    return (
        <div className="ml-8 mr-8">
            <div className="container mx-auto py-8">
                <UserDashboard name='John Doe' profilePicture='/path/to/image.jpg' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' />


                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">                   
                    {enrolledCourses.map((course, index) => (
                        <div key={course.id}>
                            <CourseCard course={course as unknown as Course}   />
                            <ProgressTracker
                                totalLessons={course.progress.totalLessons}
                                completedLessons={course.progress.completedLessons}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Dashboard;
