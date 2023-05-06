//pages\courses\create-course.tsx

import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import ActionButton from "@/components/course/common/ActionButton";
import ClassForm, {
  ClassFormValues,
} from "@/components/course/courseForms/ClassForm";
import ClassItem from "@/components/course/courseForms/ClassItem";
import CourseForm, {
  CourseFormValues,
} from "@/components/course/courseForms/CourseForm";
import CourseList, { Course } from "@/components/course/courseForms/CourseList";
import DraggableModuleItem from "@/components/course/courseForms/DraggableModuleItem";
import ModuleForm, {
  ModuleFormValues,
} from "@/components/course/courseForms/ModuleForm";
import { Module } from "@/components/course/courseForms/ModuleList";
import ResourceForm, {
  ResourceFormValues,
} from "@/components/course/courseForms/ResourceForm";
import ResourceItem from "@/components/course/courseForms/ResourceItem";
import { fetchCourseModules } from "@/utils/fetchCourseModules";
import { fetchFilteredResources } from "@/utils/fetchFilteredResources";
import { Class, fetchModuleClasses } from "@/utils/fetchModuleClasses";
import { fetchUserCourses } from "@/utils/fetchUserCourses";
import {
  saveCourseToFirestore,
  saveModuleToFirestore,
  setSelectedCourseIndex,
} from "@/utils/handles";
import useAuth from "@/utils/hooks/useAuth";
import { saveClassToFirestore } from "@/utils/saveClassToFirestore";
import { saveSuplementarMaterialToFirestore } from "@/utils/saveSuplementarMaterialToFirestore";
import updateClassInFirestore from "@/utils/updateClassInFirestore";
import withAuth from "@/utils/withAuth";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "react-modal";

