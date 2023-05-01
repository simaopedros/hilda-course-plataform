import { Module } from "@/components/course/courseForms/ModuleList";
import { appFirebase } from "@/data/sdk";
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";

const fetchCourseModules = async (courseUUID: string)=> {
  
  console.log("Fetching modules for course UUID:", courseUUID);

  const db = getFirestore(appFirebase);
  const modulesRef  = collection(db, "modules");
  const q = query(modulesRef, where("UUIDCourse", "==", courseUUID), orderBy("displayOrder"));
  const querySnapshot = await getDocs(q);

  console.log("Query results:", querySnapshot.docs);
  
  console.log("Number of modules: "+querySnapshot.size)
  
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    UIDModule: doc.id, // Inclui o UID do documento
  })) as Module[];
};


export { fetchCourseModules }