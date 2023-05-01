// Toast.tsx
import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  if (!isVisible) {
    return null;
  }

  const backgroundColor = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-error' : 'bg-info';

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${backgroundColor} shadow-md`}>
      {message}
    </div>
  );
};

export default Toast;