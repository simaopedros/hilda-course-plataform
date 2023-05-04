
//utils\handles\handleAddModule.tsx


import { Module } from "@/components/course/courseForms/ModuleList";
import { firestore } from "@/data/firestore";
import { doc, setDoc } from "firebase/firestore";
import { SetStateAction } from "react";


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

export {
  handleAddModule,

};

