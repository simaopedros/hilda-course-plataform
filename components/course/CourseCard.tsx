
// '@/components/course/CourseCard.tsx'

import Course from "@/types/Course";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

type CourseItemProps = {
  course: Course;
  botonText?: string;
};

const CourseCard: React.FC<CourseItemProps> = ({ course, botonText }) => {
  console.log(course.coverImage);

  const router = useRouter();

const handleStartCourse = () => {
  if (course.lastModule && course.lastClass) {
    router.push(`/courses/${course.id}/module/${course.lastModule}/lessons/${course.lastClass}`);
  } else {
    // Se não houver progresso armazenado, direcione o aluno para a primeira aula do primeiro módulo
    // Você pode ajustar isso de acordo com a estrutura do seu curso
    router.push(`/courses/${course.id}`);
  }
};




  return (
    <div className="course-card card shadow-lg">
      {course.coverImage ? (
        <Image
          src={course.coverImage as string}
          alt={course.title as string}
          className="w-full h-64 object-cover rounded-lg"
          width={500}
          height={500}
        />
      ) : (
        <></>
        // Renderizar uma imagem padrão ou não renderizar nada.
      )}

      <div className="card-body">
        <h2 className="card-title text-xl font-semibold mb-4">
          {course.title}
        </h2>
        <p className="text-gray-700">{course.description}</p>
        <div className="flex items-center justify-center mt-4">
          <button
            className="w-full btn btn-primary"
            onClick={handleStartCourse}
          >
            {botonText?botonText: "Matricular"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
