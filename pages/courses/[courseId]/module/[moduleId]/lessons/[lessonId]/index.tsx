// pages/courses/[courseId]/module/[moduleId]/lessons/[lessonId].tsx

import ModuleList from '@/components/course/ModuleList';
import QuestionForm from '@/components/course/QuestionForm';
import VideoPlayer from '@/components/course/VideoPlayer';
import DataCursos from '@/data/dataFake';
import { fetchedCourse, fetchedLesson } from '@/data/fakeData';
import Aula from '@/types/Aula';
import Course from '@/types/Course';
import Module from '@/types/Module';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Importe os dados fictícios do arquivo fakeData.ts

const LessonPage: React.FC = () => {
  const router = useRouter();

  const { courseId, moduleId, lessonId } = router.query;
  const idCurso = parseInt(courseId as string) ;
  const idModulo = parseInt(moduleId as string) ;
  const idAula = parseInt(lessonId as string) ;
  const courses = DataCursos
  
 
  console.log("Tipo "+ courseId);

  const handleQuestionSubmit = (question: string) => {
    console.log('Pergunta enviada:', question);
  };


  return (<>
    <div className="flex m-5 grid grid-cols-6 gap-3">
      <div className="w-full col-span-4">
      {courseId && courses[idCurso] && <VideoPlayer videoId={courses[idCurso].Module[idModulo].aulas[idAula].urlAula as string} />}        
        <div className="mt-8">
          <QuestionForm onSubmit={handleQuestionSubmit} />
        </div>
      </div>
      <div className="w-80em col-span-2">


      {courseId && courses[idCurso] && <ModuleList modules={courses[idCurso].Module} />}
 
      </div>
    </div>
    </>
  );
};

export default LessonPage;
