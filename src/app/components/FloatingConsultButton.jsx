"use client";

import React, { useState, useEffect } from "react";

function FloatingConsultButton({ onOpenConsultForm }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight / 4) { // Show after scrolling one screen height
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-6 right-6 lg:bottom-12 lg:right-12 w-14 h-14 rounded-full shadow-lg cursor-pointer transition-opacity duration-300 z-50
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onOpenConsultForm}
      aria-label="Получить консультацию"
    >
      <img src="/icon/GetConsult.svg" alt="иконка кнопки заявки на консультацию" className="" />

    </button>
  );
}

export default FloatingConsultButton; 