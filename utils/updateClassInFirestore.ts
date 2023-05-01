// /utils/updateClassInFirestore.ts
import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";
import { appFirebase } from "@/data/sdk";
import { Class } from "./fetchModuleClasses";

const db = getFirestore(appFirebase);

const updateClassInFirestore = async (classData: Class) => {
  try {
    const classDocRef = doc(db, "aulas", classData.id.toString());
    await updateDoc(classDocRef, {
      title: classData.title,
      urlAula: classData.videoURL,
      duration: classData.duration,
      description: classData.description,
    });
  } catch (error) {
    console.error("Erro ao atualizar a aula no Firestore: ", error);
  }
};

export default updateClassInFirestore;
