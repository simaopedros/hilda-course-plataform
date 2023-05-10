import { useEffect, useState } from "react";
import { fetchUserCourses } from "@/utils";
import { Course } from "@/components";

export const useCourses = (userId: string) => {
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (userId) {
        const fetchedCourses = await fetchUserCourses(userId);
        setUserCourses(fetchedCourses);
      }
    };

    fetchCourses();
  }, [userId]);

  return {
    userCourses,
    setUserCourses,
  };
};
