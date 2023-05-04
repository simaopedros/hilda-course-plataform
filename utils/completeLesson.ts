import {firestore} from "@/data/firestore";
import getCourseIdFromURL from "./getCourseIdFromURL";
import getLessonIdFromURL from "./getLessonIdFromURL";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import useAuth from "./hooks/useAuth";



const { user } = useAuth();



const completeLesson = async () => {
    if (user) {
      const currentLessonId = getLessonIdFromURL();
      const currentCourseId = getCourseIdFromURL();


      // Encontre o próximo módulo e aula (se houver)



      let nextLessonId;
      let nextModuleId;
      // ... (aqui você vai implementar a lógica para encontrar o próximo módulo e aula)
  
      // Atualize o documento do perfil do usuário
      const profileDocRef = doc(firestore, 'profiles', user.uid);
      const profileData: any = {
        lastClass: nextLessonId || '',
      };
  
      if (nextModuleId) {
        profileData.lastModule = nextModuleId;
      }
  
      await updateDoc(profileDocRef, profileData);
  
      // Adicione o curso à lista de cursos concluídos do usuário (se ainda não estiver na lista)
      const userCoursesRef = collection(firestore, 'profiles', user.uid, 'courses');
      const userCoursesQuery = query(userCoursesRef, where('UIDCourse', '==', currentCourseId));
      const userCoursesSnap = await getDocs(userCoursesQuery);
      if (userCoursesSnap.empty) {
        await updateDoc(profileDocRef, {
          courses: arrayUnion({
            UIDCourse: currentCourseId,
            lastClass: nextLessonId || '',
            lastModule: nextModuleId || '',
          }),
        });
      }
    }
  };
  

  export default completeLesson;