
//utils\handles\handleAddModule.tsx


import { Module } from "@/components/course/courseForms/ModuleList";
import { firebaseConfig } from "@/data/sdk";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc, writeBatch } from "firebase/firestore";
import { SetStateAction } from "react";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function handleAddModule(
  setIsModuleModalOpen: React.Dispatch<SetStateAction<boolean>>,
  isCourseSelected: boolean
) {
  if (isCourseSelected) {
    setIsModuleModalOpen(true);
  } else {
    alert("Nenhum curso selecionado. Por favor, selecione um curso antes de adicionar um módulo.");
  }
}


export const saveModuleToFirestore = async (moduleId: string, moduleData: Module) => {
  try {
    const moduleRef = doc(firestore, "modules", moduleId);
    await setDoc(moduleRef, moduleData);
  } catch (error) {
    console.error("Erro ao salvar o módulo no Firestore:", error);
  }
};

const updateModulePositions = async (modules: Module[]) => {
  const batchWrite = writeBatch(firestore);
  
  modules.forEach((module, index) => {
    if (module.UIDModule) {
      const moduleRef = doc(firestore, "modules", module.UIDModule);
      batchWrite.update(moduleRef, { displayOrder: index });
    }
  });

  await batchWrite.commit();
};



export {
  handleAddModule,
  updateModulePositions,
};

