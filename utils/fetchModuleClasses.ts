import { appFirebase } from "@/data/sdk";
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";

export interface Class {
  id?: number | string;
  title: string;
  description: string;
  displayOrder?: number;
  UUIDModule: string;
  duration?: number,
  videoURL?: string,
}

const fetchModuleClasses = async (UUIDModule: string): Promise<Class[]> => {
  console.log("Fetching classes for course UUID:", UUIDModule);


  const db = getFirestore(appFirebase);
  const classesRef = collection(db, "aulas");
  const q = query(classesRef, where("UUIDModule", "==", UUIDModule), orderBy("displayOrder"));

  const querySnapshot = await getDocs(q);

  console.log("Query results:", querySnapshot.docs);
  console.log("Number of classes: "+querySnapshot.size)

  return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
  })) as unknown as Class[];
};



export { fetchModuleClasses };
