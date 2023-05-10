import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import { ClassItem } from "@/components";
import { Class } from "@/utils";

interface DraggableClassItemProps {
  id: string;
  index: number;
  classItem: Class;
  isSelected: boolean;
  moveClass: (fromIndex: number, toIndex: number) => void;
  onClassClick: (classItem: Class) => void;
  onDoubleClick: () => void;
}

interface DragItem {
  id: string;
  index: number;
  type: string;
}

const DraggableClassItem: React.FC<DraggableClassItemProps> = ({
  id,
  index,
  classItem,
  isSelected,
  moveClass,
  onClassClick,
  onDoubleClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);


  const [, drop] = useDrop({
    accept: "classItem",
    hover(item: DragItem, monitor) {

     if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveClass(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "classItem",
    item: () => {
      return { id: classItem.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <ClassItem
        isSelected={isSelected}
        classItem={classItem}
        onClassClick={onClassClick}
        onDoubleClick={onDoubleClick}
      />
    </div>
  );
};

export default DraggableClassItem;
