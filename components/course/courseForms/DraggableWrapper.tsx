// DraggableWrapper.tsx
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface DraggableWrapperProps {
  id: number | string;
  index: number;
  type: string;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({ id, index, type, onMove, children }) => {
  const [, drag] = useDrag(() => ({
    type,
    item: { id, index },
  }));

  const [, drop] = useDrop(() => ({
    accept: type,
    hover(item: any, monitor) {
      if (!monitor.isOver()) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  }));

  return (
    <div ref={(node) => drag(drop(node))}>
      {children}
    </div>
  );
};

export default DraggableWrapper;
