// pages/courses/[courseId].tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs';
import CourseDetails from '@/components/course-details/CourseDetails';
import Lesson from '@/components/course-details/Lesson';
import InstructorCard from '@/components/instructor/InstructorCard';
import ProgressTracker from '@/components/course-details/ProgressTracker';
import {firestore} from '@/data/firestore';
import { doc } from '@firebase/firestore';
import { DocumentReference, collection, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Course } from '@/components/course/courseForms/CourseList';
import Instructor from '@/types/Instructor';
import { Module } from '@/components/course/courseForms/ModuleList';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/data/sdk';

const CoursePage: React.FC = () => {

    const router = useRouter();
 

    const { courseId } = router.query;
    const [course, setCourse] = useState<Course | null>(null);
    const [instructor, setInstructor] = useState<Instructor | null>(null);
    const [modules, setModules] = useState<Module[]>([]);
    const [isEnrolled, setEnrolled] = useState<boolean | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [lastModule, setLastModule] = useState<string | null>(null);
    const [lastClass, setLastClass] = useState<string | null>(null);








    useEffect(() => {
        if (courseId) {
            const fetchCourse = async () => {
                const courseDoc = doc(firestore, 'courses', courseId as string);
                const courseData = await getDoc(courseDoc);
                if (courseData.exists()) {
                    setCourse(courseData.data() as Course);
                    const instructorDoc = doc(firestore, 'profiles', (courseData.data() as Course).instructorId);
                    const instructorData = await getDoc(instructorDoc);
                    if (instructorData.exists()) {
                        setInstructor(instructorData.data() as Instructor);
                    }
                }

                // Fetch modules
                const modulesQuery = query(
                    collection(firestore, 'modules'),
                    where('UUIDCourse', '==', courseId),
                    orderBy('displayOrder')
                );
                const modulesSnapshot = await getDocs(modulesQuery);
                const modulesList = modulesSnapshot.docs.map((doc) => doc.data() as Module);
                setModules(modulesList);
            };
            fetchCourse();




            // Verificar se o usuário está logado e matriculado no curso
            const getFirestoreData = async (docRef: DocumentReference): Promise<any> => {
                const docSnapshot = await getDoc(docRef);
                if (docSnapshot.exists()) {
                    return docSnapshot.data();
                } else {
                    return null;
                }
            };


            interface UserProfile {
                UID: string;
                courses: Array<{ status: boolean; UIDCourse: string, lastModule:string, lastClass:string }>;
              }
              
              const unsubscribe = onAuthStateChanged(auth, async (user) => {
                setIsLoggedIn(!!user);
                console.log('User:', user);
                if (user && courseId) {
                  const userProfileQuery = query(
                    collection(firestore, 'profiles'),
                    where('UID', '==', user.uid)
                  );
              
                  const querySnapshot = await getDocs(userProfileQuery);
                  let userProfileDocId: string | null = null;
              
                  querySnapshot.forEach((doc) => {
                    userProfileDocId = doc.id;
                  });
              
                  if (userProfileDocId) {
                    const userProfileDocRef = doc(firestore, 'profiles', userProfileDocId);
                    const userProfileSnapshot = await getDoc(userProfileDocRef);
              
                    if (userProfileSnapshot.exists()) {
                      const userProfileData = userProfileSnapshot.data() as UserProfile;
                      console.log('User profile data:', userProfileData);
              
                      const userCourses = userProfileData.courses;
                      console.log('User courses:', userCourses);
                      if (userCourses) {
                        const foundCourse = userCourses.find(
                          (course) => course.UIDCourse === courseId
                        );
 
                        setLastModule(foundCourse?.lastModule as string);
                        setLastClass(foundCourse?.lastClass as string);
                        console.log('Found course:', foundCourse);
                        if (foundCourse) {
                          setEnrolled(foundCourse.status);
                       
                        } else {
                          setEnrolled(false);
           
                        }
                      } else {
                        setEnrolled(false);
                      }
                    } else {
                      setEnrolled(false);
                    }
                  } else {
                    setEnrolled(false);
                  }
                } else {
                  setEnrolled(false);
                }
              });
              
              return () => {
                unsubscribe();
              };
              
              
            


        }
    }, [courseId, auth]);


    function handleButtonClick() {
    router.push(`../courses/${courseId}/module/${lastModule as string}/lessons/${lastClass as string}`);
      }

    const getButtonText = (isLoggedIn: boolean, isEnrolled: boolean): string => {
        if (isLoggedIn) {
            return isEnrolled ? 'Continuar Curso' : 'Matricular';
        } else {
            return 'Inscreva-se';
        }
    };

    return (
        <div className='mr-8 ml-8 mb-8'>
            <>
                {courseId && <Breadcrumbs items={[{ label: 'Cursos', href: '/courses' }, { label: course?.title as string }]} />}

                {courseId && course && instructor && (
                    <CourseDetails
                        course={course}
                        buttonText={getButtonText(isLoggedIn, isEnrolled as boolean)}
                        onButtonClick={handleButtonClick}
                    />
                )}


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    <div className="md:col-span-2">
                        {courseId && <Lesson title={course?.title} completed={true} id={Number.parseInt(courseId as string)} aulas={[]} videoUrl={course?.url} />}


                    </div>
                    <div className="md:col-span-1">
                        {courseId && <InstructorCard
                            name={instructor?.name as string}
                            avatarUrl={instructor?.profilePicture as string}
                            expertise={instructor?.expertise as string | 'Não Divulgado'} />}



                        {courseId &&
                            <ProgressTracker modules={modules} />}
                    </div>
                </div>


            </>
        </div>
    );
};

export default CoursePage;
