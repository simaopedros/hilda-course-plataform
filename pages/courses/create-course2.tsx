// pages/CreateCourse.tsx
import React, { useState } from 'react';

import Toast from '@/components/course/courseForms/Toast';
import ModuleList, { Lesson, Module } from '@/components/course/courseForms/ModuleList';
import CourseList, { Course } from '@/components/course/courseForms/CourseList';
import Modal from '@/components/course/courseForms/Modal';
import LessonList from '@/components/course/courseForms/LessonList';
import CourseForm from '@/components/course/courseForms/CourseForm';
import LessonForm, { LessonFormValues } from '@/components/course/courseForms/LessonForm';
import ModuleForm, { ModuleFormValues } from '@/components/course/courseForms/ModuleForm';

export interface HandleLessonSubmitValues extends LessonFormValues {
    moduleId: number;
}


const CreateCourse: React.FC = () => {

    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);
    const [selectedModuleIndex, setSelectedModuleIndex] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | 'info' | null>(null);
    // Adicione esta linha no componente CreateCourse
    const [showModuleForm, setShowModuleForm] = useState(false);


    const handleAddModule = (courseIndex: number) => {
        setSelectedCourseIndex(courseIndex);
        setShowModuleForm(true);
    };



    const handleLessonSelection = (index: number) => {
        setSelectedLessonIndex(index);
    };

    const handleCourseSubmit = (course: Course) => {
        course.modules = []; // Adicione esta linha para inicializar a propriedade 'modules' com um array vazio
        setCourses([...courses, course]);
    };


    const handleModuleSubmit = (module: Module) => {

        if (selectedCourseIndex !== null) {
            const updatedCourses = [...courses];
            updatedCourses[selectedCourseIndex].modules.push(module);
            setCourses(updatedCourses);
        }
    };





    const handleLessonSubmit = (lessonFormValues: HandleLessonSubmitValues) => {
        

        if (selectedCourseIndex !== null) {
            const newModules = [...modules];
            const selectedModule = newModules[selectedModuleIndex as number];

            // Crie um novo objeto Lesson a partir dos valores do formulário
            const lesson: Lesson = {
                title: lessonFormValues.title || '',
                description: lessonFormValues.description || '',
                duration: lessonFormValues.duration || 0,
                videoUrl: lessonFormValues.videoUrl || '',
                type: 'video', // Adicione a propriedade 'type' ausente, ajuste conforme necessário
                readingMaterial: lessonFormValues.readingMaterial || '',
            };
            const updatedCourses = [...courses];
            updatedCourses[selectedCourseIndex].modules[selectedModuleIndex as number].lessons.push(lesson);
            setCourses(updatedCourses);

        }
    };

    const handleCourseSelection = (index: number) => {
        setSelectedCourseIndex(index);
        setSelectedModuleIndex(null);
    };

    const handleModuleSelection = (index: number) => {
        setSelectedModuleIndex(index);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToastMessage(message);
        setToastType(type);
        setTimeout(() => {
            setToastMessage(null);
            setToastType(null);
        }, 3000);
    };





    return (
        <div className="py-8 ml-8 mr-8">
            <h1 className="text-4xl font-bold mb-6">Criação de Curso</h1>
            <CourseForm onSubmit={handleCourseSubmit as any} />
            <div className="flex space-x-4">
                <CourseList
                    courses={courses}
                    selectedCourseIndex={selectedCourseIndex}
                    onCourseSelection={handleCourseSelection}
                    onAddModule={handleAddModule} // Adicione esta linha
                />

                {showModuleForm && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Adicionar Módulo</h2>
                        <ModuleForm
                            onSubmit={(moduleFormValues: ModuleFormValues) => {
                                handleModuleSubmit({
                                    id: new Date().getTime(), // Adicione um id temporário, ajuste conforme necessário
                                    title: moduleFormValues.title,
                                    description: moduleFormValues.description,
                                    lessons: [],
                                });
                                setShowModuleForm(false);
                            }}
                            onCancel={() => setShowModuleForm(false)} // Adicione esta linha
                        />
                    </div>
                )}


                {selectedCourseIndex !== null && (
                    <ModuleList
                        onLessonSubmit={handleLessonSubmit}
                        modules={courses[selectedCourseIndex].modules}
                        selectedModuleIndex={selectedModuleIndex}
                        onModuleSelection={handleModuleSelection}
                        handleReorderLessons={() => {
                            // TODO: Implementar a lógica para reordenar aulas
                        }}
                    />
                )}
                {selectedCourseIndex !== null && selectedModuleIndex !== null && (
                    <div>
                        <LessonList
                            lessons={courses[selectedCourseIndex].modules[selectedModuleIndex].lessons}
                            onEdit={() => {
                                // TODO: Implementar a lógica para editar uma aula
                            }}
                            onReorder={() => {
                                // TODO: Implementar a lógica para reordenar aulas
                            }}
                        />
                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold mb-4">Adicionar Aula</h2>
                            <LessonForm onSubmit={handleLessonSubmit} onCancel={() => setShowLessonForm(false)} selectedModuleIndex={selectedModuleIndex} />
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <Modal onClose={handleCloseModal} isOpen={(true)}>
                    
                    {/* Adicione o formulário de edição da aula aqui */}
                </Modal>
            )}
            {toastMessage && toastType && <Toast message={toastMessage} type={toastType} onClose={() => {
                setToastMessage(null);
                setToastType(null);
            }} />}
        </div>
    );
};

export default CreateCourse;