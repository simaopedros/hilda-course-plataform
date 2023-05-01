import { ModuleFormValues } from "@/components/course/courseForms/ModuleForm";
import { Timestamp, addDoc, collection, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

async function addModuleToFirestore(courseId: string, moduleData: ModuleFormValues) {
    const db = getFirestore();
  
    // Pegue o número atual de módulos do curso para determinar o displayOrder do novo módulo
    const courseRef = doc(db, "courses", courseId);
    const courseSnapshot = await getDoc(courseRef);
    const courseData = courseSnapshot.data();
    const currentModules = courseData ? courseData.modules : [];
    const displayOrder = currentModules.length;
  
    // Crie o novo módulo com os dados fornecidos e campos adicionais
    const newModule = {
      ...moduleData,
      courseId,
      createdAt: Timestamp.now(),
      displayOrder,
      lessons: [],
      supplementaryMaterial: [],
      updatedAt: Timestamp.now(),
    };
  
    try {
        // Adicione o novo módulo à coleção "modules"
        await addDoc(collection(db, "modules"), newModule);
    
        // Atualize a lista de módulos no curso correspondente
        currentModules.push(newModule);
        await updateDoc(courseRef, { modules: currentModules });
    } catch (error) {
        console.error("Error adding module to firestore:", error);
    }
}

export default addModuleToFirestore;
