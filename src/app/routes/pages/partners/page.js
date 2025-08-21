"use client";

import React, { useState, useEffect } from "react";
import { useCustomers } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { toggleModal } = useActions();

  // Получаем данные пользователя
  const customer = useCustomers();
  const isAuthenticated = customer?.authStatus;
  

  console.log("Auth status:", isAuthenticated, "Customer type:", customer?.type);

  // Проверка доступа и редирект
  useEffect(() => {
    // Ждем, пока данные загрузятся
    if (isAuthenticated === undefined) {
      console.log("Ожидание загрузки данных...");
      return;
    }

    // Если пользователь не авторизован
    if (isAuthenticated === false) {
      console.log("Пользователь не авторизован, открываем модальное окно");
      toggleModal("modals_auth");
      return;
    }

    // Если пользователь не имеет статус "Оптовый покупатель"
    if (customer?.type !== "Оптовый покупатель") {
      console.log("Пользователь не оптовый покупатель, открываем модальное окно");
      toggleModal("modals_auth");
      return;
    }

    // Если все проверки пройдены - делаем редирект
    console.log("Все проверки пройдены, делаем редирект на shop");
    
    // Принудительный редирект
    setTimeout(() => {
      router.push('/routes/shop?forPartners=true');
    }, 100);
    
  }, [isAuthenticated, customer?.type, toggleModal, router]);

  // Показываем загрузку пока происходит редирект
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Перенаправление в раздел для партнеров...</p>
        <p className="mt-2 text-sm text-gray-400">
          Статус: {isAuthenticated === undefined ? 'Загрузка...' : 
                   isAuthenticated === false ? 'Не авторизован' : 
                   customer?.type !== "Оптовый покупатель" ? 'Не оптовый покупатель' : 
                   'Перенаправление...'}
        </p>
      </div>
    </div>
  );
}