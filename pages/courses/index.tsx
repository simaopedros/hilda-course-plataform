// pages/courses/index.tsx

import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs';
import CourseList from '@/components/course/CourseList';
import { Course } from '@/components/course/courseForms/CourseList';
import Pagination from '@/components/pagination/Pagination';
import { firestore } from '@/data/firestore';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';


const Courses: React.FC = () => {

    const coursesRef = collection(firestore, "courses");
    const q = query(coursesRef, orderBy("title"));

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(q);
                const coursesData: Course[] = [];

                querySnapshot.forEach((doc) => {
                    const course = doc.data() as Course;
                    coursesData.push({
                        UUID: doc.id, // Use doc.id para obter o UUID
                        title: course.title,
                        category: course.category,
                        coverImage: course.coverImage,
                        description: course.description,
                        instructorId: course.instructorId,
                        modules: course.modules || [],
                    });
                });

                setCourses(coursesData);
                setLoading(false);
            }catch (err) {
                setError(err as Error); // Adicione o "as Error" aqui
                setLoading(false);
            }
        };

        fetchCourses();
    }, [q]);


    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

    const onCourseSelection = (selectedCourseId: string, index: number) => {
        setSelectedCourseId(selectedCourseId);
        // Realize outras ações necessárias aqui
    };

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Cursos" },
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="courses-page">
        <div className="hero mx-auto py-1">
          <div className="container mx-auto py-2 px-4">
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-2xl font-semibold mb-6">Cursos</h1>
            <CourseList courses={courses} />
            <Pagination currentPage={1} totalPages={10} onPageChange={() => { }} />
          </div>
        </div>
      </div>
    );
};

export default Courses;