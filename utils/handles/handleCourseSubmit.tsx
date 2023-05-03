import { Course } from "@/components/course/courseForms/CourseList";
import { appFirebase } from "@/data/sdk";
import { addDoc, collection, getFirestore } from "firebase/firestore";



const handleCourseSubmit = async (course: Course) => {
  await saveCourseToFirestore(course);
  };
  

  const saveCourseToFirestore = async (course: Course): Promise<string> => {
    const db = getFirestore(appFirebase);
    const courseRef = collection(db, "col-courses");
    try {
      const docRef = await addDoc(courseRef, course);
      console.log("Curso criado com sucesso com ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Erro ao criar o curso: ", error);
      throw error;
    }
  };
  


  export {
    handleCourseSubmit,
    saveCourseToFirestore
  }