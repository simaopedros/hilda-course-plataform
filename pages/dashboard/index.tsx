// pages/dashboard.tsx

import CourseCard from "@/components/course/CourseCard";
import ProgressTracker from "@/components/profile/ProgressTracker";
import UserDashboard from "@/components/profile/UserDashboard";
import DataCursos from "@/data/dataFake";
import Course from "@/types/Course";
import useAuth from "@/utils/hooks/useAuth";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EnrolledCoursesSlider from "../../components/dashboard/EnrolledCoursesSlider";
import Pagination from "@/components/pagination/Pagination";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { firestore } from "@/data/firestore";

const ITEMS_PER_PAGE = 6; // Defina o número de itens por página

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const router = useRouter();
  const { user, loading } = useAuth();

  const [enrolledCourses, setEnrolledCourses] = useState<Array<{ id: string }>>(
    []
  );
  const [allCourses, setAllCourses] = useState<Array<{ id: string }>>([]);

  useEffect(() => {
    if (!loading && user) {
      const fetchCoursesData = async () => {
        // Buscar cursos matriculados
        const enrolledCoursesData = await getEnrolledCourses(user.uid);
        setEnrolledCourses(enrolledCoursesData as any);

        // Buscar todos os cursos disponíveis com paginação
        const allCoursesData = await getAllCourses(currentPage);
        setAllCourses(allCoursesData);

        // Buscar o total de cursos disponíveis
        const totalCourses = await getTotalCourses();
        setTotalPages(Math.ceil(totalCourses / ITEMS_PER_PAGE));
      };

      fetchCoursesData();
    }
  }, [user, loading, currentPage]);

  // const allCourses = [
  //   {
  //     id: 9,
  //     title: "Curso 10",
  //     coverImage:
  //       "https://doodleipsum.com/700/flat?i=763055e9d6b38bef61357c9d6da45906",
  //     image: "https://picsum.photos/300/300",
  //     progress: {},
  //   },
  //   {
  //     id: 11,
  //     title: "Curso 12",
  //     coverImage:
  //       "https://doodleipsum.com/700/flat?i=763055e9d6b38bef61357c9d6da45906",
  //     image: "https://picsum.photos/300/300",
  //     progress: {},
  //   },
  //   {
  //     id: 13,
  //     title: "Curso 14",
  //     coverImage:
  //       "https://doodleipsum.com/700/flat?i=763055e9d6b38bef61357c9d6da45906",
  //     image: "https://picsum.photos/300/300",
  //     progress: {},
  //   },
  //   {
  //     id: 14,
  //     title: "Curso 15",
  //     coverImage:
  //       "https://doodleipsum.com/700/flat?i=763055e9d6b38bef61357c9d6da45906",
  //     image: "https://picsum.photos/300/300",
  //     progress: {},
  //   },
  //   {
  //     id: 16,
  //     title: "Curso 17",
  //     coverImage:
  //       "https://doodleipsum.com/700/flat?i=763055e9d6b38bef61357c9d6da45906",
  //     image: "https://picsum.photos/300/300",
  //     progress: {},
  //   },
  //   {
  //     id: 18,
  //     title: "Curso 19",
  //     coverImage:
  //       "https://doodleipsum.com/700/flat?i=763055e9d6b38bef61357c9d6da45906",
  //     image: "https://picsum.photos/300/300",
  //     progress: {},
  //   },
  // ];

  async function getEnrolledCourses(userId: string) {
    console.log(userId);
    const profileDocId = await getProfileDocId(userId);
    console.log("profileDocId:", profileDocId);

    if (profileDocId) {
      const profileDocRef = doc(firestore, "profiles", profileDocId);
      const profileDocSnapshot = await getDoc(profileDocRef);
      const profileData = profileDocSnapshot.data();
      const userCourses = profileData?.courses || [];
      console.log("userCourses:", userCourses);

      const courses = await Promise.all(
        userCourses.map(
          async (userCourse: {
            UIDCourse: string;
            lastModule: string;
            lastClass: string;
          }) => {
            const courseRef = doc(firestore, "courses", userCourse.UIDCourse);
            console.log("courseRef:", courseRef);
            const courseSnapshot = await getDoc(courseRef);
            console.log("courseSnapshot:", courseSnapshot);
            if (courseSnapshot.exists()) {
              const courseData = {
                ...courseSnapshot.data(),
                id: courseSnapshot.id,
                lastModule: userCourse.lastModule,
                lastClass: userCourse.lastClass,
              };
              console.log("courseData:", courseData);
              return courseData;
            } else {
              return null;
            }
          }
        )
      );

      console.log("courses:", courses);
      return courses.filter((course) => course !== null);
    } else {
      return [];
    }
  }

  async function getProfileDocId(uid: string) {
    const profilesCollection = collection(firestore, "profiles");
    const profileQuery = query(profilesCollection, where("UID", "==", uid));
    const profileSnapshot = await getDocs(profileQuery);

    if (!profileSnapshot.empty) {
      console.log("profileDocId found:", profileSnapshot.docs[0].id);
      return profileSnapshot.docs[0].id;
    }

    console.log("profileDocId not found");
    return null;
  }

  async function getAllCourses(page = 0) {
    const coursesCollection = collection(firestore, "courses");
    const offset = page * ITEMS_PER_PAGE;

    const coursesQuery = query(
      coursesCollection,
      orderBy("title", "asc"),
      startAt(offset),
      limit(ITEMS_PER_PAGE)
    );
    const coursesSnapshot = await getDocs(coursesQuery);

    const courses = coursesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return courses;
  }

  async function getTotalCourses() {
    const coursesCollection = collection(firestore, "courses");
    const coursesSnapshot = await getDocs(coursesCollection);
    return coursesSnapshot.size;
  }

  return (
    <div className="bg-white ml-8 mr-8 ">
      <div className="container mx-auto py-8 mt-4 mb-4">
        <UserDashboard
          name="John Doe"
          profilePicture="https://pbs.twimg.com/profile_images/1596571012237254657/M37hirAG_400x400.jpg"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />

        <h2 className="text-3xl font-bold mb-6 mt-6">Cursos matriculados</h2>

        <EnrolledCoursesSlider enrolledCourses={enrolledCourses as Course[]} />

        <h2 className="text-3xl font-bold mb-6 mt-6">Todos os cursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCourses.map((course) => (
            <div key={course.id}>
              <CourseCard course={course as unknown as Course} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
