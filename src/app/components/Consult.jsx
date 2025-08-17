"use client"; // Указываем, что это клиентский компонент в Next.js

import React, { useState } from "react";
import { ConsultForm } from "./Forms";

function Consult() {
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Здесь должна быть логика отправки данных на ваш бэкенд
    // с помощью Fetch API, Axios или другой библиотеки.
    // Бэкенд уже будет заниматься отправкой письма.
    console.log("Отправка данных:", { name, phone });


    setName("");
    setPhone("");
    setIsConsentChecked(false);
  };

  return (
    <ConsultForm />
    // <section
    //   className={`relative min-h-[568px] my-16 lg:my-[100px] md:min-h-auto p-10 md:pt-8 md:px-14 rounded-xl overflow-hidden bg-[url('/images/consult-bg.png')] md:[url('/images/consult-bg-mobile.png')] bg-cover bg-center bg-no-repeat flex flex-col`}
    // >
    //   {/* Содержимое формы */}
    //   <div className="relative z-10 max-w-md w-full text-white-default">
    //     {" "}
    //     <h2 className="text-[28px]/8 xl:text-[55px] md:text-3xl xl:leading-[1] font-semibold mb-4">
    //       Получите консультацию
    //     </h2>
    //     <p className="text-xs lg:text-lg mb-8">
    //       Оставьте контакты и наш менеджер<br/>свяжется с вами в течение 15 минут
    //     </p>
    //     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    //       <input
    //         type="text"
    //         name="Name"
    //         placeholder="Введите имя..."
    //         className="p-3 md:p-4 rounded-lg bg-gray-dark text-white font-light placeholder-gray-light border-none focus:outline-none"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         required
    //       />
    //       <input
    //         type="tel"
    //         name="Phone"
    //         placeholder="Введите телефон..."
    //         className="p-3 md:p-4 rounded-lg bg-gray-dark text-white font-light placeholder-gray-light border-none focus:outline-none"
    //         value={phone}
    //         onChange={(e) => setPhone(e.target.value)}
    //         required
    //       />
    //       <button
    //         type="submit"
    //         className="p-3 md:p-4 rounded-lg bg-yellow-default text-black font-semibold text-sm md:text-xl xl:text-base cursor-pointer disabled:bg-gray-medium disabled:text-gray-dark disabled:cursor-not-allowed transition-colors"
    //         disabled={!isConsentChecked}
    //       >
    //         Получить консультацию
    //       </button>

    //       <div className="flex items-start mt-2">
    //         <input
    //           type="checkbox"
    //           id="consent"
    //           className="mr-2 accent-yellow-400"
    //           checked={isConsentChecked}
    //           onChange={(e) => setIsConsentChecked(e.target.checked)}
    //         />
    //         <label
    //           htmlFor="consent"
    //           className="text-[8px] lg:text-sm text-gray-300 font-light cursor-pointer"
    //         >
    //           Нажимая кнопку, даю согласие <br/> <span className="text-yellow-default">на обработку персональных данных</span>
    //         </label>
    //       </div>
    //     </form>
    //   </div>
    // </section>
  );
}

export default Consult;
