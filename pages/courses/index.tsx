import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import CourseList from "@/components/course/CourseList";
import Course from "@/types/Course";
import Pagination from "@/components/pagination/Pagination";
import { firestore } from "@/data/firestore";
import {
  collection,
  getDocs,
  orderBy,
  query,
  startAt,
  limit as limitFn,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCourses = async (page: number) => {
    const limit = 6; // Número de cursos por página
    const offset = (page - 1) * limit; // Deslocamento para buscar os cursos
    const coursesRef = collection(firestore, "courses");
    const q = query(coursesRef, orderBy("title"), startAt(offset), limitFn(limit));

    try {
      setLoading(true);
      const querySnapshot = await getDocs(q);
      const coursesData: Course[] = [];

      querySnapshot.forEach((doc) => {
        const course = doc.data() as Course;
        coursesData.push({
          id: doc.id,
          title: course.title,
          category: course.category,
          coverImage: course.coverImage,
          description: course.description,
          instructorId: course.instructorId,
        });
      });

      setCourses(coursesData);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const fetchTotalCoursesCount = async () => {
    const limitPerPage = 6;
    const coursesRef = collection(firestore, "courses");
    const q = query(coursesRef);
    const querySnapshot = await getDocs(q);
    const totalCount = querySnapshot.size;
    setTotalPages(Math.ceil(totalCount / limitPerPage));
  };
  

  useEffect(() => {
    fetchCourses(currentPage);
    fetchTotalCoursesCount();
  }, [currentPage]);

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
    <div className="courses-page mr-8 ml-8 mb-8">
      <div className="hero mx-auto py-1">
        <div className="container mx-auto py-2 px-4">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="text-2xl font-semibold mb-6">Cursos</h1>
          <CourseList courses={courses} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
