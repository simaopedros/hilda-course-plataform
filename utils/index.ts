export { fetchCourseModules } from "./fetchCourseModules";
export { fetchFilteredResources } from "./fetchFilteredResources";
export { fetchModuleClasses } from "./fetchModuleClasses";
export type { Class } from "./fetchModuleClasses";
export { fetchUserCourses } from "./fetchUserCourses";
export { saveCourseToFirestore, saveModuleToFirestore, setSelectedCourseIndex } from "./handles";
export { saveClassToFirestore } from "./saveClassToFirestore";
export { saveSuplementarMaterialToFirestore } from "./saveSuplementarMaterialToFirestore";
export { default as updateClassInFirestore } from "./updateClassInFirestore";
export * from './handles/handleCourseSubmit'
export * from './handles/handleAddModule'
export * from './handles/handleCourseSelection'
export {default as useAuth} from "@/utils/hooks/useAuth";
export {default as withAuth} from "@/utils/withAuth";
