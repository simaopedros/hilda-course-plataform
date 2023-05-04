import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import VideoPlayer from '@/components/course/courseForms/VideoPlayer';
import {firestore} from '@/data/firestore';
import { arrayUnion, collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import ModuleList, { Lesson, Module } from '@/components/course/ModuleList';
import getLessonIdFromURL from '@/utils/getLessonIdFromURL';
import getCourseIdFromURL from '@/utils/getCourseIdFromURL';
import useAuth from '@/utils/hooks/useAuth';
import Confetti from 'react-dom-confetti';
import { Howl } from 'howler';
import { GetStaticPaths, GetStaticProps } from 'next';

const CoursePage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [videoURL, setVideoURL] = useState('');
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<{ [UUIDModule: string]: Lesson[] }>({});
  const [lessonTitle, setLessonTitle] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const { user } = useAuth();



  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };


  const getProfileDocId = async (userId: string) => {
    const profilesRef = collection(firestore, "profiles");
    const profilesQuery = query(profilesRef, where("UID", "==", userId));
    const profilesSnap = await getDocs(profilesQuery);

    if (!profilesSnap.empty) {
      return profilesSnap.docs[0].id;
    } else {
      return null;
    }
  };


  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    if (user) {
      setLoadingUser(false);
    } else {
      setLoadingUser(true);
    }


    if (router.isReady) {
      const lessons = getLessonIdFromURL();
      const UUIDCourse = getCourseIdFromURL();

      const fetchVideoURL = async () => {
        if (lessons) {
          const lessonDocRef = doc(firestore, 'aulas', lessons);
          const lessonDocSnap = await getDoc(lessonDocRef);
          if (lessonDocSnap.exists()) {
            const lessonData = lessonDocSnap.data();
            setVideoURL(lessonData.videoURL);
            setLessonTitle(lessonData.title); // Adicione esta linha
          }
        }
      };

      const fetchModules = async () => {
        console.log("UUIDCourse: " + UUIDCourse);

        if (UUIDCourse) {
          const modulesQuery = query(
            collection(firestore, 'modules'),
            where('UUIDCourse', '==', UUIDCourse),
            orderBy('displayOrder', 'asc')
          );

          console.log("modulesQuery: " + JSON.stringify(modulesQuery));

          try {
            const querySnapshot = await getDocs(modulesQuery);
            console.log('querySnapshot:', querySnapshot);
            const modulesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setModules(modulesData);
            console.log("Modulos: " + JSON.stringify(modulesData));

            // Fetch lessons for each module
            const lessonsData: { [moduleId: string]: Lesson[] } = {};
            for (const modulo of modulesData) {
              const lessonsQuery = query(
                collection(firestore, 'aulas'),
                where('UUIDModule', '==', modulo.id),
                orderBy('displayOrder', 'asc')
              );
              const lessonsSnapshot = await getDocs(lessonsQuery);
              lessonsData[modulo.id] = lessonsSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                title: doc.data().title,
                displayOrder: doc.data().displayOrder,
                duration: doc.data().duration,
              }));


            }
            setLessons(lessonsData); // Set the lessons state

          } catch (error) {
            console.error('Error fetching modules:', error);
          }
        }
      };

      fetchVideoURL();
      fetchModules();



    }
  }, [user, router.isReady]);

  if (!router.isReady || loadingUser) {
    return <div>Loading...</div>;
  }

  const UUIDCourse = getCourseIdFromURL();




  //----

  const findNextLessonAndModule = (currentLessonId: string, currentModuleId: string) => {
    let nextLessonId = '';
    let nextModuleId = '';

    const currentModule = modules.find((module) => module.id === currentModuleId);
    if (currentModule) {
      const currentModuleLessons = lessons[currentModuleId];

      const currentLessonIndex = currentModuleLessons.findIndex((lesson) => lesson.id === currentLessonId);
      if (currentLessonIndex !== -1 && currentLessonIndex < currentModuleLessons.length - 1) {
        nextLessonId = currentModuleLessons[currentLessonIndex + 1].id;
      } else {
        // Encontrar o próximo módulo
        const currentModuleIndex = modules.findIndex((module) => module.id === currentModuleId);
        if (currentModuleIndex !== -1 && currentModuleIndex < modules.length - 1) {
          nextModuleId = modules[currentModuleIndex + 1].id as string;

          // Definir a próxima aula como a primeira aula do próximo módulo
          const nextModuleLessons = lessons[nextModuleId];
          if (nextModuleLessons && nextModuleLessons.length > 0) {
            nextLessonId = nextModuleLessons[0].id;
          }
        }
      }
    }

    return { nextLessonId, nextModuleId };
  };



  const completeLesson = async () => {
    if (user) {
      const currentLessonId = getLessonIdFromURL();
      const currentModuleId = Object.keys(lessons).find((moduleId) =>
        lessons[moduleId].some((lesson) => lesson.id === currentLessonId)
      );
      const currentCourseId = getCourseIdFromURL();

      const { nextLessonId, nextModuleId } = findNextLessonAndModule(
        currentLessonId as string,
        currentModuleId as string
      );


      // Encontre o documento do perfil do usuário
      const profileDocId = await getProfileDocId(user.uid);

      if (profileDocId) {
        const profileDocRef = doc(firestore, "profiles", profileDocId);
        const profileData: any = {
          lastClass: nextLessonId || "",
        };

        if (nextModuleId) {
          profileData.lastModule = nextModuleId;
        }

        await updateDoc(profileDocRef, profileData);

        // Adicione o curso à lista de cursos concluídos do usuário (se ainda não estiver na lista)
        const userCoursesRef = collection(
          firestore,
          "profiles",
          profileDocId,
          "courses"
        );
        const userCoursesQuery = query(
          userCoursesRef,
          where("UIDCourse", "==", currentCourseId)
        );
        const userCoursesSnap = await getDocs(userCoursesQuery);
        if (userCoursesSnap.empty) {
          await updateDoc(profileDocRef, {
            courses: arrayUnion({
              UIDCourse: currentCourseId,
              lastClass: nextLessonId || "",
              lastModule: nextModuleId || "",
            }),
          });
        }

        // Redirecionar o usuário para a próxima aula, se houver
        const redirectToNextLesson = () => {
          if (nextLessonId && nextModuleId) {
            window.location.assign(
              `/courses/${currentCourseId}/module/${nextModuleId}/lessons/${nextLessonId}`
            );
          } else if (nextLessonId) {
            window.location.assign(
              `/courses/${currentCourseId}/module/${currentModuleId}/lessons/${nextLessonId}`
            );
          }
        };

        playMissionCompleteSound();
        setTimeout(redirectToNextLesson, 2000); // Aguarda 3 segundos antes de redirecionar
      }
    }
  };



  //====public\audio\successful.mp3
  const playMissionCompleteSound = () => {
    const sound = new Howl({
      src: ['/audio/successful.mp3'],
      volume: 0.5,
      onend: () => {
        setShowConfetti(false);
      },
    });

    setShowConfetti(true);
    sound.play();
  };




  return (
    <div className="flex flex-col h-full  ">
      {/* Header */}
      <header className="bg-base-200 h-16 p-4 flex justify-between items-center pl-8 ">
        <div className="w-[60%] text-xl font-semibold">{lessonTitle}</div>

        {/* Complete Lesson Button */}
        <div className="ml-8 mr-5 btn btn-primary w-[25%]" onClick={completeLesson}>
          <button className="full-width" >
            Concluir Aula
          </button>
          <Confetti active={showConfetti} config={confettiConfig} />
        </div>



      </header>
      {/* Content */}
      <div className="flex-grow flex background-white">
        {/* Main Content */}
        <div className={`h-full  ml-8 mr-8 flex-grow transition-all duration-300 ${sidebarVisible ? 'lg:w-[70%]' : 'w-full'}`}>

          <div className="bg-gray-900 h-[60%] ">
            <VideoPlayer key={videoURL} videoId={videoURL}/>
          </div>

          {/* Comments Area */}
          <div className="bg-white p-4 h-[40%]">Área de comentários {'EM BREVE...'}</div>
        </div>

        {/* Sidebar */}
        <div className={`pr-2 pl-2 bg-gray-100 transition-all duration-300 ${sidebarVisible ? 'w-[30%] lg:block' : 'hidden'} overflow-y-auto max-h-block`}>
          <div className="p-4">
            <ModuleList
              modules={modules}
              courseID={UUIDCourse as string}
              onLessonClick={(lessonId) => {
                let clickedLesson;
                for (const moduleId in lessons) {
                  clickedLesson = lessons[moduleId]?.find((l) => l.id === lessonId);
                  if (clickedLesson) break;
                }
                if (clickedLesson) {
                  setVideoURL(clickedLesson.videoURL as string);
                  setLessonTitle(clickedLesson.title as string); // Adicione esta linha
                }
              }}


            />
          </div>
        </div>
      </div>
      {/* Toggle Sidebar Button */}
      <button
        className="fixed bottom-4 right-4 lg:right-14 btn btn-circle btn-accent"
        onClick={toggleSidebar}
      >
        {sidebarVisible ? <FaChevronRight className="text-xl" /> : <FaChevronLeft className="text-xl" />}
      </button>
    </div>
  );


};

export const getStaticPaths: GetStaticPaths = async () => {
  // Aqui, você precisa buscar todos os courseId, moduleId e lessonId possíveis
  // e retornar um array de objetos params

  // Exemplo de estrutura de retorno:
  return {
    paths: [
      // Deixe o array paths vazio para gerar páginas no momento do acesso
    ],
    fallback: true, // Altere o fallback para true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Aqui, você pode buscar os dados necessários para a página usando params.courseId, params.moduleId e params.lessonId
  // e retornar como props para o componente CoursePage

  // Exemplo de estrutura de retorno:
  return {
    props: {
      courseId: params?.courseId,
      moduleId: params?.moduleId,
      lessonId: params?.lessonId,
    },
    revalidate: 60, // tempo em segundos para regenerar a página estática
  };
};

export default CoursePage;