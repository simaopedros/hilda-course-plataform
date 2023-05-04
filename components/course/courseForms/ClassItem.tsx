// ClassItem.tsx
import { Class } from '@/utils/fetchModuleClasses';
import React from 'react';
import UpDownArrows from './UpDownArrows';
import { FiChevronRight } from 'react-icons/fi';


interface ClassItemProps {
    classItem: Class;
    onDoubleClick: () => void;
    onClassClick: (classItem: Class) => void;
    isSelected: boolean;
}

const ClassItem: React.FC<ClassItemProps> = ({ classItem, onDoubleClick, onClassClick, isSelected }) => {
    return (
        <div
            className="flex items-center space-x-4 bg-white shadow-md rounded-md p-4 mb-3"
            onDoubleClick={onDoubleClick}
            onClick={() => onClassClick(classItem)}
        >
            <div className="flex items-center">
                {isSelected && <FiChevronRight className="mr-2 text-stone-950" />}
                {!isSelected && <UpDownArrows />}
            </div>
            <div className="flex-grow">
                <p className="font-medium text-xs">{classItem.title}</p>
            </div>
        </div>
    );
};

export default ClassItem;