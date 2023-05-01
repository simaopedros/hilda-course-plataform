// pages/courses/[courseId].tsx

import React from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs';
import CourseDetails from '@/components/course-details/CourseDetails';
import Lesson from '@/components/course-details/Lesson';
import InstructorCard from '@/components/instructor/InstructorCard';
import ProgressTracker from '@/components/course-details/ProgressTracker';
import DataCursos from '@/data/dataFake';

const CoursePage: React.FC = () => {
    const router = useRouter();
    const { courseId } = router.query;

    // Mock data - replace with API data in real application
    const course = DataCursos[Number(courseId)];

    return (
        <div className='m-8'>
            <>
                {courseId && <Breadcrumbs items={[{ label: 'Cursos', href: '/courses' }, { label: course.title as string }]} />}

                {courseId && <CourseDetails title={course.title} description={course.description} duration={course.duration} price={course.price} instructor={course.instructor} Module={course.Module} />}


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    <div className="md:col-span-2">
                        {courseId && <Lesson title={course.title} completed={true} id={Number.parseInt(courseId as string)} aulas={[]} />}


                    </div>
                    <div className="md:col-span-1">
                        {courseId && <InstructorCard
                            name={course.instructor?.name as string}
                            avatarUrl={course.instructor?.avatarUrl as string}
                            expertise={course.instructor?.expertise as string} />}
                        {courseId &&
                            <ProgressTracker currentLessonIndex={0} lessons={course.Module} />}
                    </div>
                </div>


            </>
        </div>
    );
};

export default CoursePage;
