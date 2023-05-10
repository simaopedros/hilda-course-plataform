


import { firestore } from "@/data/firestore";
import { addDoc, collection, doc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import { Class } from "./fetchModuleClasses";

export const saveClassToFirestore = async (
  UUIDModule: string,
  title: string,
  description: string,
  duration: number,
  urlAula: string,
  displayOrder?: number // Adicione este parâmetro
): Promise<string | null> => {
  const newClass: Class = {
    UUIDModule,
    title,
    description,
    duration,
    videoURL: urlAula,
    displayOrder: 0 // Inicialmente definido como 0, será atualizado posteriormente
  };

  try {
    const docRef = await addDoc(collection(firestore, "aulas"), newClass);
    const lastDisplayOrder = await getLastDisplayOrder(UUIDModule);

    // Atualiza o valor de displayOrder para o novo documento
    await setDoc(doc(firestore, "aulas", docRef.id), {
      displayOrder: lastDisplayOrder + 1
    }, { merge: true });

    return docRef.id;
  } catch (error) {
    console.error("Error adding class: ", error);
    return null;
  }
};



async function getLastDisplayOrder(UUIDModule: string): Promise<number> {
  const aulasRef = collection(firestore, "aulas");
  const q = query(aulasRef, where("UUIDModule", "==", UUIDModule), orderBy("displayOrder", "desc"), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return 0;
  } else {
    const lastAula = querySnapshot.docs[0].data() as Class;
    return lastAula.displayOrder as number;
  }
}

import { writeBatch } from "firebase/firestore";

export const updateClassPositions = async (classes: Class[], moduleId: string) => {
  const batchWrite = writeBatch(firestore);

  classes.forEach((classItem, index) => {
    if (typeof classItem.id === "string") {
      const classRef = doc(firestore, "aulas", classItem.id);
      batchWrite.update(classRef, { displayOrder: index, moduleId });
    }
  });
  

  await batchWrite.commit();
};
