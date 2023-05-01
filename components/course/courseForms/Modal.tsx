import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleContentMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      <div className="fixed inset-0   bg-black bg-opacity-25" onMouseDown={onClose}></div>
      <div
        className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto z-50"
        onMouseDown={handleContentMouseDown}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
