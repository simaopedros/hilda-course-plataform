// pages/courses/index.tsx

import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs';
import CourseList from '@/components/course/CourseList';
import Pagination from '@/components/pagination/Pagination';
import DataCursos from '@/data/dataFake';
import React from 'react';


const Courses: React.FC = () => {
    // Exemplo de dados de cursos (substitua pelos dados reais)
    const courses = DataCursos;

    // Exemplo de dados de breadcrumbs (substitua pelos dados reais)
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Cursos' },
    ];

    return (
        <div className="hero mx-auto py-1">
            <div className="container mx-auto py-2 px-4" >
                <Breadcrumbs items={breadcrumbItems} />
                <h1 className="text-2xl font-semibold mb-6">Cursos</h1>
                <CourseList courses={courses} />
                <Pagination currentPage={1} totalPages={10} onPageChange={() => { }} />
            </div>
        </div>

    );
};

export default Courses;
