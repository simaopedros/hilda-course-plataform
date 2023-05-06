// components/course/courseForms/DraggableModuleItem.tsx

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import UpDownArrows from "./UpDownArrows";
import { FiChevronRight } from "react-icons/fi";

export interface DraggableModuleItemProps {
  moduleId: number;
  title: string;
  description: string;
  index: number;
  moveModule: (fromIndex: number, toIndex: number) => void;
  onModuleClick: (UUIDModule: string) => void;
  UIDModule: string;
  isSelected: boolean;
}

const DraggableModuleItem: React.FC<DraggableModuleItemProps> = ({
  moduleId,
  title,
  description,
  index,
  moveModule,
  onModuleClick,
  UIDModule,
  isSelected,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "module",
    hover(item: { type: string; index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveModule(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "module",
    item: () => {
      return { moduleId, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const styles = `mb-4 bg-white rounded-lg p-4 border border-gray-200 cursor-move ${isDragging ? "opacity-50" : ""}`;

  return (
<div ref={ref} className={`${styles} p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200`} onClick={() => onModuleClick(UIDModule)}>
  <div className="flex justify-between items-center">
    <div className="flex items-center">
      {isSelected && (
        <FiChevronRight className="mr-2 text-stone-950" />
      )}
      {!isSelected && (
        <UpDownArrows />
      )}
    </div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
</div>


  );
};

export default DraggableModuleItem;
