"use client";

import React, { useEffect } from "react";

function Modal({ isOpen, onClose, children }) {

  // закрывает по esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  // закрывает по клику на overlay
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("lock");
    } else {
      document.documentElement.classList.remove("lock");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed w-full inset-0 bg-black bg-opacity-50 z-[999] flex justify-center items-center popup-modal"
      onClick={onClose} // Close modal when clicking on the overlay
    >
      <div
        className="relative bg-white rounded-lg px-4 md:px-0 max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100 md:scale-100 md:opacity-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        {children}
        <button
          className="absolute top-4 right-4 text-white-default hover:text-gray-light text-3xl transition-all"
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Modal; 