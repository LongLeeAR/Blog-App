import React, { useEffect, useState } from 'react';
import './index.css';

const ToastContext = React.createContext();

export const useToast = () => {
  const toastContext = React.useContext(ToastContext);
  return toastContext;
};

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [duration, setDuration] = useState(5000);

  const showToast = (options) => {
    const {type, message, duration} = options;
    if (duration) {
      setDuration(duration);
    }
    setToast({ message, type });
  };

  useEffect(() => {
    const removeHandler = setTimeout(() => {
      hideToast();
    }, duration);

    return () => {
      clearTimeout(removeHandler)
    }
  }, [toast])

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
