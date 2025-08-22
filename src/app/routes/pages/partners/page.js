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
  
  // Состояние для отслеживания инициализации
  const [isInitialized, setIsInitialized] = useState(false);
  // Состояние для отслеживания показа модального окна
  const [modalShown, setModalShown] = useState(false);
  // Состояние для отслеживания времени до автоматического возврата
  const [timeLeft, setTimeLeft] = useState(30);

  console.log("Auth status:", isAuthenticated, "Customer type:", customer?.type);

  // Отслеживаем инициализацию данных
  useEffect(() => {
    // Проверяем, что данные пользователя загружены (даже если это гость)
    if (customer !== undefined) {
      setIsInitialized(true);
    }
  }, [customer]);

  // Проверка доступа и редирект
  useEffect(() => {
    console.log('Сработает или нет')
    
    // Ждем, пока данные загрузятся и инициализируются
    if (!isInitialized) {
      console.log("Ожидание загрузки данных...");
      return;
    }

    // Если пользователь не авторизован или не оптовый покупатель
    if (!isAuthenticated || customer?.type !== "Оптовый покупатель") {
      if (!modalShown) {
        console.log("Пользователь не оптовый покупатель или не авторизован, открываем модальное окно");
        toggleModal("modals_auth");
        setModalShown(true);
      }
      return;
    }

    // Если все проверки пройдены - делаем редирект
    console.log("Все проверки пройдены, делаем редирект на shop");
    
    // Сбрасываем состояние модального окна
    setModalShown(false);
    
    // Принудительный редирект
    setTimeout(() => {
      router.push('/routes/shop?forPartners=true');
    }, 100);
    
  }, [isAuthenticated, customer?.type, toggleModal, router, isInitialized, modalShown]);

  // Сбрасываем таймер при успешной авторизации
  useEffect(() => {
    if (isAuthenticated && customer?.type === "Оптовый покупатель") {
      setTimeLeft(30);
      setModalShown(false);
    }
  }, [isAuthenticated, customer?.type]);

  // Слушаем изменения в модальном окне
  useEffect(() => {
    // Если модальное окно показано и пользователь не авторизован
    if (modalShown && !isAuthenticated) {
      // Таймер для автоматического возврата на главную через 30 секунд
      const autoRedirectTimer = setTimeout(() => {
        if (!isAuthenticated || customer?.type !== "Оптовый покупатель") {
          console.log("Автоматический возврат на главную страницу");
          router.push('/');
        }
      }, 30000);

      // Обратный отсчет
      const countdownTimer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(autoRedirectTimer);
        clearInterval(countdownTimer);
      };
    } else {
      // Сбрасываем таймер, если пользователь авторизовался
      setTimeLeft(30);
    }
  }, [modalShown, isAuthenticated, customer?.type, router]);

  {console.log(isAuthenticated)}

  // Показываем загрузку пока происходит редирект
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">
          {!isAuthenticated ? 'Проверка доступа...' : 'Перенаправление в раздел для партнеров...'}
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Статус: {!isInitialized ? 'Загрузка...' : 
                   !isAuthenticated ? 'Не авторизован' : 
                   customer?.type !== "Оптовый покупатель" ? 'Не оптовый покупатель' : 
                   'Перенаправление...'}
        </p>
        {!isAuthenticated && (
          <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
            <p className="text-sm text-yellow-800 mb-3">
              Если вы не авторизуетесь, вы будете перенаправлены на главную страницу через {timeLeft} секунд
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Вернуться на главную сейчас
            </button>
          </div>
        )}
      </div>
    </div>
  );
}