const CreateCourse: React.FC = () => {
  const { user, loading } = useAuth();

  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [createdCourseUid, setCreatedCourseUid] = useState<string | null>(null); // armazena o UID do curso criado
  const [selectedCourseModules, setSelectedCourseModules] = useState<Module[]>(
    []
  ); // estado para armazenar os módulos do curso selecionado
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedModuleClasses, setSelectedModuleClasses] = useState<Class[]>(
    []
  );
  const [isClassFormModalOpen, setIsClassFormModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isCourseFormModalOpen, setIsCourseFormModalOpen] = useState(false);
  const [isModuleFormModalOpen, setIsModuleFormModalOpen] = useState(false);
  const [isAddClassFormModalOpen, setIsAddClassFormModalOpen] = useState(false);
  const [isAddResourceFormModalOpen, setIsAddResourceFormModalOpen] =
    useState(false);
  const [isAtualizationClass, setAtualizationClass] = useState(false);
  const [isUpdateClassFormModalOpen, setIsUpdateClassFormModalOpen] =
    useState(false);
  const [selectedClassResources, setSelectedClassResources] = useState<
    Resource[]
  >([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  interface Resource {
    id: string;
    UUIDAula: string;
    formatFile: string;
    title: string;
    linkFile: string;
  }

  useEffect(() => {
    const fetchCourses = async () => {
      if (user) {
        const fetchedCourses = await fetchUserCourses(user.uid);
        setUserCourses(fetchedCourses);
      }
    };

    const getResources = async () => {
      if (selectedClass) {
        const resources = await fetchFilteredResources(
          selectedClass.id as string
        );
        setSelectedClassResources(resources);
      }
    };

    fetchCourses();

    // Verifique se a aula selecionada existe antes de buscar os recursos
    if (selectedClass) {
      getResources();
    }
  }, [user, selectedClass]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <div>Você precisa estar logado para criar um curso.</div>;
  }

  const handleCourseSubmit = async (values: CourseFormValues) => {
    const course: Course = {
      UUID: createdCourseUid as string,
      title: values.title,
      category: values.category,
      coverImage: values.coverImage,
      description: values.description,
      instructorId: user.uid,
      url: values.videoUrl,
    };

    const courseUid = await saveCourseToFirestore(course);
    closeCourseFormModal();
    if (courseUid) {
      setCreatedCourseUid(courseUid); // armazena o UID do curso criado no estado
    }
  };

  const handleCourseSelection = async (
    selectedCourseId: string,
    index: number
  ) => {
    setSelectedCourseId(selectedCourseId); // Adicione esta linha
    setSelectedCourseIndex(index.toString());
    setSelectedCourseModules(await fetchCourseModules(selectedCourseId));
  };

  const moveModule = (fromIndex: number, toIndex: number) => {
    const modulesCopy = [...selectedCourseModules];
    const [removedModule] = modulesCopy.splice(fromIndex, 1);
    modulesCopy.splice(toIndex, 0, removedModule);

    setSelectedCourseModules(modulesCopy);
    // Aqui você pode atualizar os módulos no Firebase
  };

  const handleModuleClick = async (UUIDModule: string) => {
    const classes = await fetchModuleClasses(UUIDModule);
    setSelectedModuleClasses(classes);
    setSelectedModuleId(UUIDModule);
  };

  const handleClassSubmit = async (values: ClassFormValues) => {
    if (selectedClass) {
      const updatedClass: Class = {
        ...selectedClass,
        title: values.title,
        videoURL: values.urlAula,
        duration: values.duration,
        description: values.description,
      };

      await updateClassInFirestore(updatedClass);
      setIsUpdateClassFormModalOpen(false);
    } else if (selectedModuleClasses && selectedCourseModules) {
      const lastDisplayOrder =
        selectedModuleClasses.length > 0
          ? Math.max(
              ...selectedModuleClasses.map((c) => c.displayOrder as number)
            )
          : 0;

      if (!selectedModuleId) {
        console.error("Nenhum módulo selecionado!");
        return;
      }

      const selectedModule = selectedCourseModules.find(
        (module) => module.UIDModule === selectedModuleId
      );

      const classId = await saveClassToFirestore(
        selectedModule?.UIDModule as string,
        values.title,
        values.description,
        values.duration as number,
        values.urlAula as string
      );

      if (classId) {
        setSelectedModuleClasses([
          ...selectedModuleClasses,
          {
            id: classId,
            title: values.title,
            description: values.description,
            duration: values.duration,
            videoURL: values.urlAula,
            displayOrder: lastDisplayOrder + 1,
            UUIDModule: selectedModule?.UIDModule as string,
          },
        ]);
        setIsAddClassFormModalOpen(false);
      }
      setIsAddClassFormModalOpen(false);
    }
  };

  const handleClassClick = (classItem: Class) => {
    console.log("Aula selecionada:", classItem);
    setSelectedClass(classItem);
  };

  const handleModuleSubmit = async (values: ModuleFormValues) => {
    if (selectedCourseId) {
      const moduleData: Module = {
        UUIDCourse: selectedCourseId,
        description: values.description,
        displayOrder: selectedCourseModules.length,
        title: values.title,
      };

      const moduleId = `${selectedCourseId}-module-${
        selectedCourseModules.length + 1
      }`;
      await saveModuleToFirestore(moduleId, moduleData);

      // Adicione o novo módulo à lista de módulos selecionados
      setSelectedCourseModules([...selectedCourseModules, moduleData]);
      closeModuleFormModal();
    } else {
      console.error("Nenhum curso selecionado");
    }
  };

  const handleResourceSubmit = async (values: ResourceFormValues) => {
    if (selectedClass) {
      console.log("Calling saveSuplementarMaterialToFirestore"); // Adicione esta linha
      const resourceId = await saveSuplementarMaterialToFirestore(
        selectedClass.id as string,
        values.formatFile as string,
        values.title as string,
        values.linkFile as string
      );

      if (resourceId) {
        setSelectedClassResources([
          ...selectedClassResources,
          {
            id: resourceId,
            UUIDAula: selectedClass.id as string,
            formatFile: values.formatFile as string,
            title: values.title as string,
            linkFile: values.linkFile as string,
          },
        ]);
        setIsAddResourceFormModalOpen(false);
      }
    }
  };

  // ...

  const closeClassFormModal = () => {
    setSelectedClass(null);
    setIsClassFormModalOpen(false);
  };

  const openCourseFormModal = () => {
    setIsCourseFormModalOpen(true);
  };

  const closeCourseFormModal = () => {
    setIsCourseFormModalOpen(false);
  };

  const openModuleFormModal = () => {
    setIsModuleFormModalOpen(true);
  };

  const closeModuleFormModal = () => {
    setIsModuleFormModalOpen(false);
  };

  const openAddClassFormModal = () => {
    setSelectedClass(null);
    setIsAddClassFormModalOpen(true);
  };

  const closeAddClassFormModal = () => {
    setIsAddClassFormModalOpen(false);
  };

  const openAddResourceFormModal = () => {
    setIsAddResourceFormModalOpen(true);
  };

  const closeAddResourceFormModal = () => {
    setIsAddResourceFormModalOpen(false);
  };

  const openUpdateClassFormModal = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsUpdateClassFormModalOpen(true);
  };

  const closeUpdateClassFormModal = () => {
    setSelectedClass(null);
    setIsUpdateClassFormModalOpen(false);
  };

  // Renderize o conteúdo da página aqui quando o usuário estiver logado
  return (
    <>
      <div className="ml-8">
        <Breadcrumbs
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Cursos",
              href: "/courses",
            },
            {
              label: "Criar Curso",
            },
          ]}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 ml-8 mr-8 mt-2">
        <div>
          <CourseList
            courses={userCourses}
            selectedCourseId={selectedCourseId}
            onCourseSelection={handleCourseSelection}
          />
          <ActionButton
            label="Adicionar Curso"
            onClick={openCourseFormModal}
            className="btn btn-primary mb-4"
          />
        </div>
        <Modal
          isOpen={isCourseFormModalOpen}
          onRequestClose={closeCourseFormModal}
          contentLabel="Course Form Modal"
        >
          <CourseForm onSubmit={handleCourseSubmit} />
        </Modal>

        <div>
          <h2 className="text-2xl font-bold mb-4">Modulos</h2>
          <DndProvider backend={HTML5Backend}>
            {selectedCourseModules &&
              selectedCourseModules.map((module, index) => (
                <DraggableModuleItem
                  isSelected={module.UIDModule === selectedModuleId}
                  key={module.UIDModule}
                  moduleId={module.id as number}
                  title={module.title as string}
                  description={module.description as string}
                  index={index}
                  moveModule={moveModule}
                  onModuleClick={handleModuleClick}
                  UIDModule={module.UIDModule as string}
                />
              ))}
          </DndProvider>

          <Modal
            isOpen={isModuleFormModalOpen}
            onRequestClose={closeModuleFormModal}
            contentLabel="Module Form Modal"
          >
            <ModuleForm onSubmit={handleModuleSubmit} onCancel={() => {}} />
          </Modal>

          <ActionButton
            label="Adicionar Modulo"
            onClick={openModuleFormModal}
            className="btn btn-primary mb-4"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Aulas</h2>
          {selectedModuleClasses &&
            selectedModuleClasses.map((classItem) => (
              <div key={classItem.id}>
                <ClassItem
                  isSelected={
                    selectedClass !== null && classItem.id === selectedClass.id
                  }
                  classItem={classItem}
                  onDoubleClick={() => openUpdateClassFormModal(classItem)}
                  onClassClick={handleClassClick}
                />
              </div>
            ))}
          <ActionButton
            label="Adicionar Aula"
            onClick={openAddClassFormModal}
            className="btn btn-primary mb-4"
          />
        </div>
        <Modal
          isOpen={isAddClassFormModalOpen}
          onRequestClose={closeAddClassFormModal}
          contentLabel="Add Class Form Modal"
        >
          <ClassForm onSubmit={handleClassSubmit} initialValues={null} />
        </Modal>

        <Modal
          isOpen={isUpdateClassFormModalOpen}
          onRequestClose={closeUpdateClassFormModal}
          contentLabel="Update Class Form Modal"
        >
          <ClassForm
            onSubmit={handleClassSubmit}
            initialValues={selectedClass || undefined}
          />
        </Modal>

        <Modal
          isOpen={isClassFormModalOpen}
          onRequestClose={closeClassFormModal}
          contentLabel="Class Form Modal"
        >
          <ClassForm
            onSubmit={handleClassSubmit}
            initialValues={selectedClass || undefined}
          />
        </Modal>

        <div>
          <h2 className="text-2xl font-bold mb-4">Recursos</h2>
          {selectedClassResources.map((recurso, index) => (
            <ResourceItem
              key={index}
              title={recurso.title}
              formatFile={recurso.formatFile}
              linkFile={recurso.linkFile}
            />
          ))}
          <ActionButton
            label="Adicionar Recursos"
            onClick={openAddResourceFormModal}
            className="btn btn-primary mb-4"
          />
        </div>

        <Modal
          isOpen={isAddResourceFormModalOpen}
          onRequestClose={closeAddResourceFormModal}
          contentLabel="Add Resource Form Modal"
        >
          <ResourceForm onSubmit={handleResourceSubmit} />
        </Modal>
      </div>
    </>
  );
};

export default withAuth(CreateCourse);
