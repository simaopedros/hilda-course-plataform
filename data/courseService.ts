// data/courseService.ts
import { addDoc, collection } from "firebase/firestore";

import { Course } from "@/components/course/courseForms/CourseList";
import { firestore } from "./firestore";

export const createCourse = async (course: Course) => {
  try {
    const courseRef = collection(firestore, "courses");
    const docRef = await addDoc(courseRef, course);
    console.log("Curso adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar curso: ", e);
  }
};
