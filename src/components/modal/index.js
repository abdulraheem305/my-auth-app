import React from "react";

const Modal = ({
  isOpen,
  onClose,
  onSave,
  children,
  title,
  errorMessage,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-[30px] shadow-lg w-96">
        <h2 className="text-2xl mb-4">{title}</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="loader border-t-4 border-b-4 border-blue-600 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          children
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="p-2 bg-gray-400 text-white rounded"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="p-2 bg-blue-500 text-white rounded"
            disabled={isLoading}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
