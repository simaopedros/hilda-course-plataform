import { Course } from "@/components/course/courseForms/CourseList";
import { appFirebase } from "@/data/sdk";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";




const fetchUserCourses = async (instructorId: string) => {
  const db = getFirestore(appFirebase);
  const coursesRef = collection(db, "courses");
  const q = query(coursesRef, where("instructorId", "==", instructorId));
  const querySnapshot = await getDocs(query(coursesRef));
 
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    UUID: doc.id, // Inclui o UID do documento
  })) as Course[];
};




export { fetchUserCourses }