import { addDoc, collection } from "firebase/firestore";
import {firestore} from "@/data/firestore";
import { ResourceFormValues } from "@/components/course/courseForms/ResourceForm";


export const saveSuplementarMaterialToFirestore = async (
  UUIDAula: string,
  formatFile: string,
  title: string,
  linkFile: string
): Promise<string | null> => {
  const newSuplementarMaterial: ResourceFormValues = {
    UUIDAula,
    formatFile,
    title,
    linkFile,
  };

  console.log("New suplementar material:", newSuplementarMaterial); // Adicione esta linha para verificar os dados enviados



  try {
    const docRef = await addDoc(collection(firestore, "suplementar-materials"), newSuplementarMaterial);
    return docRef.id;
  } catch (error) {
    console.error("Error adding suplementar material: ", error);
    return null;
  }
};
